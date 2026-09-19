import { createHmac, timingSafeEqual } from "node:crypto";
import { env } from "@/lib/env.server";
import type { Invoice } from "@/lib/types";
import { invoiceTotal, toPaise } from "@/lib/utils";

export type PaymentLinkResult = {
  demo: boolean;
  id?: string;
  shortUrl?: string;
  message?: string;
};

function credentials(overrides?: { keyId?: string; keySecret?: string }) {
  const keyId = overrides?.keyId?.trim() || env("RAZORPAY_KEY_ID");
  const keySecret = overrides?.keySecret?.trim() || env("RAZORPAY_KEY_SECRET");
  return keyId && keySecret ? { keyId, keySecret } : null;
}

export function razorpayConfigured(): boolean {
  return credentials() !== null;
}

export function appBaseUrl(request?: Request): string {
  const fromEnv =
    env("NEXT_PUBLIC_APP_URL") || env("APP_URL") || env("VITE_PUBLIC_APP_URL");
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  if (request) {
    const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
    const proto = request.headers.get("x-forwarded-proto") ?? "https";
    if (host) return `${proto}://${host}`;
  }
  return "http://127.0.0.1:8080";
}

export async function createPaymentLink(
  invoice: Invoice,
  request?: Request,
  userCredentials?: { keyId?: string; keySecret?: string },
): Promise<PaymentLinkResult> {
  const hasUserKey = Boolean(userCredentials?.keyId || userCredentials?.keySecret);
  if (hasUserKey && (!userCredentials?.keyId || !userCredentials?.keySecret)) {
    throw new Error("Enter both Razorpay Key ID and Key Secret, or clear both fields.");
  }
  const creds = credentials(userCredentials);
  const amount = toPaise(invoiceTotal(invoice.lineItems, invoice.taxRate));
  if (amount < 100) {
    throw new Error("Invoice total must be at least ₹1.00 to collect payment.");
  }
  if (!creds) {
    return {
      demo: true,
      message:
        "Razorpay is not configured. Add UPI or bank details, or connect Razorpay in Settings.",
    };
  }

  const base = appBaseUrl(request);
  const body = {
    amount,
    currency: invoice.currency || "USD",
    accept_partial: false,
    description: `Invoice ${invoice.number}`,
    customer: {
      name: invoice.client.name || "Client",
      email: invoice.client.email || invoice.fromEmail || undefined,
    },
    notify: { email: Boolean(invoice.client.email), sms: false },
    reminder_enable: true,
    notes: { invoiceId: invoice.id, invoiceNumber: invoice.number },
    callback_url: `${base}/inv/${invoice.id}`,
    callback_method: "get",
  };

  const auth = Buffer.from(`${creds.keyId}:${creds.keySecret}`).toString("base64");
  const res = await fetch("https://api.razorpay.com/v1/payment_links", {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const json = (await res.json()) as {
    id?: string;
    short_url?: string;
    error?: { description?: string };
  };

  if (!res.ok || !json.short_url) {
    throw new Error(json.error?.description || "Razorpay could not create a payment link.");
  }

  return { demo: false, id: json.id, shortUrl: json.short_url };
}

export function verifyWebhookSignature(rawBody: string, signature: string | null): boolean {
  const secret = env("RAZORPAY_WEBHOOK_SECRET");
  if (!secret || !signature) return false;
  const expected = createHmac("sha256", secret).update(rawBody).digest("hex");
  try {
    const a = Buffer.from(expected);
    const b = Buffer.from(signature);
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}
