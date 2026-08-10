import type { Request, Response } from "express";
import jwt from "jsonwebtoken";

// ---------------------------------------------------------------------------
// Why this needs a Function rather than a plain Hasura mutation:
//
// 1. Inviting "by email" requires looking up a user in auth.users, which
//    Phase 2 deliberately does not expose to role "user" (see the removed
//    relationships note in public_org_members.yaml / public_workflows.yaml).
//    Doing that lookup here, server-side with the admin secret, keeps that
//    boundary intact — the browser never queries auth.users directly.
// 2. The actual org_members insert IS already permitted by Hasura for an
//    owner (Phase 2), so this function still goes through the same
//    org_members row-level rules — it does not use elevated admin
//    privileges to skip the owner check, it just does the *lookup* as
//    admin and lets Hasura's real permission system authorize the write.
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

const CHECK_OWNER_QUERY = `
  query CheckOwner($orgId: uuid!, $userId: uuid!) {
    org_members(where: { org_id: { _eq: $orgId }, user_id: { _eq: $userId }, role: { _eq: "owner" } }) {
      id
    }
  }
`;

const FIND_USER_QUERY = `
  query FindUserByEmail($email: citext!) {
    auth_users(where: { email: { _eq: $email } }, limit: 1) {
      id
      email
      displayName
    }
  }
`;

const INSERT_MEMBER_MUTATION = `
  mutation InsertMember($orgId: uuid!, $userId: uuid!, $role: String!) {
    insert_org_members_one(object: { org_id: $orgId, user_id: $userId, role: $role }) {
      id
    }
  }
`;

const VALID_ROLES = ["owner", "editor", "viewer"];

export default async function handler(req: Request, res: Response) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const callerId = getUserIdFromRequest(req);

    const orgId = req.body?.orgId;
    const email = typeof req.body?.email === "string" ? req.body.email.trim().toLowerCase() : "";
    const role = req.body?.role;

    if (!orgId || typeof orgId !== "string") {
      throw new HttpError(400, "orgId is required");
    }
    if (!email) {
      throw new HttpError(400, "email is required");
    }
    if (!VALID_ROLES.includes(role)) {
      throw new HttpError(400, `role must be one of ${VALID_ROLES.join(", ")}`);
    }

    // Layer 2-style check, done explicitly in this function's own logic
    // (not just relying on the downstream insert permission), so the error
    // message can be specific rather than a generic GraphQL permission
    // rejection.
    const ownerCheck = await adminGraphql<{ org_members: { id: string }[] }>(
      CHECK_OWNER_QUERY,
      { orgId, userId: callerId },
    );
    if (ownerCheck.org_members.length === 0) {
      throw new HttpError(403, "Only an owner of this organization can invite members");
    }

    const found = await adminGraphql<{
      auth_users: { id: string; email: string; displayName: string }[];
    }>(FIND_USER_QUERY, { email });

    if (found.auth_users.length === 0) {
      throw new HttpError(
        404,
        "No account found for that email. Ask them to sign up first, then invite again.",
      );
    }

    const targetUserId = found.auth_users[0].id;

    await adminGraphql(INSERT_MEMBER_MUTATION, {
      orgId,
      userId: targetUserId,
      role,
    });

    return res.status(201).json({
      member: { userId: targetUserId, email: found.auth_users[0].email, role },
    });
  } catch (err) {
    if (err instanceof HttpError) {
      return res.status(err.status).json({ error: err.message });
    }
    console.error("organizations/invite failed:", err);
    if (err instanceof Error && err.message.includes("Uniqueness violation")) {
      return res.status(409).json({ error: "That person is already a member of this organization" });
    }
    return res.status(500).json({ error: "Could not invite member" });
  }
}