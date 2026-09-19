import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { DEFAULT_SETTINGS, type BusinessSettings, type Client, type Invoice } from "@/lib/types";
import { getDb, SETTINGS_ID, type SettingsRow } from "@/lib/store/dexie";

type StoreValue = {
  ready: boolean;
  settings: BusinessSettings;
  invoices: Invoice[];
  clients: Client[];
  saveSettings: (patch: Partial<BusinessSettings>) => Promise<BusinessSettings>;
  saveInvoice: (invoice: Invoice) => Promise<Invoice>;
  updateInvoiceStatus: (id: string, status: Invoice["status"]) => Promise<Invoice | undefined>;
  deleteInvoice: (id: string) => Promise<void>;
  saveClient: (client: Client) => Promise<Client>;
  deleteClient: (id: string) => Promise<void>;
  publishInvoice: (invoice: Invoice) => Promise<Invoice>;
};

const StoreContext = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [settings, setSettings] = useState<BusinessSettings>(DEFAULT_SETTINGS);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const db = getDb();
        const [inv, cli, set] = await Promise.all([
          db.invoices.orderBy("createdAt").reverse().toArray(),
          db.clients.toArray(),
          db.settings.get(SETTINGS_ID),
        ]);
        if (cancelled) return;
        setInvoices(inv);
        setClients(cli);
        if (set) {
          const { id: _id, ...rest } = set;
          setSettings({ ...DEFAULT_SETTINGS, ...rest });
        }
      } catch (err) {
        console.warn("[formabill] IndexedDB unavailable", err);
      } finally {
        if (!cancelled) setReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const saveSettings = useCallback(async (patch: Partial<BusinessSettings>) => {
    const next = { ...settings, ...patch };
    setSettings(next);
    const row: SettingsRow = { id: SETTINGS_ID, ...next };
    await getDb().settings.put(row);
    return next;
  }, [settings]);

  const saveClient = useCallback(async (client: Client) => {
    const next: Client = { ...client, createdAt: client.createdAt || new Date().toISOString() };
    await getDb().clients.put(next);
    setClients((prev) => {
      const idx = prev.findIndex((c) => c.id === next.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = next;
        return copy;
      }
      return [next, ...prev];
    });
    return next;
  }, []);

  const saveInvoice = useCallback(
    async (invoice: Invoice) => {
      const next: Invoice = { ...invoice, updatedAt: new Date().toISOString() };
      await getDb().invoices.put(next);
      setInvoices((prev) => {
        const idx = prev.findIndex((i) => i.id === next.id);
        if (idx >= 0) {
          const copy = [...prev];
          copy[idx] = next;
          return copy;
        }
        return [next, ...prev];
      });
      if (next.client.name.trim() || next.client.email.trim()) {
        await saveClient({
          id: next.client.id,
          name: next.client.name,
          email: next.client.email,
        });
      }
      return next;
    },
    [saveClient],
  );

  const updateInvoiceStatus = useCallback(
    async (id: string, status: Invoice["status"]) => {
      const current = invoices.find((invoice) => invoice.id === id) ?? null;
      if (!current) return undefined;
      const next: Invoice = { ...current, status, updatedAt: new Date().toISOString() };
      await getDb().invoices.put(next);
      setInvoices((prev) => {
        const idx = prev.findIndex((invoice) => invoice.id === id);
        if (idx >= 0) {
          const copy = [...prev];
          copy[idx] = next;
          return copy;
        }
        return [next, ...prev];
      });
      const res = await fetch(`/api/invoices/${encodeURIComponent(id)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(next),
      });
      if (!res.ok) {
        const json = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(json.error || "Could not update invoice status");
      }
      const saved = (await res.json()) as Invoice;
      await getDb().invoices.put(saved);
      setInvoices((prev) => {
        const idx = prev.findIndex((invoice) => invoice.id === saved.id);
        if (idx >= 0) {
          const copy = [...prev];
          copy[idx] = saved;
          return copy;
        }
        return [saved, ...prev];
      });
      return saved;
    },
    [invoices],
  );

  const deleteInvoice = useCallback(async (id: string) => {
    await getDb().invoices.delete(id);
    setInvoices((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const deleteClient = useCallback(async (id: string) => {
    await getDb().clients.delete(id);
    setClients((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const publishInvoice = useCallback(
    async (invoice: Invoice) => {
      const local = await saveInvoice(invoice);
      const res = await fetch("/api/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(local),
      });
      if (!res.ok) {
        const json = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(json.error || "Could not publish invoice");
      }
      const published = (await res.json()) as Invoice;
      await getDb().invoices.put(published);
      setInvoices((prev) => {
        const idx = prev.findIndex((i) => i.id === published.id);
        if (idx >= 0) {
          const next = [...prev];
          next[idx] = published;
          return next;
        }
        return [published, ...prev];
      });
      return published;
    },
    [saveInvoice],
  );

  const value = useMemo<StoreValue>(
    () => ({
      ready,
      settings,
      invoices,
      clients,
      saveSettings,
      saveInvoice,
      updateInvoiceStatus,
      deleteInvoice,
      saveClient,
      deleteClient,
      publishInvoice,
    }),
    [
      ready,
      settings,
      invoices,
      clients,
      saveSettings,
      saveInvoice,
      updateInvoiceStatus,
      deleteInvoice,
      saveClient,
      deleteClient,
      publishInvoice,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
