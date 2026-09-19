import { FormEvent, useState } from "react";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { authClient, authConfigured } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

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
  const [busy, setBusy] = useState(false);
  // Auth incomplete (no real provider configured): never show a fake login —
  // show the email waitlist instead. Real form below only runs when configured.
  if (!authConfigured) return <LoginWaitlist />;

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

  return (
    <main className="grid min-h-dvh place-items-center bg-secondary/30 px-6 py-12">
      <section className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-paper sm:p-8">
        <Link to="/" className="font-display text-xl">FormaBill</Link>
        <p className="mt-8 text-xs tracking-[0.16em] text-muted-foreground uppercase">Account</p>
        <h1 className="mt-2 font-display text-3xl">{mode === "sign-up" ? "Create your account" : "Sign in"}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Your local drafts stay available anonymously. Sign in when you are ready to publish and share.
        </p>
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
          <label className="grid gap-1.5">
            <Label>Password</Label>
            <Input required minLength={8} type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete={mode === "sign-up" ? "new-password" : "current-password"} />
          </label>
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
      </section>
    </main>
  );
}
