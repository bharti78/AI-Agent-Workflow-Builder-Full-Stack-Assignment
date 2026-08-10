"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { nhost } from "@/lib/nhost";
import { useOrg } from "@/lib/org-context";
import {
  CREATE_STEP_MUTATION,
  CREATE_TRIGGER_MUTATION,
  DELETE_STEP_MUTATION,
  DELETE_TRIGGER_MUTATION,
  DELETE_WORKFLOW_MUTATION,
  REORDER_STEPS_MUTATION,
  UPDATE_STEP_MUTATION,
  UPDATE_TRIGGER_MUTATION,
  UPDATE_WORKFLOW_MUTATION,
  WORKFLOW_DETAIL_QUERY,
  type StepType,
  type TriggerType,
  type WorkflowDetail,
  type WorkflowStep,
  type WorkflowTrigger,
} from "@/graphql/workflows";

const STEP_TYPES: StepType[] = [
  "llm_call",
  "http_request",
  "conditional_branch",
  "approval_gate",
  "db_write",
  "notify",
];
const TRIGGER_TYPES: TriggerType[] = ["manual", "scheduled", "database_event", "webhook"];
const OWNER_STEP_TYPES = new Set<StepType>(["db_write", "notify"]);

function canEdit(role: string | undefined) {
  return role === "owner" || role === "editor";
}

function canManageStep(role: string | undefined, type: StepType) {
  return canEdit(role) && (!OWNER_STEP_TYPES.has(type) || role === "owner");
}

function canManageTrigger(role: string | undefined, triggerType: TriggerType) {
  return canEdit(role) && (triggerType !== "webhook" || role === "owner");
}

function defaultStepConfig(type: StepType): Record<string, unknown> {
  switch (type) {
    case "llm_call":
      return { provider: "gemini", model: "", prompt: "", temperature: 0.2 };
    case "http_request":
      return { method: "GET", url: "", headers: {}, body: null };
    case "db_write":
      return { label: "" };
    case "notify":
      return { webhookUrl: "", message: "" };
    case "conditional_branch":
      // Runner contract draft: compare field/operator/value against prior output.
      return { field: "", operator: "contains", value: "" };
    case "approval_gate":
      return { note: "" };
  }
}

function defaultTriggerConfig(type: TriggerType): Record<string, unknown> {
  if (type === "webhook") {
    return { token: crypto.randomUUID() };
  }
  if (type === "scheduled") {
    return { cron: "0 * * * *" };
  }
  if (type === "database_event") {
    return { table: "", operation: "insert" };
  }
  return {};
}

function asText(value: unknown) {
  return typeof value === "string" ? value : "";
}

function asNumber(value: unknown, fallback: number) {
  return typeof value === "number" ? value : fallback;
}

