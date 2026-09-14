import type { Plan } from "../types";

/** Mock catalogue — swap for a billing API later. Amounts are USD. */
export const billing = {
  currency: "USD",
  trialDays: 14,
  yearlyDiscountPct: 23,
};

export const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    audience: "Solo founders & small teams",
    tagline: "Open the books in an afternoon — invoices, expenses, and a clear P&L.",
    monthly: 49,
    yearly: 39,
    cta: "Start free for 14 days",
    features: [
      "1 organisation workspace",
      "Up to 3 users",
      "Unlimited contacts",
      "50 invoices / month",
      "Expense capture & receipts",
      "Profit & loss snapshot",
      "Email support in 1 business day",
    ],
  },
  {
    id: "professional",
    name: "Professional",
    audience: "Growing companies & NGOs",
    tagline: "The finance OS teams actually live in — banking, tax, and close in one place.",
    monthly: 129,
    yearly: 99,
    popular: true,
    highlight: "Most chosen",
    cta: "Start Professional trial",
    features: [
      "Everything in Starter",
      "Up to 15 users",
      "Unlimited invoices & bills",
      "Bank feeds & reconciliation",
      "Cash flow, ageing & tax tools",
      "Approvals for expenses",
      "Priority chat — typically under 2 hours",
    ],
  },
  {
    id: "business",
    name: "Business",
    audience: "Multi-branch organisations",
    tagline: "Branches, roles, and an audit trail your board and auditors will trust.",
    monthly: 249,
    yearly: 199,
    cta: "Run Business for 14 days",
    features: [
      "Everything in Professional",
      "Up to 50 users",
      "Departments & branches",
      "Advanced roles & close checklist",
      "Full audit trail & exports",
      "Dedicated onboarding specialist",
      "Phone + chat support",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    audience: "Groups with advanced security",
    tagline: "Your chart of accounts, your rules, your SLA — with a team that stays.",
    monthly: 0,
    yearly: 0,
    cta: "Talk to sales",
    features: [
      "Unlimited users & entities",
      "SSO, SCIM & custom roles",
      "API access & data residency options",
      "Custom workflows & close calendar",
      "99.9% uptime SLA",
      "Named success manager",
      "Security review & white-glove migration",
    ],
  },
];

export const comparisonRows = [
  { name: "Best for", starter: "Micro SMEs", professional: "Growing orgs", business: "Multi-site", enterprise: "Complex groups" },
  { name: "Users included", starter: "3", professional: "15", business: "50", enterprise: "Unlimited" },
  { name: "Invoices / month", starter: "50", professional: "Unlimited", business: "Unlimited", enterprise: "Unlimited" },
  { name: "Banking & reconcile", starter: "Manual", professional: "Feeds + match", business: "Feeds + match", enterprise: "Custom feeds" },
  { name: "Multi-currency", starter: "—", professional: "Yes", business: "Yes", enterprise: "Yes" },
  { name: "Approvals & roles", starter: "Basic", professional: "Standard", business: "Advanced", enterprise: "Custom" },
  { name: "Audit trail", starter: "—", professional: "Basic", business: "Full", enterprise: "Full + export" },
  { name: "Onboarding", starter: "Guides", professional: "Guided setup", business: "Dedicated", enterprise: "White-glove" },
  { name: "Support", starter: "Email", professional: "Priority chat", business: "Phone + chat", enterprise: "Named CSM" },
];

export const pricingPromises = [
  { title: "14-day Professional trial", body: "Full product. No card required in this demo — and none in a real signup either until you choose a plan." },
  { title: "Switch or cancel anytime", body: "Upgrade mid-cycle, pause seats, or move down a plan. You keep your books." },
  { title: "Built for African organisations", body: "GHS, NGN, KES, ZAR and more. VAT-aware, branch-ready, auditor-friendly." },
];

export function yearlySave(plan: Plan) {
  if (!plan.monthly) return 0;
  return (plan.monthly - plan.yearly) * 12;
}
