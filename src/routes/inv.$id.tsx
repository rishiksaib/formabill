import { useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Copy, Download, Loader2, Link2, FileQuestion } from "lucide-react";
import { toast } from "sonner";
import { Logo } from "@/components/brand/logo";
import { InvoiceDocument } from "@/components/invoice/document";
import { Button } from "@/components/ui/button";
import { getPublicInvoice } from "@/lib/invoice.functions";
import type { Invoice } from "@/lib/types";
import { formatMoney, invoiceTotal } from "@/lib/utils";

export const Route = createFileRoute("/inv/$id")({
  loader: async ({ params }) => {
    const invoice = await getPublicInvoice({ data: { id: params.id } });
    return { invoice };
  },
  component: PublicInvoicePage,
});

function PublicInvoicePage() {
  const { invoice: initial } = Route.useLoaderData();
  const invoice: Invoice | null = initial;
  const [busy, setBusy] = useState<"pdf" | null>(null);
  const total = invoice ? invoiceTotal(invoice.lineItems, invoice.taxRate) : 0;

  if (!invoice) {
    return (
      <main className="flex min-h-dvh flex-col items-center justify-center bg-slate-50 px-6 py-12 text-center">
        <Logo to="/" />
        <div className="mt-8 w-full max-w-sm rounded-2xl border border-border bg-white p-8 shadow-sm">
          <FileQuestion className="mx-auto size-10 text-muted-foreground" aria-hidden="true" />
          <h1 className="mt-4 font-display text-3xl tracking-tight">Invoice not found</h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            This link may not have been published yet. Ask the sender to tap Save or Copy link and
            share the fresh URL — or check for typos.
          </p>
          <div className="mt-6 grid gap-2">
            <Button asChild>
              <Link to="/">Back home</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/app">Create an invoice</Link>
            </Button>
          </div>
        </div>
      </main>
    );
  }

  const branded = true;
  const paid = invoice.status === "paid";
  const paymentMethods = invoice.paymentMethods || {};
  const paypalValue = paymentMethods.paypalEmail?.trim() || "";
  const paypalLink = paypalValue
    ? /^https?:\/\//i.test(paypalValue)
      ? paypalValue
      : /^paypal\.me\//i.test(paypalValue)
        ? `https://www.${paypalValue}`
        : `mailto:${paypalValue}`
    : "";
  const hasBank = Boolean(
    paymentMethods.bankName ||
      paymentMethods.bankAccountName ||
      paymentMethods.bankAccount ||
      paymentMethods.bankIfscSwift,
  );
  const upiId = paymentMethods.upiId?.trim() || "";
  const currency = invoice.currency || "USD";
  const isInr = currency === "INR";

  const upiQuery = new URLSearchParams({
    pn: invoice.client.name || invoice.fromName,
    am: total.toFixed(2),
    cu: "INR",
    tn: invoice.number,
  });
  const upiLink = isInr && upiId
    ? `upi://pay?pa=${encodeURIComponent(upiId).replace(/%40/gi, "@")}\u0026${upiQuery.toString()}`
    : "";

  const copyUpi = async () => {
    if (!upiId) return;
    try {
      await navigator.clipboard.writeText(upiId);
      toast.success("UPI ID copied");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not copy UPI ID");
    }
  };

  const copyPageLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Invoice link copied");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not copy link");
    }
  };

  return (
    <main className="min-h-dvh min-w-0 overflow-x-hidden bg-slate-50 px-3 py-4 sm:px-6 sm:py-10">
      <div className="mx-auto w-full min-w-0 max-w-md sm:max-w-3xl">
        <div className="mb-4 rounded-2xl border border-border bg-white p-4 shadow-sm sm:mb-6 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="font-display text-lg text-foreground">{invoice.fromName || "Invoice"}</p>
              <p className="break-words text-xs text-muted-foreground">#{invoice.number}</p>
            </div>
            <div className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-medium tracking-[0.14em] text-emerald-700 uppercase">
              {paid ? "Paid" : "Open"}
            </div>
          </div>

          <div className="mt-4 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-700 p-4 text-white shadow-md">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-[0.14em] text-emerald-100">{paid ? "Amount paid" : "Amount due"}</p>
                <p className="mt-2 break-words text-3xl font-semibold tabular-nums">{formatMoney(total, invoice.currency || "USD")}</p>
              </div>
              <div className="rounded-full bg-white/15 px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-emerald-50">
                {invoice.status}
              </div>
            </div>

            {paid ? (
              <div className="mt-5 rounded-xl border border-white/25 bg-white/15 px-4 py-5 text-center">
                <p className="text-xs font-medium tracking-[0.2em] text-emerald-100 uppercase">Payment received</p>
                <p className="mt-2 text-3xl font-semibold tracking-tight text-white">Paid</p>
              </div>
            ) : null}

            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {!paid && invoice.paymentLinkUrl ? (
                <a
                  href={invoice.paymentLinkUrl}
                  className="flex h-12 items-center justify-center rounded-md bg-white px-4 text-sm font-medium text-emerald-700 hover:bg-white/90"
                >
                  Pay now
                  <ArrowUpRight className="ml-2 size-4" />
                </a>
              ) : null}
              <Button
                variant="outline"
                className="h-12 border-white/60 bg-transparent text-white hover:bg-white/10"
                onClick={async () => {
                  setBusy("pdf");
                  try {
                    const { downloadInvoicePdf } = await import("@/lib/pdf");
                    await downloadInvoicePdf(invoice, branded);
                  } catch (err) {
                    toast.error(err instanceof Error ? err.message : "PDF failed");
                  } finally {
                    setBusy(null);
                  }
                }}
                disabled={busy !== null}
              >
                {busy === "pdf" ? <Loader2 className="animate-spin" /> : <Download className="mr-2" />}
                PDF
              </Button>
            </div>
          </div>

          {!paid && isInr && upiId ? (
            <div className="mt-4 rounded-xl border border-dashed border-emerald-200 bg-emerald-50 p-3">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-emerald-700">UPI payment</p>
                  <p className="mt-1 break-all font-mono text-sm text-emerald-900">{upiId}</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => void copyUpi()}>
                  <Copy className="mr-1 size-3.5" />
                  Copy
                </Button>
              </div>
              <a
                href={upiLink}
                className="mt-3 flex h-11 items-center justify-center rounded-md bg-emerald-600 px-4 text-sm font-medium text-white"
              >
                Pay via UPI
                <ArrowUpRight className="ml-2 size-4" />
              </a>
            </div>
          ) : null}

          {!paid && !isInr && upiId ? (
            <div className="mt-4 rounded-xl border border-dashed border-amber-200 bg-amber-50 p-3">
              <p className="text-[10px] uppercase tracking-[0.14em] text-amber-700">UPI unavailable</p>
              <p className="mt-1 text-sm text-amber-900">UPI is available for INR invoices only.</p>
            </div>
          ) : null}

          {!paid && paypalValue ? (
            <div className="mt-4 rounded-xl border border-sky-200 bg-sky-50 p-3 text-sm text-sky-950">
              <p className="text-[10px] uppercase tracking-[0.14em] text-sky-700">PayPal</p>
              <p className="mt-1 break-all">{paypalValue}</p>
              <a
                href={paypalLink}
                className="mt-3 flex h-11 items-center justify-center rounded-md bg-sky-700 px-4 text-sm font-medium text-white"
              >
                Pay with PayPal
                <ArrowUpRight className="ml-2 size-4" />
              </a>
            </div>
          ) : null}

          {!paid && hasBank ? (
            <div className="mt-4 space-y-2 rounded-xl border border-border bg-secondary/40 p-3 text-sm text-muted-foreground">
              {paymentMethods.paypalEmail ? (
                <p>
                  <span className="font-medium text-foreground">PayPal:</span> {paymentMethods.paypalEmail}
                </p>
              ) : null}
              {paymentMethods.bankName ? (
                <p>
                  <span className="font-medium text-foreground">Bank:</span> {paymentMethods.bankName}
                </p>
              ) : null}
              {paymentMethods.bankAccountName ? (
                <p>
                  <span className="font-medium text-foreground">Account name:</span> {paymentMethods.bankAccountName}
                </p>
              ) : null}
              {paymentMethods.bankAccount ? (
                <p>
                  <span className="font-medium text-foreground">Account:</span> <span className="break-all">{paymentMethods.bankAccount}</span>
                </p>
              ) : null}
              {paymentMethods.bankIfscSwift ? (
                <p>
                  <span className="font-medium text-foreground">IFSC / SWIFT:</span> {paymentMethods.bankIfscSwift}
                </p>
              ) : null}
            </div>
          ) : null}
        </div>

        <InvoiceDocument invoice={invoice} branded={branded} className="rounded-xl" />

        {!paid ? (
          <div className="mt-4 flex items-center justify-between gap-2">
            <p className="text-xs text-muted-foreground">
              Payment goes directly to the freelancer's UPI, bank, PayPal, or Razorpay account.
            </p>
            <Button variant="ghost" size="sm" onClick={copyPageLink} className="whitespace-nowrap">
              <Link2 className="mr-1 size-3.5" />
              Copy link
            </Button>
          </div>
        ) : (
          <p className="mt-4 text-center text-sm text-emerald-700 font-medium">
            This invoice is paid. Thank you.
          </p>
        )}
      </div>
    </main>
  );
}
