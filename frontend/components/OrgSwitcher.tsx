"use client";

import { useOrg } from "@/lib/org-context";

export function OrgSwitcher() {
  const { organizations, currentOrgId, setCurrentOrgId } = useOrg();

  if (organizations.length <= 1) {
    return null;
  }

  return (
    <select
      value={currentOrgId ?? ""}
      onChange={(e) => setCurrentOrgId(e.target.value)}
      style={{
        padding: "8px 10px",
        borderRadius: 6,
        border: "1px solid var(--border)",
        fontSize: 14,
      }}
    >
      {organizations.map((org) => (
        <option key={org.id} value={org.id}>
          {org.name} ({org.myRole})
        </option>
      ))}
    </select>
  );
}
