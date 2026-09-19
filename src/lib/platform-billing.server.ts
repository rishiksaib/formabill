import { createHmac, timingSafeEqual } from "node:crypto";
import { env } from "@/lib/env.server";
import { appBaseUrl } from "@/lib/razorpay.server";

export type PlatformCheckout = {
  configured: boolean;
  id?: string;
  shortUrl?: string;
  plan?: ProPlan;
  message?: string;
};

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

export async function createPlatformProCheckout(
  userId: string,
  request: Request,
  plan: ProPlan = "pro_monthly",
): Promise<PlatformCheckout> {
  const selected = PRO_PLANS[plan] ?? PRO_PLANS.pro_monthly;
  const credentials = platformCredentials();
  if (!credentials) {
    return {
      configured: false,
      plan,
      message: "Pro checkout is not configured yet. Add the platform Razorpay test keys.",
    };
  }

  const baseUrl = appBaseUrl(request);
  const auth = Buffer.from(`${credentials.keyId}:${credentials.keySecret}`).toString("base64");
  const response = await fetch("https://api.razorpay.com/v1/payment_links", {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
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
  return { configured: true, id: json.id, shortUrl: json.short_url, plan };
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