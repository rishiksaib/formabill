import { createFileRoute } from "@tanstack/react-router";
import { UnauthorizedError } from "@/lib/auth/verify.server";
import { getReferralStats } from "@/lib/referrals.server";
import { requireRequestUserId } from "@/lib/request-auth.server";

/** Your referral code, link-ready, plus simple stats. Any signed-in user. */
export const Route = createFileRoute("/api/referrals/mine")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const userId = await requireRequestUserId();
          return Response.json(await getReferralStats(userId));
        } catch (error) {
          if (error instanceof UnauthorizedError) {
            return Response.json({ error: "Sign in to see referrals." }, { status: 401 });
          }
          return Response.json(
            { error: error instanceof Error ? error.message : "Could not load referrals" },
            { status: 400 },
          );
        }
      },
    },
  },
});
