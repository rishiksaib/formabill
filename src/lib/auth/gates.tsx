import { useState, type ReactNode } from "react";
import { Navigate } from "@tanstack/react-router";
import { Chrome, Loader2, LogIn, Twitter } from "lucide-react";
import { toast } from "sonner";
import { GROK_PROVIDERS, signIn } from "./client";
import { resolveSignInGateState } from "./sign-in-gate";
import { useCurrentUserState } from "./use-current-user";

/**
 * Auth state components — plain wrappers around `useCurrentUserState()`.
 *
 * With auth on, visitors are signed out until they authenticate — in the sandbox
 * live preview too, which does real sign-in. The shared dev user appears only
 * when auth is disabled (`VITE_AUTH_ENABLED=false`, the shipped default).
 * While the session is still resolving, gates that care about signed-out state
 * render nothing so there's no signed-out flash on hard reload.
 */

/** Where `RedirectToSignIn` sends signed-out visitors. Create this route. */
export const SIGN_IN_PATH = "/login";

/** Render children only when a user is present (real session, or the disabled-auth dev user). */
export function SignedIn({ children }: { children: ReactNode }) {
  const { user } = useCurrentUserState();
  return user ? <>{children}</> : null;
}

/**
 * Render children only once we KNOW the visitor is signed out (`isPending` has
 * cleared and there is no user). Hidden while the session is still loading.
 */
export function SignedOut({ children }: { children: ReactNode }) {
  const { user, isPending } = useCurrentUserState();
  if (isPending || user) return null;
  return <>{children}</>;
}

/**
 * Client-side redirect to the sign-in route (TanStack `<Navigate>` — NOT a full
 * `window.location` reload). A hard navigation re-bootstraps the SPA and re-runs
 * session loading, which feels like a second "Loading…" on /login.
 *
 * Guard routes by waiting out `isPending` first (see `use-current-user`), then
 * render this.
 */
export function RedirectToSignIn({ to = SIGN_IN_PATH }: { to?: string }) {
  return <Navigate to={to} />;
}

export function SignInGate({
  children,
  fallback,
}: {
  children: ReactNode;
  fallback?: ReactNode;
}) {
  const { user, isPending } = useCurrentUserState();
  const state = resolveSignInGateState({ isPending, hasUser: user !== null });
  if (state === "pending") return null;
  if (state === "signed_in") return <>{children}</>;
  return <>{fallback ?? <SignInButtons />}</>;
}

const PROVIDER_ICONS = {
  "grok-google": Chrome,
  "grok-x": Twitter,
} as const;

/**
 * One working OAuth button per configured upstream. Render only when the
 * server reports `oauth: true` (`/api/auth-status`) — each button starts the
 * real broker flow, never a dead end.
 */
export function SignInButtons() {
  const [busy, setBusy] = useState<string | null>(null);
  return (
    <div className="grid w-full gap-2">
      {GROK_PROVIDERS.map((p) => {
        const Icon = PROVIDER_ICONS[p.providerId as keyof typeof PROVIDER_ICONS] ?? LogIn;
        const loading = busy === p.providerId;
        return (
          <button
            key={p.providerId}
            type="button"
            disabled={busy !== null}
            onClick={() => {
              setBusy(p.providerId);
              void signIn(p.providerId, { callbackURL: "/" })
                .catch((error) => {
                  toast.error(error instanceof Error ? error.message : "Sign-in failed");
                })
                .finally(() => setBusy(null));
            }}
            className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-input bg-card px-4 text-sm font-medium text-foreground transition-colors hover:bg-secondary/70 disabled:cursor-wait disabled:opacity-60"
          >
            {loading ? (
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            ) : (
              <Icon className="size-4" aria-hidden="true" />
            )}
            {loading ? `Connecting to ${p.label}…` : `Continue with ${p.label}`}
          </button>
        );
      })}
    </div>
  );
}
