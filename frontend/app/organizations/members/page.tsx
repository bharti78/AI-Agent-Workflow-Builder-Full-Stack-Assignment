"use client";

import Link from "next/link";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import { nhost } from "@/lib/nhost";
import { useOrg } from "@/lib/org-context";
import { UPDATE_MEMBER_ROLE_MUTATION, REMOVE_MEMBER_MUTATION } from "@/graphql/organizations";

interface Member {
  id: string;
  userId: string;
  role: "owner" | "editor" | "viewer";
  email: string | null;
  displayName: string | null;
}

export default function MembersPage() {
  const { currentOrg, isLoading: orgLoading } = useOrg();
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<"editor" | "viewer">("editor");
  const [isInviting, setIsInviting] = useState(false);
  const [inviteError, setInviteError] = useState<string | null>(null);

  const loadMembers = useCallback(async () => {
    if (!currentOrg) return;
    setIsLoading(true);
    setError(null);
    try {
      const { body } = await nhost.functions.fetch<{ members?: Member[]; error?: string }>(
        `/organizations/members?orgId=${encodeURIComponent(currentOrg.id)}`,
        { method: "GET" },
      );
      setMembers(body.members ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load members");
    } finally {
      setIsLoading(false);
    }
  }, [currentOrg]);

  useEffect(() => {
    loadMembers();
  }, [loadMembers]);

  async function handleInvite(e: FormEvent) {
    e.preventDefault();
    if (!currentOrg) return;
    setInviteError(null);
    setIsInviting(true);
    try {
      await nhost.functions.fetch("/organizations/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orgId: currentOrg.id, email: inviteEmail, role: inviteRole }),
      });
      setInviteEmail("");
      await loadMembers();
    } catch (err) {
      setInviteError(err instanceof Error ? err.message : "Could not invite member");
    } finally {
      setIsInviting(false);
    }
  }

  async function handleRoleChange(memberId: string, role: string) {
    await nhost.graphql.request({
      query: UPDATE_MEMBER_ROLE_MUTATION,
      variables: { memberId, role },
    });
    await loadMembers();
  }

  async function handleRemove(memberId: string) {
    if (!confirm("Remove this member from the organization?")) return;
    await nhost.graphql.request({
      query: REMOVE_MEMBER_MUTATION,
      variables: { memberId },
    });
    await loadMembers();
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

  const isOwner = currentOrg.myRole === "owner";

  return (
    <main className="page">
      <p>
        <Link href="/">&larr; Back</Link>
      </p>
      <h1>{currentOrg.name} — Members</h1>
      {error && <p className="error-text">{error}</p>}

      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 24 }}>
        <thead>
          <tr style={{ textAlign: "left", borderBottom: "1px solid var(--border)" }}>
            <th style={{ padding: "8px 4px" }}>Member</th>
            <th style={{ padding: "8px 4px" }}>Role</th>
            {isOwner && <th style={{ padding: "8px 4px" }}></th>}
          </tr>
        </thead>
        <tbody>
          {members.map((m) => (
            <tr key={m.id} style={{ borderBottom: "1px solid var(--border)" }}>
              <td style={{ padding: "8px 4px" }}>
                {m.displayName || m.email || m.userId}
              </td>
              <td style={{ padding: "8px 4px" }}>
                {isOwner ? (
                  <select
                    value={m.role}
                    onChange={(e) => handleRoleChange(m.id, e.target.value)}
                  >
                    <option value="owner">owner</option>
                    <option value="editor">editor</option>
                    <option value="viewer">viewer</option>
                  </select>
                ) : (
                  m.role
                )}
              </td>
              {isOwner && (
                <td style={{ padding: "8px 4px" }}>
                  <button
                    className="secondary"
                    onClick={() => handleRemove(m.id)}
                    style={{ fontSize: 13, padding: "4px 10px" }}
                  >
                    Remove
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {isOwner && (
        <div className="card">
          <h3 style={{ marginTop: 0 }}>Invite a member</h3>
          <p className="muted">
            They need an existing account (ask them to sign up first).
          </p>
          <form onSubmit={handleInvite}>
            <div className="field">
              <label htmlFor="inviteEmail">Email</label>
              <input
                id="inviteEmail"
                type="email"
                required
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="inviteRole">Role</label>
              <select
                id="inviteRole"
                value={inviteRole}
                onChange={(e) => setInviteRole(e.target.value as "editor" | "viewer")}
              >
                <option value="editor">editor</option>
                <option value="viewer">viewer</option>
              </select>
            </div>
            {inviteError && <p className="error-text">{inviteError}</p>}
            <button type="submit" disabled={isInviting}>
              {isInviting ? "Inviting..." : "Invite"}
            </button>
          </form>
        </div>
      )}
    </main>
  );
}
