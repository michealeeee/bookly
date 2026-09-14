import { useEffect, useMemo, useState } from "react";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { Card } from "../../components/ui/Card";
import { DataTable } from "../../components/ui/DataTable";
import { Field, Input, Select } from "../../components/ui/Field";
import { Modal } from "../../components/ui/Modal";
import { PageHeader, SearchBar } from "../../components/ui/PageHeader";
import { cn } from "../../lib/cn";
import { fmtDate, money, todayIso } from "../../lib/format";
import { addDays, expandTransactionDates, mondayOf } from "../../lib/sales";
import { useBook } from "../../store/BookContext";
import { useToast } from "../../store/ToastContext";
import type { Transaction, TxStatus, TxType } from "../../types";

const types: TxType[] = ["Income", "Expense", "Deposit", "Withdrawal", "Transfer", "Adjustment"];

export function TransactionsPage() {
  const { transactions, addTransaction, addTransactions, updateTransaction, deleteTransaction } = useBook();
  const { toast } = useToast();
  const [q, setQ] = useState("");
  const [type, setType] = useState("All");
  const [periodFilter, setPeriodFilter] = useState<"All" | "daily" | "weekly">("All");
  const [from, setFrom] = useState("");
  const [open, setOpen] = useState(false);
  const [preset, setPreset] = useState<"daily" | "weekly">("daily");
  const [editing, setEditing] = useState<Transaction | null>(null);
  const [view, setView] = useState<Transaction | null>(null);

  const rows = useMemo(
    () =>
      transactions.filter((t) => {
        const matchQ = t.description.toLowerCase().includes(q.toLowerCase());
        const matchT = type === "All" || t.type === type;
        const matchP = periodFilter === "All" || t.period === periodFilter;
        const matchD = !from || t.date >= from;
        return matchQ && matchT && matchP && matchD;
      }),
    [transactions, q, type, from, periodFilter],
  );

  const today = todayIso();
  const weekFrom = mondayOf(today);
  const dailyNet = transactions.filter((t) => t.date === today).reduce((s, t) => s + t.amount, 0);
  const weeklyNet = transactions.filter((t) => t.date >= weekFrom && t.date <= today).reduce((s, t) => s + t.amount, 0);
  const dailyCount = transactions.filter((t) => t.date === today).length;
  const weeklyCount = transactions.filter((t) => t.date >= weekFrom && t.date <= addDays(weekFrom, 6)).length;

  return (
    <div>
      <PageHeader
        title="Transactions"
        subtitle="Record a single day’s entry, or a week’s total. Weekly posts date to the Monday of that week."
        actions={
          <>
            <Button variant="secondary" onClick={() => toast("Export queued.")}>
              Export
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                setEditing(null);
                setPreset("weekly");
                setOpen(true);
              }}
            >
              Record weekly
            </Button>
            <Button
              onClick={() => {
                setEditing(null);
                setPreset("daily");
                setOpen(true);
              }}
            >
              Record daily
            </Button>
          </>
        }
      />
      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <Card className="p-4">
          <p className="text-sm text-slate">Today ({fmtDate(today)})</p>
          <p className={`mt-1 text-2xl font-semibold num ${dailyNet < 0 ? "text-loss" : "text-navy"}`}>{money(dailyNet)}</p>
          <p className="mt-1 text-xs text-slate">{dailyCount} daily & same-day entries</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-slate">This week ({fmtDate(weekFrom)} – {fmtDate(today)})</p>
          <p className={`mt-1 text-2xl font-semibold num ${weeklyNet < 0 ? "text-loss" : "text-navy"}`}>{money(weeklyNet)}</p>
          <p className="mt-1 text-xs text-slate">{weeklyCount} entries in the week</p>
        </Card>
      </div>
      <Card className="p-4">
        <div className="mb-4 flex flex-wrap gap-3">
          <SearchBar value={q} onChange={setQ} />
          <div className="inline-flex rounded-full bg-paper p-1 ring-1 ring-line">
            {(["All", "daily", "weekly"] as const).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPeriodFilter(p)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-medium capitalize",
                  periodFilter === p ? "bg-navy text-white" : "text-slate",
                )}
              >
                {p === "All" ? "All" : p}
              </button>
            ))}
          </div>
          <Select value={type} onChange={(e) => setType(e.target.value)} className="max-w-[180px]">
            <option>All</option>
            {types.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </Select>
          <Input type="date" className="max-w-[180px]" value={from} onChange={(e) => setFrom(e.target.value)} />
        </div>
        <DataTable
          columns={["Date", "Period", "Description", "Account", "Category", "Type", "Amount", "Status", ""]}
          rows={rows.map((t) => [
            fmtDate(t.date),
            <Badge key="p">{t.period === "weekly" ? "Weekly" : "Daily"}</Badge>,
            t.description,
            t.account,
            t.category,
            <Badge key="t">{t.type}</Badge>,
            <span key="a" className={`num ${t.amount < 0 ? "text-loss" : "text-gain"}`}>
              {money(t.amount)}
            </span>,
            <Badge key="s">{t.status}</Badge>,
            <div key="x" className="flex gap-2 text-xs">
              <button className="text-teal" onClick={() => setView(t)}>
                View
              </button>
              <button
                className="text-navy"
                onClick={() => {
                  setEditing(t);
                  setPreset(t.period);
                  setOpen(true);
                }}
              >
                Edit
              </button>
              <button
                className="text-loss"
                onClick={async () => {
                  await deleteTransaction(t.id);
                  toast("Transaction deleted.");
                }}
              >
                Delete
              </button>
            </div>,
          ])}
        />
      </Card>
      <TxForm
        open={open}
        initial={editing}
        preset={preset}
        onClose={() => setOpen(false)}
        onSave={async (payload, everyDay) => {
          if (editing) {
            await updateTransaction(editing.id, payload);
            toast("Transaction updated.");
          } else {
            const dates = expandTransactionDates(payload.period, payload.date, everyDay);
            const items = dates.map((d) => ({
              ...payload,
              date: d.date,
              period: d.period,
              description:
                dates.length > 1 ? `${payload.description} (${fmtDate(d.date)})` : payload.description,
            }));
            if (items.length === 1) await addTransaction(items[0]);
            else await addTransactions(items);
            toast(
              items.length > 1
                ? `Recorded ${items.length} daily transactions for the week.`
                : payload.period === "weekly"
                  ? "Weekly transaction recorded."
                  : "Daily transaction recorded.",
            );
          }
          setOpen(false);
        }}
      />
      <Modal open={!!view} title="Transaction" onClose={() => setView(null)}>
        {view && (
          <dl className="grid grid-cols-2 gap-3 text-sm">
            <dt className="text-slate">Date</dt>
            <dd>{fmtDate(view.date)}</dd>
            <dt className="text-slate">Period</dt>
            <dd className="capitalize">{view.period}</dd>
            <dt className="text-slate">Description</dt>
            <dd>{view.description}</dd>
            <dt className="text-slate">Amount</dt>
            <dd className="num">{money(view.amount)}</dd>
            <dt className="text-slate">Status</dt>
            <dd>
              <Badge>{view.status}</Badge>
            </dd>
          </dl>
        )}
      </Modal>
    </div>
  );
}

