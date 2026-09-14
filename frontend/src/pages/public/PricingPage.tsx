import { useState } from "react";
import { ShieldCheck, Timer, Wallet } from "lucide-react";
import { comparisonRows, plans, pricingPromises } from "../../data/pricing";
import { BillingToggle, PlanGrid } from "../../components/marketing/PlanGrid";
import { MarketingPage } from "./MarketingPage";

export function PricingPage() {
  const [yearly, setYearly] = useState(true);
  return (
    <MarketingPage
      kicker="Pricing"
      title="Simple plans. Serious books."
      lead="From the first invoice to a board-ready close. Start on Professional — most organisations never look back. Yearly billing saves about 23%."
    >
      <BillingToggle yearly={yearly} onChange={setYearly} />
      <div className="mt-10">
        <PlanGrid yearly={yearly} />
      </div>

      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {pricingPromises.map((p, i) => {
          const Icon = [Timer, Wallet, ShieldCheck][i];
          return (
            <div key={p.title} className="rounded-2xl border border-line bg-white p-5">
              <Icon className="h-5 w-5 text-teal" />
              <h3 className="mt-3 font-semibold text-navy">{p.title}</h3>
              <p className="mt-1 text-sm text-slate">{p.body}</p>
            </div>
          );
        })}
      </div>

      <h3 className="mt-16 text-xl font-semibold text-navy">Compare at a glance</h3>
      <p className="mt-1 text-sm text-slate">Every plan includes Bookly branding, encryption in transit, and a workspace you can export.</p>
      <p className="mt-1 text-xs text-slate">Swipe sideways to compare every plan.</p>
      <div className="mt-4 overflow-x-auto rounded-2xl border border-line bg-white">
        <table className="w-full min-w-[760px] text-sm">
          <thead>
            <tr className="border-b border-line bg-paper text-left">
              <th className="p-3 font-medium text-slate">Capability</th>
              {plans.map((p) => (
                <th key={p.id} className="p-3">
                  {p.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((r) => (
              <tr key={r.name} className="border-b border-line last:border-0">
                <td className="p-3 font-medium text-navy">{r.name}</td>
                <td className="p-3">{r.starter}</td>
                <td className="p-3">{r.professional}</td>
                <td className="p-3">{r.business}</td>
                <td className="p-3">{r.enterprise}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MarketingPage>
  );
}
