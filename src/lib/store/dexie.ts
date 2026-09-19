import Dexie, { type Table } from "dexie";
import type { BusinessSettings, Client, Invoice } from "@/lib/types";

export type SettingsRow = BusinessSettings & { id: string };

export class FormaBillDB extends Dexie {
  invoices!: Table<Invoice, string>;
  clients!: Table<Client, string>;
  settings!: Table<SettingsRow, string>;

  constructor() {
    super("formabill");
    this.version(1).stores({
      invoices: "id, number, status, createdAt",
      clients: "id, email, name",
      settings: "id",
    });
  }
}

let db: FormaBillDB | null = null;

export function getDb(): FormaBillDB {
  if (typeof indexedDB === "undefined") {
    throw new Error("IndexedDB is not available");
  }
  if (!db) db = new FormaBillDB();
  return db;
}

export const SETTINGS_ID = "business";
