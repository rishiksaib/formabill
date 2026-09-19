import { createFileRoute } from "@tanstack/react-router";
import { InvoiceEditor } from "@/components/invoice/editor";

type Search = { id?: string };

export const Route = createFileRoute("/app/")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    id: typeof search.id === "string" ? search.id : undefined,
  }),
  component: EditorPage,
});

function EditorPage() {
  const { id } = Route.useSearch();
  return <InvoiceEditor invoiceId={id} />;
}
