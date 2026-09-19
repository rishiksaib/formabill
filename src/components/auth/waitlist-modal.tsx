import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const WAITLIST_KEY = "formabill-waitlist-email";

function getWaitlistEmail(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(WAITLIST_KEY);
  } catch {
    return null;
  }
}

/**
 * "Sign in for sync & Pro — soon" dialog.
 *
 * Email waitlist only — no password field, no fake login. The address is kept
 * in this browser's localStorage until a real auth backend exists.
 */
export function WaitlistModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [saved, setSaved] = useState<string | null>(null);

  useEffect(() => {
    if (open) setSaved(getWaitlistEmail());
  }, [open ]);

  if (!open) return null;

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = email.trim();
    if (!value) return;
    try {
      window.localStorage.setItem(WAITLIST_KEY, value);
    } catch {
      /* storage unavailable — still confirm */
    }
    setSaved(value);
    setEmail("");
  };

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/50 px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Sign in for sync and Pro — coming soon"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-xl border border-border bg-card p-6 shadow-lift"
        onClick={(event) => event.stopPropagation()}
      >
        <p className="text-xs tracking-[0.16em] text-muted-foreground uppercase">Coming soon</p>
        <h2 className="mt-2 font-display text-2xl tracking-tight">Sign in for sync &amp; Pro</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Accounts aren&apos;t live yet — everything works anonymously today. Leave your email and
          we&apos;ll invite you when sync &amp; Pro sign-in opens.
        </p>
        {saved ? (
          <p className="mt-4 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-900" role="status">
            You&apos;re on the list as {saved}. We&apos;ll be in touch.
          </p>
        ) : (
          <form className="mt-4 grid gap-3" onSubmit={submit}>
            <label className="grid gap-1.5">
              <Label>Email</Label>
              <Input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@studio.com"
                autoComplete="email"
              />
            </label>
            <Button type="submit">Notify me</Button>
          </form>
        )}
        <Button variant="ghost" className="mt-3 w-full" onClick={onClose}>
          Back to invoicing
        </Button>
      </div>
    </div>
  );
}
