import { useEffect, useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { FileText, LogIn, Plus, Settings, Users } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { WaitlistModal } from "@/components/auth/waitlist-modal";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { cn } from "@/lib/utils";
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
  const { user, isPending } = useCurrentUserState();

  // Attribute a stored referral code once per signed-in account.
  useEffect(() => {
    if (isPending || !user || user.isDevFallback) return;
    let code: string | null = null;
    try {
      code = window.localStorage.getItem("formabill-ref");
    } catch {
      return;
    }
    if (!code) return;
    void fetch("/api/referrals/attribute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    })
      .then((response) => {
        // Clear on success or definitive rejection (unknown/self/already);
        // keep it only on transport/rate-limit failure so it retries next visit.
        if (response.ok || response.status === 400 || response.status === 401) {
          try {
            window.localStorage.removeItem("formabill-ref");
          } catch {
            /* ignore */
          }
        }
      })
      .catch(() => undefined);
  }, [isPending, user]);

  const showSignIn = !isPending && !user;
  // Auth fully disabled (dev fallback user): sign-in is meaningless — keep the
  // honest "soon" waitlist entry point instead of a fake login.
  const showWaitlist = !isPending && Boolean(user?.isDevFallback);

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
            {showSignIn && (
              <Button variant="ghost" size="sm" className="ml-2" asChild>
                <Link to="/login">
                  <LogIn className="size-4" />
                  <span className="hidden sm:inline">Sign in</span>
                </Link>
              </Button>
            )}
            {showWaitlist && (
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
