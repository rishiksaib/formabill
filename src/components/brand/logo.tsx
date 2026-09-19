import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function Mark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("size-7", className)}
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="8" fill="currentColor" className="text-primary" />
      <path
        d="M9 10.5h10.2c2.4 0 4.3 1.8 4.3 4.4 0 2.5-1.9 4.3-4.3 4.3H13.2V22H9V10.5Zm4.2 5.6h5.6c.9 0 1.5-.6 1.5-1.3 0-.8-.6-1.3-1.5-1.3h-5.6v2.6Z"
        fill="currentColor"
        className="text-primary-foreground"
      />
    </svg>
  );
}

export function Logo({
  to = "/",
  className,
  wordmark = true,
}: {
  to?: string;
  className?: string;
  wordmark?: boolean;
}) {
  const inner = (
    <span className={cn("inline-flex items-center gap-2 text-foreground", className)}>
      <Mark />
      {wordmark ? (
        <span className="font-display text-lg tracking-tight">FormaBill</span>
      ) : null}
    </span>
  );
  if (!to) return inner;
  return (
    <Link to={to} className="inline-flex items-center">
      {inner}
    </Link>
  );
}
