import { useState } from "react";
import { bankAccounts } from "../../data/seed";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { Card } from "../../components/ui/Card";
import { DataTable } from "../../components/ui/DataTable";
import { PageHeader } from "../../components/ui/PageHeader";
import { money, fmtDate } from "../../lib/format";
import { useBook } from "../../store/BookContext";
import { useToast } from "../../store/ToastContext";
import { Link } from "react-router-dom";

export function BankingOverviewPage() {
  return (
    <div>
      <PageHeader title="Banking" subtitle="Balances, feeds and reconciliation." />
      <div className="grid gap-4 md:grid-cols-3">
        {bankAccounts.map((a) => (
          <Card key={a.id} className="p-5">
            <p className="text-sm text-slate">{a.bank}</p>
            <p className="mt-1 text-lg font-semibold text-navy">{a.name}</p>
            <p className="text-xs text-slate">{a.number}</p>
            <p className="mt-4 text-2xl font-semibold num">{money(a.balance)}</p>
            <p className="text-xs text-slate">
              {a.type} · {a.currency}
            </p>
          </Card>
        ))}
      </div>
      <div className="mt-6 flex gap-3">
        <Link to="/app/banking/transactions">
          <Button variant="secondary">Transactions</Button>
        </Link>
        <Link to="/app/banking/reconciliation">
          <Button>Reconcile</Button>
        </Link>
      </div>
    </div>
  );
}

export function BankAccountsPage() {
  return (
    <div>
      <PageHeader title="Bank Accounts" />
      <Card>
        <DataTable
          columns={["Bank", "Account name", "Account number", "Type", "Currency", "Current balance"]}
          rows={bankAccounts.map((a) => [a.bank, a.name, a.number, a.type, a.currency, money(a.balance)])}
        />
      </Card>
    </div>
  );
}

export function BankTransactionsPage() {
  const { bankTxns } = useBook();
  return (
    <div>
      <PageHeader title="Bank Transactions" />
      <Card>
        <DataTable
          columns={["Date", "Description", "Amount", "Matched"]}
          rows={bankTxns.map((t) => [
            fmtDate(t.date),
            t.description,
            <span key="a" className={t.amount < 0 ? "text-loss num" : "text-gain num"}>
              {money(t.amount)}
            </span>,
            t.matched ? <Badge key="m">Reconciled</Badge> : <Badge key="u">Unmatched</Badge>,
          ])}
        />
      </Card>
    </div>
  );
}

export function ReconciliationPage() {
  const { bankTxns, transactions, matchBank } = useBook();
  const { toast } = useToast();
  const unmatched = bankTxns.filter((t) => !t.matched);
  const [sel, setSel] = useState<Record<string, string>>({});
  return (
    <div>
      <PageHeader title="Reconciliation" subtitle="Match bank lines to book transactions." />
      <div className="space-y-3">
        {unmatched.map((t) => (
          <Card key={t.id} className="flex flex-wrap items-center gap-3 p-4">
            <div className="min-w-[220px] flex-1">
              <p className="font-medium">{t.description}</p>
              <p className="text-sm text-slate">
                {fmtDate(t.date)} · {money(t.amount)}
              </p>
            </div>
            <select
              className="rounded-xl border border-line px-3 py-2 text-sm"
              value={sel[t.id] ?? ""}
              onChange={(e) => setSel({ ...sel, [t.id]: e.target.value })}
            >
              <option value="">Select book transaction</option>
              {transactions.map((x) => (
                <option key={x.id} value={x.id}>
                  {x.description} ({money(x.amount)})
                </option>
              ))}
            </select>
            <Button
              size="sm"
              disabled={!sel[t.id]}
              onClick={async () => {
                await matchBank(t.id, sel[t.id]);
                toast("Matched.");
              }}
            >
              Match
            </Button>
          </Card>
        ))}
        {unmatched.length === 0 && <p className="text-slate">All visible bank lines are matched.</p>}
      </div>
    </div>
  );
}
