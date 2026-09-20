import { createFileRoute } from "@tanstack/react-router";
import { emailAndPasswordEnabled } from "@/lib/auth/email-password";
import { mailConfigured } from "@/lib/auth/mailer.server";
import { authConfigured } from "@/lib/auth/verify.server";

/**
 * Which auth capabilities actually work in this deployment.
 *
 * - `emailPassword`: local email + password via this app's own Better Auth
 *   (works with the embedded DB locally and Postgres when deployed).
 * - `oauth`: federated Google/X via the auth broker. Server `authConfigured`
 *   is also true for the shared live-preview client, whose callbacks only the
 *   `*.grok-sandbox.com` preview host accepts — so on any other host without
 *   explicit deployer credentials the buttons would go nowhere, and we report
 *   false.
 * - `passwordReset`: forgot-password email delivery (SMTP configured). The
 *   forgot page shows an honest "not set up" notice instead of a fake form
 *   when this is false.
 */
export const Route = createFileRoute("/api/auth-status")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const host = (
          request.headers.get("x-forwarded-host") ??
          request.headers.get("host") ??
          ""
        ).toLowerCase();
        const explicitBrokerCreds = Boolean(process.env.GROK_AUTH_CLIENT_ID?.trim());
        const previewHost = host.endsWith(".grok-sandbox.com");
        return Response.json({
          emailPassword: emailAndPasswordEnabled,
          oauth: authConfigured && (explicitBrokerCreds || previewHost),
          passwordReset: mailConfigured(),
        });
      },
    },
  },
});
