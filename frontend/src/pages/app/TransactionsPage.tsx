import { useEffect, useMemo, useState } from "react";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { Card } from "../../components/ui/Card";
import { DataTable } from "../../components/ui/DataTable";
import { Field, Input, Select } from "../../components/ui/Field";
import { Modal } from "../../components/ui/Modal";
import { PageHeader, SearchBar } from "../../components/ui/PageHeader";
import { fmtDate, money, todayIso } from "../../lib/format";
import { useBook } from "../../store/BookContext";
import { useToast } from "../../store/ToastContext";
import type { Transaction, TxStatus, TxType } from "../../types";

const types: TxType[] = ["Income", "Expense", "Deposit", "Withdrawal", "Transfer", "Adjustment"];

export function TransactionsPage() {
  const { transactions, addTransaction, updateTransaction, deleteTransaction } = useBook();
  const { toast } = useToast();
  const [q, setQ] = useState("");
  const [type, setType] = useState("All");
  const [from, setFrom] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Transaction | null>(null);
  const [view, setView] = useState<Transaction | null>(null);

  const rows = useMemo(
    () =>
      transactions.filter((t) => {
        const matchQ = t.description.toLowerCase().includes(q.toLowerCase());
        const matchT = type === "All" || t.type === type;
        const matchD = !from || t.date >= from;
        return matchQ && matchT && matchD;
      }),
    [transactions, q, type, from],
  );

  return (
    <div>
      <PageHeader
        title="Transactions"
        subtitle="Income, expenses, transfers and adjustments."
        actions={
          <>
            <Button variant="secondary" onClick={() => toast("Export queued.")}>
              Export
            </Button>
            <Button
              onClick={() => {
                setEditing(null);
                setOpen(true);
              }}
            >
              Add transaction
            </Button>
          </>
        }
      />
      <Card className="p-4">
        <div className="mb-4 flex flex-wrap gap-3">
          <SearchBar value={q} onChange={setQ} />
          <Select value={type} onChange={(e) => setType(e.target.value)} className="max-w-[180px]">
            <option>All</option>
            {types.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </Select>
          <Input type="date" className="max-w-[180px]" value={from} onChange={(e) => setFrom(e.target.value)} />
        </div>
        <DataTable
          columns={["Date", "Description", "Account", "Category", "Type", "Amount", "Status", ""]}
          rows={rows.map((t) => [
            fmtDate(t.date),
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
        onClose={() => setOpen(false)}
        onSave={async (payload) => {
          if (editing) await updateTransaction(editing.id, payload);
          else await addTransaction(payload);
          toast(editing ? "Transaction updated." : "Transaction added.");
          setOpen(false);
        }}
      />
      <Modal open={!!view} title="Transaction" onClose={() => setView(null)}>
        {view && (
          <dl className="grid grid-cols-2 gap-3 text-sm">
            <dt className="text-slate">Date</dt>
            <dd>{fmtDate(view.date)}</dd>
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
  onClose,
  onSave,
}: {
  open: boolean;
  initial: Transaction | null;
  onClose: () => void;
  onSave: (t: Omit<Transaction, "id">) => Promise<void>;
}) {
  const blank = (): Omit<Transaction, "id"> => ({
    date: todayIso(),
    description: "",
    account: "Bank",
    category: "General",
    type: "Expense",
    amount: 0,
    status: "Pending",
  });
  const [f, setF] = useState<Omit<Transaction, "id">>(blank);
  useEffect(() => {
    if (!open) return;
    setF(initial ? { ...initial } : blank());
  }, [open, initial]);

  return (
    <Modal open={open} title={initial ? "Edit transaction" : "Add transaction"} onClose={onClose}>
      <form
        className="space-y-3"
        onSubmit={async (e) => {
          e.preventDefault();
          await onSave(f);
        }}
      >
        <Field label="Date">
          <Input type="date" value={f.date} onChange={(e) => setF({ ...f, date: e.target.value })} />
        </Field>
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
        <Button className="w-full">Save</Button>
      </form>
    </Modal>
  );
}
