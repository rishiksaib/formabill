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
  const [serverProSource, setServerProSource] = useState<string | null>(null);
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
  const [mcpCanAccess, setMcpCanAccess] = useState(false);
  const [giftCodes, setGiftCodes] = useState<GiftCodeInfo[]>([]);
  const [giftCanGift, setGiftCanGift] = useState(false);
  const [giftRemaining, setGiftRemaining] = useState(0);
  const [giftProSource, setGiftProSource] = useState<string | null>(null);
  const [giftGrantLabel, setGiftGrantLabel] = useState<string | null>(null);
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
      const status = (await response.json()) as { isPro?: boolean; lifetime?: boolean; proSource?: string | null; configured?: boolean; authenticated?: boolean };
      setServerPro(Boolean(status.isPro));
      setServerLifetime(Boolean(status.lifetime));
      setServerProSource(status.proSource ?? null);
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
      const json = (await response.json()) as { tokens?: McpTokenInfo[]; canAccess?: boolean };
      setMcpTokens(json.tokens ?? []);
      setMcpCanAccess(Boolean(json.canAccess));
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
      const json = (await response.json()) as {
        codes?: GiftCodeInfo[];
        canGift?: boolean;
        giftsRemaining?: number;
        proSource?: string | null;
        grantLabel?: string | null;
      };
      setGiftCodes(json.codes ?? []);
      setGiftCanGift(Boolean(json.canGift));
      setGiftRemaining(Number(json.giftsRemaining ?? 0));
      setGiftProSource(json.proSource ?? null);
      setGiftGrantLabel(json.grantLabel ?? null);
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
        body: JSON.stringify({}),
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
        giftDurationDays?: number;
        error?: string;
      };
      if (!response.ok || !json.ok) throw new Error(json.error || "Could not redeem code");
      setRedeemCode("");
      await loadProStatus();
      await loadGiftCodes();
      const days = Number(json.giftDurationDays ?? 30);
      toast.success(`Pro unlocked for ${days === 30 ? "1 month" : `${days} days`} — enjoy!`);
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

  type RazorpayCheckoutOptions = {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description: string;
    order_id: string;
    prefill?: { name?: string; email?: string };
    theme?: { color?: string };
    modal?: { ondismiss?: () => void };
    handler?: (response: {
      razorpay_payment_id: string;
      razorpay_order_id: string;
      razorpay_signature: string;
    }) => void;
  };
  type RazorpayCheckoutInstance = {
    open: () => void;
    on: (event: string, handler: (response: { error?: { description?: string } }) => void) => void;
  };

  const loadRazorpayCheckoutJs = (): Promise<boolean> => {
    const globalWindow = window as unknown as {
      Razorpay?: new (options: RazorpayCheckoutOptions) => RazorpayCheckoutInstance;
      __fbRazorpayPromise?: Promise<boolean>;
    };
    if (typeof globalWindow.Razorpay !== "undefined") return Promise.resolve(true);
    globalWindow.__fbRazorpayPromise ??= new Promise<boolean>((resolve) => {
      const timer = window.setTimeout(() => resolve(false), 12000);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => {
        window.clearTimeout(timer);
        resolve(typeof globalWindow.Razorpay !== "undefined");
      };
      script.onerror = () => {
        window.clearTimeout(timer);
        resolve(false);
      };
      document.head.appendChild(script);
    });
    return globalWindow.__fbRazorpayPromise;
  };

  const openProFallbackLink = async () => {
    const response = await fetch("/api/pro/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan, method: "link" }),
    });
    const json = (await response.json()) as { shortUrl?: string; error?: string; message?: string };
    if (!response.ok || !json.shortUrl) {
      throw new Error(json.error || json.message || "Pro checkout is unavailable");
    }
    window.location.href = json.shortUrl;
  };

  const startProCheckout = async () => {
    setProBusy(true);
    try {
      const response = await fetch("/api/pro/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, method: "modal" }),
      });
      const json = (await response.json()) as {
        configured?: boolean;
        method?: string;
        orderId?: string;
        keyId?: string;
        amount?: number;
        currency?: string;
        error?: string;
        message?: string;
      };
      if (response.status === 401) {
        toast.message("Sign in to get Pro", {
          description: "Checkout links to your account so we can activate it.",
        });
        await navigate({ to: "/login" });
        return;
      }
      if (
        !response.ok ||
        !json.configured ||
        json.method !== "modal" ||
        !json.orderId ||
        !json.keyId ||
        typeof json.amount !== "number" ||
        !json.currency
      ) {
        throw new Error(json.error || json.message || "Pro checkout is unavailable");
      }
      // In-app overlay (stays on /app/settings). Hosted link only as fallback.
      const loaded = await loadRazorpayCheckoutJs();
      if (!loaded) {
        toast.message("Checkout couldn't load", {
          description: "Opening the secure hosted page instead.",
        });
        await openProFallbackLink();
        return;
      }
      const Razorpay = (window as unknown as NonNullable<typeof globalThis> & {
        Razorpay: new (options: RazorpayCheckoutOptions) => RazorpayCheckoutInstance;
      }).Razorpay;
      const checkout = new Razorpay({
        key: json.keyId,
        amount: json.amount,
        currency: json.currency,
        name: "FormaBill Pro",
        description: plan === "pro_yearly" ? "Pro Yearly — $99/yr" : "Pro Monthly — $11/mo",
        order_id: json.orderId,
        prefill: {
          name: settings.name || undefined,
          email: settings.email || undefined,
        },
        theme: { color: "#1C3D36" },
        modal: {
          ondismiss: () => {
            setProBusy(false);
          },
        },
        handler: (rzpResponse) => {
          // Fast activation attempt; the webhook stays authoritative and the
          // ?pro=success landing re-checks either way.
          void fetch("/api/pro/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderId: rzpResponse.razorpay_order_id,
              paymentId: rzpResponse.razorpay_payment_id,
              signature: rzpResponse.razorpay_signature,
            }),
          }).catch(() => undefined);
          toast.message("Payment received", {
            description: "Activating your Pro workspace…",
          });
          window.location.href = "/app/settings?pro=success";
        },
      });
      checkout.on("payment.failed", (failed) => {
        setProBusy(false);
        toast.error(failed.error?.description || "Payment failed — no charge was made");
      });
      checkout.open();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not start Pro checkout");
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

  const onTestMcpConnection = async (secret: string) => {
    try {
      const response = await fetch("/api/mcp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json, text/event-stream",
          Authorization: `Bearer ${secret}`,
        },
        body: JSON.stringify({ jsonrpc: "2.0", id: "ping-1", method: "tools/list", params: {} }),
      });
      if (!response.ok) throw new Error(`Server answered ${response.status}`);
      const json = (await response.json()) as {
        result?: { tools?: unknown[] };
        error?: { message?: string };
      };
      if (json.error) throw new Error(json.error.message || "Connection failed");
      const count = json.result?.tools?.length ?? 0;
      toast.success(`Connected — ${count} tools available`);
    } catch {
      toast.error("Connection failed — check the URL and token, then retry");
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
        canAccess={mcpCanAccess}
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
        onTest={(value) => void onTestMcpConnection(value)}
      />

      <GiftSection
        isPro={isPro}
        signedIn={authenticated !== false}
        codes={giftCodes}
        canGift={giftCanGift}
        giftsRemaining={giftRemaining}
        proSource={giftProSource}
        grantLabel={giftGrantLabel}
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
            {isPro
              ? serverLifetime
                ? "Pro active · Lifetime"
                : serverProSource === "gift"
                  ? "Pro (gift)"
                  : "Pro active"
              : "Free plan · 5 invoices/mo"}
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
  giftDurationDays: number;
  planType: string | null;
  status: "unused" | "redeemed" | "expired";
  createdAt: string;
  expiresAt: string;
  redeemedAt: string | null;
};

