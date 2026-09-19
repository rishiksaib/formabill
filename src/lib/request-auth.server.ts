import { auth } from "@/lib/auth/server";

export async function getRequestUserId(request: Request): Promise<string | null> {
  const session = await auth.api.getSession({ headers: request.headers });
  return session?.user?.id ?? null;
}

export async function requireRequestUserId(request: Request): Promise<string> {
  const userId = await getRequestUserId(request);
  if (!userId) throw new Error("Sign in required to manage invoices.");
  return userId;
}