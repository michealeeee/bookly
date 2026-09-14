import type { Invoice } from "../types";
import { todayIso } from "./format";

const COUNTED: Invoice["status"][] = ["Sent", "Partially Paid", "Paid", "Overdue"];

export function isCountedSale(inv: Invoice) {
  return COUNTED.includes(inv.status);
}

export function parseIso(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function toIso(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function addDays(iso: string, n: number) {
  const d = parseIso(iso);
  d.setDate(d.getDate() + n);
  return toIso(d);
}

export function mondayOf(iso: string) {
  const d = parseIso(iso);
  const weekday = d.getDay();
  const shift = weekday === 0 ? -6 : 1 - weekday;
  d.setDate(d.getDate() + shift);
  return toIso(d);
}

export function monthStart(iso: string) {
  return `${iso.slice(0, 7)}-01`;
}

export function sumSales(invoices: Invoice[], from: string, to: string) {
  return invoices
    .filter(isCountedSale)
    .filter((i) => i.date >= from && i.date <= to)
    .reduce((s, i) => s + i.amount, 0);
}

function pct(current: number, previous: number) {
  if (!previous) return current ? 100 : 0;
  return Math.round(((current - previous) / previous) * 1000) / 10;
}

/** Prefer live today when the books overlap it; otherwise the latest sale date (demo stays populated). */
export function reportingDate(invoices: Invoice[]) {
  const today = todayIso();
  const sales = invoices.filter(isCountedSale);
  if (!sales.length) return today;
  const latest = sales.reduce((m, i) => (i.date > m ? i.date : m), sales[0].date);
  const earliest = sales.reduce((m, i) => (i.date < m ? i.date : m), sales[0].date);
  if (today >= earliest && today <= addDays(latest, 14)) return today;
  return latest;
}

export function salesTotals(invoices: Invoice[], asOf: string) {
  const dayFrom = asOf;
  const prevDay = addDays(asOf, -1);
  const weekFrom = mondayOf(asOf);
  const prevWeekEnd = addDays(weekFrom, -1);
  const prevWeekFrom = mondayOf(prevWeekEnd);
  const monthFrom = monthStart(asOf);
  const prevMonthEnd = addDays(monthFrom, -1);
  const prevMonthFrom = monthStart(prevMonthEnd);

  const daily = sumSales(invoices, dayFrom, asOf);
  const weekly = sumSales(invoices, weekFrom, asOf);
  const monthly = sumSales(invoices, monthFrom, asOf);
  const prevDaily = sumSales(invoices, prevDay, prevDay);
  const prevWeekly = sumSales(invoices, prevWeekFrom, prevWeekEnd);
  const prevMonthly = sumSales(invoices, prevMonthFrom, prevMonthEnd);

  return {
    asOf,
    daily,
    weekly,
    monthly,
    prevDaily,
    prevWeekly,
    prevMonthly,
    dailyDelta: pct(daily, prevDaily),
    weeklyDelta: pct(weekly, prevWeekly),
    monthlyDelta: pct(monthly, prevMonthly),
    weekFrom,
    monthFrom,
  };
}

export function salesByDay(invoices: Invoice[], asOf: string, days = 14) {
  const start = addDays(asOf, -(days - 1));
  return Array.from({ length: days }, (_, i) => {
    const date = addDays(start, i);
    const d = parseIso(date);
    return {
      key: date,
      label: d.toLocaleDateString("en-GB", { day: "numeric", month: "short" }),
      sales: sumSales(invoices, date, date),
    };
  });
}

export function salesByWeek(invoices: Invoice[], asOf: string, weeks = 8) {
  const thisMonday = mondayOf(asOf);
  const firstMonday = addDays(thisMonday, -(weeks - 1) * 7);
  return Array.from({ length: weeks }, (_, i) => {
    const from = addDays(firstMonday, i * 7);
    const to = addDays(from, 6);
    const end = to > asOf ? asOf : to;
    const a = parseIso(from);
    const b = parseIso(end);
    return {
      key: from,
      label: `${a.getDate()}–${b.toLocaleDateString("en-GB", { day: "numeric", month: "short" })}`,
      sales: sumSales(invoices, from, end),
    };
  });
}

export function salesByMonth(invoices: Invoice[], asOf: string, months = 9) {
  const end = parseIso(monthStart(asOf));
  return Array.from({ length: months }, (_, i) => {
    const d = new Date(end.getFullYear(), end.getMonth() - (months - 1 - i), 1);
    const from = toIso(d);
    const last = new Date(d.getFullYear(), d.getMonth() + 1, 0);
    const to = toIso(last) > asOf ? asOf : toIso(last);
    return {
      key: from,
      label: d.toLocaleDateString("en-GB", { month: "short" }),
      sales: sumSales(invoices, from, to),
    };
  });
}

export type SalesPeriod = "daily" | "weekly" | "monthly";

export function expandTransactionDates(
  period: "daily" | "weekly",
  date: string,
  everyDayOfWeek: boolean,
) {
  if (period === "daily" || !everyDayOfWeek) {
    return [{ date: period === "weekly" ? mondayOf(date) : date, period }];
  }
  const start = mondayOf(date);
  return Array.from({ length: 7 }, (_, i) => ({ date: addDays(start, i), period: "daily" as const }));
}
