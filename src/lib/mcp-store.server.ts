import { getSql } from "@/lib/db";
import {
  DEFAULT_SETTINGS,
  type BusinessSettings,
  type Client,
  type InvoicePaymentMethods,
} from "@/lib/types";
import { uid } from "@/lib/utils";

export const STUDIO_CURRENCIES = ["USD", "EUR", "GBP", "INR", "AUD", "CAD", "SGD"] as const;

/** Server-side studio settings for a user (the MCP surface). */
export async function getStudioSettings(userId: string): Promise<BusinessSettings> {
  const sql = await getSql();
  const rows = await sql<{ data: BusinessSettings }>`
    select "data" from "studio_settings" where "userId" = ${userId} limit 1
  `;
  const stored = rows[0]?.data ?? {};
  return {
    ...DEFAULT_SETTINGS,
    ...stored,
    paymentMethods: { ...(DEFAULT_SETTINGS.paymentMethods ?? {}), ...(stored.paymentMethods ?? {}) },
  };
}

export type StudioSettingsPatch = Partial<
  Pick<
    BusinessSettings,
    "name" | "email" | "address" | "logoUrl" | "defaultCurrency" | "defaultTaxRate" | "reminderDays"
  >
> & { paymentMethods?: Partial<InvoicePaymentMethods> };

/** Merge a patch into the user's server-side studio settings. */
export async function updateStudioSettings(
  userId: string,
  patch: StudioSettingsPatch,
): Promise<BusinessSettings> {
  const current = await getStudioSettings(userId);
  const next: BusinessSettings = {
    ...current,
    ...Object.fromEntries(Object.entries(patch).filter(([, value]) => value !== undefined)),
    paymentMethods: { ...(current.paymentMethods ?? {}), ...(patch.paymentMethods ?? {}) },
  };
  const sql = await getSql();
  await sql`
    insert into "studio_settings" ("userId", "data", "updatedAt")
    values (${userId}, ${JSON.stringify(next)}::jsonb, CURRENT_TIMESTAMP)
    on conflict ("userId") do update
    set "data" = excluded."data", "updatedAt" = CURRENT_TIMESTAMP
  `;
  return next;
}

/** Mask secrets before studio settings leave the server. */
export function publicStudioSettings(settings: BusinessSettings): BusinessSettings {
  const paymentMethods = { ...(settings.paymentMethods ?? {}) };
  if (paymentMethods.razorpayKeySecret) paymentMethods.razorpayKeySecret = "••••••";
  return { ...settings, paymentMethods };
}

/** Server-side clients for a user. */
export async function listServerClients(userId: string): Promise<Client[]> {
  const sql = await getSql();
  const rows = await sql<Client>`
    select "id", "name", "email", "createdAt" from "mcp_clients"
    where "userId" = ${userId} order by "createdAt" desc
  `;
  return rows;
}

/** Create (or update-by-email) a server-side client for a user. */
export async function saveServerClient(
  userId: string,
  input: { name: string; email?: string },
): Promise<Client> {
  const name = input.name.trim();
  const email = (input.email ?? "").trim();
  if (!name) throw new Error("Client name is required.");
  const sql = await getSql();
  const existing = email
    ? await sql<Client>`
        select "id", "name", "email", "createdAt" from "mcp_clients"
        where "userId" = ${userId} and lower("email") = lower(${email}) limit 1
      `
    : [];
  if (existing[0]) {
    const row = existing[0];
    return { ...row, name };
  }
  const created = await sql<Client>`
    insert into "mcp_clients" ("id", "userId", "name", "email")
    values (${uid()}, ${userId}, ${name}, ${email})
    returning "id", "name", "email", "createdAt"
  `;
  return created[0];
}
