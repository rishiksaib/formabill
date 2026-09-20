import { useMemo, useRef, useState } from "react";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { Copy, FilePlus2, Pencil, Plus, Search, Trash2, Users } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { applySettingsToInvoice, createDraftInvoice } from "@/lib/invoice-defaults";
import { useStore } from "@/lib/store/context";
import type { Client } from "@/lib/types";
import { uid } from "@/lib/utils";

export const Route = createFileRoute("/app/clients")({
  component: ClientsPage,
});

function initials(name: string, email: string) {
  const source = name.trim() || email.trim();
  if (!source) return "?";
  const parts = source.split(/\s+/);
  return (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase();
}

function ClientsPage() {
  const navigate = useNavigate();
  const { ready, clients, settings, invoices, saveClient, deleteClient, saveInvoice } = useStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [query, setQuery] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState({ name: "", email: "", phone: "", company: "", notes: "" });
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return clients;
    return clients.filter((c) =>
      [c.name, c.email, c.company ?? "", c.phone ?? ""].some((field) =>
        field.toLowerCase().includes(needle),
      ),
    );
  }, [clients, query]);

  if (!ready) return <div className="h-64 animate-pulse rounded-xl bg-muted/60" />;

  const resetAddForm = () => {
    setName("");
    setEmail("");
    setCompany("");
  };

  const addClient = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim() && !email.trim()) return;
    try {
      await saveClient({
        id: uid(),
        name: name.trim(),
        email: email.trim(),
        company: company.trim() || undefined,
      });
      resetAddForm();
      toast.success("Client saved");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save client");
    }
  };

  const startEdit = (client: Client) => {
    setEditingId(client.id);
    setPendingDelete(null);
    setDraft({
      name: client.name,
      email: client.email,
      phone: client.phone || "",
      company: client.company || "",
      notes: client.notes || "",
    });
  };

  const saveEdit = async (client: Client) => {
    if (!draft.name.trim() && !draft.email.trim()) {
      toast.error("Add a name or an email");
      return;
    }
    try {
      await saveClient({
        ...client,
        name: draft.name.trim(),
        email: draft.email.trim(),
        phone: draft.phone.trim() || undefined,
        company: draft.company.trim() || undefined,
        notes: draft.notes.trim() || undefined,
      });
      setEditingId(null);
      toast.success("Client updated");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not update client");
    }
  };

  const copyEmail = async (client: Client) => {
    if (!client.email) {
      toast.error("No email saved for this client");
      return;
    }
    try {
      await navigator.clipboard.writeText(client.email);
      toast.success("Email copied");
    } catch {
      toast.error("Could not copy email");
    }
  };

  const startInvoice = async (client: Client) => {
    try {
      const blank = applySettingsToInvoice(
        createDraftInvoice(
          settings,
          invoices.map((inv) => inv.number),
        ),
        settings,
      );
      const saved = await saveInvoice({
        ...blank,
        client: { id: client.id, name: client.name, email: client.email },
      });
      toast.success(`Started ${saved.number} for ${client.name || client.email}`);
      await navigate({ to: "/app", search: { id: saved.id } });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not start invoice");
    }
  };

  const removeClient = async (id: string) => {
    try {
      await deleteClient(id);
      setPendingDelete(null);
      if (editingId === id) setEditingId(null);
      toast.success("Client deleted");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not delete client");
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <p className="text-xs tracking-[0.16em] text-muted-foreground uppercase">Address book</p>
      <div className="flex items-end justify-between gap-4">
        <h1 className="font-display text-3xl tracking-tight">Clients</h1>
        {clients.length > 0 ? (
          <p className="text-sm text-muted-foreground">
            {visible.length} of {clients.length}
          </p>
        ) : null}
      </div>
      <p className="mt-1 text-sm text-muted-foreground">
        Saved locally. Pick them from the invoice editor, or start an invoice right here.
      </p>

      <form
        className="mt-8 grid gap-3 rounded-xl border border-border bg-card p-5"
        onSubmit={(e) => void addClient(e)}
      >
        <div className="grid gap-3 sm:grid-cols-[1fr_1fr]">
          <label className="grid gap-1.5">
            <Label>Name</Label>
            <Input
              ref={nameRef}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Harbor Co."
            />
          </label>
          <label className="grid gap-1.5">
            <Label>Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="pay@harbor.co"
            />
          </label>
        </div>
        <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
          <label className="grid gap-1.5">
            <Label>
              Company <span className="font-normal text-muted-foreground">(optional)</span>
            </Label>
            <Input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Harbor Inc."
            />
          </label>
          <div className="flex items-end">
            <Button type="submit" className="w-full sm:w-auto">
              <Plus /> Add client
            </Button>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          Phone and notes can be added after saving, via Edit.
        </p>
      </form>

      {clients.length > 0 ? (
        <div className="relative mt-6">
          <Search
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, email, or company…"
            aria-label="Search clients"
            className="pl-9"
          />
        </div>
      ) : null}

      {clients.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-border bg-card px-6 py-14 text-center">
          <Users className="mx-auto size-8 text-muted-foreground" />
          <p className="mt-4 font-display text-2xl tracking-tight">Clients live here</p>
          <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
            Save the people you bill — then reuse them in one tap from the invoice editor, or start
            an invoice directly from their card.
          </p>
          <Button className="mt-6" type="button" onClick={() => nameRef.current?.focus()}>
            <Plus /> Add your first client
          </Button>
        </div>
      ) : visible.length === 0 ? (
        <div className="mt-6 rounded-xl border border-dashed border-border bg-card px-6 py-12 text-center">
          <p className="font-display text-xl">No matches for “{query.trim()}”</p>
          <Button className="mt-4" variant="outline" onClick={() => setQuery("")}>
            Clear search
          </Button>
        </div>
      ) : (
        <ul className="mt-6 space-y-2">
          {visible.map((c) =>
            editingId === c.id ? (
              <li key={c.id} className="rounded-xl border border-primary/40 bg-card p-4 sm:p-5">
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="grid gap-1.5">
                    <Label>Name</Label>
                    <Input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
                  </label>
                  <label className="grid gap-1.5">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      value={draft.email}
                      onChange={(e) => setDraft({ ...draft, email: e.target.value })}
                    />
                  </label>
                  <label className="grid gap-1.5">
                    <Label>Phone</Label>
                    <Input
                      type="tel"
                      value={draft.phone}
                      onChange={(e) => setDraft({ ...draft, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                    />
                  </label>
                  <label className="grid gap-1.5">
                    <Label>Company</Label>
                    <Input
                      value={draft.company}
                      onChange={(e) => setDraft({ ...draft, company: e.target.value })}
                      placeholder="Harbor Inc."
                    />
                  </label>
                  <label className="grid gap-1.5 sm:col-span-2">
                    <Label>Notes</Label>
                    <Textarea
                      rows={2}
                      value={draft.notes}
                      onChange={(e) => setDraft({ ...draft, notes: e.target.value })}
                      placeholder="GSTIN, payment terms, timezone…"
                    />
                  </label>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button size="sm" onClick={() => void saveEdit(c)}>
                    Save changes
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>
                    Cancel
                  </Button>
                </div>
              </li>
            ) : (
              <li
                key={c.id}
                className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card px-4 py-4"
              >
                <span
                  aria-hidden="true"
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-secondary text-sm font-medium text-foreground"
                >
                  {initials(c.name, c.email)}
                </span>
                <div className="min-w-44 flex-1">
                  <p className="truncate font-medium">
                    {c.name || <span className="text-muted-foreground">Unnamed client</span>}
                    {c.company ? (
                      <span className="font-normal text-muted-foreground"> · {c.company}</span>
                    ) : null}
                  </p>
                  <p className="truncate text-sm text-muted-foreground">
                    {[c.email, c.phone].filter(Boolean).join(" · ") || "No contact yet"}
                  </p>
                  {c.notes ? (
                    <p className="mt-0.5 truncate text-xs text-muted-foreground">{c.notes}</p>
                  ) : null}
                </div>
                <div className="flex w-full items-center gap-1 border-t border-border/60 pt-2 sm:w-auto sm:border-t-0 sm:pt-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => void startInvoice(c)}
                    title={`Start an invoice for ${c.name || c.email}`}
                  >
                    <FilePlus2 /> Invoice
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => startEdit(c)}
                    title="Edit client"
                  >
                    <Pencil /> Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={`Copy email of ${c.name || c.email}`}
                    title="Copy email"
                    onClick={() => void copyEmail(c)}
                  >
                    <Copy />
                  </Button>
                  {pendingDelete === c.id ? (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => void removeClient(c.id)}
                      onBlur={() => setPendingDelete(null)}
                      title="Click again to confirm deletion"
                    >
                      <Trash2 /> Confirm?
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={`Delete ${c.name || c.email}`}
                      title="Delete client"
                      onClick={() => setPendingDelete(c.id)}
                    >
                      <Trash2 />
                    </Button>
                  )}
                </div>
              </li>
            ),
          )}
        </ul>
      )}
      <p className="mt-6 text-center text-xs text-muted-foreground">
        Looking for invoices instead? <Link to="/app/invoices" className="underline underline-offset-4">Open the library</Link>.
      </p>
    </div>
  );
}
