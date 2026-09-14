import { Link } from "react-router-dom";
import { BookOpen, FileText, Landmark, LineChart } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { HeroDashboardPreview } from "../../components/marketing/HeroDashboardPreview";
import { PlanGrid } from "../../components/marketing/PlanGrid";
import { plans } from "../../data/pricing";

const features = [
  { icon: BookOpen, title: "Books", body: "Income, expenses and a ledger that stays in balance." },
  { icon: FileText, title: "Invoices", body: "Send, collect, and see who still owes you." },
  { icon: Landmark, title: "Banking", body: "Match the bank in minutes, not month-end." },
  { icon: LineChart, title: "Reports", body: "Profit, cash and tax — clear enough to act on." },
];

const steps = [
  { n: "1", t: "Pick a plan" },
  { n: "2", t: "Create your workspace" },
  { n: "3", t: "Run the business" },
];

export function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:py-16">
          <div>
            <h1 className="display text-[2.15rem] leading-[1.15] text-white sm:text-5xl lg:text-[3.25rem]">
              Books you can trust.
              <br />
              Numbers you can use.
            </h1>
            <p className="mt-5 max-w-md text-base text-white/65 sm:text-lg">
              Start by choosing a plan. Invoices, expenses, banking and reports in one place.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#pricing">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Get started
                </Button>
              </a>
              <Link to="/login">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Log in
                </Button>
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-2">
              {plans.map((p) => (
                <Link
                  key={p.id}
                  to={`/register?plan=${p.id}`}
                  className="rounded-xl border border-white/15 bg-white/5 px-3 py-3 hover:bg-white/10"
                >
                  <p className="text-[11px] font-medium uppercase tracking-wide text-white/50">{p.name}</p>
                  <p className="mt-1 text-lg font-semibold text-white">
                    ${p.monthly}
                    <span className="text-xs font-normal text-white/45">/mo</span>
                  </p>
                  <p className="mt-1 text-[11px] text-teal">Sign up</p>
                </Link>
              ))}
            </div>
            <p className="mt-3 text-xs text-white/45">From ${plans[0].monthly}/mo billed monthly · 14-day trial</p>
          </div>
          <HeroDashboardPreview />
        </div>
      </section>

      <section id="pricing" className="scroll-mt-20 bg-paper py-16 text-ink sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-sm font-semibold text-teal">Subscription</p>
          <h2 className="mt-2 text-2xl font-semibold text-navy sm:text-3xl">Pick a plan to get started.</h2>
          <p className="mt-3 max-w-xl text-sm text-slate sm:text-base">
            Choose Starter, Business, or Professional, then tap Get started to create your organisation.
          </p>
          <div className="mt-10">
            <PlanGrid />
          </div>
        </div>
      </section>

      <section className="bg-white py-16 text-ink sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-2xl font-semibold text-navy">What you actually need.</h2>
          <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div key={f.title}>
                <f.icon className="h-5 w-5 text-teal" />
                <h3 className="mt-4 font-semibold text-navy">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper py-16 text-ink">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-2xl font-semibold text-navy">Three steps. Then you’re in.</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="flex gap-4">
                <span className="display text-3xl text-teal">{s.n}</span>
                <p className="pt-2 font-medium text-navy">{s.t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy px-4 py-16 text-center">
        <h2 className="text-2xl font-semibold text-white sm:text-3xl">Start with a plan that fits.</h2>
        <a href="#pricing" className="mt-8 inline-block">
          <Button size="lg" variant="secondary">
            Get started
          </Button>
        </a>
      </section>
    </div>
  );
}
