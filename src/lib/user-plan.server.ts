import { getSql } from "@/lib/db";

export async function isProUser(userId: string): Promise<boolean> {
  const sql = await getSql();
  const rows = await sql<{ isPro: boolean }>`select "isPro" from "user" where "id" = ${userId} limit 1`;
  return Boolean(rows[0]?.isPro);
}