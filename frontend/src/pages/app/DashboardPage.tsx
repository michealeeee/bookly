import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../store/AuthContext";
import { useBook } from "../../store/BookContext";
import { fmtDate, money } from "../../lib/format";
import type { SalesPeriod } from "../../lib/sales";
import { Card } from "../../components/ui/Card";
import { DataTable } from "../../components/ui/DataTable";
import { SalesPeriodChart, SalesPulse } from "../../components/sales/SalesPulse";

export function DashboardPage() {
  const { user } = useAuth();
  const { transactions, invoices } = useBook();
  const [period, setPeriod] = useState<SalesPeriod>("daily");
  const hour = new Date().getHours();
  const hello = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const first = user?.name.split(" ")[0] ?? "there";

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-navy sm:text-3xl">
          {hello}, {first}
        </h1>
        <p className="mt-1 text-slate">Sales from posted invoices — daily, weekly and monthly.</p>
      </div>

      <SalesPulse invoices={invoices} />

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_0.8fr]">
        <SalesPeriodChart invoices={invoices} period={period} onPeriod={setPeriod} />
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