function giftLengthLabel(days: number): string {
  if (days === 30) return "1 month Pro";
  if (days % 30 === 0) return `${days / 30} months Pro`;
  return `${days} days Pro`;
}

type ReferralInfo = {
  code: string;
  signups: number;
  proConversions: number;
  monthsEarned: number;
};

function McpSection({
  isPro,
  canAccess,
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
  onTest,
}: {
  isPro: boolean;
  canAccess: boolean;
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
  onTest: (secret: string) => void;
}) {
  const serverUrl = typeof window !== "undefined" ? `${window.location.origin}/api/mcp` : "/api/mcp";
  const [guide, setGuide] = useState<"opencode" | "claude" | "cursor">("opencode");
  const connected = tokens.length > 0;
  const opencodeSnippet = JSON.stringify(
    {
      $schema: "https://opencode.ai/config.json",
      mcp: {
        formabill: {
          type: "remote",
          url: serverUrl,
          enabled: true,
          oauth: false,
          headers: { Authorization: "Bearer PASTE_YOUR_KEY_HERE" },
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
        blurb="Let OpenCode, Claude, Cursor, or another MCP-compatible AI act on your account."
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

  if (isPro && !canAccess) {
    return (
      <SectionCard
        kicker="AI / MCP"
        title="Connect AI assistants"
        blurb="Let OpenCode, Claude, Cursor, or another MCP-compatible AI act on your account."
      >
        <div className="rounded-lg border border-dashed border-border bg-secondary/40 p-4">
          <p className="text-sm font-medium">Paid subscription required</p>
          <p className="mt-1 text-sm text-muted-foreground">
            AI connection needs a paid Pro subscription — gift and trial grants don&apos;t include
            it. Your Pro features work fully meanwhile.
          </p>
        </div>
      </SectionCard>
    );
  }

  return (
    <SectionCard
      kicker="AI / MCP"
      title="Connect AI assistants"
      blurb="A personal key gives an AI full access to your invoices — it acts as you. Each key is shown once; revoke any key the moment it leaks."
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
            <Button type="button" size="sm" variant="outline" onClick={() => onTest(secret)}>
              Test connection
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
              { value: "opencode", label: "OpenCode" },
              { value: "claude", label: "Claude" },
              { value: "cursor", label: "Cursor" },
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
        {guide === "opencode" ? (
          <div className="mt-3 space-y-2 text-sm text-muted-foreground">
            <p>
              OpenCode connects over remote HTTP — it uses an <span className="font-mono text-xs">mcp</span> block
              with <span className="font-mono text-xs">type: &quot;remote&quot;</span>, not{" "}
              <span className="font-mono text-xs">mcpServers</span>. Add this to your opencode config:
            </p>
            <div className="relative">
              <pre className="overflow-x-auto rounded-md bg-secondary/60 p-3 font-mono text-xs break-all whitespace-pre-wrap">
                {opencodeSnippet}
              </pre>
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="absolute top-2 right-2"
                onClick={() => onCopy(opencodeSnippet, "OpenCode config")}
              >
                Copy
              </Button>
            </div>
            <p>Replace PASTE_YOUR_KEY_HERE, restart OpenCode, then ask it to list your invoices.</p>
          </div>
        ) : null}
        {guide === "claude" ? (
          <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
            <li>Generate a token above and copy it.</li>
            <li>
              Claude Desktop → Settings → Connectors → Add custom connector: paste the server URL
              above, add header <span className="font-mono text-xs">Authorization</span> with value{" "}
              <span className="font-mono text-xs">Bearer YOUR_TOKEN</span>. Remote HTTP is all our
              endpoint speaks — no stdio proxy needed.
            </li>
            <li>
              Claude Code terminal:{" "}
              <span className="font-mono text-xs">claude mcp add --transport http formabill URL --header &quot;Authorization: Bearer KEY&quot;</span>
            </li>
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
      </div>
    </SectionCard>
  );
}

function GiftSection({
  isPro,
  signedIn,
  codes,
  canGift,
  giftsRemaining,
  proSource,
  grantLabel,
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
  canGift: boolean;
  giftsRemaining: number;
  proSource: string | null;
  grantLabel: string | null;
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
      blurb="Paid subscribers get one gift code per billing period. Redeeming unlocks Pro for a fixed stretch — never more gifting rights."
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
            Paid subscribers get one gift code per billing period — 7 days of Pro on monthly, a
            full month on yearly.
          </p>
          <Button type="button" className="mt-3" asChild>
            <a href="#pro">See Pro plans</a>
          </Button>
        </div>
      ) : (
        <>
          {proSource === "gift" ? (
        <div className="rounded-lg border border-dashed border-border bg-secondary/40 p-4">
          <p className="text-sm font-medium">Pro (gift) — sharing codes not included</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Gifted Pro unlocks everything for you, but only paid subscribers can create new gift
            codes.
          </p>
        </div>
      ) : null}
      {isPro && canGift ? (
        <p className="text-sm text-muted-foreground">
          {giftsRemaining} gift code{giftsRemaining === 1 ? "" : "s"} left
          {proSource === "subscription" ? " — refills with each Pro payment" : ""}.
        </p>
      ) : null}
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
          {canGift ? (
            <div className="mt-4 flex flex-wrap items-center gap-3 rounded-lg border border-border p-4">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{grantLabel ?? "1 gift code"}</p>
                <p className="text-xs text-muted-foreground">
                  Single-use · expires in 90 days · {giftsRemaining} left
                </p>
              </div>
              <Button type="button" disabled={busy} onClick={onGenerate}>
                {busy ? "Creating…" : "Generate code"}
              </Button>
            </div>
          ) : null}
          {codes.length > 0 ? (
            <ul className="mt-4 divide-y divide-border overflow-hidden rounded-lg border border-border">
              {codes.map((gift) => (
                <li key={gift.id} className="flex flex-wrap items-center gap-3 px-4 py-3">
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-mono text-sm font-semibold tracking-wider">
                      {gift.code}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {giftLengthLabel(gift.giftDurationDays ?? gift.durationMonths * 30)} · expires{" "}
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
          ) : canGift ? (
            <p className="mt-4 text-sm text-muted-foreground">
              No codes yet. Pick a duration and generate your first gift.
            </p>
          ) : null}
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
