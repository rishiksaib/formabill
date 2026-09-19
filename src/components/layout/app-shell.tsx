import { useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { FileText, Plus, Settings, Users } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { WaitlistModal } from "@/components/auth/waitlist-modal";
import { cn } from "@/lib/utils";
import { authConfigured } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";

const NAV = [
  { to: "/app", label: "New invoice", icon: Plus },
  { to: "/app/invoices", label: "Invoices", icon: FileText },
  { to: "/app/clients", label: "Clients", icon: Users },
  { to: "/app/settings", label: "Settings", icon: Settings },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  return (
    <div className="min-h-dvh bg-background">
      <header className="sticky top-0 z-20 border-b border-border/80 bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Logo to="/" />
          <nav className="flex items-center gap-1 overflow-x-auto">
            {NAV.map((item) => {
              const active =
                item.to === "/app"
                  ? pathname === "/app" || pathname === "/app/"
                  : pathname.startsWith(item.to);
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "inline-flex h-11 items-center gap-2 rounded-md px-3 text-sm transition-colors duration-150",
                    active
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground",
                  )}
                >
                  <Icon className="size-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              );
            })}
            {!authConfigured && (
              <Button variant="ghost" size="sm" className="ml-2" onClick={() => setWaitlistOpen(true)}>
                Sign in for sync &amp; Pro — soon
              </Button>
            )}
          </nav>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">{children}</div>
      <WaitlistModal open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </div>
  );
}
