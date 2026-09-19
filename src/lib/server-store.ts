import {
  deleteInvoice as serverDeleteInvoice,
  findByPaymentLinkId,
  getInvoice as serverGetInvoice,
  listInvoices as serverListInvoices,
  markInvoicePaid,
  upsertInvoice as serverSaveInvoice,
} from "@/lib/server-store.server";

/**
 * Public names for the Step 4 server-backed invoice contract.
 * The actual disk persistence stays in the server-only module so it does not ship
 * into the client bundle.
 */
export { findByPaymentLinkId, markInvoicePaid };

export const deleteInvoice = serverDeleteInvoice;
export const getInvoice = serverGetInvoice;
export const listInvoices = serverListInvoices;
export const upsertInvoice = serverSaveInvoice;
export const saveInvoice = serverSaveInvoice;
