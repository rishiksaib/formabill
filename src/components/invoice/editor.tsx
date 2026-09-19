import { type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Copy, Download, Link2, Loader2, Plus, Trash2, Wallet } from "lucide-react";
import { toast } from "sonner";
import { InvoiceDocument } from "@/components/invoice/document";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { applySettingsToInvoice, createDraftInvoice, emptyLineItem } from "@/lib/invoice-defaults";
import { useStore } from "@/lib/store/context";
import type { Invoice, RecurrenceFrequency } from "@/lib/types";
import { formatMoney, invoiceTotal } from "@/lib/utils";

async function downloadPdf(invoice: Invoice, branded: boolean) {
  const { downloadInvoicePdf } = await import("@/lib/pdf");
  await downloadInvoicePdf(invoice, branded);
}

function publicUrl(id: string) {
  return `${window.location.origin}/inv/${id}`;
}

function shareText(invoice: Invoice) {
  const amount = formatMoney(invoiceTotal(invoice.lineItems, invoice.taxRate), invoice.currency || "USD");
  return [
    `Hello ${invoice.client.name || "there"},`,
    `Your invoice ${invoice.number} is ready for payment.`,
    `Amount due: ${amount}`,
    `View and pay: ${publicUrl(invoice.id)}`,
  ].join("\n");
}

function whatsappShareUrl(invoice: Invoice) {
  return `https://wa.me/?text=${encodeURIComponent(shareText(invoice))}`;
}

function emailShareUrl(invoice: Invoice) {
  const subject = encodeURIComponent(`Invoice ${invoice.number} from ${invoice.fromName || "FormaBill"}`);
  const body = encodeURIComponent(`${shareText(invoice)}\n\nThanks,\n${invoice.fromName || "The team"}`);
  return `mailto:?subject=${subject}&body=${body}`;
}