function parseJson(raw: string, fallback: unknown) {
  if (!raw.trim()) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function summarizeConfig(type: StepType, config: Record<string, unknown>) {
  if (type === "llm_call") {
    return `${asText(config.provider) || "provider"} ${asText(config.model) || "model"}${asText(config.prompt) ? " · prompt set" : ""}`;
  }
  if (type === "http_request") {
    return `${asText(config.method) || "GET"} ${asText(config.url) || "no URL yet"}`;
  }
  if (type === "db_write") {
    return "Writes step output to workflow_results";
  }
  if (type === "notify") {
    return asText(config.webhookUrl) ? "Webhook notification configured" : "Notification target missing";
  }
  if (type === "conditional_branch") {
    return `${asText(config.field) || "field"} ${asText(config.operator) || "contains"} ${asText(config.value) || "value"}`;
  }
  return asText(config.note) || "Approval required before continuing";
}

function StepConfigFields({
  type,
  config,
  setConfig,
}: {
  type: StepType;
  config: Record<string, unknown>;
  setConfig: (config: Record<string, unknown>) => void;
}) {
  function update(key: string, value: unknown) {
    setConfig({ ...config, [key]: value });
  }

  if (type === "llm_call") {
    return (
      <>
        <div className="field">
          <label>Provider</label>
          <select value={asText(config.provider)} onChange={(e) => update("provider", e.target.value)}>
            <option value="gemini">gemini</option>
            <option value="groq">groq</option>
            <option value="openrouter">openrouter</option>
          </select>
        </div>
        <div className="field">
          <label>Model</label>
          <input value={asText(config.model)} onChange={(e) => update("model", e.target.value)} />
        </div>
        <div className="field">
          <label>Prompt</label>
          <textarea value={asText(config.prompt)} onChange={(e) => update("prompt", e.target.value)} />
        </div>
        <div className="field">
          <label>Temperature</label>
          <input
            type="number"
            min="0"
            max="1"
            step="0.1"
            value={asNumber(config.temperature, 0.2)}
            onChange={(e) => update("temperature", Number(e.target.value))}
          />
        </div>
      </>
    );
  }

  if (type === "http_request") {
    return (
      <>
        <div className="field">
          <label>Method</label>
          <select value={asText(config.method) || "GET"} onChange={(e) => update("method", e.target.value)}>
            {["GET", "POST", "PUT", "PATCH", "DELETE"].map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label>URL</label>
          <input value={asText(config.url)} onChange={(e) => update("url", e.target.value)} />
        </div>
        <div className="field">
          <label>Headers JSON</label>
          <textarea
            value={JSON.stringify(config.headers ?? {}, null, 2)}
            onChange={(e) => update("headers", parseJson(e.target.value, {}))}
          />
        </div>
        <div className="field">
          <label>Body JSON</label>
          <textarea
            value={JSON.stringify(config.body ?? null, null, 2)}
            onChange={(e) => update("body", parseJson(e.target.value, null))}
          />
        </div>
      </>
    );
  }

  if (type === "db_write") {
    return (
      <>
        <p className="muted">Writes step output to workflow_results.</p>
        <div className="field">
          <label>Result label</label>
          <input value={asText(config.label)} onChange={(e) => update("label", e.target.value)} />
        </div>
      </>
    );
  }

  if (type === "notify") {
    return (
      <>
        <div className="field">
          <label>Webhook URL</label>
          <input value={asText(config.webhookUrl)} onChange={(e) => update("webhookUrl", e.target.value)} />
        </div>
        <div className="field">
          <label>Message</label>
          <textarea value={asText(config.message)} onChange={(e) => update("message", e.target.value)} />
        </div>
      </>
    );
  }

  if (type === "conditional_branch") {
    return (
      <div className="inline-fields">
        <div className="field">
          <label>Field</label>
          <input value={asText(config.field)} onChange={(e) => update("field", e.target.value)} />
        </div>
        <div className="field">
          <label>Operator</label>
          <select value={asText(config.operator) || "contains"} onChange={(e) => update("operator", e.target.value)}>
            <option value="contains">contains</option>
            <option value="equals">equals</option>
            <option value="exists">exists</option>
          </select>
        </div>
        <div className="field">
          <label>Value</label>
          <input value={asText(config.value)} onChange={(e) => update("value", e.target.value)} />
        </div>
      </div>
    );
  }

  return (
    <div className="field">
      <label>Approval note</label>
      <textarea value={asText(config.note)} onChange={(e) => update("note", e.target.value)} />
    </div>
  );
}

export default function WorkflowBuilderPage() {
  const router = useRouter();
  const routeParams = useParams<{ workflowId: string }>();
  const workflowId = routeParams.workflowId;

  const { currentOrg, isLoading: orgLoading } = useOrg();
  const [workflow, setWorkflow] = useState<WorkflowDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [workflowName, setWorkflowName] = useState("");
  const [workflowDescription, setWorkflowDescription] = useState("");
  const [expandedStepId, setExpandedStepId] = useState<string | null>(null);
  const [editStepName, setEditStepName] = useState("");
  const [editStepType, setEditStepType] = useState<StepType>("llm_call");
  const [editStepConfig, setEditStepConfig] = useState<Record<string, unknown>>({});

  const [newStepName, setNewStepName] = useState("");
  const [newStepType, setNewStepType] = useState<StepType>("llm_call");
  const [newStepConfig, setNewStepConfig] = useState<Record<string, unknown>>(defaultStepConfig("llm_call"));

  const [newTriggerType, setNewTriggerType] = useState<TriggerType>("manual");
  const [triggerJsonById, setTriggerJsonById] = useState<Record<string, string>>({});

  const editable = canEdit(currentOrg?.myRole);
  const availableStepTypes = useMemo(
    () => STEP_TYPES.filter((type) => canManageStep(currentOrg?.myRole, type)),
    [currentOrg?.myRole],
  );
  const availableTriggerTypes = useMemo(
    () => TRIGGER_TYPES.filter((type) => canManageTrigger(currentOrg?.myRole, type)),
    [currentOrg?.myRole],
  );

  const loadWorkflow = useCallback(async () => {
    if (!currentOrg) {
      setWorkflow(null);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const response = await nhost.graphql.request<{ workflows_by_pk: WorkflowDetail | null }>({
        query: WORKFLOW_DETAIL_QUERY,
        variables: { workflowId },
      });
      const row = response.body.data?.workflows_by_pk as WorkflowDetail | null;
      if (!row || row.org_id !== currentOrg.id) {
        setWorkflow(null);
        setError("Workflow not found in the selected organization");
        return;
      }
      setWorkflow(row);
      setWorkflowName(row.name);
      setWorkflowDescription(row.description ?? "");
      setTriggerJsonById(
        Object.fromEntries(row.triggers.map((trigger) => [trigger.id, JSON.stringify(trigger.config ?? {}, null, 2)])),
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load workflow");
    } finally {
      setIsLoading(false);
    }
  }, [currentOrg, workflowId]);

  useEffect(() => {
    loadWorkflow();
  }, [loadWorkflow]);

  function openStep(step: WorkflowStep) {
    setExpandedStepId(expandedStepId === step.id ? null : step.id);
    setEditStepName(step.name);
    setEditStepType(step.type);
    setEditStepConfig(step.config ?? defaultStepConfig(step.type));
  }

  function changeNewStepType(type: StepType) {
    setNewStepType(type);
    setNewStepConfig(defaultStepConfig(type));
  }

  function changeEditStepType(type: StepType) {
    setEditStepType(type);
    setEditStepConfig(defaultStepConfig(type));
  }

  async function saveWorkflow(e: FormEvent) {
    e.preventDefault();
    if (!workflow) return;
    try {
      await nhost.graphql.request({
        query: UPDATE_WORKFLOW_MUTATION,
        variables: {
          workflowId: workflow.id,
          name: workflowName.trim(),
          description: workflowDescription.trim() || null,
          active: workflow.active,
        },
      });
      await loadWorkflow();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update workflow");
    }
  }

  async function toggleWorkflowActive() {
    if (!workflow) return;
    try {
      await nhost.graphql.request({
        query: UPDATE_WORKFLOW_MUTATION,
        variables: {
          workflowId: workflow.id,
          name: workflow.name,
          description: workflow.description,
          active: !workflow.active,
        },
      });
      await loadWorkflow();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update workflow");
    }
  }

  async function deleteWorkflow() {
    if (!workflow || !confirm("Delete this workflow and all of its steps/triggers?")) return;
    try {
      await nhost.graphql.request({
        query: DELETE_WORKFLOW_MUTATION,
        variables: { workflowId: workflow.id },
      });
      router.push("/workflows");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete workflow");
    }
  }

  async function createStep(e: FormEvent) {
    e.preventDefault();
    if (!workflow || !canManageStep(currentOrg?.myRole, newStepType)) return;
    try {
      const nextOrder = (workflow.steps.at(-1)?.step_order ?? 0) + 1;
      await nhost.graphql.request({
        query: CREATE_STEP_MUTATION,
        variables: {
          workflowId: workflow.id,
          stepOrder: nextOrder,
          name: newStepName.trim(),
          type: newStepType,
          config: newStepConfig,
        },
      });
      setNewStepName("");
      changeNewStepType(availableStepTypes[0] ?? "llm_call");
      await loadWorkflow();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create step");
    }
  }

  async function updateStep(step: WorkflowStep) {
    if (!canManageStep(currentOrg?.myRole, step.type) || !canManageStep(currentOrg?.myRole, editStepType)) return;
    try {
      await nhost.graphql.request({
        query: UPDATE_STEP_MUTATION,
        variables: {
          stepId: step.id,
          name: editStepName.trim(),
          type: editStepType,
          config: editStepConfig,
        },
      });
      await loadWorkflow();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update step");
    }
  }

  async function deleteStep(step: WorkflowStep) {
    if (!canManageStep(currentOrg?.myRole, step.type) || !confirm("Delete this step?")) return;
    try {
      await nhost.graphql.request({ query: DELETE_STEP_MUTATION, variables: { stepId: step.id } });
      await loadWorkflow();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete step");
    }
  }

  async function moveStep(index: number, direction: -1 | 1) {
    if (!workflow) return;
    const first = workflow.steps[index];
    const second = workflow.steps[index + direction];
    if (!first || !second || !canManageStep(currentOrg?.myRole, first.type) || !canManageStep(currentOrg?.myRole, second.type)) return;
    try {
      await nhost.graphql.request({
        query: REORDER_STEPS_MUTATION,
        variables: {
          firstId: first.id,
          firstOrder: first.step_order,
          secondId: second.id,
          secondOrder: second.step_order,
          tempOrder: -Math.floor(Date.now() / 1000),
        },
      });
      await loadWorkflow();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not reorder steps");
    }
  }

  async function createTrigger(e: FormEvent) {
    e.preventDefault();
    if (!workflow || !canManageTrigger(currentOrg?.myRole, newTriggerType)) return;
    try {
      await nhost.graphql.request({
        query: CREATE_TRIGGER_MUTATION,
        variables: {
          workflowId: workflow.id,
          triggerType: newTriggerType,
          config: defaultTriggerConfig(newTriggerType),
        },
      });
      await loadWorkflow();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create trigger");
    }
  }

  async function updateTrigger(trigger: WorkflowTrigger, active = trigger.active) {
    if (!canManageTrigger(currentOrg?.myRole, trigger.trigger_type)) return;
    try {
      await nhost.graphql.request({
        query: UPDATE_TRIGGER_MUTATION,
        variables: {
          triggerId: trigger.id,
          config: parseJson(triggerJsonById[trigger.id] ?? "{}", {}),
          active,
        },
      });
      await loadWorkflow();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update trigger");
    }
  }

  async function deleteTrigger(trigger: WorkflowTrigger) {
    if (!canManageTrigger(currentOrg?.myRole, trigger.trigger_type) || !confirm("Delete this trigger?")) return;
    try {
      await nhost.graphql.request({ query: DELETE_TRIGGER_MUTATION, variables: { triggerId: trigger.id } });
      await loadWorkflow();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete trigger");
    }
  }

  if (orgLoading || isLoading) {
    return (
      <main className="page">
        <p className="muted">Loading...</p>
      </main>
    );
  }

  if (!currentOrg) {
    return (
      <main className="page">
        <p className="muted">
          You&apos;re not in an organization yet. <Link href="/organizations/new">Create one</Link>.
        </p>
      </main>
    );
  }

  if (!workflow) {
    return (
      <main className="page">
        <p>
          <Link href="/workflows">&larr; Back to workflows</Link>
        </p>
        {error ? <p className="error-text">{error}</p> : <p className="muted">Workflow not found.</p>}
      </main>
    );
  }

  return (
    <main className="page page-wide">
      <p>
        <Link href="/workflows">&larr; Back to workflows</Link>
      </p>

      {error && <p className="error-text">{error}</p>}

      <div className="card" style={{ marginBottom: 24 }}>
        {editable ? (
          <form onSubmit={saveWorkflow}>
            <div className="inline-fields">
              <div className="field">
                <label>Name</label>
                <input value={workflowName} onChange={(e) => setWorkflowName(e.target.value)} />
              </div>
              <div className="field">
                <label>Description</label>
                <input value={workflowDescription} onChange={(e) => setWorkflowDescription(e.target.value)} />
              </div>
            </div>
            <div className="button-row">
              <button type="submit" disabled={!workflowName.trim()}>
                Save workflow
              </button>
              <button type="button" className="secondary" onClick={toggleWorkflowActive}>
                {workflow.active ? "Pause" : "Activate"}
              </button>
              {currentOrg.myRole === "owner" && (
                <button type="button" className="secondary danger" onClick={deleteWorkflow}>
                  Delete workflow
                </button>
              )}
              <button type="button" disabled title="Workflow execution coming in a later phase">
                Run
              </button>
            </div>
          </form>
        ) : (
          <>
            <h1 style={{ marginTop: 0 }}>{workflow.name}</h1>
            {workflow.description && <p>{workflow.description}</p>}
            <p className="muted">Viewer access · workflow execution coming in a later phase</p>
          </>
        )}
      </div>

      <section style={{ marginBottom: 24 }}>
        <h2>Steps</h2>
        {workflow.steps.length === 0 ? (
          <div className="card">
            <p style={{ margin: 0 }}>No steps yet.</p>
          </div>
        ) : (
          <div className="stack">
            {workflow.steps.map((step, index) => {
              const stepEditable = canManageStep(currentOrg.myRole, step.type);
              return (
                <div className="card" key={step.id}>
                  <button className="plain-row" type="button" onClick={() => openStep(step)}>
                    <span>
                      <strong>
                        {step.step_order}. {step.name}
                      </strong>
                      <span className="muted"> · {step.type}</span>
                      <div className="muted">{summarizeConfig(step.type, step.config ?? {})}</div>
                    </span>
                  </button>

                  {expandedStepId === step.id && (
                    <div style={{ marginTop: 16 }}>
                      {stepEditable ? (
                        <>
                          <div className="inline-fields">
                            <div className="field">
                              <label>Name</label>
                              <input value={editStepName} onChange={(e) => setEditStepName(e.target.value)} />
                            </div>
                            <div className="field">
                              <label>Type</label>
                              <select value={editStepType} onChange={(e) => changeEditStepType(e.target.value as StepType)}>
                                {availableStepTypes.map((type) => (
                                  <option key={type} value={type}>
                                    {type}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <StepConfigFields type={editStepType} config={editStepConfig} setConfig={setEditStepConfig} />
                          <div className="button-row">
                            <button type="button" onClick={() => updateStep(step)} disabled={!editStepName.trim()}>
                              Save step
                            </button>
                            <button type="button" className="secondary" onClick={() => moveStep(index, -1)} disabled={index === 0}>
                              Move up
                            </button>
                            <button
                              type="button"
                              className="secondary"
                              onClick={() => moveStep(index, 1)}
                              disabled={index === workflow.steps.length - 1}
                            >
                              Move down
                            </button>
                            <button type="button" className="secondary danger" onClick={() => deleteStep(step)}>
                              Delete
                            </button>
                          </div>
                        </>
                      ) : (
                        <p className="muted">
                          Your role can view this step but cannot edit this step type.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      {editable && availableStepTypes.length > 0 && (
        <div className="card" style={{ marginBottom: 24 }}>
          <h3 style={{ marginTop: 0 }}>Add step</h3>
          <form onSubmit={createStep}>
            <div className="inline-fields">
              <div className="field">
                <label>Name</label>
                <input value={newStepName} onChange={(e) => setNewStepName(e.target.value)} />
              </div>
              <div className="field">
                <label>Type</label>
                <select value={newStepType} onChange={(e) => changeNewStepType(e.target.value as StepType)}>
                  {availableStepTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <StepConfigFields type={newStepType} config={newStepConfig} setConfig={setNewStepConfig} />
            <button type="submit" disabled={!newStepName.trim()}>
              Add step
            </button>
          </form>
        </div>
      )}

      <section>
        <h2>Triggers</h2>
        <div className="stack" style={{ marginBottom: 16 }}>
          {workflow.triggers.length === 0 ? (
            <div className="card">
              <p style={{ margin: 0 }}>No triggers yet.</p>
            </div>
          ) : (
            workflow.triggers.map((trigger) => {
              const triggerEditable = canManageTrigger(currentOrg.myRole, trigger.trigger_type);
              return (
                <div className="card" key={trigger.id}>
                  <div className="row-between">
                    <strong>{trigger.trigger_type}</strong>
                    <span>{trigger.active ? "Active" : "Paused"}</span>
                  </div>
                  {trigger.trigger_type === "webhook" && (
                    <p className="muted">Token: {asText(trigger.config?.token)}</p>
                  )}
                  {triggerEditable ? (
                    <>
                      <div className="field">
                        <label>Config JSON</label>
                        <textarea
                          value={triggerJsonById[trigger.id] ?? "{}"}
                          onChange={(e) =>
                            setTriggerJsonById({ ...triggerJsonById, [trigger.id]: e.target.value })
                          }
                        />
                      </div>
                      <div className="button-row">
                        <button type="button" onClick={() => updateTrigger(trigger)}>
                          Save trigger
                        </button>
                        <button type="button" className="secondary" onClick={() => updateTrigger(trigger, !trigger.active)}>
                          {trigger.active ? "Pause" : "Activate"}
                        </button>
                        <button type="button" className="secondary danger" onClick={() => deleteTrigger(trigger)}>
                          Delete
                        </button>
                      </div>
                    </>
                  ) : (
                    <p className="muted">Your role can view this trigger but cannot edit it.</p>
                  )}
                </div>
              );
            })
          )}
        </div>

        {editable && availableTriggerTypes.length > 0 && (
          <div className="card">
            <h3 style={{ marginTop: 0 }}>Add trigger</h3>
            <form onSubmit={createTrigger}>
              <div className="field">
                <label>Trigger type</label>
                <select value={newTriggerType} onChange={(e) => setNewTriggerType(e.target.value as TriggerType)}>
                  {availableTriggerTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit">Add trigger</button>
            </form>
          </div>
        )}
      </section>
    </main>
  );
}
