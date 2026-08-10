import type { Request, Response } from "express";
import jwt from "jsonwebtoken";

// ---------------------------------------------------------------------------
// Why this needs a Function rather than a plain Hasura query:
//
// Phase 2 deliberately removed the org_members -> auth.users relationship
// (see public_org_members.yaml) because pushing our own metadata replace
// untracked Nhost's default tracking of auth.users, and the relationship
// wasn't required by the spec. But a real member-management screen does
// need to show *something* more human than a raw UUID. Rather than
// resurrect that relationship (fragile, as we learned), this function does
// the enrichment server-side with the admin secret and returns only the
// safe fields (email, displayName) — auth.users is still never exposed to
// the browser's own GraphQL role.
// ---------------------------------------------------------------------------

class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

function getUserIdFromRequest(req: Request): string {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new HttpError(401, "Missing bearer token");
  }
  const token = authHeader.slice("Bearer ".length);

  let jwtConfig: { key: string; type?: string };
  try {
    jwtConfig = JSON.parse(process.env.NHOST_JWT_SECRET ?? "{}");
  } catch {
    throw new HttpError(500, "Server misconfigured: NHOST_JWT_SECRET");
  }
  if (!jwtConfig.key) {
    throw new HttpError(500, "Server misconfigured: NHOST_JWT_SECRET");
  }

  let decoded: jwt.JwtPayload;
  try {
    decoded = jwt.verify(token, jwtConfig.key, {
      algorithms: [(jwtConfig.type as jwt.Algorithm) ?? "HS256"],
    }) as jwt.JwtPayload;
  } catch {
    throw new HttpError(401, "Invalid or expired token");
  }

  const claims = decoded["https://hasura.io/jwt/claims"];
  const userId = claims?.["x-hasura-user-id"];
  if (!userId || typeof userId !== "string") {
    throw new HttpError(401, "Token missing x-hasura-user-id claim");
  }
  return userId;
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

const CHECK_MEMBERSHIP_QUERY = `
  query CheckMembership($orgId: uuid!, $userId: uuid!) {
    org_members(where: { org_id: { _eq: $orgId }, user_id: { _eq: $userId } }) {
      id
    }
  }
`;

const LIST_MEMBERS_QUERY = `
  query ListMembers($orgId: uuid!) {
    org_members(where: { org_id: { _eq: $orgId } }, order_by: { created_at: asc }) {
      id
      user_id
      role
      created_at
    }
  }
`;

const USERS_BY_ID_QUERY = `
  query UsersById($ids: [uuid!]!) {
    users(where: { id: { _in: $ids } }) {
      id
      email
      displayName
    }
  }
`;

export default async function handler(req: Request, res: Response) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const callerId = getUserIdFromRequest(req);
    const orgId = req.query.orgId;
    if (!orgId || typeof orgId !== "string") {
      throw new HttpError(400, "orgId query parameter is required");
    }

    const membership = await adminGraphql<{ org_members: { id: string }[] }>(
      CHECK_MEMBERSHIP_QUERY,
      { orgId, userId: callerId },
    );
    if (membership.org_members.length === 0) {
      throw new HttpError(403, "You are not a member of this organization");
    }

    const members = await adminGraphql<{
      org_members: { id: string; user_id: string; role: string; created_at: string }[];
    }>(LIST_MEMBERS_QUERY, { orgId });

    const ids = members.org_members.map((m) => m.user_id);
    const users =
      ids.length > 0
        ? await adminGraphql<{
            users: { id: string; email: string; displayName: string }[];
          }>(USERS_BY_ID_QUERY, { ids })
        : { users: [] };

    const usersById = new Map(users.users.map((u) => [u.id, u]));

    const enriched = members.org_members.map((m) => ({
      id: m.id,
      userId: m.user_id,
      role: m.role,
      createdAt: m.created_at,
      email: usersById.get(m.user_id)?.email ?? null,
      displayName: usersById.get(m.user_id)?.displayName ?? null,
    }));

    return res.status(200).json({ members: enriched });
  } catch (err) {
    if (err instanceof HttpError) {
      return res.status(err.status).json({ error: err.message });
    }
    console.error("organizations/members failed:", err);
    // TEMPORARY DEBUG: exposing the real error to diagnose the 500.
    // Revert this to the generic message before considering this done.
    return res.status(500).json({
      error: "Could not list members",
      debug: err instanceof Error ? err.message : String(err),
    });
  }
}