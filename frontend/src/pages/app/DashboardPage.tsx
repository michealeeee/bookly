import { Link } from "react-router-dom";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { actions, expenseBreakdown, kpis, monthly, revenueBreakdown } from "../../data/seed";
import { useAuth } from "../../store/AuthContext";
import { useBook } from "../../store/BookContext";
import { fmtDate, money } from "../../lib/format";
import { Badge } from "../../components/ui/Badge";
import { Card, CardHeader } from "../../components/ui/Card";
import { KpiCard } from "../../components/ui/KpiCard";
import { DataTable } from "../../components/ui/DataTable";
import { Button } from "../../components/ui/Button";
import { useMemo, useState } from "react";
import { SearchBar } from "../../components/ui/PageHeader";

const pieColors = ["#0e9f90", "#0c2340", "#c9a227", "#5b6b7c", "#128a63", "#c2413b", "#7c6af7"];

export function DashboardPage() {
  const { user } = useAuth();
  const { transactions } = useBook();
  const hour = new Date().getHours();
  const hello = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const [q, setQ] = useState("");
  const rows = useMemo(
    () => transactions.filter((t) => t.description.toLowerCase().includes(q.toLowerCase())),
    [transactions, q],
  );

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-navy">
          {hello}, {user?.name.split(" ")[0] ?? "there"}
        </h1>
        <p className="text-sm text-slate">Here's what's happening with your finances today.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Total Revenue" value={kpis.revenue} delta={kpis.revenueDelta} />
        <KpiCard label="Total Expenses" value={kpis.expenses} delta={kpis.expensesDelta} />
        <KpiCard label="Net Profit" value={kpis.profit} delta={kpis.profitDelta} />
        <KpiCard label="Cash Balance" value={kpis.cash} delta={kpis.cashDelta} />
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Accounts Receivable" value={kpis.ar} />
        <KpiCard label="Accounts Payable" value={kpis.ap} />
        <Card className="p-5">
          <p className="text-sm text-slate">Overdue Invoices</p>
          <p className="mt-2 text-2xl font-semibold text-loss">{kpis.overdueInvoices}</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-slate">Pending Expenses</p>
          <p className="mt-2 text-2xl font-semibold text-navy">{kpis.pendingExpenses}</p>
        </Card>
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader title="Revenue vs Expenses" subtitle="Monthly" />
          <div className="h-72 p-4">
            <ResponsiveContainer>
              <BarChart data={monthly}>
                <CartesianGrid stroke="#e4e9ef" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip formatter={(v) => money(Number(v))} />
                <Legend />
                <Bar dataKey="revenue" fill="#0e9f90" radius={[6, 6, 0, 0]} />
                <Bar dataKey="expenses" fill="#0c2340" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card>
          <CardHeader title="Action Required" />
          <ul className="divide-y divide-line">
            {actions.map((a) => (
              <li key={a.id}>
                <Link to={a.to} className="flex items-center justify-between px-5 py-3 text-sm hover:bg-mint/50">
                  <span>
                    <span className="font-semibold text-navy">{a.count}</span> {a.label}
                  </span>
                  <span className="text-teal">View</span>
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader title="Cash Flow" subtitle="Money in vs money out" />
          <div className="h-64 p-4">
            <ResponsiveContainer>
              <AreaChart data={monthly}>
                <CartesianGrid stroke="#e4e9ef" vertical={false} />
                <XAxis dataKey="month" />
                <Tooltip formatter={(v) => money(Number(v))} />
                <Area dataKey="inflow" stroke="#0e9f90" fill="#e7f7f4" />
                <Area dataKey="outflow" stroke="#c2413b" fill="#fdecec" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader title="Expense Breakdown" />
            <div className="h-52 p-2">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={expenseBreakdown} dataKey="value" nameKey="name" innerRadius={40} outerRadius={70}>
                    {expenseBreakdown.map((_, i) => (
                      <Cell key={i} fill={pieColors[i % pieColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => money(Number(v))} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card>
            <CardHeader title="Revenue Breakdown" />
            <div className="h-52 p-2">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={revenueBreakdown} dataKey="value" nameKey="name" innerRadius={40} outerRadius={70}>
                    {revenueBreakdown.map((_, i) => (
                      <Cell key={i} fill={pieColors[i % pieColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => money(Number(v))} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>

      <Card className="mt-4">
        <CardHeader
          title="Recent Transactions"
          action={
            <div className="flex gap-2">
              <SearchBar value={q} onChange={setQ} placeholder="Search" />
              <Button variant="secondary" size="sm" onClick={() => alert("Export simulated (CSV).")}>
                Export
              </Button>
            </div>
          }
        />
        <DataTable
          columns={["Date", "Description", "Account", "Category", "Type", "Amount", "Status"]}
          rows={rows.map((t) => [
            fmtDate(t.date),
            t.description,
            t.account,
            t.category,
            <Badge key={t.id}>{t.type}</Badge>,
            <span key="a" className={`num ${t.amount < 0 ? "text-loss" : "text-gain"}`}>
              {money(t.amount)}
            </span>,
            <Badge key="s">{t.status}</Badge>,
          ])}
        />
      </Card>
    </div>
  );
}
