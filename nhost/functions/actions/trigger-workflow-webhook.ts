import type { Request, Response } from "express";
import {
  HttpError,
  sendActionError,
  triggerWorkflowByWebhook,
  type ActionPayload,
} from "./runner";

interface TriggerWorkflowWebhookInput {
  token?: string;
}

async function triggerWorkflowWebhook(payload: ActionPayload<TriggerWorkflowWebhookInput>) {
  const token = payload.input?.token?.trim();
  if (!token) throw new HttpError(400, "token is required");
  return triggerWorkflowByWebhook(token);
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
    const result = await triggerWorkflowWebhook(req.body as ActionPayload<TriggerWorkflowWebhookInput>);
    return res.status(200).json(result);
  } catch (err) {
    console.error("actions/trigger-workflow-webhook failed:", err);
    return sendActionError(res, err);
  }
}
