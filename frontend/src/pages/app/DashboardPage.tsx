import { Link } from "react-router-dom";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { kpis, monthly } from "../../data/seed";
import { useAuth } from "../../store/AuthContext";
import { useBook } from "../../store/BookContext";
import { fmtDate, money } from "../../lib/format";
import { Card } from "../../components/ui/Card";
import { DataTable } from "../../components/ui/DataTable";

export function DashboardPage() {
  const { user } = useAuth();
  const { transactions } = useBook();
  const hour = new Date().getHours();
  const hello = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const first = user?.name.split(" ")[0] ?? "there";

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-navy sm:text-3xl">
          {hello}, {first}
        </h1>
        <p className="mt-1 text-slate">Cash is healthy. Three items need a look.</p>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-6 lg:grid-cols-4">
        {[
          ["Revenue", kpis.revenue, `+${kpis.revenueDelta}%`],
          ["Expenses", kpis.expenses, `+${kpis.expensesDelta}%`],
          ["Profit", kpis.profit, `+${kpis.profitDelta}%`],
          ["Cash", kpis.cash, `+${kpis.cashDelta}%`],
        ].map(([label, value, delta]) => (
          <div key={String(label)}>
            <p className="text-sm text-slate">{label}</p>
            <p className="mt-1 text-xl font-semibold tracking-tight text-navy num sm:text-2xl">{money(Number(value))}</p>
            <p className="mt-1 text-xs text-gain">{delta}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_0.8fr]">
        <div>
          <p className="text-sm font-medium text-navy">This year</p>
          <div className="mt-3 h-56">
            <ResponsiveContainer>
              <AreaChart data={monthly}>
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#5b6b7c" }} axisLine={false} tickLine={false} />
                <Tooltip formatter={(v) => money(Number(v))} />
                <Area type="monotone" dataKey="revenue" stroke="#0e9f90" fill="#e7f7f4" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-navy">Needs attention</p>
          <ul className="mt-3 space-y-1">
            <li>
              <Link to="/app/invoices" className="block rounded-xl py-2.5 text-sm text-navy hover:bg-white">
                5 invoices overdue
              </Link>
            </li>
            <li>
              <Link to="/app/expense-claims" className="block rounded-xl py-2.5 text-sm text-navy hover:bg-white">
                3 expenses to approve
              </Link>
            </li>
            <li>
              <Link to="/app/banking/reconciliation" className="block rounded-xl py-2.5 text-sm text-navy hover:bg-white">
                7 bank lines unmatched
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-10">
        <div className="mb-3 flex items-baseline justify-between">
          <p className="text-sm font-medium text-navy">Recent activity</p>
          <Link to="/app/transactions" className="text-sm text-slate hover:text-navy">
            View all
          </Link>
        </div>
        <Card className="border-0 shadow-none">
          <DataTable
            columns={["Date", "Description", "Amount"]}
            rows={transactions.slice(0, 6).map((t) => [
              fmtDate(t.date),
              t.description,
              <span key="a" className={`num ${t.amount < 0 ? "text-loss" : "text-navy"}`}>
                {money(t.amount)}
              </span>,
            ])}
          />
        </Card>
      </div>
    </div>
  );
}
