import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { LineItem } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function uid(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `id_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

export function roundMoney(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

export function lineAmount(item: LineItem): number {
  return roundMoney((Number(item.quantity) || 0) * (Number(item.rate) || 0));
}

export function invoiceSubtotal(items: LineItem[]): number {
  return roundMoney(items.reduce((sum, item) => sum + lineAmount(item), 0));
}

export function invoiceTax(items: LineItem[], taxRate: number): number {
  return roundMoney(invoiceSubtotal(items) * ((Number(taxRate) || 0) / 100));
}

export function invoiceTotal(items: LineItem[], taxRate: number): number {
  return roundMoney(invoiceSubtotal(items) + invoiceTax(items, taxRate));
}

export function toPaise(amount: number): number {
  return Math.max(0, Math.round(roundMoney(amount) * 100));
}

export function formatMoney(amount: number, currency = "INR"): string {
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    }).format(Number.isFinite(amount) ? amount : 0);
  } catch {
    return `₹${(Number.isFinite(amount) ? amount : 0).toFixed(2)}`;
  }
}

export function formatDate(iso?: string): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(d);
}

export function isoDate(offsetDays = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}

export function nextInvoiceNumber(existingNumbers: string[]): string {
  let max = 0;
  for (const n of existingNumbers) {
    const match = n.match(/(\d+)\s*$/);
    if (match) max = Math.max(max, parseInt(match[1], 10));
  }
  return `FB-${String(max + 1).padStart(4, "0")}`;
}

export function addFrequency(iso: string, frequency: "weekly" | "monthly" | "quarterly" | "yearly"): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return new Date().toISOString();
  switch (frequency) {
    case "weekly":
      d.setDate(d.getDate() + 7);
      break;
    case "monthly":
      d.setMonth(d.getMonth() + 1);
      break;
    case "quarterly":
      d.setMonth(d.getMonth() + 3);
      break;
    case "yearly":
      d.setFullYear(d.getFullYear() + 1);
      break;
  }
  return d.toISOString();
}
