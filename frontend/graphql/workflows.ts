export const WORKFLOWS_FOR_ORG_QUERY = `
  query WorkflowsForOrg($orgId: uuid!) {
    workflows(where: { org_id: { _eq: $orgId } }, order_by: { updated_at: desc }) {
      id
      name
      description
      active
      created_by
      created_at
      updated_at
      steps(order_by: { step_order: asc }) {
        id
        name
        type
        step_order
      }
      triggers {
        id
        trigger_type
        active
      }
      runs(order_by: { created_at: desc }, limit: 1) {
        id
        status
        started_at
        completed_at
      }
    }
  }
`;

export const WORKFLOW_DETAIL_QUERY = `
  query WorkflowDetail($workflowId: uuid!) {
    workflows_by_pk(id: $workflowId) {
      id
      org_id
      name
      description
      active
      created_by
      created_at
      updated_at
      steps(order_by: { step_order: asc }) {
        id
        workflow_id
        name
        type
        step_order
        config
        created_at
        updated_at
      }
      triggers(order_by: { created_at: asc }) {
        id
        workflow_id
        trigger_type
        config
        active
        created_at
      }
      runs(order_by: { created_at: desc }, limit: 1) {
        id
        status
        started_at
        completed_at
        error
        step_runs(order_by: { created_at: asc }) {
          id
          workflow_step_id
          status
          error
          output
          input
          attempt_count
          approved_by
          approved_at
          started_at
          completed_at
          created_at
        }
      }
    }
  }
`;

export const CREATE_WORKFLOW_MUTATION = `
  mutation CreateWorkflow($orgId: uuid!, $name: String!, $description: String) {
    insert_workflows_one(object: { org_id: $orgId, name: $name, description: $description }) {
      id
      name
    }
  }
`;

export const UPDATE_WORKFLOW_MUTATION = `
  mutation UpdateWorkflow($workflowId: uuid!, $name: String, $description: String, $active: Boolean) {
    update_workflows_by_pk(
      pk_columns: { id: $workflowId }
      _set: { name: $name, description: $description, active: $active }
    ) {
      id
      name
      description
      active
      updated_at
    }
  }
`;

export const DELETE_WORKFLOW_MUTATION = `
  mutation DeleteWorkflow($workflowId: uuid!) {
    delete_workflows_by_pk(id: $workflowId) {
      id
    }
  }
`;

export const CREATE_STEP_MUTATION = `
  mutation CreateStep($workflowId: uuid!, $stepOrder: Int!, $name: String!, $type: String!, $config: jsonb!) {
    insert_workflow_steps_one(
      object: { workflow_id: $workflowId, step_order: $stepOrder, name: $name, type: $type, config: $config }
    ) {
      id
    }
  }
`;

export const UPDATE_STEP_MUTATION = `
  mutation UpdateStep($stepId: uuid!, $name: String, $type: String, $config: jsonb) {
    update_workflow_steps_by_pk(
      pk_columns: { id: $stepId }
      _set: { name: $name, type: $type, config: $config }
    ) {
      id
    }
  }
`;

export const DELETE_STEP_MUTATION = `
  mutation DeleteStep($stepId: uuid!) {
    delete_workflow_steps_by_pk(id: $stepId) {
      id
    }
  }
`;

export const REORDER_STEPS_MUTATION = `
  mutation ReorderSteps(
    $firstId: uuid!
    $firstOrder: Int!
    $secondId: uuid!
    $secondOrder: Int!
    $tempOrder: Int!
  ) {
    parkFirst: update_workflow_steps_by_pk(
      pk_columns: { id: $firstId }
      _set: { step_order: $tempOrder }
    ) {
      id
    }
    moveSecond: update_workflow_steps_by_pk(
      pk_columns: { id: $secondId }
      _set: { step_order: $firstOrder }
    ) {
      id
    }
    moveFirst: update_workflow_steps_by_pk(
      pk_columns: { id: $firstId }
      _set: { step_order: $secondOrder }
    ) {
      id
    }
  }
`;

export const CREATE_TRIGGER_MUTATION = `
  mutation CreateTrigger($workflowId: uuid!, $triggerType: String!, $config: jsonb!) {
    insert_workflow_triggers_one(
      object: { workflow_id: $workflowId, trigger_type: $triggerType, config: $config }
    ) {
      id
    }
  }
`;

export const UPDATE_TRIGGER_MUTATION = `
  mutation UpdateTrigger($triggerId: uuid!, $config: jsonb, $active: Boolean) {
    update_workflow_triggers_by_pk(
      pk_columns: { id: $triggerId }
      _set: { config: $config, active: $active }
    ) {
      id
      active
    }
  }
`;

export const DELETE_TRIGGER_MUTATION = `
  mutation DeleteTrigger($triggerId: uuid!) {
    delete_workflow_triggers_by_pk(id: $triggerId) {
      id
    }
  }
`;

export const TRIGGER_WORKFLOW_RUN_MUTATION = `
  mutation TriggerWorkflowRun($workflowId: uuid!) {
    triggerWorkflowRun(workflow_id: $workflowId) {
      run_id
      status
    }
  }
`;

export const APPROVE_STEP_MUTATION = `
  mutation ApproveStep($stepRunId: uuid!) {
    approveStep(step_run_id: $stepRunId) {
      run_id
      step_run_id
      status
    }
  }
`;

export const STEP_RUN_UPDATES_SUBSCRIPTION = `
  subscription StepRunUpdates($workflowRunId: uuid!) {
    step_runs(
      where: { workflow_run_id: { _eq: $workflowRunId } }
      order_by: { created_at: asc }
    ) {
      id
      workflow_step_id
      status
      input
      output
      error
      attempt_count
      approved_by
      approved_at
      started_at
      completed_at
      created_at
    }
  }
`;

export type OrgRole = "owner" | "editor" | "viewer";
export type StepType =
  | "llm_call"
  | "http_request"
  | "db_write"
  | "notify"
  | "conditional_branch"
  | "approval_gate";
export type TriggerType = "manual" | "webhook" | "scheduled" | "database_event";

export interface WorkflowListRow {
  id: string;
  name: string;
  description: string | null;
  active: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
  steps: { id: string; name: string; type: StepType; step_order: number }[];
  triggers: { id: string; trigger_type: TriggerType; active: boolean }[];
  runs: WorkflowRunSummary[];
}

export interface StepRunSummary {
  id: string;
  workflow_step_id: string;
  status: "pending" | "running" | "completed" | "failed" | "paused" | "skipped";
  error: string | null;
  output: Record<string, unknown> | null;
  input: Record<string, unknown> | null;
  attempt_count: number;
  approved_by: string | null;
  approved_at: string | null;
  started_at: string | null;
  completed_at: string | null;
  created_at: string;
}

export interface WorkflowRunSummary {
  id: string;
  status: "pending" | "running" | "paused" | "completed" | "failed";
  started_at: string | null;
  completed_at: string | null;
  error?: string | null;
  step_runs?: StepRunSummary[];
}

export interface WorkflowStep {
  id: string;
  workflow_id: string;
  name: string;
  type: StepType;
  step_order: number;
  config: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface WorkflowTrigger {
  id: string;
  workflow_id: string;
  trigger_type: TriggerType;
  config: Record<string, unknown>;
  active: boolean;
  created_at: string;
}

export interface WorkflowDetail extends Omit<WorkflowListRow, "steps" | "triggers"> {
  org_id: string;
  steps: WorkflowStep[];
  triggers: WorkflowTrigger[];
}
