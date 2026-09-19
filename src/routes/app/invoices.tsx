import { Link, createFileRoute } from "@tanstack/react-router";
import { FileText, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store/context";
import { formatDate, formatMoney, invoiceTotal } from "@/lib/utils";

export const Route = createFileRoute("/app/invoices")({
  component: InvoicesPage,
});

function InvoicesPage() {
  const { ready, invoices, deleteInvoice, updateInvoiceStatus } = useStore();

  const changeStatus = async (id: string, status: "draft" | "sent" | "paid") => {
    try {
      await updateInvoiceStatus(id, status);
      toast.success(`Invoice marked as ${status}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not update invoice status");
    }
  };

  const removeInvoice = async (id: string) => {
    try {
      await deleteInvoice(id);
      toast.success("Invoice deleted");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not delete invoice");
    }
  };

  if (!ready) return <div className="h-64 animate-pulse rounded-xl bg-muted/60" />;

  return (
    <div>
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs tracking-[0.16em] text-muted-foreground uppercase">Library</p>
          <h1 className="font-display text-3xl tracking-tight">Invoices</h1>
        </div>
        <Button asChild>
          <Link to="/app">
            <Plus /> New
          </Link>
        </Button>
      </div>

      {invoices.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-card px-6 py-16 text-center">
          <FileText className="mx-auto size-8 text-muted-foreground" />
          <p className="mt-4 font-display text-xl">No invoices yet</p>
          <p className="mt-1 text-sm text-muted-foreground">Write one in under a minute.</p>
          <Button className="mt-6" asChild>
            <Link to="/app">Create invoice</Link>
          </Button>
        </div>
      ) : (
        <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
          {invoices.map((inv) => (
            <li key={inv.id} className="flex flex-wrap items-center gap-3 px-4 py-4 sm:px-5">
              <Link
                to="/app"
                search={{ id: inv.id }}
                className="min-w-0 flex-1"
              >
                <p className="font-medium">{inv.number}</p>
                <p className="truncate text-sm text-muted-foreground">
                  {inv.client.name || "No client"} · Due {formatDate(inv.dueDate)}
                </p>
              </Link>
              <p className="text-sm tabular-nums">
                {formatMoney(invoiceTotal(inv.lineItems, inv.taxRate), inv.currency || "USD")}
              </p>
              <Badge variant={inv.status}>{inv.status}</Badge>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => void changeStatus(inv.id, "draft")}>
                  Draft
                </Button>
                <Button variant="ghost" size="sm" onClick={() => void changeStatus(inv.id, "sent")}>
                  Sent
                </Button>
                <Button variant="ghost" size="sm" onClick={() => void changeStatus(inv.id, "paid")}>
                  Paid
                </Button>
              </div>
              <Button
                variant="ghost"
                size="icon"
                aria-label={`Delete ${inv.number}`}
                onClick={() => void removeInvoice(inv.id)}
              >
                <Trash2 />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
