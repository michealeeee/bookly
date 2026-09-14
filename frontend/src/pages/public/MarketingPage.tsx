import type { ReactNode } from "react";

export function MarketingPage({
  kicker,
  title,
  lead,
  children,
}: {
  kicker?: string;
  title: string;
  lead?: string;
  children: ReactNode;
}) {
  return (
    <div className="bg-paper text-ink">
      <div className="border-b border-line bg-navy px-4 py-14 text-white">
        <div className="mx-auto max-w-6xl">
          {kicker && <p className="text-sm font-semibold text-teal">{kicker}</p>}
          <h1 className="mt-2 text-4xl font-semibold">{title}</h1>
          {lead && <p className="mt-3 max-w-2xl text-white/70">{lead}</p>}
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 py-12">{children}</div>
    </div>
  );
}
