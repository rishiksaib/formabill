import { FormEvent, useEffect, useState } from "react";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth/client";
import { SignInButtons } from "@/lib/auth/gates";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

type AuthMethods = { emailPassword: boolean; oauth: boolean };

function readWaitlistEmail(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem("formabill-waitlist-email");
  } catch {
    return null;
  }
}

function LoginWaitlist() {
  const [email, setEmail] = useState("");
  const [saved, setSaved] = useState<string | null>(null);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = email.trim();
    if (!value) return;
    try {
      window.localStorage.setItem("formabill-waitlist-email", value);
    } catch {
      /* storage unavailable — still confirm */
    }
    setSaved(value);
    setEmail("");
  };

  return (
    <main className="grid min-h-dvh place-items-center bg-secondary/30 px-6 py-12">
      <section className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-paper sm:p-8">
        <Link to="/" className="font-display text-xl">FormaBill</Link>
        <p className="mt-8 text-xs tracking-[0.16em] text-muted-foreground uppercase">Coming soon</p>
        <h1 className="mt-2 font-display text-3xl">Sign in for sync &amp; Pro</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Accounts aren&apos;t live yet — create, publish, share, mark paid, and get paid all work
          anonymously today. Leave your email and we&apos;ll invite you when sign-in opens.
        </p>
        {saved ?? readWaitlistEmail() ? (
          <p className="mt-6 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-900" role="status">
            You&apos;re on the list{saved ? ` as ${saved}` : ""}. We&apos;ll be in touch.
          </p>
        ) : (
          <form className="mt-6 grid gap-4" onSubmit={submit}>
            <label className="grid gap-1.5">
              <Label>Email</Label>
              <Input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" placeholder="you@studio.com" />
            </label>
            <Button type="submit">Notify me</Button>
          </form>
        )}
        <Button className="mt-5 w-full" asChild>
          <Link to="/app">Start invoicing</Link>
        </Button>
      </section>
    </main>
  );
}

function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"sign-in" | "sign-up">("sign-in");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [methods, setMethods] = useState<AuthMethods | null>(null);

  // Render exactly the sign-in methods this deployment supports — the server
  // is the source of truth, so a button here always goes somewhere real.
  useEffect(() => {
    let cancelled = false;
    void fetch("/api/auth-status")
      .then(async (response) => {
        if (!response.ok) return null;
        return (await response.json()) as AuthMethods;
      })
      .then((status) => {
        if (!cancelled && status) setMethods(status);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, []);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    try {
      const result = mode === "sign-up"
        ? await authClient.signUp.email({ name, email, password })
        : await authClient.signIn.email({ email, password });
      if (result.error) throw new Error(result.error.message || "Authentication failed");
      toast.success(mode === "sign-up" ? "Account created" : "Signed in");
      await navigate({ to: "/app" });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Authentication failed");
    } finally {
      setBusy(false);
    }
  };

  // Nothing available anywhere — waitlist instead of a fake login.
  if (methods && !methods.emailPassword && !methods.oauth) return <LoginWaitlist />;

  return (
    <main className="grid min-h-dvh place-items-center bg-secondary/30 px-6 py-12">
      <section className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-paper sm:p-8">
        <Link to="/" className="font-display text-xl">FormaBill</Link>
        <p className="mt-8 text-xs tracking-[0.16em] text-muted-foreground uppercase">Account</p>
        <h1 className="mt-2 font-display text-3xl">{mode === "sign-up" ? "Create your account" : "Sign in"}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Your drafts stay available anonymously. Sign in for sync, per-user limits, and Pro.
        </p>
        {methods?.oauth ? (
          <div className="mt-6">
            <SignInButtons />
            <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
              <span className="h-px flex-1 bg-border" />
              or with email
              <span className="h-px flex-1 bg-border" />
            </div>
          </div>
        ) : null}
        {methods && !methods.emailPassword ? null : (
          <>
            <form className="mt-6 grid gap-4" onSubmit={submit}>
              {mode === "sign-up" ? (
                <label className="grid gap-1.5">
                  <Label>Name</Label>
                  <Input required value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" />
                </label>
              ) : null}
              <label className="grid gap-1.5">
                <Label>Email</Label>
                <Input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" />
              </label>
              <div className="grid gap-1.5">
                <div className="flex items-center justify-between gap-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Link
                    to="/forgot-password"
                    className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="login-password"
                    required
                    minLength={8}
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    autoComplete={mode === "sign-up" ? "new-password" : "current-password"}
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
              <Button type="submit" disabled={busy}>
                {busy ? "Working…" : mode === "sign-up" ? "Create account" : "Sign in"}
              </Button>
            </form>
            <button
              type="button"
              className="mt-5 w-full text-sm text-muted-foreground underline underline-offset-4"
              onClick={() => setMode(mode === "sign-up" ? "sign-in" : "sign-up")}
            >
              {mode === "sign-up" ? "Already have an account? Sign in" : "New to FormaBill? Create an account"}
            </button>
          </>
        )}
      </section>
    </main>
  );
}
