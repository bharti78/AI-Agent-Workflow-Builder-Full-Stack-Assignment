# Architecture Write-up

## Schema Design Rationale

The database schema is split across several tables to support multi-tenancy, workflow execution, and audit trails:

### Core Tables

**organizations**: The tenant boundary. Every protected resource traces back to exactly one organization. This enables:
- Multi-tenancy with clear data isolation
- Quota management per organization
- Role-based access control scoped to orgs

**org_members**: The Layer-1 authorization source of truth. Maps `(org_id, user_id) → role`. This design:
- Centralizes permission logic in one place
- Allows Hasura permissions to join through this table
- Supports future permission extensions (e.g., per-resource permissions)

### Workflow Tables

**workflows**: Workflow definitions with org scoping. Key design decisions:
- `org_id` foreign key ensures org isolation
- `active` flag allows pausing workflows without deletion
- `created_by` tracks workflow creator for audit trail

**workflow_steps**: Individual steps within a workflow. Design rationale:
- `step_order` enables sequential execution
- `config` as jsonb allows flexible per-step configuration
- `type` enum supports extensible step types
- Unique constraint on `(workflow_id, step_order)` prevents ordering conflicts

**workflow_triggers**: External trigger mechanisms. Design considerations:
- `trigger_type` enum supports manual, webhook, scheduled, database_event
- `config` jsonb stores trigger-specific settings (e.g., webhook token)
- `active` flag allows pausing triggers without deletion
- Indexed `config->>'token'` for efficient webhook lookup

### Execution Tables

**workflow_runs**: Individual workflow executions. Design rationale:
- Separate from workflow definition to support multiple runs
- `status` enum tracks execution lifecycle (pending/running/paused/completed/failed)
- `trigger_type` distinguishes manual vs webhook triggers
- `triggered_by` references user for manual triggers (null for webhooks)
- `error` field stores failure information for debugging

**step_runs**: Individual step executions within a run. Key design decisions:
- Links to both `workflow_run` and `workflow_step` for traceability
- `status` enum includes `paused` for approval gates, `skipped` for conditional branches
- `input`/`output` jsonb fields store step data
- `attempt_count` tracks retry attempts
- `approved_by`/`approved_at` for approval gate audit trail
- `started_at`/`completed_at` for performance monitoring

**workflow_results**: The ONLY table `db_write` steps can touch. Security rationale:
- Isolates workflow output from core schema
- Prevents SQL injection via workflow config
- Allows easy cleanup/audit of workflow-generated data
- Scoped to both workflow_run and workflow_id for traceability

### Read-Only Views

**org_monthly_usage**: Aggregates quota information. Design purpose:
- Exposes quota data without allowing direct quota manipulation
- Simplifies quota display queries
- Can be extended with historical usage tracking

## Security Layers

### Layer 1: Organization + Role Permissions

Implemented at the Hasura row permission level. All org-scoped tables have permissions that:

1. Join through `org_members` on `X-Hasura-User-Id`
2. Filter rows to only those where the user is a member
3. Apply role-based restrictions (e.g., delete only for owners)

Example for `workflows`:
```graphql
{
  "filter": {
    "organization": {
      "members": {
        "user_id": {
          "_eq": "X-Hasura-User-Id"
        }
      }
    }
  }
}
```

This layer ensures:
- Cross-org data isolation at the database level
- Users cannot query data from orgs they don't belong to
- Permissions are enforced even if frontend is bypassed

### Layer 2: Step-Level Restrictions

Implemented in both Hasura permissions and frontend UI. Certain operations are restricted to owners:

**db_write steps**: Only owners can configure
- Rationale: Prevents unauthorized data writes
- Implementation: Hasura permission check + frontend UI restriction
- Enforcement: Both in permission boolean expression and UI

**notify steps**: Only owners can configure
- Rationale: Prevents webhook spam/abuse
- Implementation: Hasura permission check + frontend UI restriction
- Enforcement: Both in permission boolean expression and UI