export function InvoiceEditor({ invoiceId }: { invoiceId?: string }) {
  const navigate = useNavigate();
  const { ready, settings, invoices, clients, saveInvoice, publishInvoice, updateInvoiceStatus } = useStore();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [busy, setBusy] = useState<"save" | "link" | "pay" | "pdf" | null>(null);
  const [publishError, setPublishError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
  const [autoSaveError, setAutoSaveError] = useState<string | null>(null);
  const saveTimer = useRef<number | null>(null);
  const session = useRef<string | null>(null);
  const dirty = useRef(false);

  useEffect(() => {
    if (!ready) return;
    const key = invoiceId ?? "new";
    // Init once per editor session so later settings/invoice-list updates
    // never wipe in-progress edits. New drafts still prefill From +
    // payment methods + currency + tax from current Settings.
    if (session.current === key) return;
    if (invoiceId) {
      const found = invoices.find((i) => i.id === invoiceId);
      if (found) {
        setInvoice(found);
        session.current = invoiceId;
        dirty.current = false;
        return;
      }
    }
    const draft = applySettingsToInvoice(
      createDraftInvoice(
        settings,
        invoices.map((i) => i.number),
      ),
      settings,
    );
    setInvoice(draft);
    session.current = "new";
    dirty.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, invoiceId]);


  useEffect(() => {
    if (!invoice || !dirty.current) return;
    if (saveTimer.current) window.clearTimeout(saveTimer.current);
    saveTimer.current = window.setTimeout(() => {
      setIsSaving(true);
      void saveInvoice(invoice).then(
        (saved) => {
          setIsSaving(false);
          setAutoSaveError(null);
          setLastSavedAt(new Date().toISOString());
          if (!invoiceId) {
            session.current = saved.id;
            void navigate({ to: "/app", search: { id: saved.id }, replace: true });
          }
        },
        (error) => {
          setIsSaving(false);
          setAutoSaveError(error instanceof Error ? error.message : "Auto-save failed");
        },
      );
    }, 700);
    return () => {
      if (saveTimer.current) window.clearTimeout(saveTimer.current);
    };
  }, [invoice, saveInvoice, invoiceId, navigate]);

  const total = useMemo(
    () => (invoice ? invoiceTotal(invoice.lineItems, invoice.taxRate) : 0),
    [invoice],
  );

  if (!ready || !invoice) {
    return <div className="h-96 animate-pulse rounded-xl bg-muted/60" />;
  }

  const branded = !settings.isPro;
  const patch = (partial: Partial<Invoice>) => {
    dirty.current = true;
    setInvoice((prev) => (prev ? { ...prev, ...partial } : prev));
  };

  const persistNow = async () => {
    if (saveTimer.current) window.clearTimeout(saveTimer.current);
    dirty.current = false;
    const stamped: Invoice = {
      ...invoice,
      currency: invoice.currency || settings.defaultCurrency || "USD",
      taxRate: invoice.taxRate ?? settings.defaultTaxRate ?? 0,
      paymentMethods: invoice.paymentMethods ?? settings.paymentMethods,
    };
    setInvoice(stamped);
    const saved = await saveInvoice(stamped);
    setLastSavedAt(new Date().toISOString());
    return saved;
  };

  const onSave = async () => {
    setBusy("save");
    try {
      const saved = await persistNow();
      await publishInvoice(saved);
      setPublishError(null);
      toast.success("Invoice saved and published");
      session.current = saved.id;
      await navigate({ to: "/app", search: { id: saved.id }, replace: true });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Save failed";
      setPublishError(message);
      toast.error(message);
    } finally {
      setBusy(null);
    }
  };

  const onCopyLink = async () => {
    setBusy("link");
    try {
      const saved = await persistNow();
      const published = await publishInvoice({
        ...saved,
        paymentMethods: saved.paymentMethods ?? settings.paymentMethods,
        status: saved.status === "paid" ? "paid" : "sent",
      });
      setInvoice(published);
      setPublishError(null);
      session.current = published.id;
      await navigator.clipboard.writeText(publicUrl(published.id));
      toast.success("Public link copied");
      await navigate({ to: "/app", search: { id: published.id }, replace: true });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not copy link";
      setPublishError(`Copy link failed: ${message}`);
      toast.error(message);
    } finally {
      setBusy(null);
    }
  };

  const onShareWhatsApp = async () => {
    setBusy("link");
    try {
      const saved = await persistNow();
      const published = await publishInvoice({
        ...saved,
        paymentMethods: saved.paymentMethods ?? settings.paymentMethods,
        status: saved.status === "paid" ? "paid" : "sent",
      });
      setInvoice(published);
      setPublishError(null);
      session.current = published.id;
      window.open(whatsappShareUrl(published), "_blank", "noopener,noreferrer");
      toast.success("WhatsApp share ready");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not share invoice";
      setPublishError(`WhatsApp share failed: ${message}`);
      toast.error(message);
    } finally {
      setBusy(null);
    }
  };

  const onShareEmail = async () => {
    setBusy("link");
    try {
      const saved = await persistNow();
      const published = await publishInvoice({
        ...saved,
        paymentMethods: saved.paymentMethods ?? settings.paymentMethods,
        status: saved.status === "paid" ? "paid" : "sent",
      });
      setInvoice(published);
      setPublishError(null);
      session.current = published.id;
      window.location.href = emailShareUrl(published);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not share invoice";
      setPublishError(`Email share failed: ${message}`);
      toast.error(message);
    } finally {
      setBusy(null);
    }
  };

  const onPdf = async () => {
    setBusy("pdf");
    try {
      await downloadPdf(invoice, branded);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "PDF failed");
    } finally {
      setBusy(null);
    }
  };

  const onGetPaid = async () => {
    if (!invoice.client.email.trim()) {
      toast.error("Add a client email before collecting payment");
      return;
    }
    setBusy("pay");
    try {
      const saved = await persistNow();
      const published = await publishInvoice({
        ...saved,
        status: saved.status === "paid" ? "paid" : "sent",
      });
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          invoiceId: published.id,
          razorpayKeyId: settings.paymentMethods?.razorpayKeyId,
          razorpayKeySecret: settings.paymentMethods?.razorpayKeySecret,
        }),
      });
      const json = (await res.json()) as {
        error?: string;
        demo?: boolean;
        short_url?: string;
        invoice?: Invoice;
      };
      if (!res.ok) throw new Error(json.error || "Checkout failed");
      if (json.invoice) setInvoice(json.invoice);
      session.current = published.id;
      setPublishError(null);
      await navigate({ to: "/app", search: { id: published.id }, replace: true });
      if (json.demo) {
        toast.message("Razorpay is not connected", {
          description: "Add UPI in Settings or connect Razorpay",
        });
        return;
      }
      if (json.short_url) window.open(json.short_url, "_blank", "noopener,noreferrer");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Payment link failed";
      setPublishError(`Get paid failed: ${message}`);
      toast.error(message);
    } finally {
      setBusy(null);
    }
  };

  const setStatus = async (nextStatus: Invoice["status"]) => {
    try {
      const saved = await persistNow();
      const published = await updateInvoiceStatus(saved.id, nextStatus);
      if (!published) return;
      setInvoice(published);
      toast.success(`Invoice marked as ${nextStatus}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not update invoice status");
    }
  };

  const effectiveCurrency = invoice.currency || settings.defaultCurrency || "USD";
  const saveStateLabel = isSaving
    ? "Saving…"
    : autoSaveError
      ? `Save failed — ${autoSaveError}. Will retry on next edit.`
      : dirty.current
        ? "Unsaved changes…"
        : lastSavedAt
          ? `Saved ${new Date(lastSavedAt).toLocaleTimeString()}`
          : "Auto-save on";

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
      <section className="rounded-xl border border-border bg-card p-5 shadow-paper sm:p-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs tracking-[0.16em] text-muted-foreground uppercase">Editor</p>
            <h1 className="font-display text-2xl tracking-tight">{invoice.number}</h1>
            <p className="mt-1 text-xs text-muted-foreground" role="status">
              {saveStateLabel}
            </p>
          </div>
          <Badge variant={invoice.status}>{invoice.status}</Badge>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Invoice number">
            <Input value={invoice.number} onChange={(e) => patch({ number: e.target.value })} />
          </Field>
          <Field label="Due date">
            <Input type="date" value={invoice.dueDate} onChange={(e) => patch({ dueDate: e.target.value })} />
          </Field>
        </div>

        <h2 className="mt-8 mb-3 text-sm font-medium">From</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Studio name">
            <Input value={invoice.fromName} onChange={(e) => patch({ fromName: e.target.value })} />
          </Field>
          <Field label="Email">
            <Input type="email" value={invoice.fromEmail} onChange={(e) => patch({ fromEmail: e.target.value })} />
          </Field>
        </div>
        <Field label="Address" className="mt-4">
          <Textarea
            rows={2}
            value={invoice.fromAddress || ""}
            onChange={(e) => patch({ fromAddress: e.target.value })}
          />
        </Field>

        <h2 className="mt-8 mb-3 text-sm font-medium">Bill to</h2>
        {clients.length > 0 ? (
          <Field label="Existing client" className="mb-4">
            <select
              className="flex h-11 w-full rounded-md border border-input bg-card px-3 text-sm"
              value=""
              onChange={(e) => {
                const c = clients.find((cl) => cl.id === e.target.value);
                if (!c) return;
                patch({ client: { id: c.id, name: c.name, email: c.email } });
              }}
            >
              <option value="">Select a saved client</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name || c.email}
                </option>
              ))}
            </select>
          </Field>
        ) : null}
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Client name">
            <Input
              value={invoice.client.name}
              onChange={(e) => patch({ client: { ...invoice.client, name: e.target.value } })}
            />
          </Field>
          <Field label="Client email">
            <Input
              type="email"
              value={invoice.client.email}
              onChange={(e) => patch({ client: { ...invoice.client, email: e.target.value } })}
            />
          </Field>
        </div>

        <div className="mt-8 mb-3 flex items-center justify-between">
          <h2 className="text-sm font-medium">Line items</h2>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => patch({ lineItems: [...invoice.lineItems, emptyLineItem()] })}
          >
            <Plus /> Add
          </Button>
        </div>
        <div className="space-y-3">
          {invoice.lineItems.map((item, index) => (
            <div key={item.id} className="grid grid-cols-12 gap-2">
              <Input
                className="col-span-12 sm:col-span-6"
                placeholder="Description"
                aria-label="Line item description"
                value={item.description}
                onChange={(e) => {
                  const lineItems = [...invoice.lineItems];
                  lineItems[index] = { ...item, description: e.target.value };
                  patch({ lineItems });
                }}
              />
              <Input
                className="col-span-4 sm:col-span-2"
                type="number"
                min={0}
                step="1"
                value={item.quantity}
                onChange={(e) => {
                  const lineItems = [...invoice.lineItems];
                  lineItems[index] = { ...item, quantity: Number(e.target.value) };
                  patch({ lineItems });
                }}
              />
              <Input
                className="col-span-6 sm:col-span-3"
                type="number"
                min={0}
                step="0.01"
                value={item.rate}
                onChange={(e) => {
                  const lineItems = [...invoice.lineItems];
                  lineItems[index] = { ...item, rate: Number(e.target.value) };
                  patch({ lineItems });
                }}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="col-span-2 size-11 sm:col-span-1"
                onClick={() =>
                  patch({
                    lineItems:
                      invoice.lineItems.length === 1
                        ? [emptyLineItem()]
                        : invoice.lineItems.filter((row) => row.id !== item.id),
                  })
                }
                aria-label="Remove line"
              >
                <Trash2 />
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Field label="Currency">
            <select
              className="flex h-11 w-full rounded-md border border-input bg-card px-3 text-sm"
              value={effectiveCurrency}
              onChange={(e) => patch({ currency: e.target.value })}
            >
              <option value="USD">USD — US Dollar</option>
              <option value="EUR">EUR — Euro</option>
              <option value="GBP">GBP — Pound Sterling</option>
              <option value="INR">INR — Indian Rupee</option>
              <option value="AUD">AUD — Australian Dollar</option>
              <option value="CAD">CAD — Canadian Dollar</option>
              <option value="SGD">SGD — Singapore Dollar</option>
            </select>
            <span className="text-xs text-muted-foreground">All amounts use this currency.</span>
          </Field>
          <Field label="Tax rate (%)">
            <Input
              type="number"
              min={0}
              step="0.01"
              value={invoice.taxRate}
              onChange={(e) => patch({ taxRate: Number(e.target.value) })}
            />
            <span className="text-xs text-muted-foreground">Hidden on preview when 0%.</span>
          </Field>
          <div className="flex items-end justify-between rounded-md border border-border bg-secondary/50 px-3 py-2 sm:col-span-2">
            <span className="text-xs text-muted-foreground">Total</span>
            <span className="font-medium tabular-nums">
              {formatMoney(total, effectiveCurrency)}
            </span>
          </div>
        </div>

        <Field label="Notes" className="mt-4">
          <Textarea
            rows={3}
            placeholder="Payment via UPI, cards, or netbanking. Thank you."
            value={invoice.notes}
            onChange={(e) => patch({ notes: e.target.value })}
          />
        </Field>

        <div className="mt-8 rounded-lg border border-border bg-secondary/40 p-4">
          <h2 className="text-sm font-medium">Payment details</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            These details are shown to your client. Money goes directly to your UPI, bank, or PayPal account.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="UPI ID">
              <Input
                value={invoice.paymentMethods?.upiId || ""}
                onChange={(e) => patch({ paymentMethods: { ...(invoice.paymentMethods || {}), upiId: e.target.value } })}
                placeholder="yourname@upi"
              />
              <p className="text-xs text-muted-foreground">Only shown on public page for INR invoices</p>
            </Field>
            <Field label="PayPal.me link or email">
              <Input
                value={invoice.paymentMethods?.paypalEmail || ""}
                onChange={(e) => patch({ paymentMethods: { ...(invoice.paymentMethods || {}), paypalEmail: e.target.value } })}
                placeholder="paypal.me/yourname or email"
              />
            </Field>
            <Field label="Bank name">
              <Input
                value={invoice.paymentMethods?.bankName || ""}
                onChange={(e) => patch({ paymentMethods: { ...(invoice.paymentMethods || {}), bankName: e.target.value } })}
                placeholder="HDFC Bank"
              />
            </Field>
            <Field label="Account name">
              <Input
                value={invoice.paymentMethods?.bankAccountName || ""}
                onChange={(e) => patch({ paymentMethods: { ...(invoice.paymentMethods || {}), bankAccountName: e.target.value } })}
                placeholder="Your name or business"
              />
            </Field>
            <Field label="Account number / IBAN">
              <Input
                value={invoice.paymentMethods?.bankAccount || ""}
                onChange={(e) => patch({ paymentMethods: { ...(invoice.paymentMethods || {}), bankAccount: e.target.value } })}
                placeholder="Acc. no / IBAN"
              />
            </Field>
            <Field label="IFSC / SWIFT">
              <Input
                value={invoice.paymentMethods?.bankIfscSwift || ""}
                onChange={(e) => patch({ paymentMethods: { ...(invoice.paymentMethods || {}), bankIfscSwift: e.target.value } })}
                placeholder="IFSC or SWIFT code"
              />
            </Field>
          </div>
        </div>

        <div className="mt-8 rounded-lg border border-border bg-secondary/40 p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium">Recurring invoice</p>
              <p className="text-xs text-muted-foreground">
                {settings.isPro
                  ? "Generate the next invoice automatically."
                  : "Pro feature — Get Pro in Settings."}
              </p>
            </div>
            <Switch
              checked={Boolean(invoice.recurrence?.enabled)}
              disabled={!settings.isPro}
              onCheckedChange={(enabled) =>
                patch({
                  recurrence: {
                    enabled,
                    frequency: invoice.recurrence?.frequency || "monthly",
                    nextRunAt: enabled
                      ? new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
                      : invoice.recurrence?.nextRunAt,
                    endDate: invoice.recurrence?.endDate,
                  },
                })
              }
            />
          </div>
          {settings.isPro && invoice.recurrence?.enabled ? (
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Field label="Frequency">
                <select
                  className="flex h-11 w-full rounded-md border border-input bg-card px-3 text-sm"
                  value={invoice.recurrence.frequency}
                  onChange={(e) =>
                    patch({
                      recurrence: {
                        ...invoice.recurrence!,
                        frequency: e.target.value as RecurrenceFrequency,
                      },
                    })
                  }
                >
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </Field>
              <Field label="End date (optional)">
                <Input
                  type="date"
                  value={invoice.recurrence.endDate?.slice(0, 10) || ""}
                  onChange={(e) =>
                    patch({
                      recurrence: {
                        ...invoice.recurrence!,
                        endDate: e.target.value || undefined,
                      },
                    })
                  }
                />
              </Field>
              <label className="col-span-full flex items-center justify-between gap-3 text-sm">
                <span>Remind before due date</span>
                <Switch
                  checked={Boolean(invoice.reminderEnabled)}
                  onCheckedChange={(reminderEnabled) => patch({ reminderEnabled })}
                />
              </label>
            </div>
          ) : null}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
          <Button className="w-full sm:w-auto" onClick={() => void onSave()} disabled={busy !== null}>
            {busy === "save" ? <Loader2 className="animate-spin" /> : null}
            Save
          </Button>
          <Button
            className="w-full sm:w-auto"
            variant="outline"
            onClick={() => void onCopyLink()}
            disabled={busy !== null}
            title="Save, publish, then copy the public link"
          >
            {busy === "link" ? <Loader2 className="animate-spin" /> : <Copy />}
            Copy link
          </Button>
          <Button
            className="w-full sm:w-auto"
            variant="outline"
            onClick={() => void onShareWhatsApp()}
            disabled={busy !== null}
            title="Save, publish, then open WhatsApp share"
          >
            {busy === "link" ? <Loader2 className="animate-spin" /> : null}
            WhatsApp
          </Button>
          <Button
            className="w-full sm:w-auto"
            variant="outline"
            onClick={() => void onShareEmail()}
            disabled={busy !== null}
            title="Save, publish, then open email share"
          >
            {busy === "link" ? <Loader2 className="animate-spin" /> : null}
            Email
          </Button>
          <Button className="w-full sm:w-auto" variant="outline" onClick={() => void onPdf()} disabled={busy !== null}>
            {busy === "pdf" ? <Loader2 className="animate-spin" /> : <Download />}
            PDF
          </Button>
          <Button className="w-full sm:w-auto" onClick={() => void onGetPaid()} disabled={busy !== null}>
            {busy === "pay" ? <Loader2 className="animate-spin" /> : <Wallet />}
            Get paid
          </Button>
        </div>
        {publishError ? (
          <p className="mt-3 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive" role="alert">
            {publishError}
          </p>
        ) : null}

        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Invoice status">
          {(
            [
              { value: "draft", label: "Draft" },
              { value: "sent", label: "Sent" },
              { value: "paid", label: "Paid" },
            ] as const
          ).map((s) => (
            <Button
              key={s.value}
              variant={invoice.status === s.value ? "default" : "secondary"}
              size="sm"
              aria-pressed={invoice.status === s.value}
              onClick={() => void setStatus(s.value)}
            >
              {s.label}
              {invoice.status === s.value ? " •" : ""}
            </Button>
          ))}
        </div>
        <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Link2 className="size-3.5" /> Auto-saves locally. Save / copy link / get paid publishes a public page.
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          Payment goes directly to your UPI, bank, or PayPal account. Mark as paid after you receive the money; Razorpay is optional.
        </p>
      </section>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <p className="mb-3 hidden text-xs tracking-[0.16em] text-muted-foreground uppercase lg:block">
          Live preview
        </p>
        <InvoiceDocument
          invoice={{ ...invoice, currency: effectiveCurrency }}
          branded={branded}
          className="rounded-xl"
        />
      </aside>
    </div>
  );
}

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={`grid gap-1.5 ${className ?? ""}`}>
      <Label>{label}</Label>
      {children}
    </label>
  );
}
