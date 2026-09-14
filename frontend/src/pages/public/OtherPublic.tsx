import { MarketingPage } from "./MarketingPage";
import { faqs, resources } from "../../data/seed";

export function FeaturesPage() {
  return (
    <MarketingPage kicker="Features" title="A complete finance operating system" lead="From first invoice to year-end reports.">
      <p className="text-slate">
        Bookly unifies bookkeeping, sales, purchasing, expenses, banking, tax and audit. Every module shares the same
        chart of accounts and organisation profile — so numbers stay consistent across the product.
      </p>
    </MarketingPage>
  );
}

export function SolutionsPage() {
  const items = [
    ["Small Businesses", "Stay on top of cash without hiring a full finance team."],
    ["Growing Companies", "Add users, branches and approvals as you scale."],
    ["Startups", "Clean books for fundraising, burn tracking and runway."],
    ["NGOs", "Grant-friendly coding, audit trail and donor-ready reports."],
    ["Professional Services", "Time-based invoices, retainers and WIP visibility."],
    ["Retail Businesses", "Inventory-linked purchases and daily cash position."],
    ["Service Businesses", "Recurring invoices and expense control for field teams."],
    ["Multi-branch Organisations", "Departments, branches and consolidated reporting."],
  ];
  return (
    <MarketingPage kicker="Solutions" title="One platform, many organisation types">
      <div className="grid gap-4 md:grid-cols-2">
        {items.map(([t, d]) => (
          <div key={t} className="rounded-2xl border border-line bg-white p-5">
            <h3 className="font-semibold text-navy">{t}</h3>
            <p className="mt-1 text-sm text-slate">{d}</p>
          </div>
        ))}
      </div>
    </MarketingPage>
  );
}

export function HowItWorksPage() {
  return (
    <MarketingPage kicker="How it works" title="From organisation setup to insight">
      <ol className="space-y-6">
        {[
          "Create your organisation and invite finance collaborators.",
          "Set currency, financial year and tax profile.",
          "Issue invoices, capture expenses, and match the bank.",
          "Read P&L, cash flow and ageing — then act on overdue work.",
        ].map((t, i) => (
          <li key={t} className="flex gap-4">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-mint font-semibold text-teal">{i + 1}</span>
            <p className="pt-2">{t}</p>
          </li>
        ))}
      </ol>
    </MarketingPage>
  );
}

export function ResourcesPage() {
  return (
    <MarketingPage kicker="Resources" title="Guides for finance leads">
      <div className="grid gap-4 md:grid-cols-2">
        {resources.map((r) => (
          <article key={r.title} className="rounded-2xl border border-line bg-white p-5">
            <p className="text-xs font-medium text-teal">{r.tag}</p>
            <h3 className="mt-2 font-semibold text-navy">{r.title}</h3>
            <p className="mt-2 text-sm text-slate">{r.read} read</p>
          </article>
        ))}
      </div>
    </MarketingPage>
  );
}

export function FaqPage() {
  return (
    <MarketingPage kicker="FAQ" title="Questions, answered">
      <div className="space-y-4">
        {faqs.map((f) => (
          <details key={f.q} className="rounded-2xl border border-line bg-white p-5">
            <summary className="cursor-pointer font-medium text-navy">{f.q}</summary>
            <p className="mt-2 text-sm text-slate">{f.a}</p>
          </details>
        ))}
      </div>
    </MarketingPage>
  );
}

export function AboutPage() {
  return (
    <MarketingPage kicker="About" title="Finance software that respects your time">
      <p className="max-w-2xl text-slate">
        Bookly is a modern bookkeeping SaaS for organisations that need trust, speed and clarity — not a 1990s desktop
        ledger. This experience is a production-quality frontend, wired to a mock service layer so a real API can drop
        in later.
      </p>
    </MarketingPage>
  );
}

export function ContactPage() {
  return (
    <MarketingPage kicker="Contact" title="Talk to Bookly">
      <form
        className="max-w-lg space-y-4 rounded-2xl border border-line bg-white p-6"
        onSubmit={(e) => {
          e.preventDefault();
          alert("Thanks — this demo does not send messages.");
        }}
      >
        <input className="w-full rounded-xl border border-line px-3 py-2" placeholder="Name" required />
        <input className="w-full rounded-xl border border-line px-3 py-2" placeholder="Work email" type="email" required />
        <textarea className="w-full rounded-xl border border-line px-3 py-2" placeholder="How can we help?" rows={4} />
        <button className="rounded-xl bg-teal px-4 py-2 text-white" type="submit">
          Send
        </button>
      </form>
    </MarketingPage>
  );
}
