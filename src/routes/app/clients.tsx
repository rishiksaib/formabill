import { useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus, Trash2, Users } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useStore } from "@/lib/store/context";
import { uid } from "@/lib/utils";

export const Route = createFileRoute("/app/clients")({
  component: ClientsPage,
});

function ClientsPage() {
  const { ready, clients, saveClient, deleteClient } = useStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);

  if (!ready) return <div className="h-64 animate-pulse rounded-xl bg-muted/60" />;

  return (
    <div className="mx-auto max-w-2xl">
      <p className="text-xs tracking-[0.16em] text-muted-foreground uppercase">Address book</p>
      <h1 className="font-display text-3xl tracking-tight">Clients</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Saved locally. Pick them from the invoice editor.
      </p>

      <form
        className="mt-8 grid gap-3 rounded-xl border border-border bg-card p-5 sm:grid-cols-[1fr_1fr_auto]"
        onSubmit={(e) => {
          e.preventDefault();
          if (!name.trim() && !email.trim()) return;
          void saveClient({ id: uid(), name: name.trim(), email: email.trim() })
            .then(() => {
              setName("");
              setEmail("");
              toast.success("Client saved");
            })
            .catch((error) => toast.error(error instanceof Error ? error.message : "Could not save client"));
        }}
      >
        <label className="grid gap-1.5">
          <Label>Name</Label>
          <Input ref={nameRef} value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label className="grid gap-1.5">
          <Label>Email</Label>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <div className="flex items-end">
          <Button type="submit" className="w-full sm:w-auto">
            <Plus /> Add
          </Button>
        </div>
      </form>

      {clients.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-border px-6 py-14 text-center">
          <Users className="mx-auto size-8 text-muted-foreground" />
          <p className="mt-4 font-display text-xl">No clients yet</p>
          <p className="mt-1 text-sm text-muted-foreground">Add your first client to reuse them in invoices.</p>
          <Button
            className="mt-6"
            type="button"
            onClick={() => nameRef.current?.focus()}
          >
            <Plus /> Add your first client
          </Button>
        </div>
      ) : (
        <ul className="mt-6 divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
          {clients.map((c) => (
            <li key={c.id} className="flex items-center gap-3 px-4 py-4">
              <div className="min-w-0 flex-1">
                <p className="font-medium">{c.name}</p>
                <p className="truncate text-sm text-muted-foreground">{c.email}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                aria-label={`Delete ${c.name}`}
                onClick={() =>
                  void deleteClient(c.id)
                    .then(() => toast.success("Client deleted"))
                    .catch((error) => toast.error(error instanceof Error ? error.message : "Could not delete client"))
                }
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
