import { Link } from "@tanstack/react-router";
import { ArrowRight, FileCheck2, IndianRupee, Link2, Timer } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { InvoiceDocument } from "@/components/invoice/document";
import { Button } from "@/components/ui/button";
import type { Invoice } from "@/lib/types";

const SAMPLE: Invoice = {
  id: "sample",
  number: "FB-0001",
  fromName: "North Studio",
  fromEmail: "hello@north.studio",
  fromAddress: "Bengaluru, India",
  client: { id: "c1", name: "Harbor Co.", email: "pay@harbor.co" },
  lineItems: [
    { id: "1", description: "Brand identity system", quantity: 1, rate: 120000 },
    { id: "2", description: "Product UI, 3 screens", quantity: 1, rate: 85000 },
  ],
  taxRate: 18,
  notes: "Payable via UPI, cards, or netbanking.",
  dueDate: "2026-10-02",
  status: "sent",
  createdAt: "2026-09-18",
  currency: "INR",
};

const FEATURES = [
  {
    icon: Timer,
    title: "Sixty seconds, not sixty fields",
    body: "From, bill-to, line items, tax. A live paper preview as you type. Then send.",
  },
  {
    icon: Link2,
    title: "WhatsApp-ready sharing",
    body: "Publish a clean invoice page and send a prefilled WhatsApp message with the amount and link.",
  },
  {
    icon: IndianRupee,
    title: "UPI or gateway pay",
    body: "Give clients your UPI details or connect Razorpay. Their money goes directly to you.",
  },
  {
    icon: FileCheck2,
    title: "No cut of client payments",
    body: "Razorpay may charge its own gateway fee. FormaBill does not take a percentage of what you earn.",
  },
];

export function LandingPage() {
  return (
    <div className="min-h-dvh overflow-x-hidden bg-background">
      <header className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-5 sm:px-6">
        <Logo />
        <nav className="flex items-center gap-1 sm:gap-2">
          <Button variant="ghost" asChild className="hidden sm:inline-flex">
            <Link to="/app/invoices">Invoices</Link>
          </Button>
          <Button asChild>
            <Link to="/app">
              Start invoicing <ArrowRight className="hidden sm:block" />
            </Link>
          </Button>
        </nav>
      </header>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12 lg:py-16">
        <div>
          <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
            Fast pro invoices for independent work
          </p>
          <h1 className="mt-4 font-display text-4xl leading-[1.1] tracking-tight sm:text-6xl">
            Get paid without the payment-platform tax.
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
            Make a polished invoice in under a minute, share it on WhatsApp, and
            let clients pay by UPI or gateway. FormaBill takes no cut of client payments.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <Link to="/app">
                Write an invoice <ArrowRight />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#pricing">See pricing</a>
            </Button>
          </div>
        </div>
        <div className="relative min-w-0">
          <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[2rem] bg-secondary/70 sm:-inset-6" />
          <InvoiceDocument invoice={SAMPLE} className="max-h-[560px] overflow-hidden rounded-xl sm:max-h-[640px]" />
        </div>
      </section>

      <section className="border-y border-border bg-card/60">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div key={f.title}>
              <f.icon className="size-5 text-primary" />
              <h2 className="mt-4 font-display text-xl tracking-tight">{f.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">Pricing</p>
        <h2 className="mt-3 font-display text-4xl tracking-tight">Start free. Upgrade when your volume grows.</h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-border bg-card p-8 shadow-paper">
            <p className="text-sm font-medium text-muted-foreground">Free</p>
            <p className="mt-2 font-display text-4xl">₹0</p>
            <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
              <li>5 invoices per month</li>
              <li>PDF download</li>
              <li>Public share links</li>
              <li>Client list</li>
              <li>UPI and Razorpay payment links</li>
            </ul>
            <Button className="mt-8" asChild>
              <Link to="/app">Start free</Link>
            </Button>
          </article>
          <article className="rounded-2xl border border-primary bg-primary p-8 text-primary-foreground shadow-lift">
            <p className="text-sm font-medium text-primary-foreground/70">Pro</p>
            <p className="mt-2 font-display text-4xl">$11<span className="text-lg">/mo</span></p>
            <p className="text-sm text-primary-foreground/70">or $99/year</p>
            <ul className="mt-6 space-y-2 text-sm text-primary-foreground/85">
              <li>Recurring invoices</li>
              <li>Due-date reminders</li>
              <li>Remove FormaBill branding</li>
              <li>Everything in Free</li>
            </ul>
            <Button className="mt-8 bg-card text-foreground hover:bg-card/90" asChild>
              <Link to="/app/settings">Enable Pro in settings</Link>
            </Button>
          </article>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <Logo />
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Link to="/terms" className="hover:text-foreground">Terms</Link>
            <Link to="/privacy" className="hover:text-foreground">Privacy</Link>
            <p>Made for designers who still send invoices from a docs template.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
