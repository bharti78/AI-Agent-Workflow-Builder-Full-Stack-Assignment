import type { Request, Response } from "express";

type JsonObject = Record<string, unknown>;

interface ActionPayload {
  input?: { workflow_id?: string };
  session_variables?: Record<string, string | undefined>;
}

interface WorkflowForRun {
  id: string;
  org_id: string;
  active: boolean;
  organization: {
    id: string;
    quota_used: number;
    quota_allowed: number;
    members: { id: string; role: "owner" | "editor" }[];
  };
  steps: WorkflowStep[];
}

interface WorkflowStep {
  id: string;
  workflow_id: string;
  step_order: number;
  name: string;
  type:
    | "llm_call"
    | "http_request"
    | "db_write"
    | "notify"
    | "conditional_branch"
    | "approval_gate";
  config: JsonObject | null;
}

class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

async function adminGraphql<T>(
  query: string,
  variables: Record<string, unknown>,
): Promise<T> {
  const response = await fetch(process.env.NHOST_GRAPHQL_URL as string, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-hasura-admin-secret": process.env.NHOST_ADMIN_SECRET as string,
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await response.json();
  if (json.errors) {
    throw new Error(
      json.errors.map((e: { message: string }) => e.message).join("; "),
    );
  }
  return json.data as T;
}

const WORKFLOW_FOR_RUN_QUERY = `
  query WorkflowForRun($workflowId: uuid!, $userId: uuid!) {
    workflows_by_pk(id: $workflowId) {
      id
      org_id
      active
      organization {
        id
        quota_used
        quota_allowed
        members(where: { user_id: { _eq: $userId }, role: { _in: ["owner", "editor"] } }) {
          id
          role
        }
      }
      steps(order_by: { step_order: asc }) {
        id
        workflow_id
        step_order
        name
        type
        config
      }
    }
  }
`;

const INSERT_RUN_MUTATION = `
  mutation InsertRun($workflowId: uuid!, $userId: uuid!, $startedAt: timestamptz!) {
    insert_workflow_runs_one(object: {
      workflow_id: $workflowId
      status: "running"
      triggered_by: $userId
      trigger_type: "manual"
      started_at: $startedAt
    }) {
      id
      status
    }
  }
`;

const UPDATE_RUN_MUTATION = `
  mutation UpdateRun($runId: uuid!, $status: String!, $completedAt: timestamptz, $error: String) {
    update_workflow_runs_by_pk(
      pk_columns: { id: $runId }
      _set: { status: $status, completed_at: $completedAt, error: $error }
    ) {
      id
      status
    }
  }
`;

const INSERT_STEP_RUN_MUTATION = `
  mutation InsertStepRun(
    $runId: uuid!
    $stepId: uuid!
    $status: String!
    $input: jsonb
    $startedAt: timestamptz
    $completedAt: timestamptz
  ) {
    insert_step_runs_one(object: {
      workflow_run_id: $runId
      workflow_step_id: $stepId
      status: $status
      input: $input
      attempt_count: 0
      started_at: $startedAt
      completed_at: $completedAt
    }) {
      id
    }
  }
`;

const UPDATE_STEP_RUN_MUTATION = `
  mutation UpdateStepRun(
    $stepRunId: uuid!
    $status: String!
    $output: jsonb
    $error: String
    $attemptCount: Int!
    $completedAt: timestamptz
  ) {
    update_step_runs_by_pk(
      pk_columns: { id: $stepRunId }
      _set: {
        status: $status
        output: $output
        error: $error
        attempt_count: $attemptCount
        completed_at: $completedAt
      }
    ) {
      id
      status
    }
  }
`;

const INSERT_WORKFLOW_RESULT_MUTATION = `
  mutation InsertWorkflowResult($runId: uuid!, $workflowId: uuid!, $data: jsonb!) {
    insert_workflow_results_one(object: {
      workflow_run_id: $runId
      workflow_id: $workflowId
      data: $data
    }) {
      id
    }
  }
`;

const INCREMENT_QUOTA_MUTATION = `
  mutation IncrementQuota($orgId: uuid!) {
    update_organizations_by_pk(pk_columns: { id: $orgId }, _inc: { quota_used: 1 }) {
      id
      quota_used
    }
  }
`;

function getUserId(payload: ActionPayload): string {
  const vars = payload.session_variables ?? {};
  const userId =
    vars["x-hasura-user-id"] ??
    vars["X-Hasura-User-Id"] ??
    vars["X-HASURA-USER-ID"];
  if (!userId) {
    throw new HttpError(401, "Missing x-hasura-user-id");
  }
  return userId;
}

function toObject(value: unknown): JsonObject {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as JsonObject)
    : {};
}

