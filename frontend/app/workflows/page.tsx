"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import { nhost } from "@/lib/nhost";
import { useOrg } from "@/lib/org-context";
import {
  CREATE_WORKFLOW_MUTATION,
  UPDATE_WORKFLOW_MUTATION,
  WORKFLOWS_FOR_ORG_QUERY,
  type WorkflowListRow,
} from "@/graphql/workflows";

function canEdit(role: string | undefined) {
  return role === "owner" || role === "editor";
}

export default function WorkflowsPage() {
  const router = useRouter();
  const { currentOrg, isLoading: orgLoading } = useOrg();
  const [workflows, setWorkflows] = useState<WorkflowListRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);

  const loadWorkflows = useCallback(async () => {
    if (!currentOrg) {
      setWorkflows([]);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const response = await nhost.graphql.request<{ workflows: WorkflowListRow[] }>({
        query: WORKFLOWS_FOR_ORG_QUERY,
        variables: { orgId: currentOrg.id },
      });
      setWorkflows((response.body.data?.workflows ?? []) as WorkflowListRow[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load workflows");
    } finally {
      setIsLoading(false);
    }
  }, [currentOrg]);

  useEffect(() => {
    loadWorkflows();
  }, [loadWorkflows]);

  async function handleCreate(e: FormEvent) {
    e.preventDefault();
    if (!currentOrg) return;
    setIsCreating(true);
    setError(null);
    try {
      const response = await nhost.graphql.request<{
        insert_workflows_one: { id: string; name: string } | null;
      }>({
        query: CREATE_WORKFLOW_MUTATION,
        variables: {
          orgId: currentOrg.id,
          name: name.trim(),
          description: description.trim() || null,
        },
      });
      const id = response.body.data?.insert_workflows_one?.id as string | undefined;
      if (!id) throw new Error("Workflow was created but no id was returned");
      router.push(`/workflows/${id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create workflow");
    } finally {
      setIsCreating(false);
    }
  }

  async function toggleActive(workflow: WorkflowListRow) {
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
      await loadWorkflows();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update workflow");
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
          You&apos;re not in an organization yet.{" "}
          <Link href="/organizations/new">Create one</Link>.
        </p>
      </main>
    );
  }

  const editable = canEdit(currentOrg.myRole);

  return (
    <main className="page page-wide">
      <p>
        <Link href="/">&larr; Back</Link>
      </p>
      <div className="page-heading">
        <div>
          <h1>Workflows</h1>
          <p className="muted">
            {currentOrg.name} &middot; your role: {currentOrg.myRole}
          </p>
        </div>
      </div>

      {error && <p className="error-text">{error}</p>}

      {editable && (
        <div className="card" style={{ marginBottom: 24 }}>
          <h3 style={{ marginTop: 0 }}>New workflow</h3>
          <form onSubmit={handleCreate}>
            <div className="field">
              <label htmlFor="workflowName">Name</label>
              <input
                id="workflowName"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="workflowDescription">Description</label>
              <textarea
                id="workflowDescription"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <button type="submit" disabled={isCreating || !name.trim()}>
              {isCreating ? "Creating..." : "Create workflow"}
            </button>
          </form>
        </div>
      )}

      {workflows.length === 0 ? (
        <div className="card">
          <p style={{ margin: 0 }}>
            No workflows yet{editable ? ". Create one above to start building." : "."}
          </p>
        </div>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Steps</th>
              <th>Triggers</th>
              <th>Latest run</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {workflows.map((workflow) => (
              <tr key={workflow.id}>
                <td>
                  <strong>{workflow.name}</strong>
                  {workflow.description && (
                    <div className="muted">{workflow.description}</div>
                  )}
                </td>
                <td>
                  {editable ? (
                    <button
                      className="secondary compact"
                      onClick={() => toggleActive(workflow)}
                    >
                      {workflow.active ? "Active" : "Paused"}
                    </button>
                  ) : (
                    <span>{workflow.active ? "Active" : "Paused"}</span>
                  )}
                </td>
                <td>{workflow.steps.length}</td>
                <td>{workflow.triggers.length}</td>
                <td>{workflow.runs[0]?.status ?? "No runs yet"}</td>
                <td style={{ textAlign: "right" }}>
                  <Link href={`/workflows/${workflow.id}`}>Open builder</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
