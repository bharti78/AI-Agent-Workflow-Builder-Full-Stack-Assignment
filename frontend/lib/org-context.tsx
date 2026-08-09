"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { nhost } from "./nhost";
import { useAuth } from "./auth-context";
import { MY_ORGANIZATIONS_QUERY, type OrganizationRow } from "@/graphql/organizations";

export interface OrgSummary {
  id: string;
  name: string;
  quotaAllowed: number;
  quotaUsed: number;
  myRole: "owner" | "editor" | "viewer";
}

interface OrgContextValue {
  isLoading: boolean;
  organizations: OrgSummary[];
  currentOrgId: string | null;
  currentOrg: OrgSummary | null;
  setCurrentOrgId: (id: string) => void;
  refetch: () => Promise<void>;
}

const STORAGE_KEY = "aiwb:currentOrgId";

const OrgContext = createContext<OrgContextValue>({
  isLoading: true,
  organizations: [],
  currentOrgId: null,
  currentOrg: null,
  setCurrentOrgId: () => {},
  refetch: async () => {},
});

export function OrgProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated, user } = useAuth();
  const [organizations, setOrganizations] = useState<OrgSummary[]>([]);
  const [currentOrgId, setCurrentOrgIdState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrgs = useCallback(async () => {
    if (!isAuthenticated || !user) {
      setOrganizations([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await nhost.graphql.request({
        query: MY_ORGANIZATIONS_QUERY,
        variables: { userId: user.id },
      });
      const rows = (response.body.data?.organizations ?? []) as OrganizationRow[];
      const summaries: OrgSummary[] = rows
        .filter((row) => row.members.length > 0)
        .map((row) => ({
          id: row.id,
          name: row.name,
          quotaAllowed: row.quota_allowed,
          quotaUsed: row.quota_used,
          myRole: row.members[0].role,
        }));
      setOrganizations(summaries);

      // Keep the selected org valid: restore from storage if it's still
      // one of the user's orgs, otherwise fall back to the first one.
      const stored =
        typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
      const stillValid = summaries.some((o) => o.id === stored);
      const nextId = stillValid ? stored : (summaries[0]?.id ?? null);
      setCurrentOrgIdState(nextId);
      if (nextId && typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, nextId);
      }
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    fetchOrgs();
  }, [fetchOrgs]);

  const setCurrentOrgId = useCallback((id: string) => {
    setCurrentOrgIdState(id);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, id);
    }
  }, []);

  const currentOrg = useMemo(
    () => organizations.find((o) => o.id === currentOrgId) ?? null,
    [organizations, currentOrgId],
  );

  const value: OrgContextValue = {
    isLoading,
    organizations,
    currentOrgId,
    currentOrg,
    setCurrentOrgId,
    refetch: fetchOrgs,
  };

  return <OrgContext.Provider value={value}>{children}</OrgContext.Provider>;
}

export function useOrg() {
  return useContext(OrgContext);
}
