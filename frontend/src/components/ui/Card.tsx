import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

export function Card({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("rounded-2xl border border-line bg-card shadow-sm shadow-navy/[0.03]", className)}>
      {children}
    </div>
  );
}

export function CardHeader({ title, action, subtitle }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col gap-3 border-b border-line px-4 py-4 sm:flex-row sm:items-start sm:justify-between sm:gap-4 sm:px-5">
      <div className="min-w-0">
        <h3 className="text-base font-semibold text-navy">{title}</h3>
        {subtitle && <p className="mt-0.5 text-sm text-slate">{subtitle}</p>}
      </div>
      {action && <div className="w-full min-w-0 sm:w-auto">{action}</div>}
    </div>
  );
}
