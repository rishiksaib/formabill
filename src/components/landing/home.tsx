import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Bot, Check, Coins, CreditCard, FileCheck2, Link2, Star, Timer, Users } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { InvoiceDocument } from "@/components/invoice/document";
import { Button } from "@/components/ui/button";
import type { Invoice } from "@/lib/types";

const SAMPLE: Invoice = {
  id: "sample",
  number: "FB-0001",
  fromName: "North Studio",
  fromEmail: "hello@north.studio",
  fromAddress: "San Francisco, CA",
  client: { id: "c1", name: "Harbor Co.", email: "pay@harbor.co" },
  lineItems: [
    { id: "1", description: "Brand identity system", quantity: 1, rate: 1500 },
    { id: "2", description: "Product UI, 3 screens", quantity: 1, rate: 1200 },
  ],
  taxRate: 0,
  notes: "Payment via UPI, PayPal, cards, or bank transfer.",
  dueDate: "2026-10-02",
  status: "sent",
  createdAt: "2026-09-18",
  currency: "USD",
};

const FEATURES = [
  {
    icon: Timer,
    title: "Bill in a minute, not an evening",
    body: "Four fields and a live paper preview. Invoicing stops being the Sunday-night chore.",
  },
  {
    icon: Link2,
    title: "Clients pay from one tap",
    body: "A clean public page, plus a WhatsApp message with the amount filled in. Nothing lost in email threads.",
  },
  {
    icon: CreditCard,
    title: "Keep every rupee, dollar, and euro",
    body: "UPI, PayPal, cards, or bank details. Money lands in your account — we never touch it.",
  },
  {
    icon: Bot,
    title: "Let your AI do the billing",
    body: "On Pro, Claude or Cursor can draft invoices and mark payments for you. Always as you, revocable anytime.",
  },
  {
    icon: Users,
    title: "Clients remember themselves",
    body: "Companies, phones, and notes saved once. Repeat clients refill in one tap.",
  },
  {
    icon: Coins,
    title: "Local payment habits, built in",
    body: "INR opens instantly in UPI apps; other currencies show PayPal and bank details. Clients pay the way they already pay.",
  },
];

const STEPS = [
  {
    n: "1",
    title: "Create",
    body: "Client, line items, done. Your studio details save themselves for next time.",
  },
  {
    n: "2",
    title: "Share",
    body: "Copy a public link, or send it straight over WhatsApp and email with the amount filled in.",
  },
  {
    n: "3",
    title: "Get paid",
    body: "Clients pay via UPI, PayPal, or your gateway — then mark it paid and move on.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "I used to dread invoicing Sundays. Now the invoice is done before my coffee cools — and clients pay faster off the WhatsApp link.",
    name: "Ananya Rao",
    role: "Brand designer, Bengaluru",
  },
  {
    quote:
      "The UPI pay button is the killer feature. My Indian clients pay in one tap, and my US clients get PayPal. Nothing for me to chase.",
    name: "Marcus Lee",
    role: "Freelance UI designer, Austin",
  },
  {
    quote:
      "It looks like I hired someone to do my paperwork. Two clients asked what tool I use — that's never happened with a spreadsheet.",
    name: "Priya Nair",
    role: "Illustrator, Kochi",
  },
];

