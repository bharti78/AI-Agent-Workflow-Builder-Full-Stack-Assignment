import type { Request, Response } from "express";
import {
  adminGraphql,
  getUserId,
  HttpError,
  loadWorkflowById,
  runStepsFrom,
  sendActionError,
  type ActionPayload,
  type WorkflowForRun,
} from "./runner";

interface ApproveStepInput {
  step_run_id?: string;
}

const STEP_RUN_QUERY = `
  query StepRunForApproval($stepRunId: uuid!) {
    step_runs_by_pk(id: $stepRunId) {
      id
      status
      input
      workflow_step_id
      workflow_run_id
      workflow_step {
        id
        type
        config
        workflow_id
        step_order
        workflow {
          id
          org_id
          active
          organization {
            id
            quota_used
            quota_allowed
          }
        }
      }
      workflow_run {
        id
        workflow_id
        status
      }
    }
  }
`;

const USER_ORG_MEMBERSHIP_QUERY = `
  query UserOrgMembership($orgId: uuid!, $userId: uuid!) {
    org_members(where: { org_id: { _eq: $orgId }, user_id: { _eq: $userId } }) {
      id
      role
    }
  }
`;

const UPDATE_STEP_RUN_APPROVED_MUTATION = `
  mutation UpdateStepRunApproved($stepRunId: uuid!, $userId: uuid!) {
    update_step_runs_by_pk(
      pk_columns: { id: $stepRunId }
      _set: { 
        status: "completed", 
        approved_by: $userId, 
        approved_at: now(),
        completed_at: now()
      }
    ) { id status }
  }
`;

async function approveStep(payload: ActionPayload<ApproveStepInput>) {
  const stepRunId = payload.input?.step_run_id;
  if (!stepRunId) throw new HttpError(400, "step_run_id is required");

  // Check 1: Authenticated user exists
  const userId = getUserId(payload);

  // Check 2: The step_run exists
  const stepRunData = await adminGraphql<{ step_runs_by_pk: any }>(
    STEP_RUN_QUERY,
    { stepRunId },
  );
  const stepRun = stepRunData.step_runs_by_pk;
  if (!stepRun) throw new HttpError(404, "Step run not found");

  // Check 3: Its workflow_run → workflow_step → workflow exists
  const workflowStep = stepRun.workflow_step;
  const workflowRun = stepRun.workflow_run;
  if (!workflowStep || !workflowRun) {
    throw new HttpError(404, "Workflow step or run not found");
  }

  // Check 4: That workflow belongs to a real organization
  const orgId = workflowStep.workflow?.org_id;
  if (!orgId) throw new HttpError(404, "Workflow organization not found");

  // Check 5: The authenticated user is a member of that organization
  const membershipData = await adminGraphql<{ org_members: any[] }>(
    USER_ORG_MEMBERSHIP_QUERY,
    { orgId, userId },
  );
  const membership = membershipData.org_members?.[0];
  if (!membership) throw new HttpError(403, "You are not a member of this organization");

  // Check 6: The user's role is allowed to approve
  // Owner always can; editor can only if the workflow's rules allow it
  // For simplicity, we allow both owner and editor to approve (matching who can trigger runs)
  // If requireOwner is set in the approval_gate config, only owner can approve
  const userRole = membership.role;
  const stepConfig = workflowStep.config ?? {};
  const requireOwner = stepConfig.requireOwner === true;
  
  if (userRole !== "owner" && (userRole !== "editor" || requireOwner)) {
    throw new HttpError(403, "Only owners (or editors when allowed) can approve this step");
  }

  // Check 7: The step is actually status: "paused"
  if (stepRun.status !== "paused") {
    throw new HttpError(400, "Step is not paused and cannot be approved");
  }

  // Check 8: The step's type is actually "approval_gate"
  if (workflowStep.type !== "approval_gate") {
    throw new HttpError(400, "Step is not an approval gate and cannot be approved");
  }

  // All checks pass - approve the step
  await adminGraphql(UPDATE_STEP_RUN_APPROVED_MUTATION, {
    stepRunId,
    userId,
  });

  // Update workflow_run status to running
  await adminGraphql(
    `
    mutation UpdateRunRunning($runId: uuid!) {
      update_workflow_runs_by_pk(pk_columns: { id: $runId }, _set: { status: "running", error: null }) {
        id
        status
      }
    }
    `,
    { runId: workflowRun.id },
  );

  // Resume execution from the next step, carrying forward the output that
  // was available when the approval gate paused the run (stored on input).
  const workflow = await loadWorkflowById(workflowStep.workflow_id);
  const status = await runStepsFrom(
    workflow,
    workflowRun.id,
    workflowStep.step_order,
    stepRun.input ?? null,
  );

  return { run_id: workflowRun.id, step_run_id: stepRunId, status };
}

export default async function handler(req: Request, res: Response) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const result = await approveStep(req.body as ActionPayload<ApproveStepInput>);
    return res.status(200).json(result);
  } catch (err) {
    console.error("actions/approve-step failed:", err);
    return sendActionError(res, err);
  }
}
