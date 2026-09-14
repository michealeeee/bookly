import { useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { Card } from "../../components/ui/Card";
import { DataTable } from "../../components/ui/DataTable";
import { Field, Input, Select, Textarea } from "../../components/ui/Field";
import { Modal } from "../../components/ui/Modal";
import { PageHeader, SearchBar } from "../../components/ui/PageHeader";
import { fmtDate, money, todayIso, uid } from "../../lib/format";
import { useBook } from "../../store/BookContext";
import { useToast } from "../../store/ToastContext";
import type { Customer, Invoice, LineItem } from "../../types";

export function CustomersPage() {
  const { customers, addCustomer, updateCustomer } = useBook();
  const { toast } = useToast();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Customer | null>(null);
  const [view, setView] = useState<Customer | null>(null);
  const rows = customers.filter((c) => c.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div>
      <PageHeader
        title="Customers"
        actions={
          <Button
            onClick={() => {
              setEditing(null);
              setOpen(true);
            }}
          >
            Add customer
          </Button>
        }
      />
      <Card className="p-4">
        <SearchBar value={q} onChange={setQ} placeholder="Search customers" />
        <div className="mt-4">
          <DataTable
            columns={["Customer", "Contact", "Email", "Phone", "Outstanding", "Status", ""]}
            rows={rows.map((c) => [
              c.name,
              c.contact,
              c.email,
              c.phone,
              <span key="o" className="num">
                {money(c.outstanding)}
              </span>,
              <Badge key="s">{c.status}</Badge>,
              <div key="a" className="flex gap-2 text-xs">
                <button className="text-teal" onClick={() => setView(c)}>
                  View
                </button>
                <button
                  className="text-navy"
                  onClick={() => {
                    setEditing(c);
                    setOpen(true);
                  }}
                >
                  Edit
                </button>
              </div>,
            ])}
          />
        </div>
      </Card>
      <PartyForm
        open={open}
        title={editing ? "Edit customer" : "Add customer"}
        initial={editing}
        onClose={() => setOpen(false)}
        onSave={async (p) => {
          if (editing) await updateCustomer(editing.id, p);
          else await addCustomer({ ...p, outstanding: 0, status: "Active", city: "Accra" });
          toast("Customer saved.");
          setOpen(false);
        }}
      />
      <Modal open={!!view} title={view?.name ?? ""} onClose={() => setView(null)}>
        {view && (
          <p className="text-sm text-slate">
            {view.contact} · {view.email} · {view.city}
          </p>
        )}
      </Modal>
    </div>
  );
}

function PartyForm({
  open,
  title,
  initial,
  onClose,
  onSave,
}: {
  open: boolean;
  title: string;
  initial: { name: string; contact: string; email: string; phone: string } | null;
  onClose: () => void;
  onSave: (p: { name: string; contact: string; email: string; phone: string }) => Promise<void>;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [contact, setContact] = useState(initial?.contact ?? "");
  const [email, setEmail] = useState(initial?.email ?? "");
  const [phone, setPhone] = useState(initial?.phone ?? "");
  return (
    <Modal open={open} title={title} onClose={onClose}>
      <form
        className="space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          onSave({ name, contact, email, phone });
        }}
      >
        <Field label="Name">
          <Input value={name} onChange={(e) => setName(e.target.value)} required />
        </Field>
        <Field label="Contact">
          <Input value={contact} onChange={(e) => setContact(e.target.value)} />
        </Field>
        <Field label="Email">
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Field>
        <Field label="Phone">
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
        </Field>
        <Button className="w-full">Save</Button>
      </form>
    </Modal>
  );
}

export function InvoicesPage() {
  const { invoices } = useBook();
  const [q, setQ] = useState("");
  const rows = invoices.filter((i) => `${i.number} ${i.customer}`.toLowerCase().includes(q.toLowerCase()));
  return (
    <div>
      <PageHeader
        title="Invoices"
        actions={
          <Link to="/app/invoices/new">
            <Button>Create invoice</Button>
          </Link>
        }
      />
      <Card className="p-4">
        <SearchBar value={q} onChange={setQ} />
        <div className="mt-4">
          <DataTable
            columns={["Invoice", "Customer", "Date", "Due date", "Amount", "Status", ""]}
            rows={rows.map((i) => [
              i.number,
              i.customer,
              fmtDate(i.date),
              fmtDate(i.dueDate),
              <span key="a" className="num">
                {money(i.amount)}
              </span>,
              <Badge key="s">{i.status}</Badge>,
              <Link key="v" to={`/app/invoices/${i.id}`} className="text-xs text-teal">
                View
              </Link>,
            ])}
          />
        </div>
      </Card>
    </div>
  );
}

function lineTotal(l: LineItem) {
  const sub = l.qty * l.unitPrice * (1 - l.discount / 100);
  return sub * (1 + l.tax / 100);
}

