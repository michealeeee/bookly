import type {
  Account,
  ActionItem,
  AuditEvent,
  BankAccount,
  BankTxn,
  Bill,
  Customer,
  Expense,
  Invoice,
  JournalEntry,
  MonthlyPoint,
  NamedValue,
  Organisation,
  OrgTenant,
  Payment,
  PurchaseOrder,
  Quotation,
  SessionUser,
  Supplier,
  TaxRate,
  TeamUser,
  Transaction,
} from "../types";

export const organisation: Organisation = {
  id: "org_apex",
  name: "Apex Trade Limited",
  type: "Company",
  industry: "Wholesale & distribution",
  employees: "25–50",
  country: "Ghana",
  currency: "GHS",
  email: "finance@apextrade.com",
  phone: "+233 30 276 4410",
  address: "12 Independence Avenue, Accra",
  financialYear: "January – December",
  accountingMethod: "Accrual",
  taxRegistered: true,
  taxId: "C0009876541",
  vatRate: 15,
  plan: "Professional",
  logoText: "AT",
};

export const currentUser: SessionUser = {
  id: "usr_michael",
  name: "Michael Addo",
  email: "michael@apextrade.com",
  role: "owner",
  title: "Finance Director",
  avatarHue: 168,
  orgId: "org_apex",
};

export const adminUser: SessionUser = {
  id: "usr_admin",
  name: "Ama Boateng",
  email: "admin@bookly.app",
  role: "platform_admin",
  title: "Platform Administrator",
  avatarHue: 210,
  orgId: "bookly",
};

export const kpis = {
  revenue: 125400,
  revenueDelta: 12.5,
  expenses: 78250,
  expensesDelta: 4.8,
  profit: 47150,
  profitDelta: 18.2,
  cash: 62500,
  cashDelta: 8.4,
  ar: 38420,
  ap: 21980,
  overdueInvoices: 5,
  pendingExpenses: 3,
};

export const monthly: MonthlyPoint[] = [
  { month: "Jan", revenue: 98000, expenses: 71000, inflow: 102000, outflow: 68000 },
  { month: "Feb", revenue: 104000, expenses: 72500, inflow: 99000, outflow: 74000 },
  { month: "Mar", revenue: 111200, expenses: 74800, inflow: 118000, outflow: 76000 },
  { month: "Apr", revenue: 108400, expenses: 76100, inflow: 107000, outflow: 79000 },
  { month: "May", revenue: 119800, expenses: 74200, inflow: 124000, outflow: 71000 },
  { month: "Jun", revenue: 122100, expenses: 77800, inflow: 119000, outflow: 80500 },
  { month: "Jul", revenue: 118600, expenses: 76900, inflow: 121000, outflow: 77200 },
  { month: "Aug", revenue: 126900, expenses: 78100, inflow: 129000, outflow: 74800 },
  { month: "Sep", revenue: 125400, expenses: 78250, inflow: 131000, outflow: 76900 },
];

export const expenseBreakdown: NamedValue[] = [
  { name: "Salaries", value: 28600 },
  { name: "Rent", value: 12000 },
  { name: "Utilities", value: 4300 },
  { name: "Transport", value: 6100 },
  { name: "Inventory", value: 18400 },
  { name: "Marketing", value: 5200 },
  { name: "Other", value: 3650 },
];

export const revenueBreakdown: NamedValue[] = [
  { name: "Product sales", value: 84200 },
  { name: "Service revenue", value: 28100 },
  { name: "Subscriptions", value: 8900 },
  { name: "Other income", value: 4200 },
];

export const actions: ActionItem[] = [
  { id: "a1", label: "invoices are overdue", count: 5, to: "/app/invoices", tone: "danger" },
  { id: "a2", label: "expenses require approval", count: 3, to: "/app/expense-claims", tone: "warn" },
  { id: "a3", label: "bank transactions are unmatched", count: 7, to: "/app/banking/reconciliation", tone: "warn" },
  { id: "a4", label: "bills are due this week", count: 2, to: "/app/bills", tone: "info" },
  { id: "a5", label: "Tax report requires review", count: 1, to: "/app/reports/tax", tone: "info" },
];