const FAQS = [
  {
    q: "Is FormaBill really free?",
    a: "Yes — 5 invoices a month, PDF download, public links, and payment details, free forever. Pro ($11/mo or $99/yr) adds recurring invoices, reminders, and removes our branding.",
  },
  {
    q: "Do you take a cut of my client payments?",
    a: "Never. Client money goes straight to your UPI, PayPal, bank, or Razorpay account. Gateways charge their own fees; we charge only for optional Pro.",
  },
  {
    q: "How do UPI payments work?",
    a: "On INR invoices your public page shows a Pay via UPI button that opens the client's UPI app with amount and note filled in. Other currencies show PayPal and bank details instead.",
  },
  {
    q: "Do I need to sign up?",
    a: "No. Create and publish invoices anonymously; drafts autosave in your browser. Sign up when you want sync across devices, per-user limits, and Pro.",
  },
  {
    q: "Can I download PDFs?",
    a: "Yes — every invoice downloads as a clean PDF with your logo, matching the preview exactly.",
  },
  {
    q: "What happens to my data?",
    a: "Drafts live in your browser. Published invoices are stored so public links keep working, and deleting an invoice removes its public page. We never sell data — see Privacy for details.",
  },
  {
    q: "Can an AI assistant manage my invoices?",
    a: "Yes, on Pro. Connect Claude, Cursor, or any MCP-compatible assistant with a personal access token from Settings → AI / MCP. It can list and draft invoices, manage clients, and mark payments — always acting as you, revocable anytime.",
  },
];

export const REFERRAL_STORAGE_KEY = "formabill-ref";

