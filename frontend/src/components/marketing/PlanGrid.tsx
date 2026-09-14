import { Link } from "react-router-dom";
import { Check, Sparkles } from "lucide-react";
import { billing, plans } from "../../data/pricing";
import { Button } from "../ui/Button";

export function PlanGrid({
  currentPlan,
  onSelect,
  registerTo = "/register",
}: {
  currentPlan?: string;
  onSelect?: (planName: string) => void;
  registerTo?: string;
}) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      {plans.map((p) => {
        const current = currentPlan === p.name;
        return (
          <article
            key={p.id}
            className="relative flex flex-col rounded-3xl border border-line bg-white p-5 pt-6 shadow-sm sm:p-6"
          >
            {p.highlight && (
              <span className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-navy px-3 py-1 text-xs font-semibold text-white">
                <Sparkles className="h-3.5 w-3.5" />
                {p.highlight}
              </span>
            )}
            <p className="text-xs font-semibold uppercase tracking-wider text-teal">{p.audience}</p>
            <h3 className="mt-2 text-2xl font-semibold text-navy">{p.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate sm:min-h-[3.2rem]">{p.tagline}</p>
            <div className="mt-5">
              <p className="flex items-baseline gap-1">
                <span className="text-4xl font-semibold tracking-tight text-navy num">${p.monthly}</span>
                <span className="text-sm text-slate">/ month</span>
              </p>
              <p className="mt-1 text-xs text-slate">
                {billing.trialDays}-day free trial · billed monthly in {billing.currency}
              </p>
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
                <Link to={`${registerTo.split("?")[0]}?plan=${p.id}`} className="block">
                  <Button type="button" className="w-full bg-black text-white hover:bg-zinc-900" variant="dark">
                    Get started
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
