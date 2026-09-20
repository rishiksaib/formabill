import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { signOut } from "@/lib/auth/client";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { useStore } from "@/lib/store/context";

export const Route = createFileRoute("/app/settings")({
  validateSearch: (search: Record<string, unknown>) => ({
    pro: typeof search.pro === "string" ? search.pro : undefined,
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const { ready, settings, saveSettings } = useStore();
  const { pro: proReturn } = Route.useSearch();
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [proBusy, setProBusy] = useState(false);
  const [serverPro, setServerPro] = useState<boolean | null>(null);
  const [serverLifetime, setServerLifetime] = useState(false);
  const [platformConfigured, setPlatformConfigured] = useState(false);
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [plan, setPlan] = useState<"pro_monthly" | "pro_yearly">("pro_monthly");
  const [signingOut, setSigningOut] = useState(false);
  const { user: accountUser, isPending: accountPending } = useCurrentUserState();
  const [mcpTokens, setMcpTokens] = useState<McpTokenInfo[]>([]);
  const [mcpName, setMcpName] = useState("");
  const [mcpSecret, setMcpSecret] = useState<string | null>(null);
  const [mcpBusy, setMcpBusy] = useState(false);
  const [mcpNeedsSignIn, setMcpNeedsSignIn] = useState(false);
  const [giftCodes, setGiftCodes] = useState<GiftCodeInfo[]>([]);
  const [giftMax, setGiftMax] = useState(0);
  const [giftDuration, setGiftDuration] = useState(1);
  const [giftFresh, setGiftFresh] = useState<string | null>(null);
  const [giftBusy, setGiftBusy] = useState(false);
  const [redeemCode, setRedeemCode] = useState("");
  const [redeemBusy, setRedeemBusy] = useState(false);
  const [referral, setReferral] = useState<ReferralInfo | null>(null);

  const onSignOut = async () => {
    setSigningOut(true);
    try {
      await signOut("/");
    } catch {
      setSigningOut(false);
      toast.error("Could not sign out — please try again");
    }
  };

  // Pro always comes from the server — there is no local/demo override.
  // NOTE: `isPro` must stay above the effects — they depend on it.
  const isPro = serverPro ?? false;

  const loadProStatus = async () => {
    try {
      const response = await fetch("/api/pro/status");
      if (!response.ok) return;
      const status = (await response.json()) as { isPro?: boolean; lifetime?: boolean; configured?: boolean; authenticated?: boolean };
      setServerPro(Boolean(status.isPro));
      setServerLifetime(Boolean(status.lifetime));
      setPlatformConfigured(Boolean(status.configured));
      setAuthenticated(Boolean(status.authenticated));
    } catch {
      /* Pro status is best-effort — the page stays usable offline */
    }
  };

  useEffect(() => {
    if (!ready) return;
    void loadProStatus();
  }, [ready]);

  const loadMcpTokens = async () => {
    try {
      const response = await fetch("/api/mcp/tokens");
      if (response.status === 401) {
        setMcpNeedsSignIn(true);
        return;
      }
      if (!response.ok) throw new Error("Could not load tokens");
      const json = (await response.json()) as { tokens?: McpTokenInfo[] };
      setMcpTokens(json.tokens ?? []);
      setMcpNeedsSignIn(false);
    } catch {
      toast.error("Could not load MCP tokens");
    }
  };

  useEffect(() => {
    if (!ready || !isPro) return;
    void loadMcpTokens();
  }, [ready, isPro]);

  const loadGiftCodes = async () => {
    try {
      const response = await fetch("/api/gift-codes");
      if (!response.ok) return;
      const json = (await response.json()) as { codes?: GiftCodeInfo[]; maxMonths?: number };
      setGiftCodes(json.codes ?? []);
      setGiftMax(json.maxMonths ?? 0);
      setGiftDuration((current) =>
        json.maxMonths && current > json.maxMonths ? json.maxMonths : current,
      );
    } catch {
      /* gift list is best-effort */
    }
  };

  const loadReferral = async () => {
    try {
      const response = await fetch("/api/referrals/mine");
      if (!response.ok) return;
      const json = (await response.json()) as ReferralInfo;
      setReferral(json);
    } catch {
      /* referral card is best-effort */
    }
  };

  useEffect(() => {
    if (!ready || authenticated === false) return;
    void loadGiftCodes();
    void loadReferral();
  }, [ready, authenticated]);

  const onGenerateGift = async () => {
    setGiftBusy(true);
    try {
      const response = await fetch("/api/gift-codes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ durationMonths: giftDuration }),
      });
      const json = (await response.json()) as { code?: string; error?: string };
      if (!response.ok) throw new Error(json.error || "Could not create gift code");
      setGiftFresh(json.code ?? null);
      await loadGiftCodes();
      toast.success("Gift code created — share it with your friend");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not create gift code");
    } finally {
      setGiftBusy(false);
    }
  };

  const onRedeemGift = async () => {
    if (!redeemCode.trim()) {
      toast.error("Enter a gift code first");
      return;
    }
    setRedeemBusy(true);
    try {
      const response = await fetch("/api/gift-codes/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: redeemCode }),
      });
      const json = (await response.json()) as {
        ok?: boolean;
        durationMonths?: number;
        error?: string;
      };
      if (!response.ok || !json.ok) throw new Error(json.error || "Could not redeem code");
      setRedeemCode("");
      await loadProStatus();
      await loadGiftCodes();
      toast.success(`Pro unlocked for ${json.durationMonths} month${json.durationMonths === 1 ? "" : "s"} — enjoy!`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not redeem code");
    } finally {
      setRedeemBusy(false);
    }
  };

  // Razorpay returns here after a Pro payment — refresh so "Pro active"
  // appears as soon as the webhook has flipped the server flag.
  useEffect(() => {
    if (!ready || proReturn !== "success") return;
    toast.message("Pro payment received", {
      description: "Activating your Pro workspace…",
    });
    void loadProStatus();
    const timer = window.setTimeout(() => void loadProStatus(), 4000);
    return () => window.clearTimeout(timer);
  }, [ready, proReturn]);

  if (!ready) return <div className="h-64 animate-pulse rounded-xl bg-muted/60" />;

  const startProCheckout = async () => {
    setProBusy(true);
    try {
      const response = await fetch("/api/pro/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const json = (await response.json()) as { shortUrl?: string; error?: string; message?: string };
      if (response.status === 401) {
        toast.message("Sign in to get Pro", {
          description: "Checkout links to your account so we can activate it.",
        });
        await navigate({ to: "/login" });
        return;
      }
      if (!response.ok || !json.shortUrl) throw new Error(json.error || json.message || "Pro checkout is unavailable");
      window.location.href = json.shortUrl;
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not start Pro checkout");
    } finally {
      setProBusy(false);
    }
  };

  const copyText = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success(`${label} copied`);
    } catch {
      toast.error(`Could not copy ${label.toLowerCase()}`);
    }
  };

  const onGenerateToken = async () => {
    setMcpBusy(true);
    try {
      const response = await fetch("/api/mcp/tokens", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: mcpName }),
      });
      const json = (await response.json()) as { token?: string; error?: string };
      if (!response.ok) throw new Error(json.error || "Could not create token");
      setMcpSecret(json.token ?? null);
      setMcpName("");
      await loadMcpTokens();
      toast.success("Token created — copy it now, it won't be shown again");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not create token");
    } finally {
      setMcpBusy(false);
    }
  };

  const onRevokeToken = async (id: string) => {
    try {
      const response = await fetch(`/api/mcp/tokens/${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Could not revoke token");
      if (mcpSecret) setMcpSecret(null);
      await loadMcpTokens();
      toast.success("Token revoked");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not revoke token");
    }
  };

  const onLogo = (file: File | undefined) => {
    if (!file) return;
    if (file.size > 800_000) {
      toast.error("Logo should be under 800KB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      void saveSettings({ logoUrl: String(reader.result || "") });
    };
    reader.readAsDataURL(file);
  };

  const accountLabel =
    accountUser?.displayName ?? accountUser?.primaryEmail ?? "Account";
  const paymentMethods = settings.paymentMethods || {};
  const hasBankDetails = Boolean(
    paymentMethods.bankName ||
      paymentMethods.bankAccountName ||
      paymentMethods.bankAccount ||
      paymentMethods.bankIfscSwift,
  );

  return (
    <div className="mx-auto max-w-xl">
      <p className="text-xs tracking-[0.16em] text-muted-foreground uppercase">Workspace</p>
      <h1 className="font-display text-3xl tracking-tight">Settings</h1>
      <p className="mt-1 text-sm text-muted-foreground">Everything saves automatically.</p>

      <section aria-label="Account" className="mt-6 rounded-xl border border-border bg-card p-6">
        <p className="text-xs tracking-[0.16em] text-muted-foreground uppercase">Account</p>
        {accountPending ? (
          <div className="mt-4 h-12 animate-pulse rounded-lg bg-muted/60" />
        ) : accountUser && !accountUser.isDevFallback ? (
          <div className="mt-4 flex flex-wrap items-center gap-4">
            {accountUser.profileImageUrl ? (
              <img
                src={accountUser.profileImageUrl}
                alt=""
                className="h-12 w-12 rounded-full object-cover"
              />
            ) : (
              <span
                aria-hidden="true"
                className="grid h-12 w-12 place-items-center rounded-full bg-secondary text-lg font-medium text-foreground"
              >
                {accountLabel.charAt(0).toUpperCase()}
              </span>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium">{accountUser.displayName ?? "Account"}</p>
              {accountUser.primaryEmail ? (
                <p className="truncate text-sm text-muted-foreground">{accountUser.primaryEmail}</p>
              ) : null}
            </div>
            <Button type="button" variant="outline" disabled={signingOut} onClick={() => void onSignOut()}>
              {signingOut ? "Signing out…" : "Sign out"}
            </Button>
          </div>
        ) : (
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              Not signed in. Sign in for sync, per-user limits, and Pro.
            </p>
            <Button type="button" asChild>
              <Link to="/login">Sign in</Link>
            </Button>
          </div>
        )}
      </section>

      <SectionCard kicker="Studio details" title="Your studio" blurb="Prefills every new invoice.">
        <div className="grid gap-4">
          <label className="grid gap-1.5">
            <Label>Studio name</Label>
            <Input
              value={settings.name}
              onChange={(e) => void saveSettings({ name: e.target.value })}
              placeholder="North Studio"
            />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1.5">
              <Label>Email</Label>
              <Input
                type="email"
                value={settings.email}
                onChange={(e) => void saveSettings({ email: e.target.value })}
                placeholder="hello@studio.com"
              />
            </label>
            <label className="grid gap-1.5">
              <Label>Default currency</Label>
              <select
                className="flex h-11 w-full rounded-md border border-input bg-card px-3 text-sm"
                value={settings.defaultCurrency}
                onChange={(e) => void saveSettings({ defaultCurrency: e.target.value })}
              >
                <option value="USD">USD — US Dollar</option>
                <option value="EUR">EUR — Euro</option>
                <option value="GBP">GBP — Pound Sterling</option>
                <option value="INR">INR — Indian Rupee</option>
                <option value="AUD">AUD — Australian Dollar</option>
                <option value="CAD">CAD — Canadian Dollar</option>
                <option value="SGD">SGD — Singapore Dollar</option>
              </select>
            </label>
          </div>
          <label className="grid gap-1.5">
            <Label>Address</Label>
            <Textarea
              rows={2}
              value={settings.address || ""}
              onChange={(e) => void saveSettings({ address: e.target.value })}
              placeholder="Street, city, country"
            />
          </label>
          <label className="grid gap-1.5 sm:max-w-48">
            <Label>Default tax rate (%)</Label>
            <Input
              type="number"
              min={0}
              step="0.01"
              value={settings.defaultTaxRate}
              onChange={(e) => void saveSettings({ defaultTaxRate: Number(e.target.value) })}
            />
          </label>
        </div>
      </SectionCard>

      <SectionCard
        kicker="Payment methods"
        title="How clients pay you"
        blurb="Shown on your invoices. Money goes to your own accounts."
      >
        <div className="grid gap-4">
          <label className="grid gap-1.5">
            <Label>UPI ID</Label>
            <Input
              value={settings.paymentMethods?.upiId || ""}
              onChange={(e) =>
                void saveSettings({
                  paymentMethods: { ...(settings.paymentMethods || {}), upiId: e.target.value },
                })
              }
              placeholder="yourname@upi"
            />
            <span className="text-xs text-muted-foreground">For INR invoices.</span>
          </label>
          <label className="grid gap-1.5">
            <Label>PayPal link or email</Label>
            <Input
              value={settings.paymentMethods?.paypalEmail || ""}
              onChange={(e) =>
                void saveSettings({
                  paymentMethods: { ...(settings.paymentMethods || {}), paypalEmail: e.target.value },
                })
              }
              placeholder="paypal.me/yourname or paypal@example.com"
            />
          </label>
          <details
            open={hasBankDetails || undefined}
            className="overflow-hidden rounded-lg border border-border"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-medium">
              Bank details
              {hasBankDetails ? (
                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
                  Added
                </span>
              ) : (
                <span className="text-xs font-normal text-muted-foreground">Optional</span>
              )}
            </summary>
            <div className="grid gap-4 border-t border-border p-4 sm:grid-cols-2">
              <label className="grid gap-1.5">
                <Label>Bank name</Label>
                <Input
                  value={settings.paymentMethods?.bankName || ""}
                  onChange={(e) =>
                    void saveSettings({
                      paymentMethods: { ...(settings.paymentMethods || {}), bankName: e.target.value },
                    })
                  }
                  placeholder="HDFC Bank"
                />
              </label>
              <label className="grid gap-1.5">
                <Label>Account name</Label>
                <Input
                  value={settings.paymentMethods?.bankAccountName || ""}
                  onChange={(e) =>
                    void saveSettings({
                      paymentMethods: { ...(settings.paymentMethods || {}), bankAccountName: e.target.value },
                    })
                  }
                  placeholder="Your name or business"
                />
              </label>
              <label className="grid gap-1.5">
                <Label>Account number / IBAN</Label>
                <Input
                  value={settings.paymentMethods?.bankAccount || ""}
                  onChange={(e) =>
                    void saveSettings({
                      paymentMethods: { ...(settings.paymentMethods || {}), bankAccount: e.target.value },
                    })
                  }
                  placeholder="Acc. no / IBAN"
                />
              </label>
              <label className="grid gap-1.5">
                <Label>IFSC / SWIFT</Label>
                <Input
                  value={settings.paymentMethods?.bankIfscSwift || ""}
                  onChange={(e) =>
                    void saveSettings({
                      paymentMethods: { ...(settings.paymentMethods || {}), bankIfscSwift: e.target.value },
                    })
                  }
                  placeholder="IFSC or SWIFT code"
                />
              </label>
            </div>
          </details>
          <div className="rounded-lg border border-dashed border-border bg-secondary/40 p-4">
            <p className="text-sm font-medium text-foreground">Razorpay</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Optional. Test keys only — secrets stay in this browser.
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <Input
                value={settings.paymentMethods?.razorpayKeyId || ""}
                onChange={(e) =>
                  void saveSettings({
                    paymentMethods: { ...(settings.paymentMethods || {}), razorpayKeyId: e.target.value },
                  })
                }
                placeholder="rzp_test_xxxxx"
                aria-label="Razorpay Key ID"
              />
              <Input
                type="password"
                value={settings.paymentMethods?.razorpayKeySecret || ""}
                onChange={(e) =>
                  void saveSettings({
                    paymentMethods: { ...(settings.paymentMethods || {}), razorpayKeySecret: e.target.value },
                  })
                }
                placeholder="Key secret"
                aria-label="Razorpay Key Secret"
                autoComplete="off"
              />
            </div>
          </div>
        </div>
      </SectionCard>

      <SectionCard
        kicker="Branding"
        title="Logo"
        blurb="Appears on invoices, public pages, and PDFs. PNG or JPG under 800KB works best."
      >
        <div className="flex flex-wrap items-center gap-4">
          {settings.logoUrl ? (
            <img src={settings.logoUrl} alt="Studio logo" className="h-12 max-w-28 object-contain" />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-secondary text-xs text-muted-foreground">
              Logo
            </div>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => onLogo(e.target.files?.[0])}
          />
          <Button type="button" variant="outline" onClick={() => fileRef.current?.click()}>
            Upload logo
          </Button>
          {settings.logoUrl ? (
            <Button type="button" variant="ghost" onClick={() => void saveSettings({ logoUrl: "" })}>
              Remove
            </Button>
          ) : null}
        </div>
      </SectionCard>

      <McpSection
        isPro={isPro}
        needsSignIn={mcpNeedsSignIn}
        tokens={mcpTokens}
        name={mcpName}
        onNameChange={setMcpName}
        secret={mcpSecret}
        onDismissSecret={() => setMcpSecret(null)}
        busy={mcpBusy}
        onGenerate={() => void onGenerateToken()}
        onRevoke={(id) => void onRevokeToken(id)}
        onCopy={(value, label) => void copyText(value, label)}
      />

      <GiftSection
        isPro={isPro}
        signedIn={authenticated !== false}
        codes={giftCodes}
        maxMonths={giftMax}
        duration={giftDuration}
        onDurationChange={setGiftDuration}
        fresh={giftFresh}
        onDismissFresh={() => setGiftFresh(null)}
        busy={giftBusy}
        onGenerate={() => void onGenerateGift()}
        redeemCode={redeemCode}
        onRedeemCodeChange={setRedeemCode}
        redeemBusy={redeemBusy}
        onRedeem={() => void onRedeemGift()}
        onCopy={(value, label) => void copyText(value, label)}
      />

      <ReferralSection referral={referral} signedIn={authenticated !== false} />

      <SectionCard
        id="pro"
        kicker="Pro workspace"
        title="Go Pro"
        blurb="Recurring invoices, due-date reminders, and no FormaBill branding. Client money still goes to your own accounts."
      >
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium">
            {isPro ? (serverLifetime ? "Pro active · Lifetime" : "Pro active") : "Free plan · 5 invoices/mo"}
          </span>
          {isPro && serverLifetime ? (
            <p className="basis-full text-xs text-muted-foreground">
              Lifetime Pro — no subscription, no renewals, everything unlocked.
            </p>
          ) : null}
        </div>
        {!isPro && authenticated === false ? (
          <Button type="button" className="mt-4 w-full sm:w-auto" asChild>
            <Link to="/login">Sign in to get Pro</Link>
          </Button>
        ) : null}
        {!isPro && authenticated !== false ? (
          <div className="mt-4 grid gap-2 sm:grid-cols-2" role="group" aria-label="Pro billing period">
            <button
              type="button"
              aria-pressed={plan === "pro_monthly"}
              onClick={() => setPlan("pro_monthly")}
              className={`rounded-xl border p-4 text-left transition-colors ${
                plan === "pro_monthly"
                  ? "border-primary bg-primary/5 ring-1 ring-primary"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <span className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium">Monthly</span>
                {plan === "pro_monthly" ? (
                  <span className="rounded-full bg-primary px-2 py-0.5 text-[11px] font-medium text-primary-foreground">
                    Selected
                  </span>
                ) : null}
              </span>
              <span className="mt-1 block font-display text-2xl tracking-tight">
                $11<span className="text-sm text-muted-foreground">/mo</span>
              </span>
              <span className="mt-1 block text-xs text-muted-foreground">Flexible, cancel anytime.</span>
            </button>
            <button
              type="button"
              aria-pressed={plan === "pro_yearly"}
              onClick={() => setPlan("pro_yearly")}
              className={`rounded-xl border p-4 text-left transition-colors ${
                plan === "pro_yearly"
                  ? "border-primary bg-primary/5 ring-1 ring-primary"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <span className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium">Yearly</span>
                {plan === "pro_yearly" ? (
                  <span className="rounded-full bg-primary px-2 py-0.5 text-[11px] font-medium text-primary-foreground">
                    Selected
                  </span>
                ) : (
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-medium text-emerald-800">
                    Save $33
                  </span>
                )}
              </span>
              <span className="mt-1 block font-display text-2xl tracking-tight">
                $99<span className="text-sm text-muted-foreground">/yr</span>
              </span>
              <span className="mt-1 block text-xs text-muted-foreground">Two months free vs monthly.</span>
            </button>
          </div>
        ) : null}
        {!isPro && authenticated !== false ? (
          <Button type="button" className="mt-4 w-full sm:w-auto" disabled={proBusy} onClick={() => void startProCheckout()}>
            {proBusy ? "Opening checkout…" : plan === "pro_yearly" ? "Get Pro — $99/yr" : "Get Pro — $11/mo"}
          </Button>
        ) : null}
          {!isPro && !platformConfigured ? (
            <p className="mt-3 text-xs text-muted-foreground">
              Pro checkout is not available yet — your free plan works fully meanwhile.
            </p>
          ) : null}
        {!isPro && platformConfigured ? (
          <p className="mt-3 text-xs text-muted-foreground">
            Secure checkout via Razorpay. Pro is billed by FormaBill; client invoice money still
            goes to your own accounts.
          </p>
        ) : null}
        {isPro ? (
          <div className="mt-5 border-t border-border pt-5">
            <label className="grid gap-1.5">
              <Label>Remind this many days before due</Label>
              <Input
                type="number"
                min={1}
                max={30}
                value={settings.reminderDays ?? 3}
                onChange={(e) => void saveSettings({ reminderDays: Number(e.target.value) })}
              />
            </label>
            <Button
              className="mt-4"
              variant="outline"
              disabled={busy}
              onClick={async () => {
                setBusy(true);
                try {
                  const res = await fetch("/api/recurring/process", { method: "POST" });
                  const json = (await res.json()) as { generated?: number; error?: string };
                  if (!res.ok) throw new Error(json.error || "Failed");
                  toast.success(`Generated ${json.generated ?? 0} recurring invoice(s)`);
                } catch (err) {
                  toast.error(err instanceof Error ? err.message : "Failed");
                } finally {
                  setBusy(false);
                }
              }}
            >
              Process recurring invoices
            </Button>
          </div>
        ) : null}
      </SectionCard>
    </div>
  );
}

type McpTokenInfo = {
  id: string;
  name: string;
  prefix: string;
  createdAt: string;
  lastUsedAt: string | null;
};

type GiftCodeInfo = {
  id: string;
  code: string;
  durationMonths: number;
  status: "unused" | "redeemed" | "expired";
  createdAt: string;
  expiresAt: string;
  redeemedAt: string | null;
};

type ReferralInfo = {
  code: string;
  signups: number;
  proConversions: number;
  monthsEarned: number;
};

function McpSection({
  isPro,
  needsSignIn,
  tokens,
  name,
  onNameChange,
  secret,
  onDismissSecret,
  busy,
  onGenerate,
  onRevoke,
  onCopy,
}: {
  isPro: boolean;
  needsSignIn: boolean;
  tokens: McpTokenInfo[];
  name: string;
  onNameChange: (value: string) => void;
  secret: string | null;
  onDismissSecret: () => void;
  busy: boolean;
  onGenerate: () => void;
  onRevoke: (id: string) => void;
  onCopy: (value: string, label: string) => void;
}) {
  const serverUrl = typeof window !== "undefined" ? `${window.location.origin}/api/mcp` : "/api/mcp";
  const [guide, setGuide] = useState<"claude" | "cursor" | "other">("claude");
  const connected = tokens.length > 0;
  const configSnippet = JSON.stringify(
    {
      mcpServers: {
        formabill: {
          url: serverUrl,
          headers: { Authorization: "Bearer <paste-your-token-here>" },
        },
      },
    },
    null,
    2,
  );

  if (!isPro) {
    return (
      <SectionCard
        kicker="AI / MCP"
        title="Connect AI assistants"
        blurb="Let Claude, Cursor, or another MCP-compatible AI list invoices, draft bills, and mark payments on your behalf."
      >
        <div className="rounded-lg border border-dashed border-border bg-secondary/40 p-4">
          <p className="text-sm font-medium">Pro feature</p>
          <p className="mt-1 text-sm text-muted-foreground">
            AI connection with personal access tokens is available on Pro. Your free plan works
            fully meanwhile.
          </p>
          <Button type="button" className="mt-3" asChild>
            <a href="#pro">See Pro plans</a>
          </Button>
        </div>
      </SectionCard>
    );
  }

  if (needsSignIn) {
    return (
      <SectionCard
        kicker="AI / MCP"
        title="Connect AI assistants"
        blurb="Let Claude, Cursor, or another MCP-compatible AI act on your account."
      >
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-border p-4">
          <p className="text-sm text-muted-foreground">Sign in to manage MCP tokens.</p>
          <Button type="button" asChild>
            <Link to="/login">Sign in</Link>
          </Button>
        </div>
      </SectionCard>
    );
  }

  return (
    <SectionCard
      kicker="AI / MCP"
      title="Connect AI assistants"
      blurb="Tokens act as you: every invoice, client, or setting change is attributed to your account. Keep them secret."
    >
      <div className="flex items-center gap-2">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
            connected ? "bg-emerald-100 text-emerald-800" : "bg-secondary text-muted-foreground"
          }`}
          role="status"
        >
          <span
            aria-hidden="true"
            className={`size-1.5 rounded-full ${connected ? "bg-emerald-600" : "bg-muted-foreground"}`}
          />
          {connected
            ? `Connected · ${tokens.length} token${tokens.length === 1 ? "" : "s"}`
            : "Not connected"}
        </span>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2 rounded-lg border border-border bg-secondary/40 px-3 py-2">
        <p className="min-w-0 flex-1 truncate font-mono text-xs">{serverUrl}</p>
        <Button type="button" size="sm" variant="outline" onClick={() => onCopy(serverUrl, "Server URL")}>
          Copy URL
        </Button>
      </div>
      {secret ? (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
          <p className="text-sm font-medium text-emerald-900">Copy your token now — it won&apos;t be shown again</p>
          <p className="mt-2 rounded-md bg-white px-3 py-2 font-mono text-xs break-all text-foreground">
            {secret}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button type="button" size="sm" onClick={() => onCopy(secret, "Token")}>
              Copy token
            </Button>
            <Button type="button" size="sm" variant="ghost" onClick={onDismissSecret}>
              I&apos;ve saved it
            </Button>
          </div>
        </div>
      ) : null}
      <div className="mt-4 grid gap-2 sm:grid-cols-[1fr_auto]">
        <Input
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Token name, e.g. Claude Desktop"
          aria-label="New token name"
          maxLength={80}
        />
        <Button type="button" disabled={busy} onClick={onGenerate}>
          {busy ? "Creating…" : "Generate token"}
        </Button>
      </div>
      {tokens.length > 0 ? (
        <ul className="mt-4 divide-y divide-border overflow-hidden rounded-lg border border-border">
          {tokens.map((token) => (
            <li key={token.id} className="flex flex-wrap items-center gap-3 px-4 py-3">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{token.name}</p>
                <p className="truncate font-mono text-xs text-muted-foreground">
                  {token.prefix}•••• · created {new Date(token.createdAt).toLocaleDateString()}
                  {token.lastUsedAt
                    ? ` · used ${new Date(token.lastUsedAt).toLocaleDateString()}`
                    : " · never used"}
                </p>
              </div>
              <Button type="button" variant="ghost" size="sm" onClick={() => onRevoke(token.id)}>
                Revoke
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-sm text-muted-foreground">
          No tokens yet. Generate one above to connect your first assistant.
        </p>
      )}
      <div className="mt-4 rounded-lg border border-border p-4">
        <p className="text-sm font-medium">Connect your assistant</p>
        <div className="mt-3 flex gap-1 rounded-lg bg-secondary/60 p-1" role="tablist" aria-label="AI client guides">
          {(
            [
              { value: "claude", label: "Claude Desktop" },
              { value: "cursor", label: "Cursor" },
              { value: "other", label: "Grok & others" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.value}
              type="button"
              role="tab"
              aria-selected={guide === tab.value}
              onClick={() => setGuide(tab.value)}
              className={`flex-1 cursor-pointer rounded-md px-2 py-1.5 text-xs font-medium transition-colors ${
                guide === tab.value
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {guide === "claude" ? (
          <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
            <li>Generate a token above and copy it.</li>
            <li>Open Claude Desktop → Settings → Connectors → Add custom connector.</li>
            <li>Paste the server URL, add header `Authorization` with value `Bearer YOUR_TOKEN`.</li>
            <li>Ask it to “list my invoices” — revoke the token here anytime to cut access.</li>
          </ol>
        ) : null}
        {guide === "cursor" ? (
          <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
            <li>Generate a token above and copy it.</li>
            <li>Open Cursor → Settings → MCP → Add custom server (Streamable HTTP).</li>
            <li>Paste the server URL and the `Authorization: Bearer YOUR_TOKEN` header.</li>
            <li>Ask it to “draft an invoice for Acme” — revoke the token here anytime.</li>
          </ol>
        ) : null}
        {guide === "other" ? (
          <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
            <li>Generate a token above and copy it.</li>
            <li>
              In any MCP-compatible client (Grok, Windsurf, …), add a Streamable-HTTP server with
              the URL above and an `Authorization: Bearer YOUR_TOKEN` header, or use this config:
            </li>
          </ol>
        ) : null}
        {guide === "other" ? (
          <div className="relative mt-2">
            <pre className="overflow-x-auto rounded-md bg-secondary/60 p-3 font-mono text-xs break-all whitespace-pre-wrap">
              {configSnippet}
            </pre>
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="absolute top-2 right-2"
              onClick={() => onCopy(configSnippet, "Config snippet")}
            >
              Copy
            </Button>
          </div>
        ) : null}
      </div>
    </SectionCard>
  );
}

const GIFT_DURATIONS = [1, 3, 6, 12] as const;

function GiftSection({
  isPro,
  signedIn,
  codes,
  maxMonths,
  duration,
  onDurationChange,
  fresh,
  onDismissFresh,
  busy,
  onGenerate,
  redeemCode,
  onRedeemCodeChange,
  redeemBusy,
  onRedeem,
  onCopy,
}: {
  isPro: boolean;
  signedIn: boolean;
  codes: GiftCodeInfo[];
  maxMonths: number;
  duration: number;
  onDurationChange: (value: number) => void;
  fresh: string | null;
  onDismissFresh: () => void;
  busy: boolean;
  onGenerate: () => void;
  redeemCode: string;
  onRedeemCodeChange: (value: string) => void;
  redeemBusy: boolean;
  onRedeem: () => void;
  onCopy: (value: string, label: string) => void;
}) {
  return (
    <SectionCard
      kicker="Gift codes"
      title="Give Pro to a friend"
      blurb="Gift codes unlock Pro for exactly their duration. Yours can gift up to your own plan length."
    >
      {signedIn && (
        <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
          <Input
            value={redeemCode}
            onChange={(e) => onRedeemCodeChange(e.target.value)}
            placeholder="Have a code? Paste it here, e.g. PRO-XXXX-XXXX"
            aria-label="Gift code to redeem"
            className="font-mono uppercase"
          />
          <Button type="button" disabled={redeemBusy} onClick={onRedeem}>
            {redeemBusy ? "Redeeming…" : "Redeem"}
          </Button>
        </div>
      )}
      {!signedIn ? (
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-border p-4">
          <p className="text-sm text-muted-foreground">Sign in to redeem or create gift codes.</p>
          <Button type="button" asChild>
            <Link to="/login">Sign in</Link>
          </Button>
        </div>
      ) : !isPro ? (
        <div className="mt-4 rounded-lg border border-dashed border-border bg-secondary/40 p-4">
          <p className="text-sm font-medium">Creating codes is a Pro feature</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Upgrade and you can gift 1, 3, 6, or 12 months of Pro — up to your own plan length.
          </p>
          <Button type="button" className="mt-3" asChild>
            <a href="#pro">See Pro plans</a>
          </Button>
        </div>
      ) : (
        <>
          {fresh ? (
            <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
              <p className="text-sm font-medium text-emerald-900">
                Share this code — it works once and expires in 90 days
              </p>
              <p className="mt-2 rounded-md bg-white px-3 py-2 text-center font-mono text-lg font-semibold tracking-widest text-foreground">
                {fresh}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button type="button" size="sm" onClick={() => onCopy(fresh, "Gift code")}>
                  Copy code
                </Button>
                <Button type="button" size="sm" variant="ghost" onClick={onDismissFresh}>
                  Done
                </Button>
              </div>
            </div>
          ) : null}
          <div className="mt-4 grid gap-2 sm:grid-cols-[1fr_auto]">
            <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Gift duration">
              {GIFT_DURATIONS.map((months) => {
                const enabled = months <= maxMonths;
                const selected = duration === months;
                return (
                  <button
                    key={months}
                    type="button"
                    disabled={!enabled}
                    aria-pressed={selected}
                    onClick={() => onDurationChange(months)}
                    title={enabled ? `${months}-month gift` : `Needs a ${months}-month (or longer) plan`}
                    className={`cursor-pointer rounded-full border px-3 py-1.5 text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                      selected
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    {months} mo
                  </button>
                );
              })}
            </div>
            <Button type="button" disabled={busy} onClick={onGenerate}>
              {busy ? "Creating…" : "Generate code"}
            </Button>
          </div>
          {codes.length > 0 ? (
            <ul className="mt-4 divide-y divide-border overflow-hidden rounded-lg border border-border">
              {codes.map((gift) => (
                <li key={gift.id} className="flex flex-wrap items-center gap-3 px-4 py-3">
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-mono text-sm font-semibold tracking-wider">
                      {gift.code}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {gift.durationMonths} month{gift.durationMonths === 1 ? "" : "s"} · expires{" "}
                      {new Date(gift.expiresAt).toLocaleDateString()}
                      {gift.redeemedAt
                        ? ` · redeemed ${new Date(gift.redeemedAt).toLocaleDateString()}`
                        : ""}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      gift.status === "unused"
                        ? "bg-emerald-100 text-emerald-800"
                        : gift.status === "redeemed"
                          ? "bg-secondary text-muted-foreground"
                          : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {gift.status === "unused" ? "Unused" : gift.status === "redeemed" ? "Redeemed" : "Expired"}
                  </span>
                  {gift.status === "unused" ? (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => onCopy(gift.code, "Gift code")}
                    >
                      Copy
                    </Button>
                  ) : null}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm text-muted-foreground">
              No codes yet. Pick a duration and generate your first gift.
            </p>
          )}
        </>
      )}
    </SectionCard>
  );
}

function ReferralSection({
  referral,
  signedIn,
}: {
  referral: ReferralInfo | null;
  signedIn: boolean;
}) {
  const link =
    typeof window !== "undefined" && referral
      ? `${window.location.origin}/?ref=${referral.code}`
      : "";
  if (!signedIn || !referral) {
    return (
      <SectionCard
        kicker="Referrals"
        title="Earn free Pro"
        blurb="Share your link. When a friend signs up and goes Pro, you get a free month."
      >
        {!signedIn ? (
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-border p-4">
            <p className="text-sm text-muted-foreground">Sign in to get your referral link.</p>
            <Button type="button" asChild>
              <Link to="/login">Sign in</Link>
            </Button>
          </div>
        ) : (
          <div className="h-12 animate-pulse rounded-lg bg-muted/60" />
        )}
      </SectionCard>
    );
  }
  return (
    <SectionCard
      kicker="Referrals"
      title="Earn free Pro"
      blurb="Share your link. When a friend signs up and goes Pro — by paying or redeeming a gift — you get 1 free month, stacked on anything you have."
    >
      <div className="flex flex-wrap items-center gap-2 rounded-lg border border-border bg-secondary/40 px-3 py-2">
        <p className="min-w-0 flex-1 truncate font-mono text-xs">{link}</p>
        <CopyLinkButton value={link} label="Referral link" />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-lg border border-border p-3">
          <p className="font-display text-2xl tracking-tight">{referral.signups}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">Signups</p>
        </div>
        <div className="rounded-lg border border-border p-3">
          <p className="font-display text-2xl tracking-tight">{referral.proConversions}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">Went Pro</p>
        </div>
        <div className="rounded-lg border border-border p-3">
          <p className="font-display text-2xl tracking-tight">{referral.monthsEarned}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">Months earned</p>
        </div>
      </div>
    </SectionCard>
  );
}

function CopyLinkButton({ value, label }: { value: string; label: string }) {
  return (
    <Button
      type="button"
      size="sm"
      variant="outline"
      onClick={() => {
        void navigator.clipboard
          .writeText(value)
          .then(() => toast.success(`${label} copied`))
          .catch(() => toast.error(`Could not copy ${label.toLowerCase()}`));
      }}
    >
      Copy
    </Button>
  );
}

function SectionCard({
  kicker,
  title,
  blurb,
  children,
  id,
}: {
  kicker: string;
  title: string;
  blurb?: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className="mt-6 scroll-mt-24 rounded-xl border border-border bg-card p-6 sm:p-7">
      <p className="text-xs tracking-[0.16em] text-muted-foreground uppercase">{kicker}</p>
      <h2 className="mt-1 font-display text-xl tracking-tight">{title}</h2>
      {blurb ? <p className="mt-1 text-sm text-muted-foreground">{blurb}</p> : null}
      <div className="mt-5">{children}</div>
    </section>
  );
}
