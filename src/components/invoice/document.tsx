import type { Invoice } from "@/lib/types";
import {
  cn,
  formatDate,
  formatMoney,
  invoiceSubtotal,
  invoiceTax,
  invoiceTotal,
  lineAmount,
} from "@/lib/utils";

export function InvoiceDocument({
  invoice,
  branded = true,
  className,
}: {
  invoice: Invoice;
  branded?: boolean;
  className?: string;
}) {
  const currency = invoice.currency || "USD";
  const sub = invoiceSubtotal(invoice.lineItems);
  const tax = invoiceTax(invoice.lineItems, invoice.taxRate);
  const total = invoiceTotal(invoice.lineItems, invoice.taxRate);

  return (
    <article
      className={cn(
        "flex min-h-[640px] w-full min-w-0 flex-col bg-paper text-ink shadow-paper",
        className,
      )}
    >
      <header className="flex items-start justify-between gap-4 border-b border-border px-5 py-6 sm:px-10 sm:py-8">
        <div className="min-w-0">
          {invoice.logoUrl ? (
            <img
              src={invoice.logoUrl}
              alt=""
              className="mb-4 max-h-12 max-w-40 object-contain"
            />
          ) : null}
          <p className="font-display text-xl tracking-tight">{invoice.fromName || "Your studio"}</p>
          {invoice.fromEmail ? (
            <p className="mt-1 text-sm text-muted-foreground">{invoice.fromEmail}</p>
          ) : null}
          {invoice.fromAddress ? (
            <p className="mt-1 max-w-xs whitespace-pre-line text-sm text-muted-foreground">
              {invoice.fromAddress}
            </p>
          ) : null}
        </div>
        <div className="text-right">
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Invoice
          </p>
          <p className="mt-1 font-mono text-sm tabular-nums">{invoice.number}</p>
          <p className="mt-4 text-xs text-muted-foreground">Due {formatDate(invoice.dueDate)}</p>
        </div>
      </header>

      <div className="grid gap-6 px-5 py-6 sm:grid-cols-2 sm:gap-8 sm:px-10 sm:py-8">
        <div>
          <p className="text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">From</p>
          <p className="mt-2 text-sm font-medium">{invoice.fromName || "—"}</p>
          <p className="text-sm text-muted-foreground">{invoice.fromEmail || "—"}</p>
        </div>
        <div>
          <p className="text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">
            Bill to
          </p>
          <p className="mt-2 text-sm font-medium">
            {invoice.client.name || <span className="text-muted-foreground">Client name</span>}
          </p>
          <p className="text-sm text-muted-foreground">{invoice.client.email || "client@email.com"}</p>
        </div>
      </div>

      <div className="min-w-0 overflow-x-auto px-5 sm:px-10">
        <table className="w-full table-fixed text-xs sm:text-sm">
          <thead>
            <tr className="border-y border-border text-left text-xs tracking-[0.14em] text-muted-foreground uppercase">
              <th className="w-[40%] py-3 font-medium sm:w-auto">Description</th>
              <th className="w-[15%] py-3 text-right font-medium">Qty</th>
              <th className="w-[22%] py-3 text-right font-medium">Rate</th>
              <th className="w-[23%] py-3 text-right font-medium">Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoice.lineItems.length === 0 ||
            invoice.lineItems.every(
              (item) => !item.description.trim() && !(item.quantity > 0 && item.rate > 0),
            ) ? (
              <tr>
                <td colSpan={4} className="py-6">
                  <div className="rounded-lg border border-dashed border-border px-4 py-5 text-center text-muted-foreground">
                    Add your first line item — it appears here instantly
                  </div>
                </td>
              </tr>
            ) : (
              invoice.lineItems.map((item) => (
                <tr key={item.id} className="border-b border-border/70">
                  <td className="truncate py-3 pr-2">
                    {item.description || <span className="text-muted-foreground">Description</span>}
                  </td>
                  <td className="py-3 text-right tabular-nums">{item.quantity || 0}</td>
                  <td className="py-3 text-right tabular-nums">{formatMoney(item.rate, currency)}</td>
                  <td className="py-3 text-right tabular-nums">
                    {formatMoney(lineAmount(item), currency)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-end px-5 sm:px-10">
        <dl className="w-full max-w-xs space-y-2 text-sm">
          <div className="flex justify-between text-muted-foreground">
            <dt>Subtotal</dt>
            <dd className="tabular-nums">{formatMoney(sub, currency)}</dd>
          </div>
          {invoice.taxRate > 0 ? (
            <div className="flex justify-between text-muted-foreground">
              <dt>Tax ({invoice.taxRate}%)</dt>
              <dd className="tabular-nums">{formatMoney(tax, currency)}</dd>
            </div>
          ) : null}
          <div className="flex justify-between border-t border-border pt-2 font-medium">
            <dt>Total</dt>
            <dd className="tabular-nums">{formatMoney(total, currency)}</dd>
          </div>
        </dl>
      </div>

      {invoice.notes ? (
        <div className="mt-8 px-5 sm:mt-10 sm:px-10">
          <p className="text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">
            Notes
          </p>
          <p className="mt-2 whitespace-pre-line text-sm text-muted-foreground">{invoice.notes}</p>
        </div>
      ) : null}

      <footer className="mt-auto flex items-end justify-between gap-4 px-5 py-6 sm:px-10 sm:py-8">
        <p className="text-xs text-muted-foreground">
          Status: <span className="capitalize text-foreground">{invoice.status}</span>
        </p>
        {branded ? (
          <p className="font-display text-xs text-muted-foreground">Made with FormaBill</p>
        ) : null}
      </footer>
    </article>
  );
}
