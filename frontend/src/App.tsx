import { Navigate, Route, Routes } from "react-router-dom";
import { PublicLayout } from "./components/layout/PublicLayout";
import { AuthLayout } from "./components/layout/AuthLayout";
import { AppShell } from "./components/layout/AppShell";
import { AdminShell } from "./components/layout/AdminShell";
import { RequireAuth } from "./components/layout/guards";
import { HomePage } from "./pages/public/HomePage";
import { PricingPage } from "./pages/public/PricingPage";
import {
  AboutPage,
  ContactPage,
  FaqPage,
  FeaturesPage,
  HowItWorksPage,
  ResourcesPage,
  SolutionsPage,
} from "./pages/public/OtherPublic";
import {
  ForgotPasswordPage,
  LoginPage,
  RegisterPage,
  ResetPasswordPage,
  VerifyEmailPage,
} from "./pages/auth/AuthPages";
import { OnboardingPage } from "./pages/onboarding/OnboardingPage";
import { DashboardPage } from "./pages/app/DashboardPage";
import { TransactionsPage } from "./pages/app/TransactionsPage";
import { JournalPage } from "./pages/app/JournalPage";
import { ChartOfAccountsPage } from "./pages/app/ChartOfAccountsPage";
import { CustomersPage, InvoiceDetailPage, InvoicesPage, NewInvoicePage } from "./pages/app/SalesPages";
import {
  APPage,
  ARPage,
  BillsPage,
  ExpenseClaimsPage,
  ExpensesPage,
  PaymentsPage,
  PurchaseOrdersPage,
  QuotationsPage,
  ReimbursementsPage,
  SuppliersPage,
} from "./pages/app/OpsPages";
import {
  BankAccountsPage,
  BankTransactionsPage,
  BankingOverviewPage,
  ReconciliationPage,
} from "./pages/app/BankingPages";
import {
  AgingPage,
  BalanceSheetPage,
  CashFlowReportPage,
  GeneralLedgerPage,
  ProfitLossPage,
  TaxReportPage,
  TrialBalancePage,
} from "./pages/app/ReportPages";
import {
  AuditPage,
  BranchesPage,
  DepartmentsPage,
  HelpPage,
  IntegrationsPage,
  OrgSettingsPage,
  PreferencesPage,
  RolesPage,
  SecurityPage,
  SubscriptionPage,
  TaxLiabilitiesPage,
  TaxRatesPage,
  TaxReturnsPage,
  UsersPage,
} from "./pages/app/OrgPages";
import { AdminHomePage, AdminOrgsPage, AdminSubsPage, AdminUsersPage } from "./pages/admin/AdminPages";
import { useBook } from "./store/BookContext";

function ARAging() {
  const { customers } = useBook();
  return <AgingPage title="A/R Aging" parties={customers} />;
}
function APAging() {
  const { suppliers } = useBook();
  return <AgingPage title="A/P Aging" parties={suppliers} />;
}

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/solutions" element={<SolutionsPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
      </Route>

      <Route element={<RequireAuth />}>
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/app" element={<AppShell />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="transactions" element={<TransactionsPage />} />
          <Route path="journal-entries" element={<JournalPage />} />
          <Route path="chart-of-accounts" element={<ChartOfAccountsPage />} />
          <Route path="general-ledger" element={<GeneralLedgerPage />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="quotations" element={<QuotationsPage />} />
          <Route path="invoices" element={<InvoicesPage />} />
          <Route path="invoices/new" element={<NewInvoicePage />} />
          <Route path="invoices/:id" element={<InvoiceDetailPage />} />
          <Route path="payments" element={<PaymentsPage />} />
          <Route path="accounts-receivable" element={<ARPage />} />
          <Route path="suppliers" element={<SuppliersPage />} />
          <Route path="purchase-orders" element={<PurchaseOrdersPage />} />
          <Route path="bills" element={<BillsPage />} />
          <Route path="purchase-payments" element={<PaymentsPage direction="Outgoing" />} />
          <Route path="accounts-payable" element={<APPage />} />
          <Route path="expenses" element={<ExpensesPage />} />
          <Route path="expense-claims" element={<ExpenseClaimsPage />} />
          <Route path="reimbursements" element={<ReimbursementsPage />} />
          <Route path="banking" element={<BankingOverviewPage />} />
          <Route path="banking/accounts" element={<BankAccountsPage />} />
          <Route path="banking/transactions" element={<BankTransactionsPage />} />
          <Route path="banking/reconciliation" element={<ReconciliationPage />} />
          <Route path="reports/profit-loss" element={<ProfitLossPage />} />
          <Route path="reports/balance-sheet" element={<BalanceSheetPage />} />
          <Route path="reports/cash-flow" element={<CashFlowReportPage />} />
          <Route path="reports/trial-balance" element={<TrialBalancePage />} />
          <Route path="reports/general-ledger" element={<GeneralLedgerPage />} />
          <Route path="reports/ar-aging" element={<ARAging />} />
          <Route path="reports/ap-aging" element={<APAging />} />
          <Route path="reports/tax" element={<TaxReportPage />} />
          <Route path="tax/rates" element={<TaxRatesPage />} />
          <Route path="tax/liabilities" element={<TaxLiabilitiesPage />} />
          <Route path="tax/returns" element={<TaxReturnsPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="roles" element={<RolesPage />} />
          <Route path="departments" element={<DepartmentsPage />} />
          <Route path="branches" element={<BranchesPage />} />
          <Route path="audit" element={<AuditPage />} />
          <Route path="settings/organisation" element={<OrgSettingsPage />} />
          <Route path="settings/preferences" element={<PreferencesPage />} />
          <Route path="settings/security" element={<SecurityPage />} />
          <Route path="settings/integrations" element={<IntegrationsPage />} />
          <Route path="help" element={<HelpPage />} />
          <Route path="subscription" element={<SubscriptionPage />} />
        </Route>
      </Route>

      <Route element={<RequireAuth admin />}>
        <Route path="/admin" element={<AdminShell />}>
          <Route index element={<AdminHomePage />} />
          <Route path="organisations" element={<AdminOrgsPage />} />
          <Route path="subscriptions" element={<AdminSubsPage />} />
          <Route path="users" element={<AdminUsersPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