export function InvoiceEditorPage({ mode }: { mode: "new" | "view" }) {
  const { invoices, customers, addInvoice, updateInvoice, org } = useBook();
  const { toast } = useToast();
  const { id } = useParams();
  const existing = mode === "view" ? invoices.find((i) => i.id === id) ?? invoices[0] : null;
  const [customerId, setCustomerId] = useState(existing?.customerId ?? customers[0]?.id);
  const [date, setDate] = useState(existing?.date ?? todayIso());
  const [due, setDue] = useState(existing?.dueDate ?? todayIso());
  const [notes, setNotes] = useState(existing?.notes ?? "Payment due within 14 days.");
  const [items, setItems] = useState<LineItem[]>(
    existing?.items ?? [{ id: uid("it"), name: "Professional services", qty: 1, unitPrice: 2500, discount: 0, tax: 15 }],
  );
  const customer = customers.find((c) => c.id === customerId);
  const total = items.reduce((s, l) => s + lineTotal(l), 0);
  const invNo = existing?.number ?? "INV-1043";

  const save = async (status: Invoice["status"]) => {
    const payload: Omit<Invoice, "id"> = {
      number: invNo,
      customerId: customerId ?? "",
      customer: customer?.name ?? "",
      date,
      dueDate: due,
      amount: total,
      status,
      items,
      notes,
    };
    if (existing) await updateInvoice(existing.id, payload);
    else await addInvoice(payload);
    toast(status === "Draft" ? "Draft saved." : status === "Sent" ? "Invoice sent." : "Invoice updated.");
  };

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <div>
        <PageHeader title={mode === "new" ? "Create invoice" : invNo} />
        <Card className="space-y-4 p-5">
          <Field label="Customer">
            <Select value={customerId} onChange={(e) => setCustomerId(e.target.value)}>
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </Select>
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Invoice date">
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </Field>
            <Field label="Due date">
              <Input type="date" value={due} onChange={(e) => setDue(e.target.value)} />
            </Field>
          </div>
          {items.map((l, i) => (
            <div key={l.id} className="grid grid-cols-2 gap-2 sm:grid-cols-6">
              <Input
                className="sm:col-span-2"
                placeholder="Product / service"
                value={l.name}
                onChange={(e) => setItems(items.map((x, idx) => (idx === i ? { ...x, name: e.target.value } : x)))}
              />
              <Input
                type="number"
                placeholder="Qty"
                value={l.qty}
                onChange={(e) => setItems(items.map((x, idx) => (idx === i ? { ...x, qty: Number(e.target.value) } : x)))}
              />
              <Input
                type="number"
                placeholder="Unit price"
                value={l.unitPrice}
                onChange={(e) =>
                  setItems(items.map((x, idx) => (idx === i ? { ...x, unitPrice: Number(e.target.value) } : x)))
                }
              />
              <Input
                type="number"
                placeholder="Disc %"
                value={l.discount}
                onChange={(e) =>
                  setItems(items.map((x, idx) => (idx === i ? { ...x, discount: Number(e.target.value) } : x)))
                }
              />
              <Input
                type="number"
                placeholder="Tax %"
                value={l.tax}
                onChange={(e) => setItems(items.map((x, idx) => (idx === i ? { ...x, tax: Number(e.target.value) } : x)))}
              />
            </div>
          ))}
          <Button
            type="button"
            variant="secondary"
            onClick={() => setItems([...items, { id: uid("it"), name: "", qty: 1, unitPrice: 0, discount: 0, tax: 15 }])}
          >
            Add line
          </Button>
          <Field label="Notes">
            <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
          </Field>
          <p className="text-right text-lg font-semibold num">Total {money(total)}</p>
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" onClick={() => save("Draft")}>
              Save Draft
            </Button>
            <Button onClick={() => save("Sent")}>Send</Button>
            <Button variant="secondary" onClick={() => toast("PDF download simulated.")}>
              Download PDF
            </Button>
            <Button variant="secondary" onClick={() => window.print()}>
              Print
            </Button>
          </div>
        </Card>
      </div>
      <Card className="p-8 print:shadow-none">
        <div className="flex justify-between">
          <div>
            <p className="text-2xl font-semibold text-navy">Bookly</p>
            <p className="text-sm text-slate">{org.name}</p>
            <p className="text-sm text-slate">{org.address}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate">INVOICE</p>
            <p className="font-semibold">{invNo}</p>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-2 text-sm">
          <div>
            <p className="text-slate">Bill to</p>
            <p className="font-medium">{customer?.name}</p>
            <p>{customer?.email}</p>
          </div>
          <div className="text-right">
            <p>Date {fmtDate(date)}</p>
            <p>Due {fmtDate(due)}</p>
          </div>
        </div>
        <table className="mt-8 w-full text-sm">
          <thead>
            <tr className="border-b border-line text-left text-slate">
              <th className="py-2">Item</th>
              <th>Qty</th>
              <th>Price</th>
              <th className="text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((l) => (
              <tr key={l.id} className="border-b border-line">
                <td className="py-2">{l.name}</td>
                <td>{l.qty}</td>
                <td className="num">{money(l.unitPrice)}</td>
                <td className="text-right num">{money(lineTotal(l))}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-6 text-right text-xl font-semibold num">Amount due {money(total)}</p>
        <p className="mt-6 text-sm text-slate">{notes}</p>
      </Card>
    </div>
  );
}

export function InvoiceDetailPage() {
  return <InvoiceEditorPage mode="view" />;
}

export function NewInvoicePage() {
  return <InvoiceEditorPage mode="new" />;
}
