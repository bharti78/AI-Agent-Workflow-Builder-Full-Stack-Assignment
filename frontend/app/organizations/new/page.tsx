"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { nhost } from "@/lib/nhost";
import { useOrg } from "@/lib/org-context";

export default function NewOrganizationPage() {
  const router = useRouter();
  const { setCurrentOrgId, refetch } = useOrg();
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await nhost.functions.fetch("/organizations/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      const body = response.body as { organization?: { id: string }; error?: string };

      if (!response.ok) {
        throw new Error(body.error ?? "Could not create organization");
      }

      await refetch();
      if (body.organization) {
        setCurrentOrgId(body.organization.id);
      }
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create organization");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="page">
      <h1>Create an organization</h1>
      <p className="muted">
        You&apos;ll be its first owner, with full access to manage members,
        workflows, and triggers.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="name">Organization name</label>
          <input
            id="name"
            type="text"
            required
            maxLength={200}
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
        </div>
        {error && <p className="error-text">{error}</p>}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create organization"}
        </button>
      </form>
    </main>
  );
}
