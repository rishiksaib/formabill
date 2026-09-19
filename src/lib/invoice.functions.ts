import { createServerFn } from "@tanstack/react-start";
import { getInvoice } from "@/lib/server-store.server";

export const getPublicInvoice = createServerFn({ method: "GET" })
  .validator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    const invoice = await getInvoice(data.id);
    return invoice ?? null;
  });
