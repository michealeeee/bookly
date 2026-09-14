import { useMemo, useState } from "react";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Field, Input, Select } from "../../components/ui/Field";
import { Modal } from "../../components/ui/Modal";
import { PageHeader } from "../../components/ui/PageHeader";
import { Badge } from "../../components/ui/Badge";
import { uid } from "../../lib/format";
import { money } from "../../lib/format";
import { useBook } from "../../store/BookContext";
import { useToast } from "../../store/ToastContext";
import type { JournalLine } from "../../types";

export function JournalPage() {
  const { journals, addJournal, accounts } = useBook();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  return (
    <div>
      <PageHeader
        title="Journal Entries"
        subtitle="Double-entry postings. Debits must equal credits."
        actions={<Button onClick={() => setOpen(true)}>New entry</Button>}
      />
      <div className="space-y-3">
        {journals.map((j) => {
          const debit = j.lines.reduce((s, l) => s + l.debit, 0);
          const credit = j.lines.reduce((s, l) => s + l.credit, 0);
          return (
            <Card key={j.id} className="p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-semibold text-navy">{j.reference}</p>
                  <p className="text-sm text-slate">
                    {j.date} · {j.description}
                  </p>
                </div>
                <Badge>{j.status}</Badge>
              </div>
              <table className="mt-3 w-full text-sm">
                <thead>
                  <tr className="text-left text-slate">
                    <th className="py-1">Account</th>
                    <th className="py-1">Debit</th>
                    <th className="py-1">Credit</th>
                  </tr>
                </thead>
                <tbody>
                  {j.lines.map((l) => (
                    <tr key={l.id} className="border-t border-line">
                      <td className="py-2">{l.account}</td>
                      <td className="num">{l.debit ? money(l.debit) : "—"}</td>
                      <td className="num">{l.credit ? money(l.credit) : "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-2 text-xs text-slate">
                Total debit {money(debit)} · Total credit {money(credit)}
              </p>
            </Card>
          );
        })}
      </div>
      <JournalForm
        open={open}
        accountNames={accounts.map((a) => a.name)}
        onClose={() => setOpen(false)}
        onSave={async (payload) => {
          await addJournal(payload);
          toast("Journal posted.");
          setOpen(false);
        }}
      />
    </div>
  );
}

function JournalForm({
  open,
  onClose,
  onSave,
  accountNames,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (j: { date: string; reference: string; description: string; status: "Posted"; lines: JournalLine[] }) => Promise<void>;
  accountNames: string[];
}) {
  const blank = (): JournalLine => ({ id: uid("ln"), account: accountNames[0] ?? "Bank", description: "", debit: 0, credit: 0 });
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [reference, setReference] = useState("JE-");
  const [description, setDescription] = useState("");
  const [lines, setLines] = useState<JournalLine[]>([blank(), blank()]);

  const debit = useMemo(() => lines.reduce((s, l) => s + Number(l.debit || 0), 0), [lines]);
  const credit = useMemo(() => lines.reduce((s, l) => s + Number(l.credit || 0), 0), [lines]);
  const diff = Math.round((debit - credit) * 100) / 100;
  const balanced = diff === 0 && debit > 0;

  return (
    <Modal open={open} title="New journal entry" onClose={onClose} wide>
      <div className="space-y-3">
        <div className="grid gap-3 sm:grid-cols-3">
          <Field label="Date">
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </Field>
          <Field label="Reference">
            <Input value={reference} onChange={(e) => setReference(e.target.value)} />
          </Field>
          <Field label="Description">
            <Input value={description} onChange={(e) => setDescription(e.target.value)} />
          </Field>
        </div>
        {lines.map((l, i) => (
          <div key={l.id} className="grid gap-2 sm:grid-cols-12">
            <Select
              className="sm:col-span-4"
              value={l.account}
              onChange={(e) => setLines(lines.map((x, idx) => (idx === i ? { ...x, account: e.target.value } : x)))}
            >
              {accountNames.map((n) => (
                <option key={n}>{n}</option>
              ))}
            </Select>
            <Input
              className="sm:col-span-3"
              placeholder="Memo"
              value={l.description}
              onChange={(e) => setLines(lines.map((x, idx) => (idx === i ? { ...x, description: e.target.value } : x)))}
            />
            <Input
              className="sm:col-span-2"
              type="number"
              placeholder="Debit"
              value={l.debit || ""}
              onChange={(e) =>
                setLines(lines.map((x, idx) => (idx === i ? { ...x, debit: Number(e.target.value), credit: 0 } : x)))
              }
            />
            <Input
              className="sm:col-span-2"
              type="number"
              placeholder="Credit"
              value={l.credit || ""}
              onChange={(e) =>
                setLines(lines.map((x, idx) => (idx === i ? { ...x, credit: Number(e.target.value), debit: 0 } : x)))
              }
            />
            <button
              className="text-sm text-loss sm:col-span-1"
              type="button"
              onClick={() => setLines(lines.filter((_, idx) => idx !== i))}
            >
              Remove
            </button>
          </div>
        ))}
        <Button type="button" variant="secondary" onClick={() => setLines([...lines, blank()])}>
          Add line
        </Button>
        <div className="rounded-xl bg-paper p-4 text-sm">
          <p>Total Debit: <span className="num font-semibold">{money(debit)}</span></p>
          <p>Total Credit: <span className="num font-semibold">{money(credit)}</span></p>
          <p className={balanced ? "text-gain" : "text-loss"}>
            Difference: <span className="num">{money(diff)}</span>
            {!balanced && " — entry is unbalanced"}
          </p>
        </div>
        <Button
          className="w-full"
          disabled={!balanced}
          onClick={() => onSave({ date, reference, description, status: "Posted", lines })}
        >
          Post journal
        </Button>
      </div>
    </Modal>
  );
}