export const accounts: Account[] = [
  { id: "acc_1000", code: "1000", name: "Assets", type: "Assets", balance: 186400 },
  { id: "acc_1100", code: "1100", name: "Cash", type: "Assets", parentId: "acc_1000", balance: 18400 },
  { id: "acc_1200", code: "1200", name: "Bank", type: "Assets", parentId: "acc_1000", balance: 62500 },
  { id: "acc_1300", code: "1300", name: "Accounts Receivable", type: "Assets", parentId: "acc_1000", balance: 38420 },
  { id: "acc_1400", code: "1400", name: "Inventory", type: "Assets", parentId: "acc_1000", balance: 67100 },
  { id: "acc_2000", code: "2000", name: "Liabilities", type: "Liabilities", balance: 41280 },
  { id: "acc_2100", code: "2100", name: "Accounts Payable", type: "Liabilities", parentId: "acc_2000", balance: 21980 },
  { id: "acc_2200", code: "2200", name: "Loans", type: "Liabilities", parentId: "acc_2000", balance: 19300 },
  { id: "acc_3000", code: "3000", name: "Equity", type: "Equity", balance: 98000 },
  { id: "acc_3100", code: "3100", name: "Owner Capital", type: "Equity", parentId: "acc_3000", balance: 80000 },
  { id: "acc_3200", code: "3200", name: "Retained Earnings", type: "Equity", parentId: "acc_3000", balance: 18000 },
  { id: "acc_4000", code: "4000", name: "Revenue", type: "Revenue", balance: 125400 },
  { id: "acc_4100", code: "4100", name: "Sales Revenue", type: "Revenue", parentId: "acc_4000", balance: 84200 },
  { id: "acc_4200", code: "4200", name: "Service Revenue", type: "Revenue", parentId: "acc_4000", balance: 41200 },
  { id: "acc_5000", code: "5000", name: "Expenses", type: "Expenses", balance: 78250 },
  { id: "acc_5100", code: "5100", name: "Salaries", type: "Expenses", parentId: "acc_5000", balance: 28600 },
  { id: "acc_5200", code: "5200", name: "Rent", type: "Expenses", parentId: "acc_5000", balance: 12000 },
  { id: "acc_5300", code: "5300", name: "Utilities", type: "Expenses", parentId: "acc_5000", balance: 4300 },
  { id: "acc_5400", code: "5400", name: "Transport", type: "Expenses", parentId: "acc_5000", balance: 6100 },
];

export const transactions: Transaction[] = [
  { id: "tx1", date: "2026-09-12", description: "Invoice INV-1042 — Meridian Retail", account: "Sales Revenue", category: "Sales", type: "Income", amount: 18450, status: "Cleared" },
  { id: "tx2", date: "2026-09-11", description: "Office rent — September", account: "Rent", category: "Facilities", type: "Expense", amount: -12000, status: "Cleared" },
  { id: "tx3", date: "2026-09-10", description: "Customer payment — Harbor Foods", account: "Bank", category: "Receipts", type: "Deposit", amount: 9200, status: "Reconciled" },
  { id: "tx4", date: "2026-09-09", description: "Fuel & logistics — Kumasi run", account: "Transport", category: "Operations", type: "Expense", amount: -1860, status: "Pending" },
  { id: "tx5", date: "2026-09-08", description: "Inventory restock — Tema warehouse", account: "Inventory", category: "COGS", type: "Expense", amount: -6400, status: "Cleared" },
  { id: "tx6", date: "2026-09-07", description: "Service retainer — Kofi & Partners", account: "Service Revenue", category: "Services", type: "Income", amount: 4500, status: "Cleared" },
  { id: "tx7", date: "2026-09-06", description: "Transfer to savings reserve", account: "Bank", category: "Transfer", type: "Transfer", amount: -5000, status: "Reconciled" },
  { id: "tx8", date: "2026-09-05", description: "Electricity — ECG Accra", account: "Utilities", category: "Facilities", type: "Expense", amount: -1420, status: "Unmatched" },
  { id: "tx9", date: "2026-09-04", description: "Payroll net — August cycle", account: "Salaries", category: "Payroll", type: "Withdrawal", amount: -28600, status: "Cleared" },
  { id: "tx10", date: "2026-09-03", description: "Year-end rounding adjustment", account: "Retained Earnings", category: "Adjustment", type: "Adjustment", amount: 120, status: "Pending" },
];

export const journals: JournalEntry[] = [
  {
    id: "je1",
    date: "2026-09-12",
    reference: "JE-0091",
    description: "Record INV-1042 sales",
    status: "Posted",
    lines: [
      { id: "l1", account: "Accounts Receivable", description: "Meridian Retail", debit: 18450, credit: 0 },
      { id: "l2", account: "Sales Revenue", description: "Goods sold", debit: 0, credit: 16043.48 },
      { id: "l3", account: "VAT Payable", description: "15% VAT", debit: 0, credit: 2406.52 },
    ],
  },
  {
    id: "je2",
    date: "2026-09-11",
    reference: "JE-0090",
    description: "September rent",
    status: "Posted",
    lines: [
      { id: "l4", account: "Rent", description: "Office lease", debit: 12000, credit: 0 },
      { id: "l5", account: "Bank", description: "Stanbic current", debit: 0, credit: 12000 },
    ],
  },
];

