import { Link } from "react-router-dom";
import {
  BookOpen,
  Building2,
  FileText,
  Landmark,
  Receipt,
  Shield,
  Store,
  Users,
  Wallet,
  Workflow,
} from "lucide-react";
import { Button } from "../../components/ui/Button";
import { HeroDashboardPreview } from "../../components/marketing/HeroDashboardPreview";

const features = [
  { icon: BookOpen, title: "Smart Bookkeeping", body: "Track income, expenses and financial transactions." },
  { icon: FileText, title: "Invoicing", body: "Create and manage professional invoices." },
  { icon: Wallet, title: "Expense Management", body: "Track and control business expenses." },
  { icon: Landmark, title: "Banking", body: "Monitor bank transactions and reconciliation." },
  { icon: Receipt, title: "Financial Reports", body: "Understand business performance through financial reports." },
  { icon: Users, title: "Customer Management", body: "Manage customers and outstanding receivables." },
  { icon: Store, title: "Supplier Management", body: "Manage suppliers and accounts payable." },
  { icon: Building2, title: "Team Management", body: "Control users, roles and permissions." },
  { icon: Shield, title: "Tax Management", body: "Organise tax-related financial information." },
  { icon: Workflow, title: "Audit Trail", body: "Maintain visibility into important financial activities." },
];

const steps = [
  { n: "01", t: "Create your organisation", d: "Name your workspace, currency, and legal profile in minutes." },
  { n: "02", t: "Set up your bookkeeping", d: "Chart of accounts, tax rates, and opening balances — guided." },
  { n: "03", t: "Manage your finances", d: "Invoices, bills, expenses and bank matching in one place." },
  { n: "04", t: "Understand your business", d: "Live P&L, cash flow, and action lists for the week ahead." },
];

const solutions = [
  "Small Businesses",
  "Growing Companies",
  "Startups",
  "NGOs",
  "Professional Services",
  "Retail Businesses",
  "Service Businesses",
  "Multi-branch Organisations",
];

export function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="bg-grid pointer-events-none absolute inset-0" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-12 lg:py-24">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-teal">Bookly</p>
            <h1 className="display mt-3 text-[2rem] leading-tight text-white sm:text-5xl lg:text-[3.4rem]">
              Bookkeeping Made Simple. Business Made Smarter.
            </h1>
            <p className="mt-5 max-w-lg text-base text-white/70 sm:text-lg">
              Bookly helps organisations manage their finances, invoices, expenses, payments and financial reports in
              one simple platform.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link to="/register" className="sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started
                </Button>
              </Link>
              <Link to="/how-it-works" className="sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  See How It Works
                </Button>
              </Link>
            </div>
          </div>
          <HeroDashboardPreview />
        </div>
      </section>

      <section id="features" className="bg-paper py-12 text-ink sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-sm font-semibold text-teal">Features</p>
          <h2 className="mt-2 text-2xl font-semibold text-navy sm:text-3xl">Everything finance teams actually use.</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="rounded-2xl border border-line bg-white p-5 shadow-sm">
                <f.icon className="h-6 w-6 text-teal" />
                <h3 className="mt-3 font-semibold text-navy">{f.title}</h3>
                <p className="mt-1 text-sm text-slate">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-12 text-ink sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-sm font-semibold text-teal">How Bookly works</p>
          <h2 className="mt-2 text-2xl font-semibold text-navy sm:text-3xl">Four steps from signup to insight.</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div key={s.n} className="rounded-2xl bg-paper p-5">
                <p className="display text-3xl text-teal">{s.n}</p>
                <h3 className="mt-3 font-semibold text-navy">{s.t}</h3>
                <p className="mt-2 text-sm text-slate">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-2 py-12 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-sm font-semibold text-teal">Solutions</p>
          <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">Built for how organisations actually operate.</h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {solutions.map((s) => (
              <Link
                key={s}
                to="/solutions"
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-6 text-white hover:bg-white/10"
              >
                {s}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mint px-4 py-12 text-center text-navy sm:py-16">
        <h2 className="text-2xl font-semibold sm:text-3xl">Ready to close the books with confidence?</h2>
        <p className="mt-2 text-slate">Start a workspace in under two minutes. No credit card in this demo.</p>
        <Link to="/register" className="mt-6 inline-block">
          <Button size="lg">Get Started</Button>
        </Link>
      </section>
    </div>
  );
}
