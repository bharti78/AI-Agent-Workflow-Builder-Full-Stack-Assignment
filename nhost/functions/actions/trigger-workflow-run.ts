import type { Request, Response } from "express";
import {
  assertRunnable,
  createWorkflowRun,
  getUserId,
  HttpError,
  loadWorkflowForUser,
  runStepsFrom,
  sendActionError,
  type ActionPayload,
} from "./runner";

interface TriggerWorkflowRunInput {
  workflow_id?: string;
}

async function triggerWorkflowRun(payload: ActionPayload<TriggerWorkflowRunInput>) {
  const workflowId = payload.input?.workflow_id;
  if (!workflowId) throw new HttpError(400, "workflow_id is required");

  const userId = getUserId(payload);
  const workflow = await loadWorkflowForUser(workflowId, userId);
  assertRunnable(workflow);

  const runId = await createWorkflowRun(workflowId, "manual", userId);
  const status = await runStepsFrom(workflow, runId);
  return { run_id: runId, status };
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
    const result = await triggerWorkflowRun(req.body as ActionPayload<TriggerWorkflowRunInput>);
    return res.status(200).json(result);
  } catch (err) {
    console.error("actions/trigger-workflow-run failed:", err);
    return sendActionError(res, err);
  }
}
