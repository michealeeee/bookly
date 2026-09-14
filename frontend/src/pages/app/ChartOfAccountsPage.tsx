import { useEffect, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Field, Input, Select } from "../../components/ui/Field";
import { Modal } from "../../components/ui/Modal";
import { PageHeader, SearchBar } from "../../components/ui/PageHeader";
import { money } from "../../lib/format";
import { useBook } from "../../store/BookContext";
import { useToast } from "../../store/ToastContext";
import type { Account } from "../../types";

export function ChartOfAccountsPage() {
  const { accounts, addAccount, updateAccount } = useBook();
  const { toast } = useToast();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("All");
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Account | null>(null);

  const roots = accounts.filter((a) => !a.parentId);
  const kids = (id: string) => accounts.filter((a) => a.parentId === id);

  const visible = (a: Account) =>
    (filter === "All" || a.type === filter) && a.name.toLowerCase().includes(q.toLowerCase());

  return (
    <div>
      <PageHeader
        title="Chart of Accounts"
        subtitle="Hierarchical ledger structure for Apex Trade."
        actions={
          <Button
            onClick={() => {
              setEditing(null);
              setOpen(true);
            }}
          >
            Add account
          </Button>
        }
      />
      <Card className="p-4">
        <div className="mb-4 flex gap-3">
          <SearchBar value={q} onChange={setQ} />
          <Select className="max-w-[180px]" value={filter} onChange={(e) => setFilter(e.target.value)}>
            {["All", "Assets", "Liabilities", "Equity", "Revenue", "Expenses"].map((t) => (
              <option key={t}>{t}</option>
            ))}
          </Select>
        </div>
        <div className="space-y-1">
          {roots.filter((r) => filter === "All" || r.type === filter).map((r) => (
            <div key={r.id}>
              <Row
                account={r}
                depth={0}
                open={!collapsed[r.id]}
                onToggle={() => setCollapsed((c) => ({ ...c, [r.id]: !c[r.id] }))}
                onEdit={() => {
                  setEditing(r);
                  setOpen(true);
                }}
              />
              {!collapsed[r.id] &&
                kids(r.id)
                  .filter(visible)
                  .map((k) => (
                    <Row
                      key={k.id}
                      account={k}
                      depth={1}
                      onEdit={() => {
                        setEditing(k);
                        setOpen(true);
                      }}
                    />
                  ))}
            </div>
          ))}
        </div>
      </Card>
      <AccountForm
        open={open}
        initial={editing}
        parents={roots}
        onClose={() => setOpen(false)}
        onSave={async (payload) => {
          if (editing) await updateAccount(editing.id, payload);
          else await addAccount({ ...payload, balance: 0 });
          toast("Account saved.");
          setOpen(false);
        }}
      />
    </div>
  );
}

function Row({
  account,
  depth,
  open,
  onToggle,
  onEdit,
}: {
  account: Account;
  depth: number;
  open?: boolean;
  onToggle?: () => void;
  onEdit: () => void;
}) {
  return (
    <div
      className="flex items-center justify-between rounded-lg px-2 py-2 hover:bg-mint/40"
      style={{ paddingLeft: 8 + depth * 24 }}
    >
      <button className="flex items-center gap-2 text-left" onClick={onToggle} type="button">
        {onToggle ? open ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" /> : <span className="w-4" />}
        <span className="w-12 text-xs text-slate num">{account.code}</span>
        <span className={depth === 0 ? "font-semibold text-navy" : "text-ink"}>{account.name}</span>
      </button>
      <div className="flex items-center gap-4">
        <span className="num text-sm">{money(account.balance)}</span>
        <button className="text-xs text-teal" onClick={onEdit}>
          Edit
        </button>
      </div>
    </div>
  );
}

function AccountForm({
  open,
  initial,
  parents,
  onClose,
  onSave,
}: {
  open: boolean;
  initial: Account | null;
  parents: Account[];
  onClose: () => void;
  onSave: (a: Omit<Account, "id" | "balance"> & { balance?: number }) => Promise<void>;
}) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [type, setType] = useState<Account["type"]>("Expenses");
  const [parentId, setParentId] = useState(parents[0]?.id);
  useEffect(() => {
    if (!open) return;
    setName(initial?.name ?? "");
    setCode(initial?.code ?? "");
    setType(initial?.type ?? "Expenses");
    setParentId(initial?.parentId ?? parents[0]?.id);
  }, [open, initial, parents]);

  return (
    <Modal open={open} title={initial ? "Edit account" : "Add account"} onClose={onClose}>
      <form
        className="space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          onSave({ name, code, type, parentId });
        }}
      >
        <Field label="Code">
          <Input value={code} onChange={(e) => setCode(e.target.value)} required />
        </Field>
        <Field label="Name">
          <Input value={name} onChange={(e) => setName(e.target.value)} required />
        </Field>
        <Field label="Type">
          <Select value={type} onChange={(e) => setType(e.target.value as Account["type"])}>
            {["Assets", "Liabilities", "Equity", "Revenue", "Expenses"].map((t) => (
              <option key={t}>{t}</option>
            ))}
          </Select>
        </Field>
        <Field label="Parent">
          <Select value={parentId} onChange={(e) => setParentId(e.target.value)}>
            {parents.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </Select>
        </Field>
        <Button className="w-full">Save</Button>
      </form>
    </Modal>
  );
}
