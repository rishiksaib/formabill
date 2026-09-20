import { createFileRoute } from "@tanstack/react-router";
import { UnauthorizedError } from "@/lib/auth/verify.server";
import {
  GiftProRequiredError,
  GIFT_DURATIONS,
  createGiftCode,
  listGiftCodes,
  maxGiftMonths,
} from "@/lib/gifts.server";
import { checkRateLimit, clientIp, rateLimitedResponse } from "@/lib/rate-limit.server";
import { requireRequestUserId } from "@/lib/request-auth.server";

/**
 * Gift codes. Listing needs sign-in; creating additionally needs Pro, and the
 * duration must fit the granter's own plan (lifetime → any).
 */
export const Route = createFileRoute("/api/gift-codes")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const userId = await requireRequestUserId();
          const [codes, maxMonths] = await Promise.all([
            listGiftCodes(userId),
            maxGiftMonths(userId).catch(() => 0),
          ]);
          return Response.json({ codes, maxMonths, durations: [...GIFT_DURATIONS] });
        } catch (error) {
          if (error instanceof UnauthorizedError) {
            return Response.json({ error: "Sign in to manage gift codes." }, { status: 401 });
          }
          if (error instanceof GiftProRequiredError) {
            return Response.json(
              { codes: [], maxMonths: 0, durations: [...GIFT_DURATIONS], error: error.message },
              { status: 402 },
            );
          }
          return Response.json(
            { error: error instanceof Error ? error.message : "Could not load gift codes" },
            { status: 400 },
          );
        }
      },
      POST: async ({ request }) => {
        try {
          const limit = checkRateLimit(`gift-codes:POST:${clientIp(request)}`, 20, 60_000);
          if (!limit.allowed) return rateLimitedResponse(limit.retryAfterSec);
          const userId = await requireRequestUserId();
          const body = (await request.json().catch(() => ({}))) as { durationMonths?: unknown };
          const durationMonths = Number(body.durationMonths);
          const created = await createGiftCode(userId, durationMonths);
          return Response.json(created);
        } catch (error) {
          if (error instanceof UnauthorizedError) {
            return Response.json({ error: "Sign in to manage gift codes." }, { status: 401 });
          }
          if (error instanceof GiftProRequiredError) {
            return Response.json({ error: error.message }, { status: error.status });
          }
          return Response.json(
            { error: error instanceof Error ? error.message : "Could not create gift code" },
            { status: 400 },
          );
        }
      },
    },
  },
});
