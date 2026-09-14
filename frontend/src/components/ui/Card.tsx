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
    <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4">
      <div>
        <h3 className="text-base font-semibold text-navy">{title}</h3>
        {subtitle && <p className="mt-0.5 text-sm text-slate">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
