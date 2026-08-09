import { createClient } from "@nhost/nhost-js";

// NOTE: @nhost/react and @nhost/nextjs are deprecated in favor of this
// single isomorphic @nhost/nhost-js client (v4+). There's no built-in
// React provider anymore — see lib/auth-context.tsx for the small context
// we build around nhost.auth.onAuthStateChanged() to get reactive
// sign-in/sign-out state in components.
//
// These are PUBLIC values (safe to ship to the browser): they only
// identify *which* Nhost project to talk to, not a secret. Real secrets
// (LLM_API_KEY, admin secrets, etc.) never get a NEXT_PUBLIC_ prefix and
// never reach client code.
export const nhost = createClient({
  subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN ?? "",
  region: process.env.NEXT_PUBLIC_NHOST_REGION ?? "",
});