function toStringValue(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function truncate(value: string, max = 8000): string {
  return value.length > max ? `${value.slice(0, max)}... [truncated]` : value;
}

function readPath(source: unknown, path: string): unknown {
  if (!path) return source;
  return path.split(".").reduce<unknown>((current, part) => {
    if (current && typeof current === "object" && part in current) {
      return (current as JsonObject)[part];
    }
    return undefined;
  }, source);
}

async function withRetry<T>(operation: () => Promise<T>): Promise<{ output: T; retries: number }> {
  let lastError: unknown;
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      return { output: await operation(), retries: attempt };
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError instanceof Error ? lastError : new Error(String(lastError));
}

async function createStepRun(
  runId: string,
  stepId: string,
  status: "running" | "skipped",
  input: unknown,
): Promise<string> {
  const now = new Date().toISOString();
  const data = await adminGraphql<{ insert_step_runs_one: { id: string } }>(
    INSERT_STEP_RUN_MUTATION,
    {
      runId,
      stepId,
      status,
      input,
      startedAt: status === "running" ? now : null,
      completedAt: status === "skipped" ? now : null,
    },
  );
  return data.insert_step_runs_one.id;
}

async function finishStepRun(
  stepRunId: string,
  status: "completed" | "failed" | "paused",
  output: unknown,
  error: string | null,
  attemptCount: number,
) {
  await adminGraphql(UPDATE_STEP_RUN_MUTATION, {
    stepRunId,
    status,
    output,
    error,
    attemptCount,
    completedAt: status === "paused" ? null : new Date().toISOString(),
  });
}

async function finishRun(
  runId: string,
  status: "completed" | "failed" | "paused",
  error: string | null = null,
) {
  await adminGraphql(UPDATE_RUN_MUTATION, {
    runId,
    status,
    completedAt: status === "paused" ? null : new Date().toISOString(),
    error,
  });
}

async function callLlm(config: JsonObject, input: unknown): Promise<JsonObject> {
  const provider = toStringValue(config.provider, "groq");
  const apiKey = process.env.LLM_API_KEY;
  const model = toStringValue(config.model, process.env.LLM_MODEL ?? "");
  const prompt = toStringValue(config.prompt, "");
  const temperature =
    typeof config.temperature === "number" ? config.temperature : 0.2;

  if (!apiKey) throw new Error("LLM_API_KEY is not configured");
  if (!model) throw new Error("LLM model is not configured");
  if (!prompt) throw new Error("LLM prompt is required");

  const content = `${prompt}\n\nPrevious step output:\n${JSON.stringify(input ?? null)}`;

  if (provider === "gemini") {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: content }] }],
          generationConfig: { temperature },
        }),
      },
    );
    if (!response.ok) {
      throw new Error(`Gemini request failed: ${response.status} ${truncate(await response.text(), 1000)}`);
    }
    const body = await response.json();
    const text = body.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
    return { text };
  }

  const baseUrl =
    provider === "openrouter"
      ? "https://openrouter.ai/api/v1/chat/completions"
      : "https://api.groq.com/openai/v1/chat/completions";
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature,
      messages: [{ role: "user", content }],
    }),
  });
  if (!response.ok) {
    throw new Error(`${provider} request failed: ${response.status} ${truncate(await response.text(), 1000)}`);
  }
  const body = await response.json();
  return { text: body.choices?.[0]?.message?.content ?? "" };
}

async function callHttp(config: JsonObject): Promise<JsonObject> {
  const method = toStringValue(config.method, "GET").toUpperCase();
  const url = toStringValue(config.url);
  if (!url) throw new Error("HTTP request URL is required");

  const headers = toObject(config.headers);
  const body = config.body;
  const response = await fetch(url, {
    method,
    headers: Object.fromEntries(
      Object.entries(headers).map(([key, value]) => [key, String(value)]),
    ),
    body: method === "GET" || method === "HEAD" ? undefined : JSON.stringify(body ?? null),
  });
  const text = truncate(await response.text());
  if (!response.ok) {
    throw new Error(`HTTP request failed: ${response.status} ${text}`);
  }
  return { status: response.status, body: text };
}

async function notify(config: JsonObject, input: unknown): Promise<JsonObject> {
  const webhookUrl = toStringValue(config.webhookUrl);
  const message = toStringValue(config.message, "Workflow notification");
  if (!webhookUrl) throw new Error("Notification webhookUrl is required");

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, input }),
  });
  const body = truncate(await response.text(), 1000);
  if (!response.ok) {
    throw new Error(`Notification failed: ${response.status} ${body}`);
  }
  return { status: response.status, body };
}

function evaluateCondition(config: JsonObject, input: unknown): boolean {
  const actual = readPath(input, toStringValue(config.field));
  const expected = toStringValue(config.value);
  const operator = toStringValue(config.operator, "contains");

  if (operator === "exists") return actual !== undefined && actual !== null;
  if (operator === "equals") return String(actual ?? "") === expected;
  return String(actual ?? "").toLowerCase().includes(expected.toLowerCase());
}

