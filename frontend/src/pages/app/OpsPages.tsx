import { useMemo, useState, type ReactNode } from "react";
import { quotations, payments, purchaseOrders } from "../../data/seed";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { Card } from "../../components/ui/Card";
import { DataTable } from "../../components/ui/DataTable";
import { Field, Input, Select, Textarea } from "../../components/ui/Field";
import { Modal } from "../../components/ui/Modal";
import { PageHeader, SearchBar } from "../../components/ui/PageHeader";
import { KpiCard } from "../../components/ui/KpiCard";
import { fmtDate, money, todayIso } from "../../lib/format";
import { useBook } from "../../store/BookContext";
import { useToast } from "../../store/ToastContext";
import type { Expense, ExpenseStatus, Supplier } from "../../types";

export function SimpleList({
  title,
  columns,
  rows,
}: {
  title: string;
  columns: string[];
  rows: ReactNode[][];
}) {
  return (
    <div>
      <PageHeader title={title} />
      <Card>
        <DataTable columns={columns} rows={rows} />
      </Card>
    </div>
  );
}

export function QuotationsPage() {
  return (
    <SimpleList
      title="Quotations"
      columns={["Number", "Customer", "Date", "Expiry", "Amount", "Status"]}
      rows={quotations.map((q) => [q.number, q.customer, fmtDate(q.date), fmtDate(q.expiry), money(q.amount), <Badge key={q.id}>{q.status}</Badge>])}
    />
  );
}

export function PaymentsPage({ direction }: { direction?: "Incoming" | "Outgoing" }) {
  const rows = payments.filter((p) => !direction || p.type === direction);
  return (
    <SimpleList
      title={direction === "Outgoing" ? "Purchase payments" : "Payments"}
      columns={["Date", "Party", "Method", "Reference", "Amount", "Type"]}
      rows={rows.map((p) => [
        fmtDate(p.date),
        p.party,
        p.method,
        p.reference,
        money(p.amount),
        <Badge key={p.id}>{p.type}</Badge>,
      ])}
    />
  );
}

export function ARPage() {
  const { customers } = useBook();
  const open = customers.filter((c) => c.outstanding > 0);
  return (
    <SimpleList
      title="Accounts Receivable"
      columns={["Customer", "Outstanding", "City", "Status"]}
      rows={open.map((c) => [c.name, money(c.outstanding), c.city, <Badge key={c.id}>{c.status}</Badge>])}
    />
  );
}

export function SuppliersPage() {
  const { suppliers, addSupplier } = useBook();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const rows = suppliers.filter((s) => s.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <div>
      <PageHeader title="Suppliers" actions={<Button onClick={() => setOpen(true)}>Add supplier</Button>} />
      <Card className="p-4">
        <SearchBar value={q} onChange={setQ} />
        <div className="mt-4">
          <DataTable
            columns={["Supplier", "Contact", "Email", "Phone", "Outstanding", "Status"]}
            rows={rows.map((s) => [
              s.name,
              s.contact,
              s.email,
              s.phone,
              money(s.outstanding),
              <Badge key={s.id}>{s.status}</Badge>,
            ])}
          />
        </div>
      </Card>
      <Modal open={open} title="Add supplier" onClose={() => setOpen(false)}>
        <form
          className="space-y-3"
          onSubmit={async (e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            await addSupplier({
              name: String(fd.get("name")),
              contact: String(fd.get("contact")),
              email: String(fd.get("email")),
              phone: String(fd.get("phone")),
              outstanding: 0,
              status: "Active",
              city: "Accra",
            } satisfies Omit<Supplier, "id">);
            toast("Supplier added.");
            setOpen(false);
          }}
        >
          <Field label="Name">
            <Input name="name" required />
          </Field>
          <Field label="Contact">
            <Input name="contact" />
          </Field>
          <Field label="Email">
            <Input name="email" type="email" />
          </Field>
          <Field label="Phone">
            <Input name="phone" />
          </Field>
          <Button className="w-full">Save</Button>
        </form>
      </Modal>
    </div>
  );
}

export function PurchaseOrdersPage() {
  return (
    <SimpleList
      title="Purchase Orders"
      columns={["Number", "Supplier", "Date", "Expected", "Amount", "Status"]}
      rows={purchaseOrders.map((p) => [
        p.number,
        p.supplier,
        fmtDate(p.date),
        fmtDate(p.expected),
        money(p.amount),
        <Badge key={p.id}>{p.status}</Badge>,
      ])}
    />
  );
}

export function BillsPage() {
  const { bills } = useBook();
  return (
    <SimpleList
      title="Bills"
      columns={["Bill", "Supplier", "Date", "Due date", "Amount", "Status"]}
      rows={bills.map((b) => [
        b.number,
        b.supplier,
        fmtDate(b.date),
        fmtDate(b.dueDate),
        money(b.amount),
        <Badge key={b.id}>{b.status}</Badge>,
      ])}
    />
  );
}

export function APPage() {
  const { suppliers } = useBook();
  return (
    <SimpleList
      title="Accounts Payable"
      columns={["Supplier", "Outstanding", "Status"]}
      rows={suppliers
        .filter((s) => s.outstanding > 0)
        .map((s) => [s.name, money(s.outstanding), <Badge key={s.id}>{s.status}</Badge>])}
    />
  );
}

const flow = ["Employee", "Submitted", "Manager Review", "Approved", "Finance", "Reimbursed"];