export const customers: Customer[] = [
  { id: "c1", name: "Meridian Retail Ltd", contact: "Efua Mensah", email: "efua@meridianretail.com", phone: "+233 24 111 2044", outstanding: 18450, status: "Active", city: "Accra" },
  { id: "c2", name: "Harbor Foods", contact: "Yaw Boateng", email: "yaw@harborfoods.gh", phone: "+233 20 555 0192", outstanding: 9200, status: "Active", city: "Tema" },
  { id: "c3", name: "Kofi & Partners", contact: "Kofi Adjei", email: "accounts@kofipartners.com", phone: "+233 27 440 8811", outstanding: 0, status: "Active", city: "Kumasi" },
  { id: "c4", name: "Northline Logistics", contact: "Abena Sarpong", email: "abena@northline.co", phone: "+233 26 300 4410", outstanding: 10770, status: "Active", city: "Tamale" },
  { id: "c5", name: "Greenfield NGO", contact: "Samuel Tetteh", email: "finance@greenfield.org", phone: "+233 30 221 0098", outstanding: 0, status: "Inactive", city: "Accra" },
];

export const suppliers: Supplier[] = [
  { id: "s1", name: "Tema Wholesale Hub", contact: "Nana Owusu", email: "nana@temahub.com", phone: "+233 24 900 1122", outstanding: 8400, status: "Active", city: "Tema" },
  { id: "s2", name: "Atlantic Packaging", contact: "Lydia Quaye", email: "lydia@atlanticpack.gh", phone: "+233 20 333 7788", outstanding: 2150, status: "Active", city: "Accra" },
  { id: "s3", name: "CityLease Properties", contact: "Landlord office", email: "rent@citylease.com", phone: "+233 30 276 1000", outstanding: 0, status: "Active", city: "Accra" },
  { id: "s4", name: "VoltLink Energy", contact: "Billing", email: "billing@voltlink.gh", phone: "+233 30 611 4400", outstanding: 1420, status: "Active", city: "Accra" },
];

function items(name: string, qty: number, price: number): Invoice["items"] {
  return [{ id: "it1", name, qty, unitPrice: price, discount: 0, tax: 15 }];
}

export const invoices: Invoice[] = [
  { id: "inv1", number: "INV-1042", customerId: "c1", customer: "Meridian Retail Ltd", date: "2026-09-01", dueDate: "2026-09-15", amount: 18450, status: "Overdue", items: items("Assorted grocery pack", 30, 535), notes: "Net 14 days." },
  { id: "inv2", number: "INV-1041", customerId: "c2", customer: "Harbor Foods", date: "2026-08-28", dueDate: "2026-09-12", amount: 9200, status: "Partially Paid", items: items("Cold-chain delivery service", 1, 8000), notes: "" },
  { id: "inv3", number: "INV-1040", customerId: "c4", customer: "Northline Logistics", date: "2026-08-20", dueDate: "2026-09-20", amount: 10770, status: "Sent", items: items("Fleet maintenance kit", 6, 1560), notes: "" },
  { id: "inv4", number: "INV-1039", customerId: "c3", customer: "Kofi & Partners", date: "2026-08-12", dueDate: "2026-08-26", amount: 4500, status: "Paid", items: items("Monthly retainer", 1, 3913), notes: "Thank you." },
  { id: "inv5", number: "INV-1038", customerId: "c1", customer: "Meridian Retail Ltd", date: "2026-07-30", dueDate: "2026-08-13", amount: 2200, status: "Draft", items: items("Promotional display", 2, 957), notes: "" },
];

export const quotations: Quotation[] = [
  { id: "q1", number: "QT-220", customer: "Meridian Retail Ltd", date: "2026-09-08", expiry: "2026-09-22", amount: 24600, status: "Sent" },
  { id: "q2", number: "QT-219", customer: "Harbor Foods", date: "2026-09-02", expiry: "2026-09-16", amount: 8800, status: "Accepted" },
  { id: "q3", number: "QT-218", customer: "Greenfield NGO", date: "2026-08-21", expiry: "2026-09-04", amount: 3100, status: "Expired" },
];

