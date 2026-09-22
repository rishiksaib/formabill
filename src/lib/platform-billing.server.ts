import { createHmac, timingSafeEqual } from "node:crypto";
import { env } from "@/lib/env.server";
import { appBaseUrl } from "@/lib/razorpay.server";

export type PlatformCheckout =
  | {
      configured: true;
      method: "modal";
      orderId: string;
      /** Public Key ID only — the secret never leaves the server. */
      keyId: string;
      amount: number;
      currency: string;
      plan: ProPlan;
    }
  | {
      configured: true;
      method: "link";
      id?: string;
      shortUrl?: string;
      plan: ProPlan;
    }
  | { configured: false; plan: ProPlan; message?: string };

/** Pro subscription plans, billed to FormaBill (platform revenue). Amounts in USD cents. */
export const PRO_PLANS = {
  pro_monthly: { amount: 1100, label: "$11/mo", description: "FormaBill Pro — monthly subscription" },
  pro_yearly: { amount: 9900, label: "$99/yr", description: "FormaBill Pro — yearly subscription" },
} as const;

export type ProPlan = keyof typeof PRO_PLANS;

export function isProPlan(value: unknown): value is ProPlan {
  return value === "pro_monthly" || value === "pro_yearly";
}

function platformCredentials() {
  const keyId = env("RAZORPAY_PLATFORM_KEY_ID");
  const keySecret = env("RAZORPAY_PLATFORM_KEY_SECRET");
  return keyId && keySecret ? { keyId, keySecret } : null;
}

export function platformBillingConfigured(): boolean {
  return platformCredentials() !== null;
}

/**
 * Amounts are USD cents (1100 = $11.00, 9900 = $99.00) — Razorpay's smallest
 * unit for USD, mirroring paise for INR. Receipts tie the order to the buyer.
 *
 * Razorpay rejects receipts longer than 40 chars, so this stays short by
 * construction (`pro_m_<8-char-id>_<time36>` ≈ 23 chars): no emails, no full
 * UUIDs, no long plan names. Clamped defensively — never sent over 40.
 */
