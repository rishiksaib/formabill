import { FormEvent, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { CircleCheck, Eye, EyeOff, TriangleAlert } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/reset-password")({
  validateSearch: (search: Record<string, unknown>) => ({
    token: typeof search.token === "string" ? search.token : undefined,
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const { token } = Route.useSearch();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!token) {
    return (
      <main className="grid min-h-dvh place-items-center bg-secondary/30 px-6 py-12">
        <section className="w-full max-w-md rounded-xl border border-border bg-card p-6 text-center shadow-paper sm:p-8">
          <TriangleAlert className="mx-auto size-8 text-muted-foreground" aria-hidden="true" />
          <h1 className="mt-4 font-display text-2xl">This reset link is incomplete</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            It&apos;s missing its security token. Use the full link from your email, or request a
            fresh one.
          </p>
          <Button className="mt-6 w-full" asChild>
            <Link to="/forgot-password">Get a new link</Link>
          </Button>
        </section>
      </main>
    );
  }

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirm) {
      setError("Passwords don’t match — type the same one twice.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const { error } = await authClient.resetPassword({ newPassword: password, token });
      if (error) throw new Error(error.message || "Could not reset the password");
      setDone(true);
      toast.success("Password updated — sign in with your new password");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not reset the password";
      const friendly = /invalid|expired|token/i.test(message)
        ? "This link is invalid or expired — links last 1 hour and work once. Request a fresh one below."
        : message;
      setError(friendly);
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="grid min-h-dvh place-items-center bg-secondary/30 px-6 py-12">
      <section className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-paper sm:p-8">
        <Link to="/" className="font-display text-xl">FormaBill</Link>
        <p className="mt-8 text-xs tracking-[0.16em] text-muted-foreground uppercase">Account</p>
        <h1 className="mt-2 font-display text-3xl">Set a new password</h1>
        {done ? (
          <div className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
            <p className="flex items-center gap-2 text-sm font-medium text-emerald-900">
              <CircleCheck className="size-4" /> Password updated
            </p>
            <p className="mt-1 text-sm text-emerald-900">
              Your old password no longer works. Sign in with the new one.
            </p>
            <Button className="mt-4 w-full" asChild>
              <Link to="/login">Sign in</Link>
            </Button>
          </div>
        ) : (
          <>
            {error ? (
              <p className="mt-4 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive" role="alert">
                {error}
              </p>
            ) : null}
            {/invalid|expired/i.test(error ?? "") ? (
              <Button className="mt-4 w-full" variant="outline" asChild>
                <Link to="/forgot-password">Get a new link</Link>
              </Button>
            ) : (
              <form className="mt-6 grid gap-4" onSubmit={submit}>
                <div className="grid gap-1.5">
                  <Label htmlFor="reset-password">New password</Label>
                  <div className="relative">
                    <Input
                      id="reset-password"
                      required
                      minLength={8}
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      autoComplete="new-password"
                      className="pr-11"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      aria-pressed={showPassword}
                      className="absolute top-1/2 right-2 grid size-8 -translate-y-1/2 cursor-pointer place-items-center rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                </div>
                <label className="grid gap-1.5">
                  <Label>Confirm password</Label>
                  <Input
                    required
                    minLength={8}
                    type={showPassword ? "text" : "password"}
                    value={confirm}
                    onChange={(event) => setConfirm(event.target.value)}
                    autoComplete="new-password"
                  />
                </label>
                <Button type="submit" disabled={busy}>
                  {busy ? "Updating…" : "Update password"}
                </Button>
              </form>
            )}
          </>
        )}
      </section>
    </main>
  );
}