**webhook triggers**: Only owners can configure
- Rationale: Webhooks can trigger workflows without user auth
- Implementation: Hasura permission check + frontend UI restriction
- Enforcement: Both in permission boolean expression and UI

This defense-in-depth approach ensures security even if one layer fails.

## Approval Gate State Machine

The approval gate implements a pause/resume pattern for human-in-the-loop workflows:

### States

```
running → paused (when approval_gate step encountered)
         ↓
    [approveStep Action]
         ↓
    running (resumes from next step after approval)
```

### Implementation Details

**Pause Phase**:
1. Runner encounters `approval_gate` step
2. Creates step_run with `status: "paused"`
3. Sets workflow_run `status: "paused"`
4. Returns early from execution (stops processing further steps)

**Resume Phase**:
1. User calls `approveStep` Action with step_run_id
2. Action performs 8-point authorization check:
   - Authenticated user exists
   - Step run exists
   - Workflow run → workflow step → workflow exists
   - Workflow belongs to a real organization
   - User is member of that organization
   - User's role allows approval (owner always, editor if not requireOwner)
   - Step is status "paused"
   - Step type is "approval_gate"
3. Updates step_run: `status: "completed"`, `approved_by`, `approved_at`, `completed_at`
4. Updates workflow_run: `status: "running"`
5. Calls `runStepsFrom(workflow, runId, stepOrder)` to resume execution

**Key Design Decisions**:
- Approval metadata stored in step_run (approved_by, approved_at) for audit trail
- Resumes from next step (doesn't re-execute approved step)
- Reuses same runner logic as initial trigger (DRY principle)
- Authorization is explicit business logic, not just row permissions

### Security Considerations

The approval gate is security-critical because it allows external control over workflow execution:

1. **Authorization**: 8-point check prevents unauthorized approvals
2. **Audit Trail**: approved_by/approved_at track who approved and when
3. **Role Flexibility**: Configurable via `requireOwner` in step config
4. **No Replay**: Once approved, step cannot be re-approved (status check)
5. **Org Scoping**: All checks verify org membership

## Workflow Execution Flow

### Trigger Phase

1. User calls `triggerWorkflowRun` Action (or webhook hits endpoint)
2. Action verifies user permissions (org membership + role)
3. Action checks workflow is active and quota not exhausted
4. Action creates `workflow_runs` row with `status: "running"`
5. Action calls runner to execute steps

### Execution Phase

Runner executes steps in `step_order`:

```typescript
for each step in workflow.steps (ordered by step_order):
  1. Create step_run with status: "running"
  2. Execute step based on type:
     - llm_call: Call LLM API with retry
     - http_request: Make HTTP request with retry
     - db_write: Insert to workflow_results
     - notify: POST to webhook (non-fatal)
     - conditional_branch: Evaluate condition, skip ahead if false
     - approval_gate: Set status: "paused", return early
  3. Update step_run with status, output, error
  4. If step failed, set workflow_run status: "failed" and return
  5. If approval_gate, set workflow_run status: "paused" and return
```

### Completion Phase

1. All steps completed successfully
2. Update workflow_run: `status: "completed"`, `completed_at`
3. Increment organization quota_used
4. Return success to caller

### Error Handling

- **LLM/HTTP failures**: Retry once, then fail the run
- **Notify failures**: Log error but continue (non-fatal)
- **Conditional branch**: Skip ahead if condition false
- **Approval gate**: Pause and wait for manual approval
- **Unexpected errors**: Fail the run with error message

## Data Flow

```
User Action → GraphQL Mutation → Hasura Action → Nhost Function → PostgreSQL
                                                                    ↓
                                                            GraphQL Subscription
                                                                    ↓
                                                            Frontend Update
```

This architecture ensures:
- All writes go through Actions (business logic layer)
- Reads use Hasura permissions (security layer)
- Real-time updates via subscriptions (UX layer)
- Audit trail in database (compliance layer)
