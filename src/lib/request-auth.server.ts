import { requireFreeTierUserId, requireUserId } from "@/lib/auth/verify.server";

export async function getRequestUserId(): Promise<string | null> {
  try {
    const userId = await requireUserId();
    return userId;
  } catch {
    return null;
  }
}

export async function requireRequestUserId(): Promise<string> {
  return requireUserId();
}

/**
 * Free-tier identity for invoice flows: verified session id when signed in,
 * shared dev id when logged out without a real database. Never throws a
 * sign-in gate for the local free flow.
 */
export async function getFreeTierUserId(): Promise<string | null> {
  try {
    return await requireFreeTierUserId();
  } catch {
    return null;
  }
}

/** Free-tier identity for invoice flows — see `requireFreeTierUserId`. */
export async function requireFreeTierRequestUserId(): Promise<string> {
  return requireFreeTierUserId();
}