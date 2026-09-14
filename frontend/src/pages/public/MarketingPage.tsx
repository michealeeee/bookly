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
      <div className="border-b border-line bg-navy px-4 py-8 text-white sm:px-6 sm:py-14">
        <div className="mx-auto max-w-6xl">
          {kicker && <p className="text-sm font-semibold text-teal">{kicker}</p>}
          <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">{title}</h1>
          {lead && <p className="mt-3 max-w-2xl text-sm text-white/70 sm:text-base">{lead}</p>}
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">{children}</div>
    </div>
  );
}
