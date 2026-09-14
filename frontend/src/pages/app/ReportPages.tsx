import type { ReactNode } from "react";
import { accounts, expenseBreakdown, monthly, revenueBreakdown } from "../../data/seed";
import { Card } from "../../components/ui/Card";
import { PageHeader } from "../../components/ui/PageHeader";
import { Button } from "../../components/ui/Button";
import { money } from "../../lib/format";
import { useBook } from "../../store/BookContext";
import { useToast } from "../../store/ToastContext";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const TEAL = "#0e9f90";
const NAVY = "#0c2340";
const SLATE = "#5b6b7c";
const GOLD = "#c9a227";
const ROSE = "#c45c4a";
const BLUE = "#4a6fa5";
const MINT = "#7db9b0";
const PIE = [TEAL, NAVY, SLATE, GOLD, ROSE, BLUE, MINT];

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
      {children}
    </div>
  );
}

function ChartCard({ title, children, className = "" }: { title: string; children: ReactNode; className?: string }) {
  return (
    <Card className={`p-5 ${className}`}>
      <p className="mb-4 text-sm font-medium text-navy">{title}</p>
      <div className="h-64 w-full">{children}</div>
    </Card>
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

const plTrend = monthly.map((m) => ({
  ...m,
  profit: m.revenue - m.expenses,
}));

const assetsMix = [
  { name: "Cash", value: 18400 },
  { name: "Bank", value: 62500 },
  { name: "Receivables", value: 38420 },
  { name: "Inventory", value: 67100 },
];

const equityMix = [
  { name: "Payables", value: 21980 },
  { name: "Loans", value: 19300 },
  { name: "Owner capital", value: 80000 },
  { name: "Retained earnings", value: 65140 },
];

const cashNet = monthly.map((m) => ({
  month: m.month,
  inflow: m.inflow,
  outflow: m.outflow,
  net: m.inflow - m.outflow,
}));

const taxMix = [
  { name: "Output VAT", value: 16356 },
  { name: "Input VAT", value: 8120 },
  { name: "Withholding", value: 980 },
];

export function ProfitLossPage() {
  return (
    <ReportShell title="Profit & Loss">
      <div className="mb-6 grid gap-5 lg:grid-cols-2">
        <ChartCard title="Revenue, expenses and profit" className="lg:col-span-2">
          <ResponsiveContainer>
            <ComposedChart data={plTrend}>
              <CartesianGrid stroke="#e4e9ef" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: SLATE }} />
              <YAxis tick={{ fontSize: 11, fill: SLATE }} tickFormatter={(v) => `${Math.round(v / 1000)}k`} />
              <Tooltip formatter={(v) => money(Number(v))} />
              <Legend />
              <Bar dataKey="revenue" name="Revenue" fill={TEAL} radius={[4, 4, 0, 0]} />
              <Bar dataKey="expenses" name="Expenses" fill={NAVY} radius={[4, 4, 0, 0]} />
              <Line type="monotone" dataKey="profit" name="Profit" stroke={GOLD} strokeWidth={2} dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Revenue mix">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={revenueBreakdown} dataKey="value" nameKey="name" innerRadius={52} outerRadius={88} paddingAngle={2}>
                {revenueBreakdown.map((_, i) => (
                  <Cell key={i} fill={PIE[i % PIE.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => money(Number(v))} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Where expenses go">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={expenseBreakdown} dataKey="value" nameKey="name" innerRadius={52} outerRadius={88} paddingAngle={2}>
                {expenseBreakdown.map((_, i) => (
                  <Cell key={i} fill={PIE[i % PIE.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => money(Number(v))} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
      <Card className="p-6">
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
      </Card>
    </ReportShell>
  );
}

const taxTrend = monthly.map((m) => ({
  month: m.month,
  revenue: m.revenue,
  vat: Math.round(m.revenue * 0.15),
}));

export function BalanceSheetPage() {
  return (
    <ReportShell title="Balance Sheet">
      <div className="mb-6 grid gap-5 lg:grid-cols-2">
        <ChartCard title="Assets mix">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={assetsMix} dataKey="value" nameKey="name" innerRadius={52} outerRadius={88}>
                {assetsMix.map((_, i) => (
                  <Cell key={i} fill={PIE[i % PIE.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => money(Number(v))} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Liabilities and equity">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={equityMix} dataKey="value" nameKey="name" innerRadius={52} outerRadius={88}>
                {equityMix.map((_, i) => (
                  <Cell key={i} fill={PIE[(i + 2) % PIE.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => money(Number(v))} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
      <Card className="p-6">
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
      </Card>
    </ReportShell>
  );
}

export function CashFlowReportPage() {
  return (
    <ReportShell title="Cash Flow">
      <div className="mb-6 grid gap-5 lg:grid-cols-2">
        <ChartCard title="Inflow vs outflow">
          <ResponsiveContainer>
            <AreaChart data={monthly}>
              <CartesianGrid stroke="#e4e9ef" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: SLATE }} />
              <YAxis tick={{ fontSize: 11, fill: SLATE }} tickFormatter={(v) => `${Math.round(v / 1000)}k`} />
              <Tooltip formatter={(v) => money(Number(v))} />
              <Legend />
              <Area type="monotone" dataKey="inflow" name="Inflow" stroke={TEAL} fill="#e7f7f4" />
              <Area type="monotone" dataKey="outflow" name="Outflow" stroke={NAVY} fill="#e8eef5" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Net cash by month">
          <ResponsiveContainer>
            <BarChart data={cashNet}>
              <CartesianGrid stroke="#e4e9ef" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: SLATE }} />
              <YAxis tick={{ fontSize: 11, fill: SLATE }} tickFormatter={(v) => `${Math.round(v / 1000)}k`} />
              <Tooltip formatter={(v) => money(Number(v))} />
              <Bar dataKey="net" name="Net cash" fill={TEAL} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
      <Card className="p-6">
        <Lines
          rows={[
            ["Operating inflow", 131000],
            ["Operating outflow", 76900],
            ["Net cash from operations", 54100, true],
          ]}
        />
      </Card>
    </ReportShell>
  );
}

export function TrialBalancePage() {
  const leaf = accounts.filter((a) => a.parentId);
  const byType = ["Assets", "Liabilities", "Equity", "Revenue", "Expenses"].map((type) => {
    const rows = leaf.filter((a) => a.type === type);
    const debit = rows.filter((a) => a.type === "Assets" || a.type === "Expenses").reduce((s, a) => s + a.balance, 0);
    const credit = rows.filter((a) => a.type === "Liabilities" || a.type === "Equity" || a.type === "Revenue").reduce((s, a) => s + a.balance, 0);
    return { type, debit, credit };
  });
  return (
    <ReportShell title="Trial Balance">
      <div className="mb-6">
        <ChartCard title="Debits and credits by type">
          <ResponsiveContainer>
            <BarChart data={byType}>
              <CartesianGrid stroke="#e4e9ef" vertical={false} />
              <XAxis dataKey="type" tick={{ fontSize: 12, fill: SLATE }} />
              <YAxis tick={{ fontSize: 11, fill: SLATE }} tickFormatter={(v) => `${Math.round(v / 1000)}k`} />
              <Tooltip formatter={(v) => money(Number(v))} />
              <Legend />
              <Bar dataKey="debit" name="Debit" fill={TEAL} radius={[4, 4, 0, 0]} />
              <Bar dataKey="credit" name="Credit" fill={NAVY} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
      <Card className="p-6">
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
      </Card>
    </ReportShell>
  );
}

export function GeneralLedgerPage() {
  const { transactions } = useBook();
  const byMonth = monthly.map((m) => ({
    month: m.month,
    income: m.inflow,
    spend: m.outflow,
  }));
  return (
    <ReportShell title="General Ledger">
      <div className="mb-6">
        <ChartCard title="Ledger movement this year">
          <ResponsiveContainer>
            <BarChart data={byMonth}>
              <CartesianGrid stroke="#e4e9ef" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: SLATE }} />
              <YAxis tick={{ fontSize: 11, fill: SLATE }} tickFormatter={(v) => `${Math.round(v / 1000)}k`} />
              <Tooltip formatter={(v) => money(Number(v))} />
              <Legend />
              <Bar dataKey="income" name="Credits" fill={TEAL} radius={[4, 4, 0, 0]} />
              <Bar dataKey="spend" name="Debits" fill={ROSE} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
      <Card className="p-6">
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
      </Card>
    </ReportShell>
  );
}

export function AgingPage({ title, parties }: { title: string; parties: { name: string; outstanding: number }[] }) {
  const open = parties.filter((p) => p.outstanding > 0);
  const chart = open.map((p) => ({
    name: p.name.split(" ")[0],
    current: Math.round(p.outstanding * 0.4),
    d30: Math.round(p.outstanding * 0.3),
    d60: Math.round(p.outstanding * 0.2),
    d90: Math.round(p.outstanding * 0.1),
  }));
  const buckets = [
    { name: "Current", value: open.reduce((s, p) => s + p.outstanding * 0.4, 0) },
    { name: "30 days", value: open.reduce((s, p) => s + p.outstanding * 0.3, 0) },
    { name: "60 days", value: open.reduce((s, p) => s + p.outstanding * 0.2, 0) },
    { name: "90+ days", value: open.reduce((s, p) => s + p.outstanding * 0.1, 0) },
  ];
  return (
    <ReportShell title={title}>
      <div className="mb-6 grid gap-5 lg:grid-cols-2">
        <ChartCard title="Outstanding by party">
          <ResponsiveContainer>
            <BarChart data={chart}>
              <CartesianGrid stroke="#e4e9ef" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: SLATE }} />
              <YAxis tick={{ fontSize: 11, fill: SLATE }} tickFormatter={(v) => `${Math.round(v / 1000)}k`} />
              <Tooltip formatter={(v) => money(Number(v))} />
              <Legend />
              <Bar dataKey="current" name="Current" stackId="a" fill={TEAL} />
              <Bar dataKey="d30" name="30" stackId="a" fill={MINT} />
              <Bar dataKey="d60" name="60" stackId="a" fill={GOLD} />
              <Bar dataKey="d90" name="90+" stackId="a" fill={ROSE} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Age buckets">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={buckets} dataKey="value" nameKey="name" innerRadius={52} outerRadius={88}>
                {buckets.map((_, i) => (
                  <Cell key={i} fill={PIE[i % PIE.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => money(Number(v))} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
      <Card className="p-6">
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
            {open.map((p) => (
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
      </Card>
    </ReportShell>
  );
}

export function TaxReportPage() {
  return (
    <ReportShell title="Tax Reports">
      <div className="mb-6 grid gap-5 lg:grid-cols-2">
        <ChartCard title="VAT composition">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={taxMix} dataKey="value" nameKey="name" innerRadius={52} outerRadius={88}>
                {taxMix.map((_, i) => (
                  <Cell key={i} fill={PIE[i % PIE.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => money(Number(v))} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Revenue vs VAT (illustrative)">
          <ResponsiveContainer>
            <LineChart data={taxTrend}>
              <CartesianGrid stroke="#e4e9ef" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: SLATE }} />
              <YAxis tick={{ fontSize: 11, fill: SLATE }} tickFormatter={(v) => `${Math.round(v / 1000)}k`} />
              <Tooltip formatter={(v) => money(Number(v))} />
              <Legend />
              <Line type="monotone" dataKey="revenue" name="Revenue" stroke={NAVY} strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="vat" name="Output VAT (15%)" stroke={TEAL} strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
      <Card className="p-6">
        <Lines
          rows={[
            ["Output VAT", 16356],
            ["Input VAT", 8120],
            ["Net VAT payable", 8236, true],
            ["Withholding on services", 980],
          ]}
        />
      </Card>
    </ReportShell>
  );
}
