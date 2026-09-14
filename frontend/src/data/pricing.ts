import type { Plan } from "../types";

/** Mock catalogue — swap for a billing API later. Amounts are USD, billed monthly. */
export const billing = {
  currency: "USD",
  trialDays: 14,
};

export const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    audience: "Solo founders & small teams",
    tagline: "Open the books in an afternoon — invoices, expenses, and a clear P&L.",
    monthly: 49,
    cta: "Get started",
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
    id: "business",
    name: "Business",
    audience: "Growing companies & NGOs",
    tagline: "The finance OS teams actually live in — banking, tax, and close in one place.",
    monthly: 129,
    popular: true,
    highlight: "Most chosen",
    cta: "Get started",
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
    id: "professional",
    name: "Professional",
    audience: "Multi-branch organisations",
    tagline: "Branches, roles, and an audit trail your board and auditors will trust.",
    monthly: 249,
    cta: "Get started",
    features: [
      "Everything in Business",
      "Up to 50 users",
      "Departments & branches",
      "Advanced roles & close checklist",
      "Full audit trail & exports",
      "Dedicated onboarding specialist",
      "Phone + chat support",
    ],
  },
];

export const comparisonRows = [
  { name: "Best for", starter: "Micro SMEs", business: "Growing orgs", professional: "Multi-site" },
  { name: "Users included", starter: "3", business: "15", professional: "50" },
  { name: "Invoices / month", starter: "50", business: "Unlimited", professional: "Unlimited" },
  { name: "Banking & reconcile", starter: "Manual", business: "Feeds + match", professional: "Feeds + match" },
  { name: "Multi-currency", starter: "—", business: "Yes", professional: "Yes" },
  { name: "Approvals & roles", starter: "Basic", business: "Standard", professional: "Advanced" },
  { name: "Audit trail", starter: "—", business: "Basic", professional: "Full" },
  { name: "Onboarding", starter: "Guides", business: "Guided setup", professional: "Dedicated" },
  { name: "Support", starter: "Email", business: "Priority chat", professional: "Phone + chat" },
];

export const pricingPromises = [
  { title: "14-day trial", body: "Full product. No card required in this demo — and none in a real signup either until you choose a plan." },
  { title: "Switch or cancel anytime", body: "Upgrade mid-cycle, pause seats, or move down a plan. You keep your books." },
  { title: "Built for African organisations", body: "GHS, NGN, KES, ZAR and more. VAT-aware, branch-ready, auditor-friendly." },
];