function TxForm({
  open,
  initial,
  preset,
  onClose,
  onSave,
}: {
  open: boolean;
  initial: Transaction | null;
  preset: "daily" | "weekly";
  onClose: () => void;
  onSave: (t: Omit<Transaction, "id">, everyDayOfWeek: boolean) => Promise<void>;
}) {
  const blank = (): Omit<Transaction, "id"> => ({
    date: todayIso(),
    description: "",
    account: "Sales Revenue",
    category: "Sales",
    type: "Income",
    amount: 0,
    status: "Pending",
    period: preset,
  });
  const [f, setF] = useState<Omit<Transaction, "id">>(blank);
  const [everyDay, setEveryDay] = useState(false);
  useEffect(() => {
    if (!open) return;
    setEveryDay(false);
    setF(initial ? { ...initial, period: initial.period ?? "daily" } : blank());
  }, [open, initial, preset]);

  const weekStart = mondayOf(f.date || todayIso());

  return (
    <Modal open={open} title={initial ? "Edit transaction" : f.period === "weekly" ? "Record weekly transaction" : "Record daily transaction"} onClose={onClose}>
      <form
        className="space-y-3"
        onSubmit={async (e) => {
          e.preventDefault();
          await onSave(f, f.period === "weekly" && everyDay);
        }}
      >
        <Field label="Record as">
          <Select
            value={f.period}
            onChange={(e) => setF({ ...f, period: e.target.value as "daily" | "weekly" })}
            disabled={!!initial}
          >
            <option value="daily">Daily — one date</option>
            <option value="weekly">Weekly — week commencing Monday</option>
          </Select>
        </Field>
        <Field label={f.period === "weekly" ? "Any date in the week" : "Date"}>
          <Input type="date" value={f.date} onChange={(e) => setF({ ...f, date: e.target.value })} />
        </Field>
        {f.period === "weekly" && (
          <>
            <p className="text-xs text-slate">Posts to week of {fmtDate(weekStart)} – {fmtDate(addDays(weekStart, 6))}.</p>
            {!initial && (
              <label className="flex items-center gap-2 text-sm text-navy">
                <input type="checkbox" checked={everyDay} onChange={(e) => setEveryDay(e.target.checked)} />
                Post the same amount on each day of the week
              </label>
            )}
          </>
        )}
        <Field label="Description">
          <Input value={f.description} onChange={(e) => setF({ ...f, description: e.target.value })} required />
        </Field>
        <Field label="Account">
          <Input value={f.account} onChange={(e) => setF({ ...f, account: e.target.value })} />
        </Field>
        <Field label="Category">
          <Input value={f.category} onChange={(e) => setF({ ...f, category: e.target.value })} />
        </Field>
        <Field label="Type">
          <Select value={f.type} onChange={(e) => setF({ ...f, type: e.target.value as TxType })}>
            {types.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </Select>
        </Field>
        <Field label="Amount (negative for outflows)">
          <Input type="number" value={f.amount} onChange={(e) => setF({ ...f, amount: Number(e.target.value) })} />
        </Field>
        <Field label="Status">
          <Select value={f.status} onChange={(e) => setF({ ...f, status: e.target.value as TxStatus })}>
            {["Cleared", "Pending", "Reconciled", "Unmatched"].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </Select>
        </Field>
        <Button className="w-full">{f.period === "weekly" && everyDay && !initial ? "Record 7 daily entries" : "Save"}</Button>
      </form>
    </Modal>
  );
}