export const payments: Payment[] = [
  { id: "p1", date: "2026-09-10", party: "Harbor Foods", method: "Bank transfer", reference: "TRX-9912", amount: 9200, type: "Incoming", invoiceRef: "INV-1041" },
  { id: "p2", date: "2026-09-11", party: "CityLease Properties", method: "Direct debit", reference: "RENT-SEP", amount: 12000, type: "Outgoing" },
  { id: "p3", date: "2026-08-26", party: "Kofi & Partners", method: "Mobile money", reference: "MM-44021", amount: 4500, type: "Incoming", invoiceRef: "INV-1039" },
];

export const purchaseOrders: PurchaseOrder[] = [
  { id: "po1", number: "PO-088", supplier: "Tema Wholesale Hub", date: "2026-09-04", expected: "2026-09-11", amount: 8400, status: "Partial" },
  { id: "po2", number: "PO-087", supplier: "Atlantic Packaging", date: "2026-08-29", expected: "2026-09-05", amount: 2150, status: "Received" },
  { id: "po3", number: "PO-086", supplier: "Tema Wholesale Hub", date: "2026-08-18", expected: "2026-08-25", amount: 15600, status: "Sent" },
];

export const bills: Bill[] = [
  { id: "b1", number: "BILL-331", supplier: "Tema Wholesale Hub", date: "2026-09-05", dueDate: "2026-09-19", amount: 8400, status: "Open" },
  { id: "b2", number: "BILL-330", supplier: "Atlantic Packaging", date: "2026-09-01", dueDate: "2026-09-15", amount: 2150, status: "Overdue" },
  { id: "b3", number: "BILL-329", supplier: "VoltLink Energy", date: "2026-08-28", dueDate: "2026-09-11", amount: 1420, status: "Paid" },
];

export const expenses: Expense[] = [
  { id: "e1", employee: "Ama Serwaa", date: "2026-09-10", category: "Transport", description: "Client visit — Kumasi", amount: 420, method: "Card", department: "Sales", status: "Submitted" },
  { id: "e2", employee: "Kojo Ampofo", date: "2026-09-09", category: "Meals", description: "Team lunch — onboarding", amount: 310, method: "Cash", department: "People", status: "Manager Review" },
  { id: "e3", employee: "Michael Addo", date: "2026-09-06", category: "Software", description: "Design tools annual", amount: 890, method: "Card", department: "Finance", status: "Approved" },
  { id: "e4", employee: "Ama Serwaa", date: "2026-08-28", category: "Travel", description: "Hotel — Takoradi trip", amount: 640, method: "Card", department: "Sales", status: "Reimbursed" },
  { id: "e5", employee: "Kojo Ampofo", date: "2026-08-22", category: "Office", description: "Printer toner", amount: 180, method: "Cash", department: "Operations", status: "Rejected" },
];

export const bankAccounts: BankAccount[] = [
  { id: "ba1", bank: "Stanbic Bank", name: "Apex Operating", number: "9044 **** 2218", type: "Current", currency: "GHS", balance: 52140 },
  { id: "ba2", bank: "GCB Bank", name: "Payroll Reserve", number: "1102 **** 7741", type: "Current", currency: "GHS", balance: 10360 },
  { id: "ba3", bank: "Fidelity Bank", name: "USD Collection", number: "2209 **** 0184", type: "Current", currency: "USD", balance: 8420 },
];

export const bankTxns: BankTxn[] = [
  { id: "bt1", accountId: "ba1", date: "2026-09-12", description: "INWARD RTGS MERIDIAN", amount: 18450, matched: false },
  { id: "bt2", accountId: "ba1", date: "2026-09-11", description: "CITYLEASE RENT SEP", amount: -12000, matched: true, bookRef: "tx2" },
  { id: "bt3", accountId: "ba1", date: "2026-09-10", description: "HARBOR FOODS TRF", amount: 9200, matched: true, bookRef: "tx3" },
  { id: "bt4", accountId: "ba1", date: "2026-09-08", description: "ECG PREPAID", amount: -1420, matched: false },
  { id: "bt5", accountId: "ba1", date: "2026-09-07", description: "POS FUEL SHELL", amount: -340, matched: false },
  { id: "bt6", accountId: "ba2", date: "2026-09-04", description: "PAYROLL BATCH", amount: -28600, matched: true, bookRef: "tx9" },
];

