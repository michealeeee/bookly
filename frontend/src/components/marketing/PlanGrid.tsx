import { Link } from "react-router-dom";
import { Check, Sparkles } from "lucide-react";
import { billing, plans, yearlySave } from "../../data/pricing";
import { Button } from "../ui/Button";
import { cn } from "../../lib/cn";

export function BillingToggle({
  yearly,
  onChange,
}: {
  yearly: boolean;
  onChange: (yearly: boolean) => void;
}) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="inline-flex rounded-full bg-white p-1 shadow-sm ring-1 ring-line">
        <button
          type="button"
          className={cn("rounded-full px-5 py-2 text-sm font-medium", !yearly ? "bg-navy text-white" : "text-slate")}
          onClick={() => onChange(false)}
        >
          Monthly
        </button>
        <button
          type="button"
          className={cn("rounded-full px-5 py-2 text-sm font-medium", yearly ? "bg-navy text-white" : "text-slate")}
          onClick={() => onChange(true)}
        >
          Yearly
          <span className="ml-2 rounded-full bg-teal/15 px-2 py-0.5 text-xs text-teal-2">
            Save {billing.yearlyDiscountPct}%
          </span>
        </button>
      </div>
      <p className="text-sm text-slate">
        {billing.trialDays}-day free trial on paid plans · billed in {billing.currency}
      </p>
    </div>
  );
}

export function PlanGrid({
  yearly,
  currentPlan,
  onSelect,
  registerTo = "/register",
}: {
  yearly: boolean;
  currentPlan?: string;
  onSelect?: (planName: string) => void;
  registerTo?: string;
}) {
  return (
    <div className="grid gap-5 lg:grid-cols-4">
      {plans.map((p) => {
        const price = yearly ? p.yearly : p.monthly;
        const current = currentPlan === p.name;
        const save = yearlySave(p);
        return (
          <article
            key={p.id}
            className="relative flex flex-col rounded-3xl border border-line bg-white p-6 shadow-sm"
          >
            {p.highlight && (
              <span className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-navy px-3 py-1 text-xs font-semibold text-white">
                <Sparkles className="h-3.5 w-3.5" />
                {p.highlight}
              </span>
            )}
            <p className="text-xs font-semibold uppercase tracking-wider text-teal">{p.audience}</p>
            <h3 className="mt-2 text-2xl font-semibold text-navy">{p.name}</h3>
            <p className="mt-2 min-h-[3.2rem] text-sm leading-relaxed text-slate">{p.tagline}</p>
            <div className="mt-5">
              {p.monthly === 0 ? (
                <p className="text-3xl font-semibold text-navy">Let’s talk</p>
              ) : (
                <>
                  <p className="flex items-baseline gap-1">
                    <span className="text-4xl font-semibold tracking-tight text-navy num">${price}</span>
                    <span className="text-sm text-slate">/ month</span>
                  </p>
                  {yearly && save > 0 && (
                    <p className="mt-1 text-xs font-medium text-gain">Save ${save} a year vs monthly</p>
                  )}
                  {!yearly && <p className="mt-1 text-xs text-slate">${p.yearly}/mo if billed yearly</p>}
                </>
              )}
            </div>
            <ul className="mt-6 flex-1 space-y-2.5 text-sm text-ink">
              {p.features.map((f) => (
                <li key={f} className="flex gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <div className="mt-7">
              {onSelect ? (
                <Button className="w-full bg-black text-white hover:bg-zinc-900" variant="dark" onClick={() => onSelect(p.name)}>
                  {current ? "Current plan" : p.cta}
                </Button>
              ) : (
                <Link to={p.monthly === 0 ? "/contact" : registerTo} className="block">
                  <Button className="w-full bg-black text-white hover:bg-zinc-900" variant="dark">
                    {p.cta}
                  </Button>
                </Link>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}
