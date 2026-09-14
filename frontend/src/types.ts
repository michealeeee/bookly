export type OrgType =
  | "Company"
  | "SME"
  | "Startup"
  | "NGO"
  | "Partnership"
  | "Professional services";

export type UserRole = "owner" | "finance_manager" | "accountant" | "employee" | "platform_admin";

export type InvoiceStatus = "Draft" | "Sent" | "Partially Paid" | "Paid" | "Overdue" | "Cancelled";
export type BillStatus = "Draft" | "Open" | "Partially Paid" | "Paid" | "Overdue";
export type TxType = "Income" | "Expense" | "Deposit" | "Withdrawal" | "Transfer" | "Adjustment";
export type TxStatus = "Cleared" | "Pending" | "Reconciled" | "Unmatched";
export type ExpenseStatus = "Draft" | "Submitted" | "Manager Review" | "Approved" | "Rejected" | "Reimbursed";
export type QuoteStatus = "Draft" | "Sent" | "Accepted" | "Declined" | "Expired";
export type PoStatus = "Draft" | "Sent" | "Partial" | "Received" | "Cancelled";

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  title: string;
  avatarHue: number;
  orgId: string;
}

export interface Organisation {
  id: string;
  name: string;
  type: OrgType;
  industry: string;
  employees: string;
  country: string;
  currency: string;
  email: string;
  phone: string;
  address: string;
  financialYear: string;
  accountingMethod: "Accrual" | "Cash";
  taxRegistered: boolean;
  taxId: string;
  vatRate: number;
  plan: string;
  logoText: string;
}

export interface Account {
  id: string;
  code: string;
  name: string;
  type: "Assets" | "Liabilities" | "Equity" | "Revenue" | "Expenses";
  parentId?: string;
  balance: number;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  account: string;
  category: string;
  type: TxType;
  amount: number;
  status: TxStatus;
  reference?: string;
}

export interface JournalLine {
  id: string;
  account: string;
  description: string;
  debit: number;
  credit: number;
}

export interface JournalEntry {
  id: string;
  date: string;
  reference: string;
  description: string;
  lines: JournalLine[];
  status: "Draft" | "Posted";
}

export interface Customer {
  id: string;
  name: string;
  contact: string;
  email: string;
  phone: string;
  outstanding: number;
  status: "Active" | "Inactive";
  city: string;
}

export interface Supplier {
  id: string;
  name: string;
  contact: string;
  email: string;
  phone: string;
  outstanding: number;
  status: "Active" | "Inactive";
  city: string;
}

export interface LineItem {
  id: string;
  name: string;
  qty: number;
  unitPrice: number;
  discount: number;
  tax: number;
}

export interface Invoice {
  id: string;
  number: string;
  customerId: string;
  customer: string;
  date: string;
  dueDate: string;
  amount: number;
  status: InvoiceStatus;
  items: LineItem[];
  notes: string;
}

export interface Quotation {
  id: string;
  number: string;
  customer: string;
  date: string;
  expiry: string;
  amount: number;
  status: QuoteStatus;
}

export interface Payment {
  id: string;
  date: string;
  party: string;
  method: string;
  reference: string;
  amount: number;
  type: "Incoming" | "Outgoing";
  invoiceRef?: string;
}

export interface PurchaseOrder {
  id: string;
  number: string;
  supplier: string;
  date: string;
  expected: string;
  amount: number;
  status: PoStatus;
}

export interface Bill {
  id: string;
  number: string;
  supplier: string;
  date: string;
  dueDate: string;
  amount: number;
  status: BillStatus;
}

export interface Expense {
  id: string;
  employee: string;
  date: string;
  category: string;
  description: string;
  amount: number;
  method: string;
  department: string;
  status: ExpenseStatus;
  receipt?: string;
}

export interface BankAccount {
  id: string;
  bank: string;
  name: string;
  number: string;
  type: "Current" | "Savings";
  currency: string;
  balance: number;
}

export interface BankTxn {
  id: string;
  accountId: string;
  date: string;
  description: string;
  amount: number;
  matched: boolean;
  bookRef?: string;
}

export interface TeamUser {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  branch: string;
  status: "Active" | "Invited";
}

export interface AuditEvent {
  id: string;
  at: string;
  actor: string;
  action: string;
  entity: string;
  detail: string;
}

export interface TaxRate {
  id: string;
  name: string;
  rate: number;
  type: "VAT" | "Withholding" | "PAYE" | "Levy";
  status: "Active" | "Inactive";
}

export interface Plan {
  id: string;
  name: string;
  tagline: string;
  audience: string;
  monthly: number;
  yearly: number;
  popular?: boolean;
  highlight?: string;
  cta: string;
  features: string[];
}

export interface ActionItem {
  id: string;
  label: string;
  count: number;
  to: string;
  tone: "warn" | "info" | "danger";
}

export interface MonthlyPoint {
  month: string;
  revenue: number;
  expenses: number;
  inflow: number;
  outflow: number;
}

export interface NamedValue {
  name: string;
  value: number;
}

export interface OrgTenant {
  id: string;
  name: string;
  plan: string;
  users: number;
  mrr: number;
  status: "Active" | "Trial" | "Past due" | "Cancelled";
  country: string;
  created: string;
}
