import type { ReactNode } from "react";
import { accounts, monthly } from "../../data/seed";
import { Card } from "../../components/ui/Card";
import { PageHeader } from "../../components/ui/PageHeader";
import { Button } from "../../components/ui/Button";
import { money } from "../../lib/format";
import { useBook } from "../../store/BookContext";
import { useToast } from "../../store/ToastContext";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from "recharts";

function ReportShell({ title, children }: { title: string; children: ReactNode }) {
  const { toast } = useToast();
  return (
    <div>
      <PageHeader
        title={title}
        subtitle="Apex Trade Limited · Jan–Sep 2026"
        actions={
          <>
            <Button variant="secondary" onClick={() => toast("Report exported.")}>
              Export
            </Button>
            <Button variant="secondary" onClick={() => window.print()}>
              Print
            </Button>
          </>
        }
      />
      <Card className="p-6">{children}</Card>
    </div>
  );
}

function Lines({ rows }: { rows: [string, number, boolean?][] }) {
  return (
    <table className="w-full text-sm">
      <tbody>
        {rows.map(([n, v, bold]) => (
          <tr key={n} className="border-b border-line">
            <td className={`py-2 ${bold ? "font-semibold text-navy" : ""}`}>{n}</td>
            <td className={`py-2 text-right num ${bold ? "font-semibold" : ""}`}>{money(v)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function ProfitLossPage() {
  return (
    <ReportShell title="Profit & Loss">
      <Lines
        rows={[
          ["Sales revenue", 84200],
          ["Service revenue", 41200],
          ["Total revenue", 125400, true],
          ["Salaries", 28600],
          ["Rent", 12000],
          ["Utilities", 4300],
          ["Transport", 6100],
          ["Inventory / COGS", 18400],
          ["Marketing", 5200],
          ["Other", 3650],
          ["Total expenses", 78250, true],
          ["Net profit", 47150, true],
        ]}
      />
    </ReportShell>
  );
}

export function BalanceSheetPage() {
  return (
    <ReportShell title="Balance Sheet">
      <h3 className="mb-2 font-semibold">Assets</h3>
      <Lines
        rows={[
          ["Cash", 18400],
          ["Bank", 62500],
          ["Accounts receivable", 38420],
          ["Inventory", 67100],
          ["Total assets", 186420, true],
        ]}
      />
      <h3 className="mb-2 mt-6 font-semibold">Liabilities & equity</h3>
      <Lines
        rows={[
          ["Accounts payable", 21980],
          ["Loans", 19300],
          ["Owner capital", 80000],
          ["Retained earnings", 65140],
          ["Total L+E", 186420, true],
        ]}
      />
    </ReportShell>
  );
}

export function CashFlowReportPage() {
  return (
    <ReportShell title="Cash Flow">
      <div className="mb-6 h-56">
        <ResponsiveContainer>
          <AreaChart data={monthly}>
            <CartesianGrid stroke="#e4e9ef" />
            <XAxis dataKey="month" />
            <Tooltip />
            <Area dataKey="inflow" stroke="#0e9f90" fill="#e7f7f4" />
            <Area dataKey="outflow" stroke="#0c2340" fill="#e8eef5" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <Lines
        rows={[
          ["Operating inflow", 131000],
          ["Operating outflow", 76900],
          ["Net cash from operations", 54100, true],
        ]}
      />
    </ReportShell>
  );
}

export function TrialBalancePage() {
  const leaf = accounts.filter((a) => a.parentId);
  return (
    <ReportShell title="Trial Balance">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-slate">
            <th className="py-2">Account</th>
            <th>Debit</th>
            <th>Credit</th>
          </tr>
        </thead>
        <tbody>
          {leaf.map((a) => {
            const debit = a.type === "Assets" || a.type === "Expenses" ? a.balance : 0;
            const credit = a.type === "Liabilities" || a.type === "Equity" || a.type === "Revenue" ? a.balance : 0;
            return (
              <tr key={a.id} className="border-t border-line">
                <td className="py-2">
                  {a.code} {a.name}
                </td>
                <td className="num">{debit ? money(debit) : ""}</td>
                <td className="num">{credit ? money(credit) : ""}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </ReportShell>
  );
}

export function GeneralLedgerPage() {
  const { transactions } = useBook();
  return (
    <ReportShell title="General Ledger">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-slate">
            <th className="py-2">Date</th>
            <th>Account</th>
            <th>Description</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id} className="border-t border-line">
              <td className="py-2">{t.date}</td>
              <td>{t.account}</td>
              <td>{t.description}</td>
              <td className="num">{money(t.amount)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </ReportShell>
  );
}

export function AgingPage({ title, parties }: { title: string; parties: { name: string; outstanding: number }[] }) {
  return (
    <ReportShell title={title}>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-slate">
            <th className="py-2">Name</th>
            <th>Current</th>
            <th>30</th>
            <th>60</th>
            <th>90+</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {parties
            .filter((p) => p.outstanding > 0)
            .map((p) => (
              <tr key={p.name} className="border-t border-line">
                <td className="py-2">{p.name}</td>
                <td className="num">{money(p.outstanding * 0.4)}</td>
                <td className="num">{money(p.outstanding * 0.3)}</td>
                <td className="num">{money(p.outstanding * 0.2)}</td>
                <td className="num">{money(p.outstanding * 0.1)}</td>
                <td className="num font-semibold">{money(p.outstanding)}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </ReportShell>
  );
}

export function TaxReportPage() {
  return (
    <ReportShell title="Tax Reports">
      <Lines
        rows={[
          ["Output VAT", 16356],
          ["Input VAT", 8120],
          ["Net VAT payable", 8236, true],
          ["Withholding on services", 980],
        ]}
      />
    </ReportShell>
  );
}
