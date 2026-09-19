/**
 * Basic in-memory sliding-window rate limiter (server-only).
 *
 * Guards obvious abuse of write endpoints (invoice publish, checkout). This is
 * intentionally simple: per-instance memory, so it is best-effort on serverless
 * hosts with many concurrent instances — but it stops trivial single-source
 * floods without any infrastructure. Tighten with a shared store (Redis/DB)
 * if abuse becomes real.
 */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

const MAX_BUCKETS = 2000;

function sweep(now: number): void {
  if (buckets.size <= MAX_BUCKETS) return;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
    if (buckets.size <= MAX_BUCKETS) break;
  }
}

export type RateLimitResult = {
  allowed: boolean;
  /** Seconds until the window resets (for the `Retry-After` header). */
  retryAfterSec: number;
};

export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number,
  now = Date.now(),
): RateLimitResult {
  sweep(now);
  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSec: 0 };
  }
  bucket.count += 1;
  if (bucket.count <= limit) return { allowed: true, retryAfterSec: 0 };
  return {
    allowed: false,
    retryAfterSec: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
  };
}

/** Best-effort client IP for rate-limit keys (works behind Vercel/proxies). */
export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0].trim();
    if (first) return first;
  }
  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;
  return "unknown";
}

/** 429 JSON response with a `Retry-After` header. */
export function rateLimitedResponse(retryAfterSec: number): Response {
  return Response.json(
    { error: `Too many requests. Please wait ${retryAfterSec}s and try again.` },
    { status: 429, headers: { "Retry-After": String(retryAfterSec) } },
  );
}
