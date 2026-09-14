import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { money } from "../../lib/format";
import {
  reportingDate,
  salesByDay,
  salesByMonth,
  salesByWeek,
  salesTotals,
  type SalesPeriod,
} from "../../lib/sales";
import type { Invoice } from "../../types";
import { cn } from "../../lib/cn";

export function SalesPulse({ invoices }: { invoices: Invoice[] }) {
  const asOf = reportingDate(invoices);
  const t = salesTotals(invoices, asOf);
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <Stat label="Daily sales" hint={asOf} value={t.daily} delta={t.dailyDelta} />
      <Stat label="Weekly sales" hint={`${t.weekFrom} → ${asOf}`} value={t.weekly} delta={t.weeklyDelta} />
      <Stat label="Monthly sales" hint={`${t.monthFrom} → ${asOf}`} value={t.monthly} delta={t.monthlyDelta} />
    </div>
  );
}

function Stat({ label, hint, value, delta }: { label: string; hint: string; value: number; delta: number }) {
  const up = delta >= 0;
  return (
    <div className="rounded-2xl border border-line bg-white p-4">
      <p className="text-sm text-slate">{label}</p>
      <p className="mt-1 text-xl font-semibold tracking-tight text-navy num sm:text-2xl">{money(value)}</p>
      <p className={`mt-1 text-xs ${up ? "text-gain" : "text-loss"}`}>
        {up ? "+" : ""}
        {delta}% vs last period
      </p>
      <p className="mt-1 text-[11px] text-slate">{hint}</p>
    </div>
  );
}

export function SalesPeriodChart({
  invoices,
  period,
  onPeriod,
}: {
  invoices: Invoice[];
  period: SalesPeriod;
  onPeriod: (p: SalesPeriod) => void;
}) {
  const asOf = reportingDate(invoices);
  const data =
    period === "daily" ? salesByDay(invoices, asOf) : period === "weekly" ? salesByWeek(invoices, asOf) : salesByMonth(invoices, asOf);

  return (
    <div>
      <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-medium text-navy">Sales</p>
        <div className="inline-flex rounded-full bg-white p-1 shadow-sm ring-1 ring-line">
          {(
            [
              ["daily", "Daily"],
              ["weekly", "Weekly"],
              ["monthly", "Monthly"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => onPeriod(id)}
              className={cn("rounded-full px-3 py-1.5 text-xs font-medium sm:px-4", period === id ? "bg-navy text-white" : "text-slate")}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="h-56">
        <ResponsiveContainer>
          <BarChart data={data}>
            <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#5b6b7c" }} interval={0} />
            <YAxis tick={{ fontSize: 11, fill: "#5b6b7c" }} tickFormatter={(v) => `${Math.round(Number(v) / 1000)}k`} width={36} />
            <Tooltip formatter={(v) => money(Number(v))} />
            <Bar dataKey="sales" name="Sales" fill="#0e9f90" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
