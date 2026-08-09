import type { Request, Response } from "express";
import jwt from "jsonwebtoken";

// ---------------------------------------------------------------------------
// Why this exists as a Function instead of a plain Hasura mutation:
//
// Phase 2's permissions deliberately give role "user" NO insert permission
// on `organizations`, and INSERT on `org_members` requires the acting user
// to already be an `owner` of that org (see public_org_members.yaml). Both
// are correct, tight rules — but they create a chicken-and-egg problem for
// the very first member of a brand new org: nobody is an owner yet.
//
// This function is the one deliberate, narrow exception. It runs with the
// admin secret (server-side only, never exposed to the browser) and does
// exactly two things inside a single transaction: create the org, and
// insert its creator as `owner`. Nothing else bypasses Layer 1 or Layer 2 —
// every other operation in this app still goes through Hasura's normal
// permission-checked mutations.
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

const CREATE_ORG_MUTATION = `
  mutation CreateOrganization($name: String!, $userId: uuid!) {
    insert_organizations_one(object: {
      name: $name
      members: { data: [{ user_id: $userId, role: "owner" }] }
    }) {
      id
      name
      quota_allowed
      quota_used
      created_at
    }
  }
`;

export default async function handler(req: Request, res: Response) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const userId = getUserIdFromRequest(req);

    const name = typeof req.body?.name === "string" ? req.body.name.trim() : "";
    if (!name || name.length > 200) {
      throw new HttpError(400, "name is required (1-200 characters)");
    }

    const data = await adminGraphql<{
      insert_organizations_one: { id: string; name: string };
    }>(CREATE_ORG_MUTATION, { name, userId });

    return res.status(201).json({ organization: data.insert_organizations_one });
  } catch (err) {
    if (err instanceof HttpError) {
      return res.status(err.status).json({ error: err.message });
    }
    console.error("organizations/create failed:", err);
    return res.status(500).json({ error: "Could not create organization" });
  }
}
