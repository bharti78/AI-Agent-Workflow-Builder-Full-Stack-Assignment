"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { useOrg } from "@/lib/org-context";
import { nhost } from "@/lib/nhost";
import { OrgSwitcher } from "@/components/OrgSwitcher";

export default function HomePage() {
  const { isLoading: authLoading, isAuthenticated, user } = useAuth();
  const { isLoading: orgLoading, organizations, currentOrg } = useOrg();

  if (authLoading) {
    return (
      <main className="page">
        <p className="muted">Loading...</p>
      </main>
    );
  }

  if (!isAuthenticated) {
    return (
      <main className="page">
        <h1>AI Agent Workflow Builder</h1>
        <p className="muted">
          Sign in to view and run your organization&apos;s workflows.
        </p>
        <p>
          <Link href="/sign-in">Sign in</Link> ·{" "}
          <Link href="/sign-up">Create an account</Link>
        </p>
      </main>
    );
  }

  return (
    <main className="page">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 24,
        }}
      >
        <div>
          <h1 style={{ marginBottom: 4 }}>AI Agent Workflow Builder</h1>
          <p className="muted" style={{ margin: 0 }}>
            Signed in as <strong>{user?.email}</strong>
          </p>
        </div>
        <button className="secondary" onClick={() => nhost.auth.signOut({ all: false })}>
          Sign out
        </button>
      </div>

      {orgLoading ? (
        <p className="muted">Loading organizations...</p>
      ) : organizations.length === 0 ? (
        <div className="card">
          <p style={{ marginTop: 0 }}>
            You&apos;re not part of any organization yet.
          </p>
          <Link href="/organizations/new">
            <button>Create your first organization</button>
          </Link>
        </div>
      ) : (
        <div className="card">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <div>
              <strong>{currentOrg?.name}</strong>{" "}
              <span className="muted">— your role: {currentOrg?.myRole}</span>
            </div>
            <OrgSwitcher />
          </div>

          {currentOrg && (
            <p className="muted" style={{ marginBottom: 12 }}>
              Usage: {currentOrg.quotaUsed} / {currentOrg.quotaAllowed} · Remaining:{" "}
              {Math.max(currentOrg.quotaAllowed - currentOrg.quotaUsed, 0)}
            </p>
          )}

          <p>
            <Link href="/workflows">Workflows</Link> ·{" "}
            <Link href="/organizations/members">Manage members</Link> ·{" "}
            <Link href="/organizations/new">New organization</Link>
          </p>

          <p className="muted" style={{ marginTop: 16 }}>
            Build and manage workflow definitions from the Workflows page.
          </p>
        </div>
      )}
    </main>
  );
}