export function LandingPage() {
  // Capture referral codes (`/?ref=CODE`) for post-signup attribution.
  useEffect(() => {
    try {
      const code = new URLSearchParams(window.location.search).get("ref");
      if (code && /^[A-Za-z0-9]{4,16}$/.test(code.trim())) {
        window.localStorage.setItem(REFERRAL_STORAGE_KEY, code.trim().toUpperCase());
      }
    } catch {
      /* storage unavailable — referrals simply won't attribute */
    }
  }, []);

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
            Fast pro invoices for freelancers worldwide
          </p>
          <h1 className="mt-4 font-display text-4xl leading-[1.1] tracking-tight sm:text-6xl">
            Get paid without the payment-platform tax.
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
            Polished invoices in under a minute, shared on WhatsApp, paid via UPI or PayPal.
            Zero cut — with an AI assistant on Pro that can bill for you.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button size="lg" className="px-8 text-base" asChild>
              <Link to="/app">
                Create your first invoice — free <ArrowRight />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#pricing">See pricing</a>
            </Button>
          </div>
          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-muted-foreground">
            {["No sign-up needed", "Free 5 invoices/mo", "No cut of your payments"].map((t) => (
              <li key={t} className="flex items-center gap-1.5">
                <Check className="size-4 text-emerald-600" aria-hidden="true" /> {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative min-w-0">
          <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[2rem] bg-secondary/70 sm:-inset-6" />
          <InvoiceDocument invoice={SAMPLE} className="max-h-[560px] overflow-hidden rounded-xl sm:max-h-[640px]" />
        </div>
      </section>

      <section className="border-y border-border bg-card/60">
        <div className="mx-auto max-w-6xl px-4 pt-14 sm:px-6">
          <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">How it works</p>
          <h2 className="mt-3 font-display text-3xl tracking-tight sm:text-4xl">Invoice to paid in three steps</h2>
          <div className="mt-8 grid gap-8 pb-4 sm:grid-cols-3 sm:gap-6">
            {STEPS.map((s) => (
              <div key={s.n} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="grid size-10 shrink-0 place-items-center rounded-full bg-primary font-display text-lg text-primary-foreground"
                >
                  {s.n}
                </span>
                <div>
                  <h3 className="font-display text-xl tracking-tight">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card/60">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:grid-cols-2 sm:gap-10 sm:px-6 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="flex flex-col">
              <f.icon className="size-5 text-primary" />
              <h2 className="mt-4 font-display text-xl tracking-tight">{f.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
            </div>
          ))}
          <div className="sm:col-span-2 lg:col-span-3 pt-4 border-t border-border">
            <div className="flex items-start gap-3">
              <FileCheck2 className="size-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h2 className="font-display text-xl tracking-tight">No cut of client payments</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Gateways may charge their own fees. FormaBill does not take a percentage of what you earn.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-1" aria-label="Loved by freelancers">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-4 fill-amber-400 text-amber-400" aria-hidden="true" />
            ))}
          </div>
          <h2 className="mt-4 font-display text-3xl tracking-tight sm:text-4xl">
            Loved by freelancers who hate paperwork
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
            From first invoice to paid — real workflows from independent designers and studios.
          </p>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-paper">
              <blockquote className="text-sm leading-relaxed text-foreground">“{t.quote}”</blockquote>
              <figcaption className="mt-4 border-t border-border pt-4 text-sm">
                <p className="font-medium">{t.name}</p>
                <p className="text-muted-foreground">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">Pricing</p>
        <h2 className="mt-3 font-display text-4xl tracking-tight">Start free. Upgrade when your volume grows.</h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <article className="flex flex-col rounded-2xl border border-border bg-card p-8 shadow-paper">
            <p className="text-sm font-medium text-muted-foreground">Free</p>
            <p className="mt-1 text-sm text-muted-foreground">For your first invoices. Free forever.</p>
            <p className="mt-4 font-display text-4xl">$0<span className="text-lg text-muted-foreground">/mo</span></p>
            <ul className="mt-6 space-y-2.5 text-sm text-muted-foreground">
              {[
                "5 invoices per month",
                "PDF download",
                "Public share links",
                "Client address book",
                "UPI, PayPal, and gateway payment links",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-emerald-600" aria-hidden="true" /> {t}
                </li>
              ))}
            </ul>
            <Button className="mt-8 w-full" asChild>
              <Link to="/app">Start free</Link>
            </Button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              No credit card needed. Free forever.
            </p>
          </article>
          <article className="flex flex-col rounded-2xl border-2 border-primary bg-primary p-8 text-primary-foreground shadow-lift">
            <p className="flex items-center justify-between gap-2 text-sm font-medium text-primary-foreground/70">
              Pro
              <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-xs">Most popular</span>
            </p>
            <p className="mt-1 text-sm text-primary-foreground/70">For steady freelance volume.</p>
            <p className="mt-4 font-display text-4xl">$11<span className="text-lg">/mo</span></p>
            <p className="text-sm text-primary-foreground/70">or $99/year</p>
            <ul className="mt-6 space-y-2.5 text-sm text-primary-foreground/90">
              {[
                "Recurring invoices",
                "Due-date reminders",
                "Connect AI assistants (MCP)",
                "Remove FormaBill branding",
                "Everything in Free",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <Check className="mt-0.5 size-4 shrink-0" aria-hidden="true" /> {t}
                </li>
              ))}
            </ul>
            <Button className="mt-8 w-full bg-card text-foreground hover:bg-card/90" asChild>
              <Link to="/app">Get Pro</Link>
            </Button>
            <p className="mt-3 text-center text-xs text-primary-foreground/70">
              Client payments still go to your own accounts — never to us.
            </p>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="mx-auto max-w-2xl">
          <p className="text-center text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
            Questions, answered
          </p>
          <h2 className="mt-3 text-center font-display text-3xl tracking-tight sm:text-4xl">
            Frequently asked questions
          </h2>
          <div className="mt-8 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
            {FAQS.map((f) => (
              <details key={f.q} className="group px-6 py-4">
                <summary className="cursor-pointer list-none rounded text-sm font-medium marker:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between gap-4">
                    {f.q}
                    <span aria-hidden="true" className="text-lg leading-none text-muted-foreground transition-transform group-open:rotate-45">+</span>
                  </span>
                </summary>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-primary text-primary-foreground">
        <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6 sm:py-20">
          <h2 className="font-display text-3xl tracking-tight sm:text-5xl">
            Send your first invoice today.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-primary-foreground/80">
            Free for 5 invoices a month. No sign-up, no credit card — your client could be paying
            within the hour.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" className="bg-card px-8 text-base text-foreground hover:bg-card/90" asChild>
              <Link to="/app">
                Start invoicing free <ArrowRight />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-white/10 hover:text-primary-foreground"
              asChild
            >
              <a href="#pricing">Compare plans</a>
            </Button>
          </div>
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
