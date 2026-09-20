import { useMemo, useState } from "react";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { CopyPlus, FileText, Link2, Plus, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStore } from "@/lib/store/context";
import type { Invoice } from "@/lib/types";
import { formatDate, formatMoney, invoiceTotal, nextInvoiceNumber, uid } from "@/lib/utils";

export const Route = createFileRoute("/app/invoices")({
  component: InvoicesPage,
});

type StatusFilter = "all" | Invoice["status"];
type SortKey = "newest" | "oldest" | "amount";

function publicUrl(id: string) {
  return `${window.location.origin}/inv/${id}`;
}

function InvoicesPage() {
  const navigate = useNavigate();
  const { ready, invoices, deleteInvoice, updateInvoiceStatus, saveInvoice, publishInvoice } =
    useStore();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sort, setSort] = useState<SortKey>("newest");
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);

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
      setPendingDelete(null);
      toast.success("Invoice deleted");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not delete invoice");
    }
  };

  const duplicateInvoice = async (invoice: Invoice) => {
    try {
      const copy: Invoice = {
        ...invoice,
        id: uid(),
        number: nextInvoiceNumber(invoices.map((inv) => inv.number)),
        status: "draft",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        client: { ...invoice.client, id: uid() },
        lineItems: invoice.lineItems.map((item) => ({ ...item, id: uid() })),
        paymentLinkId: undefined,
        paymentLinkUrl: undefined,
      };
      const saved = await saveInvoice(copy);
      toast.success(`Duplicated as ${saved.number}`);
      await navigate({ to: "/app", search: { id: saved.id } });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not duplicate invoice");
    }
  };

  const copyInvoiceLink = async (invoice: Invoice) => {
    try {
      const published = await publishInvoice({
        ...invoice,
        status: invoice.status === "paid" ? "paid" : "sent",
      });
      await navigator.clipboard.writeText(publicUrl(published.id));
      toast.success("Public link copied");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not copy link");
    }
  };

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const filtered = invoices.filter((inv) => {
      if (statusFilter !== "all" && inv.status !== statusFilter) return false;
      if (!needle) return true;
      return (
        inv.number.toLowerCase().includes(needle) ||
        inv.client.name.toLowerCase().includes(needle) ||
        inv.client.email.toLowerCase().includes(needle)
      );
    });
    return [...filtered].sort((a, b) => {
      if (sort === "amount") {
        return invoiceTotal(b.lineItems, b.taxRate) - invoiceTotal(a.lineItems, a.taxRate);
      }
      const diff = Date.parse(a.createdAt) - Date.parse(b.createdAt);
      return sort === "newest" ? -diff : diff;
    });
  }, [invoices, query, statusFilter, sort]);

  if (!ready) return <div className="h-64 animate-pulse rounded-xl bg-muted/60" />;

  return (
    <div>
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs tracking-[0.16em] text-muted-foreground uppercase">Library</p>
          <h1 className="font-display text-3xl tracking-tight">Invoices</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {invoices.length === 0
              ? "Your invoices will live here."
              : `${visible.length} of ${invoices.length} invoice${invoices.length === 1 ? "" : "s"}`}
          </p>
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
          <p className="mt-4 font-display text-2xl tracking-tight">Your first invoice is a minute away</p>
          <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
            Add a client and a line item, preview it live, then share a public link or collect
            payment — no setup needed.
          </p>
          <Button className="mt-6" size="lg" asChild>
            <Link to="/app">Create invoice</Link>
          </Button>
        </div>
      ) : (
        <>
          <div className="mb-4 grid gap-2 sm:grid-cols-[1fr_auto_auto]">
            <div className="relative">
              <Search
                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search number or client…"
                aria-label="Search invoices"
                className="pl-9"
              />
            </div>
            <div
              className="flex overflow-hidden rounded-md border border-border"
              role="group"
              aria-label="Filter by status"
            >
              {(["all", "draft", "sent", "paid"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  aria-pressed={statusFilter === s}
                  onClick={() => setStatusFilter(s)}
                  className={`cursor-pointer px-3 py-2 text-xs font-medium transition-colors ${
                    statusFilter === s
                      ? "bg-primary text-primary-foreground"
                      : "bg-card text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {s === "all" ? "All" : s[0].toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              aria-label="Sort invoices"
              className="flex h-11 rounded-md border border-input bg-card px-3 text-sm"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="amount">Highest amount</option>
            </select>
          </div>

          {visible.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border bg-card px-6 py-14 text-center">
              <p className="font-display text-xl">Nothing matches</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try a different search, or clear the {statusFilter} filter.
              </p>
              <Button
                className="mt-6"
                variant="outline"
                onClick={() => {
                  setQuery("");
                  setStatusFilter("all");
                }}
              >
                Clear search & filters
              </Button>
            </div>
          ) : (
            <ul className="space-y-2">
              {visible.map((inv) => (
                <li
                  key={inv.id}
                  className={`flex flex-wrap items-center gap-x-4 gap-y-3 rounded-xl border border-border border-l-4 bg-card px-4 py-4 sm:px-5 ${
                    inv.status === "paid"
                      ? "border-l-emerald-500"
                      : inv.status === "sent"
                        ? "border-l-sky-500"
                        : "border-l-muted-foreground/30"
                  }`}
                >
                  <Link
                    to="/app"
                    search={{ id: inv.id }}
                    className="min-w-44 flex-1"
                  >
                    <p className="font-medium">{inv.number}</p>
                    <p className="truncate text-sm text-muted-foreground">
                      {inv.client.name || "No client"} · Due {formatDate(inv.dueDate)}
                    </p>
                  </Link>
                  <div className="flex items-center gap-3">
                    <p className="text-base font-semibold tabular-nums">
                      {formatMoney(invoiceTotal(inv.lineItems, inv.taxRate), inv.currency || "USD")}
                    </p>
                    <Badge variant={inv.status}>{inv.status}</Badge>
                    <select
                      value={inv.status}
                      onChange={(e) =>
                        void changeStatus(inv.id, e.target.value as Invoice["status"])
                      }
                      aria-label={`Change status of ${inv.number}`}
                      title="Change status"
                      className="h-9 cursor-pointer rounded-md border border-input bg-card px-2 text-xs text-muted-foreground"
                    >
                      <option value="draft">Draft</option>
                      <option value="sent">Sent</option>
                      <option value="paid">Paid</option>
                    </select>
                  </div>
                  <div className="flex w-full items-center gap-1 border-t border-border/60 pt-2 sm:w-auto sm:border-t-0 sm:pt-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => void duplicateInvoice(inv)}
                      title={`Duplicate ${inv.number} as a new draft`}
                    >
                      <CopyPlus /> Duplicate
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => void copyInvoiceLink(inv)}
                      title="Publish and copy the public link"
                    >
                      <Link2 /> Copy link
                    </Button>
                    {pendingDelete === inv.id ? (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => void removeInvoice(inv.id)}
                        onBlur={() => setPendingDelete(null)}
                        title="Click again to confirm deletion"
                      >
                        <Trash2 /> Confirm?
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={`Delete ${inv.number}`}
                        title={`Delete ${inv.number}`}
                        onClick={() => setPendingDelete(inv.id)}
                      >
                        <Trash2 />
                      </Button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
