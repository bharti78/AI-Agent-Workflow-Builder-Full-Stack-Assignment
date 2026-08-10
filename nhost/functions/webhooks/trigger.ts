import type { Request, Response } from "express";
import { HttpError, triggerWorkflowByWebhook } from "../actions/runner";

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
    const token = (req.query.token as string) || (req.body?.token as string);
    const result = await triggerWorkflowByWebhook(token);
    return res.status(200).json(result);
  } catch (err) {
    console.error("webhooks/trigger failed:", err);
    const status = err instanceof HttpError ? err.status : 500;
    const message = err instanceof Error ? err.message : "Webhook trigger failed";
    return res.status(status).json({ message });
  }
}