export function proReceipt(userId: string, plan: ProPlan): string {
  const tag = plan === "pro_yearly" ? "pro_y" : "pro_m";
  const shortId = userId.replace(/[^A-Za-z0-9]/g, "").slice(0, 8) || "user";
  const receipt = `${tag}_${shortId}_${Date.now().toString(36)}`;
  if (receipt.length > 40) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[pro] receipt clamped: ${receipt.length} chars`);
    }
    return receipt.slice(0, 40);
  }
  return receipt;
}

function platformAuthHeader(): {
  credentials: { keyId: string; keySecret: string };
  auth: string;
} | null {
  const credentials = platformCredentials();
  if (!credentials) return null;
  return {
    credentials,
    auth: `Basic ${Buffer.from(`${credentials.keyId}:${credentials.keySecret}`).toString("base64")}`,
  };
}

/**
 * Create a Razorpay **Order** for the in-app Checkout modal. Returns only the
 * public Key ID — the secret never leaves the server.
 */
export async function createPlatformProOrder(
  userId: string,
  plan: ProPlan = "pro_monthly",
): Promise<PlatformCheckout> {
  const selected = PRO_PLANS[plan] ?? PRO_PLANS.pro_monthly;
  const header = platformAuthHeader();
  if (!header) {
    return {
      configured: false,
      plan,
      message: "Pro checkout is not configured yet. Add the platform Razorpay test keys.",
    };
  }
  const response = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      Authorization: header.auth,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: selected.amount,
      currency: "USD",
      receipt: proReceipt(userId, plan),
      notes: { userId, plan, product: "formabill-pro" },
    }),
  });
  const json = (await response.json()) as {
    id?: string;
    error?: { description?: string };
  };
  if (!response.ok || !json.id) {
    throw new Error(json.error?.description || "Could not create the FormaBill Pro order.");
  }
  return {
    configured: true,
    method: "modal",
    orderId: json.id,
    keyId: header.credentials.keyId,
    amount: selected.amount,
    currency: "USD",
    plan,
  };
}

/**
 * Fallback: hosted Payment Link (full-page redirect) for when Checkout.js
 * cannot load. Kept separate so the modal path never touches link plumbing.
 */
export async function createPlatformProLink(
  userId: string,
  request: Request,
  plan: ProPlan = "pro_monthly",
): Promise<PlatformCheckout> {
  const selected = PRO_PLANS[plan] ?? PRO_PLANS.pro_monthly;
  const header = platformAuthHeader();
  if (!header) {
    return {
      configured: false,
      plan,
      message: "Pro checkout is not configured yet. Add the platform Razorpay test keys.",
    };
  }
  const baseUrl = appBaseUrl(request);
  const response = await fetch("https://api.razorpay.com/v1/payment_links", {
    method: "POST",
    headers: {
      Authorization: header.auth,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: selected.amount,
      currency: "USD",
      accept_partial: false,
      description: selected.description,
      reminder_enable: false,
      notes: { userId, plan },
      callback_url: `${baseUrl}/app/settings?pro=success`,
      callback_method: "get",
    }),
  });
  const json = (await response.json()) as {
    id?: string;
    short_url?: string;
    error?: { description?: string };
  };
  if (!response.ok || !json.short_url) {
    throw new Error(json.error?.description || "Could not create the FormaBill Pro checkout link.");
  }
  return { configured: true, method: "link", id: json.id, shortUrl: json.short_url, plan };
}

export async function createPlatformProCheckout(
  userId: string,
  request: Request,
  plan: ProPlan = "pro_monthly",
  method: "modal" | "link" = "modal",
): Promise<PlatformCheckout> {
  if (method === "link") return createPlatformProLink(userId, request, plan);
  return createPlatformProOrder(userId, plan);
}

export type PlatformOrderNotes = {
  userId?: string;
  plan?: string;
};

/** Fetch an order's notes from Razorpay (server-side, secret stays here). */
export async function fetchPlatformOrderNotes(orderId: string): Promise<PlatformOrderNotes | null> {
  const header = platformAuthHeader();
  if (!header) return null;
  try {
    const response = await fetch(
      `https://api.razorpay.com/v1/orders/${encodeURIComponent(orderId)}`,
      { headers: { Authorization: header.auth } },
    );
    if (!response.ok) return null;
    const json = (await response.json()) as { notes?: PlatformOrderNotes };
    return json.notes ?? null;
  } catch {
    return null;
  }
}

/**
 * Verify a Checkout payment server-side: HMAC-SHA256(order_id|payment_id)
 * with the platform secret. Returns the buyer + plan when valid.
 */
export async function verifyPlatformPayment(
  userId: string,
  orderId: string,
  paymentId: string,
  signature: string,
): Promise<{ userId: string; plan: ProPlan } | null> {
  const credentials = platformCredentials();
  if (!credentials || !orderId || !paymentId || !signature) return null;
  const expected = createHmac("sha256", credentials.keySecret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");
  let valid = false;
  try {
    const a = Buffer.from(expected);
    const b = Buffer.from(signature);
    valid = a.length === b.length && timingSafeEqual(a, b);
  } catch {
    valid = false;
  }
  if (!valid) return null;
  const notes = await fetchPlatformOrderNotes(orderId);
  if (!notes?.userId || notes.userId !== userId) return null;
  const plan: ProPlan = notes.plan === "pro_yearly" ? "pro_yearly" : "pro_monthly";
  return { userId, plan };
}

export function verifyPlatformWebhookSignature(rawBody: string, signature: string | null): boolean {
  const secret = env("RAZORPAY_PLATFORM_WEBHOOK_SECRET");
  if (!secret || !signature) return false;
  const expected = createHmac("sha256", secret).update(rawBody).digest("hex");
  try {
    const actual = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expected);
    return actual.length === expectedBuffer.length && timingSafeEqual(actual, expectedBuffer);
  } catch {
    return false;
  }
}
