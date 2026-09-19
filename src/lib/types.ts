export type InvoiceStatus = "draft" | "sent" | "paid";

export type RecurrenceFrequency = "weekly" | "monthly" | "quarterly" | "yearly";

export type LineItem = {
  id: string;
  description: string;
  quantity: number;
  rate: number;
};

export type InvoiceClient = {
  id: string;
  name: string;
  email: string;
};

export type RecurrenceConfig = {
  enabled: boolean;
  frequency: RecurrenceFrequency;
  nextRunAt?: string;
  endDate?: string;
  lastGeneratedAt?: string;
};

export type InvoicePaymentMethods = {
  upiId?: string;
  paypalEmail?: string;
  bankName?: string;
  bankAccountName?: string;
  bankAccount?: string;
  bankIfscSwift?: string;
  razorpayKeyId?: string;
  razorpayKeySecret?: string;
};

export type Invoice = {
  id: string;
  userId?: string;
  number: string;
  fromName: string;
  fromEmail: string;
  fromAddress?: string;
  logoUrl?: string;
  client: InvoiceClient;
  lineItems: LineItem[];
  taxRate: number;
  notes: string;
  dueDate: string;
  status: InvoiceStatus;
  createdAt: string;
  updatedAt?: string;
  paymentLinkId?: string;
  paymentLinkUrl?: string;
  recurrence?: RecurrenceConfig;
  parentRecurringId?: string;
  currency?: string;
  reminderEnabled?: boolean;
  paymentMethods?: InvoicePaymentMethods;
};

export type Client = {
  id: string;
  name: string;
  email: string;
  address?: string;
  createdAt?: string;
};

export type BusinessSettings = {
  name: string;
  email: string;
  address?: string;
  logoUrl?: string;
  defaultCurrency: string;
  defaultTaxRate: number;
  isPro?: boolean;
  reminderDays?: number;
  paymentMethods?: InvoicePaymentMethods;
};

export const DEFAULT_SETTINGS: BusinessSettings = {
  name: "",
  email: "",
  address: "",
  logoUrl: "",
  defaultCurrency: "USD",
  defaultTaxRate: 0,
  isPro: false,
  reminderDays: 3,
  paymentMethods: {
    upiId: "",
    paypalEmail: "",
    bankName: "",
    bankAccount: "",
    razorpayKeyId: "",
    razorpayKeySecret: "",
  },
};
