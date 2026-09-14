import {
  Activity,
  ArrowLeftRight,
  Banknote,
  BookOpen,
  Building2,
  ClipboardList,
  CreditCard,
  FileSpreadsheet,
  FileText,
  FolderTree,
  HelpCircle,
  Landmark,
  LayoutDashboard,
  LogOut,
  Percent,
  Receipt,
  Scale,
  Settings,
  Shield,
  ShoppingCart,
  Users,
  Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export const appNav: NavGroup[] = [
  {
    title: "Overview",
    items: [{ to: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    title: "Accounting",
    items: [
      { to: "/app/transactions", label: "Transactions", icon: ArrowLeftRight },
      { to: "/app/journal-entries", label: "Journal Entries", icon: BookOpen },
      { to: "/app/chart-of-accounts", label: "Chart of Accounts", icon: FolderTree },
      { to: "/app/general-ledger", label: "General Ledger", icon: FileSpreadsheet },
    ],
  },
  {
    title: "Sales",
    items: [
      { to: "/app/customers", label: "Customers", icon: Users },
      { to: "/app/quotations", label: "Quotations", icon: ClipboardList },
      { to: "/app/invoices", label: "Invoices", icon: FileText },
      { to: "/app/payments", label: "Payments", icon: Banknote },
      { to: "/app/accounts-receivable", label: "Accounts Receivable", icon: Receipt },
    ],
  },
  {
    title: "Purchases",
    items: [
      { to: "/app/suppliers", label: "Suppliers", icon: Building2 },
      { to: "/app/purchase-orders", label: "Purchase Orders", icon: ShoppingCart },
      { to: "/app/bills", label: "Bills", icon: FileText },
      { to: "/app/purchase-payments", label: "Payments", icon: CreditCard },
      { to: "/app/accounts-payable", label: "Accounts Payable", icon: Scale },
    ],
  },
  {
    title: "Expenses",
    items: [
      { to: "/app/expenses", label: "Expenses", icon: Wallet },
      { to: "/app/expense-claims", label: "Expense Claims", icon: ClipboardList },
      { to: "/app/reimbursements", label: "Reimbursements", icon: Banknote },
    ],
  },
  {
    title: "Banking",
    items: [
      { to: "/app/banking", label: "Overview", icon: Landmark },
      { to: "/app/banking/accounts", label: "Bank Accounts", icon: Landmark },
      { to: "/app/banking/transactions", label: "Transactions", icon: ArrowLeftRight },
      { to: "/app/banking/reconciliation", label: "Reconciliation", icon: Scale },
    ],
  },
  {
    title: "Reports",
    items: [
      { to: "/app/reports/profit-loss", label: "Profit & Loss", icon: FileSpreadsheet },
      { to: "/app/reports/balance-sheet", label: "Balance Sheet", icon: Scale },
      { to: "/app/reports/cash-flow", label: "Cash Flow", icon: Activity },
      { to: "/app/reports/trial-balance", label: "Trial Balance", icon: BookOpen },
      { to: "/app/reports/general-ledger", label: "General Ledger", icon: FileSpreadsheet },
      { to: "/app/reports/ar-aging", label: "A/R Aging", icon: Receipt },
      { to: "/app/reports/ap-aging", label: "A/P Aging", icon: CreditCard },
      { to: "/app/reports/tax", label: "Tax Reports", icon: FileText },
    ],
  },
  {
    title: "Tax",
    items: [
      { to: "/app/tax/rates", label: "Tax Rates", icon: Percent },
      { to: "/app/tax/liabilities", label: "Tax Liabilities", icon: Scale },
      { to: "/app/tax/returns", label: "Tax Returns", icon: FileText },
    ],
  },
  {
    title: "Organisation",
    items: [
      { to: "/app/users", label: "Users", icon: Users },
      { to: "/app/roles", label: "Roles & Permissions", icon: Shield },
      { to: "/app/departments", label: "Departments", icon: Building2 },
      { to: "/app/branches", label: "Branches", icon: Building2 },
    ],
  },
  {
    title: "Audit",
    items: [{ to: "/app/audit", label: "Audit Trail", icon: Activity }],
  },
  {
    title: "Settings",
    items: [
      { to: "/app/settings/organisation", label: "Organisation", icon: Settings },
      { to: "/app/settings/preferences", label: "Preferences", icon: Settings },
      { to: "/app/settings/security", label: "Security", icon: Shield },
      { to: "/app/settings/integrations", label: "Integrations", icon: Activity },
    ],
  },
];

export const bottomNav: NavItem[] = [
  { to: "/app/help", label: "Help", icon: HelpCircle },
  { to: "/app/subscription", label: "Subscription", icon: CreditCard },
];

export { LogOut };