export const team: TeamUser[] = [
  { id: "u1", name: "Michael Addo", email: "michael@apextrade.com", role: "Owner", department: "Finance", branch: "Accra HQ", status: "Active" },
  { id: "u2", name: "Ama Serwaa", email: "ama@apextrade.com", role: "Finance Manager", department: "Finance", branch: "Accra HQ", status: "Active" },
  { id: "u3", name: "Kojo Ampofo", email: "kojo@apextrade.com", role: "Accountant", department: "Finance", branch: "Tema", status: "Active" },
  { id: "u4", name: "Efua Darko", email: "efua.d@apextrade.com", role: "Employee", department: "Sales", branch: "Kumasi", status: "Invited" },
];

export const departments = ["Finance", "Sales", "Operations", "People", "Warehouse"];
export const branches = ["Accra HQ", "Tema", "Kumasi", "Tamale"];

export const taxRates: TaxRate[] = [
  { id: "t1", name: "VAT Standard", rate: 15, type: "VAT", status: "Active" },
  { id: "t2", name: "NHIL", rate: 2.5, type: "Levy", status: "Active" },
  { id: "t3", name: "GETFund", rate: 2.5, type: "Levy", status: "Active" },
  { id: "t4", name: "Withholding services", rate: 7.5, type: "Withholding", status: "Active" },
  { id: "t5", name: "PAYE band (sample)", rate: 25, type: "PAYE", status: "Inactive" },
];

export const audit: AuditEvent[] = [
  { id: "au1", at: "2026-09-13T08:12:00Z", actor: "Michael Addo", action: "Posted journal", entity: "JE-0091", detail: "Sales invoice INV-1042" },
  { id: "au2", at: "2026-09-12T16:40:00Z", actor: "Ama Serwaa", action: "Sent invoice", entity: "INV-1042", detail: "Emailed to Efua Mensah" },
  { id: "au3", at: "2026-09-11T11:02:00Z", actor: "Kojo Ampofo", action: "Matched bank txn", entity: "CITYLEASE RENT SEP", detail: "Linked to rent expense" },
  { id: "au4", at: "2026-09-10T09:18:00Z", actor: "Michael Addo", action: "Approved expense", entity: "EXP-890", detail: "Design tools annual" },
  { id: "au5", at: "2026-09-09T14:22:00Z", actor: "System", action: "Overdue flag", entity: "INV-1042", detail: "Past due date 15 Sep" },
];

export const tenants: OrgTenant[] = [
  { id: "tn1", name: "Apex Trade Limited", plan: "Professional", users: 12, mrr: 129, status: "Active", country: "Ghana", created: "2025-11-02" },
  { id: "tn2", name: "Sunrise Clinics", plan: "Business", users: 34, mrr: 249, status: "Active", country: "Kenya", created: "2026-01-18" },
  { id: "tn3", name: "Harbor NGO", plan: "Starter", users: 4, mrr: 49, status: "Trial", country: "Nigeria", created: "2026-08-22" },
  { id: "tn4", name: "Northline Logistics", plan: "Professional", users: 18, mrr: 129, status: "Past due", country: "Ghana", created: "2026-03-09" },
  { id: "tn5", name: "Lattice Partners", plan: "Enterprise", users: 80, mrr: 890, status: "Active", country: "South Africa", created: "2025-06-14" },
];

export const resources = [
  { title: "Closing the books in five days", tag: "Guide", read: "8 min" },
  { title: "VAT in Ghana: a practical checklist", tag: "Tax", read: "12 min" },
  { title: "How growing teams set expense policy", tag: "Operations", read: "6 min" },
  { title: "From spreadsheet to Bookly", tag: "Migration", read: "10 min" },
];

export const faqs = [
  { q: "Is Bookly a replacement for my accountant?", a: "Bookly is built for finance teams and accountants to work together. You keep professional judgement; we organise the books, invoices, and reports." },
  { q: "Can NGOs and partnerships use Bookly?", a: "Yes. Onboarding supports companies, SMEs, startups, NGOs, partnerships, and professional firms, with the right organisation profile." },
  { q: "Do you connect to banks?", a: "The product is designed for bank feeds and reconciliation. This demo uses realistic mock transactions so you can experience the workflow." },
  { q: "Which currencies are supported?", a: "Organisations can run in GHS, NGN, KES, ZAR, USD, GBP, EUR and more. This demo workspace uses Ghanaian Cedi." },
  { q: "Is my financial data secure?", a: "Bookly is designed with role-based access, audit trails, and encryption in transit. The live product would sit on a dedicated backend." },
  { q: "Can I try before I buy?", a: "Start with a 14-day Professional trial. No credit card is required in this frontend simulation." },
];
