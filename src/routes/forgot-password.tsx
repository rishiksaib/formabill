import { FormEvent, useEffect, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { CircleCheck, MailWarning } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/forgot-password")({
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // null = still checking; false = email delivery not configured on this server.
  const [delivery, setDelivery] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;
    void fetch("/api/auth-status")
      .then(async (response) => {
        if (!response.ok) return null;
        return (await response.json()) as { passwordReset?: boolean };
      })
      .then((status) => {
        if (!cancelled && status) setDelivery(status.passwordReset ?? true);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, []);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const { error } = await authClient.requestPasswordReset({
        email: email.trim(),
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw new Error(error.message || "Could not send the reset email");
      setSent(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not send the reset email";
      setError(message);
      toast.error(message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="grid min-h-dvh place-items-center bg-secondary/30 px-6 py-12">
      <section className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-paper sm:p-8">
        <Link to="/" className="font-display text-xl">FormaBill</Link>
        <p className="mt-8 text-xs tracking-[0.16em] text-muted-foreground uppercase">Account</p>
        <h1 className="mt-2 font-display text-3xl">Forgot password</h1>
        {delivery === null ? (
          <div className="mt-6 h-32 animate-pulse rounded-lg bg-muted/60" aria-label="Loading" />
        ) : delivery === false ? (
          <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4">
            <p className="flex items-center gap-2 text-sm font-medium text-amber-900">
              <MailWarning className="size-4" /> Reset emails aren&apos;t set up here
            </p>
            <p className="mt-1 text-sm text-amber-900">
              This server can&apos;t send password emails yet. Contact support and we&apos;ll help
              you back into your account.
            </p>
            <Button className="mt-4 w-full" asChild>
              <Link to="/login">Back to sign in</Link>
            </Button>
          </div>
        ) : sent ? (
          <div className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
            <p className="flex items-center gap-2 text-sm font-medium text-emerald-900">
              <CircleCheck className="size-4" /> Check your inbox
            </p>
            <p className="mt-1 text-sm text-emerald-900">
              If an account uses {email.trim()}, a reset link is on its way. It expires in 1 hour
              and works once.
            </p>
            <Button className="mt-4 w-full" asChild>
              <Link to="/login">Back to sign in</Link>
            </Button>
          </div>
        ) : (
          <>
            <p className="mt-2 text-sm text-muted-foreground">
              Enter your account email and we&apos;ll send a one-hour, single-use reset link.
            </p>
            {error ? (
              <p className="mt-4 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive" role="alert">
                {error}
              </p>
            ) : null}
            <form className="mt-6 grid gap-4" onSubmit={submit}>
              <label className="grid gap-1.5">
                <Label>Email</Label>
                <Input
                  required
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                  placeholder="you@studio.com"
                />
              </label>
              <Button type="submit" disabled={busy}>
                {busy ? "Sending…" : "Send reset link"}
              </Button>
            </form>
            <Link
              to="/login"
              className="mt-5 block w-full text-center text-sm text-muted-foreground underline underline-offset-4"
            >
              Back to sign in
            </Link>
          </>
        )}
      </section>
    </main>
  );
}
