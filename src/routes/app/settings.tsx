import { useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useStore } from "@/lib/store/context";

export const Route = createFileRoute("/app/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const { ready, settings, saveSettings } = useStore();
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  if (!ready) return <div className="h-64 animate-pulse rounded-xl bg-muted/60" />;

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

  return (
    <div className="mx-auto max-w-xl">
      <p className="text-xs tracking-[0.16em] text-muted-foreground uppercase">Studio</p>
      <h1 className="font-display text-3xl tracking-tight">Settings</h1>

      <form
        className="mt-8 space-y-5 rounded-xl border border-border bg-card p-6"
        onSubmit={(e) => {
          e.preventDefault();
          toast.success("Settings saved");
        }}
      >
        <label className="grid gap-1.5">
          <Label>Studio name</Label>
          <Input
            value={settings.name}
            onChange={(e) => void saveSettings({ name: e.target.value })}
            placeholder="North Studio"
          />
        </label>
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
          <Label>Address</Label>
          <Textarea
            rows={3}
            value={settings.address || ""}
            onChange={(e) => void saveSettings({ address: e.target.value })}
          />
        </label>
        <label className="grid gap-1.5">
          <Label>Default tax rate (%)</Label>
          <Input
            type="number"
            min={0}
            step="0.01"
            value={settings.defaultTaxRate}
            onChange={(e) => void saveSettings({ defaultTaxRate: Number(e.target.value) })}
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
          <span className="text-xs text-muted-foreground">New invoices use this currency by default.</span>
        </label>

        <div className="rounded-lg border border-border bg-secondary/40 p-4">
          <h2 className="font-display text-xl">Payment methods</h2>
          <div className="mt-4 grid gap-4">
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
            </label>
            <label className="grid gap-1.5">
              <Label>PayPal.me link or email (optional)</Label>
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
            <label className="grid gap-1.5">
              <Label>Bank name (optional)</Label>
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
              <Label>Account name (optional)</Label>
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
              <Label>Account number / IBAN (optional)</Label>
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
              <Label>IFSC / SWIFT (optional)</Label>
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
            <div className="rounded-md border border-dashed border-border bg-background/70 p-3 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">Razorpay</p>
              <p className="mt-1">Optional. Use test-mode keys while testing. The secret is stored locally for this MVP; never share it.</p>
              <Input
                className="mt-3"
                value={settings.paymentMethods?.razorpayKeyId || ""}
                onChange={(e) =>
                  void saveSettings({
                    paymentMethods: { ...(settings.paymentMethods || {}), razorpayKeyId: e.target.value },
                  })
                }
                placeholder="rzp_live_xxxxx"
              />
              <Input
                className="mt-3"
                type="password"
                value={settings.paymentMethods?.razorpayKeySecret || ""}
                onChange={(e) =>
                  void saveSettings({
                    paymentMethods: { ...(settings.paymentMethods || {}), razorpayKeySecret: e.target.value },
                  })
                }
                placeholder="Razorpay Key Secret"
                autoComplete="off"
              />
            </div>
          </div>
        </div>

        <div>
          <Label>Logo</Label>
          <div className="mt-2 flex items-center gap-4">
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
              Upload
            </Button>
            {settings.logoUrl ? (
              <Button type="button" variant="ghost" onClick={() => void saveSettings({ logoUrl: "" })}>
                Remove
              </Button>
            ) : null}
          </div>
        </div>
      </form>

      <section className="mt-8 rounded-xl border border-border bg-card p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-display text-xl">Pro workspace</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Demo toggle. Unlocks recurring invoices, reminders, and removes branding.
            </p>
          </div>
          <Switch
            checked={Boolean(settings.isPro)}
            onCheckedChange={(isPro) => void saveSettings({ isPro })}
          />
        </div>
        {settings.isPro ? (
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
      </section>
    </div>
  );
}