async function runWorkflow(workflow: WorkflowForRun, runId: string): Promise<"completed" | "failed" | "paused"> {
  let previousOutput: unknown = null;
  let index = 0;

  while (index < workflow.steps.length) {
    const step = workflow.steps[index];
    const config = toObject(step.config);
    const stepRunId = await createStepRun(runId, step.id, "running", previousOutput);

    try {
      if (step.type === "approval_gate") {
        const output = { note: toStringValue(config.note), paused: true };
        await finishStepRun(stepRunId, "paused", output, null, 0);
        await finishRun(runId, "paused");
        return "paused";
      }

      if (step.type === "conditional_branch") {
        const result = evaluateCondition(config, previousOutput);
        const output = { result, branch: result ? "true" : "false" };
        await finishStepRun(stepRunId, "completed", output, null, 0);
        previousOutput = output;

        if (!result) {
          const configuredTarget = config.onFalseSkipToStepOrder;
          const configuredTargetIndex =
            typeof configuredTarget === "number"
              ? workflow.steps.findIndex((candidate) => candidate.step_order >= configuredTarget)
              : -1;
          const nextIndex =
            configuredTargetIndex === -1
              ? Math.min(index + 2, workflow.steps.length)
              : configuredTargetIndex;

          for (let skippedIndex = index + 1; skippedIndex < nextIndex; skippedIndex += 1) {
            const skipped = workflow.steps[skippedIndex];
            await createStepRun(runId, skipped.id, "skipped", previousOutput);
          }
          index = nextIndex;
          continue;
        }

        index += 1;
        continue;
      }

      if (step.type === "db_write") {
        const data = {
          label: toStringValue(config.label, step.name),
          output: previousOutput,
        };
        await adminGraphql(INSERT_WORKFLOW_RESULT_MUTATION, {
          runId,
          workflowId: workflow.id,
          data,
        });
        previousOutput = data;
        await finishStepRun(stepRunId, "completed", previousOutput, null, 0);
        index += 1;
        continue;
      }

      if (step.type === "notify") {
        // Notifications are intentionally non-fatal: the workflow's core
        // result should survive a failed Slack/webhook ping.
        try {
          const result = await withRetry(() => notify(config, previousOutput));
          previousOutput = result.output;
          await finishStepRun(stepRunId, "completed", previousOutput, null, result.retries);
        } catch (err) {
          const message = err instanceof Error ? err.message : String(err);
          previousOutput = { notified: false, error: message };
          await finishStepRun(stepRunId, "completed", previousOutput, message, 1);
        }
        index += 1;
        continue;
      }

      const result =
        step.type === "llm_call"
          ? await withRetry(() => callLlm(config, previousOutput))
          : await withRetry(() => callHttp(config));
      previousOutput = result.output;
      await finishStepRun(stepRunId, "completed", previousOutput, null, result.retries);
      index += 1;
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      await finishStepRun(stepRunId, "failed", null, message, 1);
      await finishRun(runId, "failed", message);
      return "failed";
    }
  }

  await finishRun(runId, "completed");
  await adminGraphql(INCREMENT_QUOTA_MUTATION, { orgId: workflow.org_id });
  return "completed";
}

async function triggerWorkflowRun(payload: ActionPayload) {
  const workflowId = payload.input?.workflow_id;
  if (!workflowId) throw new HttpError(400, "workflow_id is required");

  const userId = getUserId(payload);
  const data = await adminGraphql<{ workflows_by_pk: WorkflowForRun | null }>(
    WORKFLOW_FOR_RUN_QUERY,
    { workflowId, userId },
  );
  const workflow = data.workflows_by_pk;
  if (!workflow || workflow.organization.members.length === 0) {
    throw new HttpError(403, "Only an owner or editor can run this workflow");
  }
  if (!workflow.active) {
    throw new HttpError(400, "Workflow is paused");
  }
  if (workflow.organization.quota_used >= workflow.organization.quota_allowed) {
    throw new HttpError(400, "Organization quota has been exhausted");
  }

  const runData = await adminGraphql<{
    insert_workflow_runs_one: { id: string; status: string };
  }>(INSERT_RUN_MUTATION, {
    workflowId,
    userId,
    startedAt: new Date().toISOString(),
  });
  const runId = runData.insert_workflow_runs_one.id;
  const status = await runWorkflow(workflow, runId);
  return { run_id: runId, status };
}

function sendActionError(res: Response, err: unknown) {
  const status = err instanceof HttpError ? err.status : 500;
  const message = err instanceof Error ? err.message : "Could not trigger workflow run";
  return res.status(status).json({ message });
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
    const result = await triggerWorkflowRun(req.body as ActionPayload);
    return res.status(200).json(result);
  } catch (err) {
    console.error("actions/trigger-workflow-run failed:", err);
    return sendActionError(res, err);
  }
}
