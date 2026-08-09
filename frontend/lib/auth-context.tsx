"use client";

import type { StoredSession } from "@nhost/nhost-js/session";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { nhost } from "./nhost";

interface AuthContextValue {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: StoredSession["user"] | null;
  session: StoredSession | null;
}

const AuthContext = createContext<AuthContextValue>({
  isLoading: true,
  isAuthenticated: false,
  user: null,
  session: null,
});

/**
 * Wraps the app and keeps React state in sync with Nhost's auth session.
 *
 * Section 6 of the spec requires the frontend to "know the authenticated
 * user" and for that identity to reach Hasura via session variables. The
 * second half is automatic — Nhost's Auth service issues a JWT with
 * x-hasura-user-id / x-hasura-default-role claims out of the box, and
 * nhost.graphql.request() attaches it to every request once signed in.
 * This context is purely the first half: giving React components a
 * reactive `isAuthenticated` / `user` to render against.
 *
 * IMPORTANT: @nhost/nhost-js v4 does NOT have nhost.auth.onAuthStateChanged
 * — that method belongs to the older, now-deprecated SDK generation and
 * will throw "is not a function" if called here. The current API is:
 *   - nhost.getUserSession() — synchronous read of the current session
 *   - nhost.sessionStorage.onChange(cb) — fires on sign-in/out/refresh,
 *     including cross-tab (another tab signing out updates this one too)
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<StoredSession | null>(null);

  useEffect(() => {
    // Initial read — session storage is populated synchronously on
    // client init if a session was already persisted (e.g. page refresh).
    setSession(nhost.getUserSession());
    setIsLoading(false);

    const unsubscribe = nhost.sessionStorage.onChange((newSession) => {
      setSession(newSession);
    });

    return unsubscribe;
  }, []);

  const value: AuthContextValue = {
    isLoading,
    isAuthenticated: !!session,
    user: session?.user ?? null,
    session,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