export function ExpensesPage() {
  const { expenses, addExpense } = useBook();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const totals = useMemo(() => {
    const sum = (s: ExpenseStatus | ExpenseStatus[]) =>
      expenses.filter((e) => (Array.isArray(s) ? s.includes(e.status) : e.status === s)).reduce((n, e) => n + e.amount, 0);
    return {
      total: expenses.reduce((n, e) => n + e.amount, 0),
      pending: sum(["Submitted", "Manager Review"]),
      approved: sum("Approved"),
      rejected: sum("Rejected"),
      reimbursed: sum("Reimbursed"),
    };
  }, [expenses]);

  return (
    <div>
      <PageHeader title="Expenses" actions={<Button onClick={() => setOpen(true)}>New expense</Button>} />
      <div className="mb-4 grid gap-3 sm:grid-cols-5">
        <KpiCard label="Total expenses" value={totals.total} />
        <KpiCard label="Pending" value={totals.pending} />
        <KpiCard label="Approved" value={totals.approved} />
        <KpiCard label="Rejected" value={totals.rejected} />
        <KpiCard label="Reimbursed" value={totals.reimbursed} />
      </div>
      <Card>
        <DataTable
          columns={["Employee", "Date", "Category", "Description", "Amount", "Method", "Dept", "Status"]}
          rows={expenses.map((e) => [
            e.employee,
            fmtDate(e.date),
            e.category,
            e.description,
            money(e.amount),
            e.method,
            e.department,
            <Badge key={e.id}>{e.status}</Badge>,
          ])}
        />
      </Card>
      <Modal open={open} title="New expense" onClose={() => setOpen(false)}>
        <form
          className="space-y-3"
          onSubmit={async (e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            await addExpense({
              employee: String(fd.get("employee")),
              date: String(fd.get("date")),
              category: String(fd.get("category")),
              description: String(fd.get("description")),
              amount: Number(fd.get("amount")),
              method: String(fd.get("method")),
              department: String(fd.get("department")),
              status: "Submitted",
              receipt: String(fd.get("receipt") || "receipt.png"),
            });
            toast("Expense submitted.");
            setOpen(false);
          }}
        >
          <Field label="Employee">
            <Input name="employee" defaultValue="Ama Serwaa" required />
          </Field>
          <Field label="Date">
            <Input name="date" type="date" defaultValue={todayIso()} />
          </Field>
          <Field label="Category">
            <Select name="category">
              {["Transport", "Meals", "Software", "Travel", "Office", "Other"].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </Select>
          </Field>
          <Field label="Description">
            <Textarea name="description" required />
          </Field>
          <Field label="Amount">
            <Input name="amount" type="number" step="0.01" required />
          </Field>
          <Field label="Payment method">
            <Select name="method">
              {["Card", "Cash", "Mobile money", "Bank"].map((m) => (
                <option key={m}>{m}</option>
              ))}
            </Select>
          </Field>
          <Field label="Department">
            <Select name="department">
              {["Sales", "Finance", "People", "Operations"].map((d) => (
                <option key={d}>{d}</option>
              ))}
            </Select>
          </Field>
          <Field label="Receipt">
            <Input name="receipt" type="file" />
          </Field>
          <Button className="w-full">Submit</Button>
        </form>
      </Modal>
    </div>
  );
}

export function ExpenseClaimsPage() {
  const { expenses, updateExpense } = useBook();
  const { toast } = useToast();
  const claims = expenses.filter((e) => ["Submitted", "Manager Review", "Approved", "Rejected"].includes(e.status));
  return (
    <div>
      <PageHeader title="Expense Claims" subtitle="Approve, reject, or request changes." />
      <div className="mb-6 flex flex-wrap items-center gap-2 text-sm">
        {flow.map((s, i) => (
          <span key={s} className="flex items-center gap-2">
            <span className="rounded-full bg-mint px-3 py-1 font-medium text-teal-2">{s}</span>
            {i < flow.length - 1 && <span className="text-slate">↓</span>}
          </span>
        ))}
      </div>
      <div className="space-y-3">
        {claims.map((e) => (
          <Card key={e.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
            <div>
              <p className="font-medium text-navy">
                {e.employee} · {e.description}
              </p>
              <p className="text-sm text-slate">
                {fmtDate(e.date)} · {money(e.amount)} · {e.status}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={async () => {
                  await updateExpense(e.id, { status: "Approved" });
                  toast("Approved.");
                }}
              >
                Approve
              </Button>
              <Button
                size="sm"
                variant="danger"
                onClick={async () => {
                  await updateExpense(e.id, { status: "Rejected" });
                  toast("Rejected.");
                }}
              >
                Reject
              </Button>
              <Button size="sm" variant="secondary" onClick={() => toast("Change requested (simulated).")}>
                Request changes
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function ReimbursementsPage() {
  const { expenses, updateExpense } = useBook();
  const { toast } = useToast();
  const approved = expenses.filter((e) => e.status === "Approved" || e.status === "Reimbursed");
  return (
    <div>
      <PageHeader title="Reimbursements" />
      <Card>
        <DataTable
          columns={["Employee", "Description", "Amount", "Status", ""]}
          rows={approved.map((e) => [
            e.employee,
            e.description,
            money(e.amount),
            <Badge key="s">{e.status}</Badge>,
            e.status === "Approved" ? (
              <Button
                key="b"
                size="sm"
                onClick={async () => {
                  await updateExpense(e.id, { status: "Reimbursed" });
                  toast("Marked reimbursed.");
                }}
              >
                Pay
              </Button>
            ) : (
              "—"
            ),
          ])}
        />
      </Card>
    </div>
  );
}
