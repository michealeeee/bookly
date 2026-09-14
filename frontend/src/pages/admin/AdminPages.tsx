import { tenants } from "../../data/seed";
import { Card } from "../../components/ui/Card";
import { DataTable } from "../../components/ui/DataTable";
import { Badge } from "../../components/ui/Badge";
import { PageHeader } from "../../components/ui/PageHeader";
export function AdminHomePage() {
  const mrr = tenants.reduce((s, t) => s + t.mrr, 0);
  const active = tenants.filter((t) => t.status === "Active").length;
  return (
    <div>
      <PageHeader title="Platform overview" subtitle="Bookly SaaS administration (mock data)." />
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="p-5">
          <p className="text-sm text-slate">Organisations</p>
          <p className="mt-2 text-3xl font-semibold">{tenants.length}</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-slate">Active</p>
          <p className="mt-2 text-3xl font-semibold">{active}</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-slate">MRR</p>
          <p className="mt-2 text-3xl font-semibold">${mrr.toLocaleString()}</p>
        </Card>
      </div>
    </div>
  );
}

export function AdminOrgsPage() {
  return (
    <div>
      <PageHeader title="Organisations" />
      <Card>
        <DataTable
          columns={["Name", "Plan", "Users", "MRR", "Status", "Country", "Created"]}
          rows={tenants.map((t) => [
            t.name,
            t.plan,
            String(t.users),
            `$${t.mrr}`,
            <Badge key={t.id}>{t.status}</Badge>,
            t.country,
            t.created,
          ])}
        />
      </Card>
    </div>
  );
}

export function AdminSubsPage() {
  return (
    <div>
      <PageHeader title="Subscriptions" />
      <Card>
        <DataTable
          columns={["Organisation", "Plan", "MRR", "Status"]}
          rows={tenants.map((t) => [t.name, t.plan, `$${t.mrr}`, <Badge key={t.id}>{t.status}</Badge>])}
        />
      </Card>
    </div>
  );
}

export function AdminUsersPage() {
  return (
    <div>
      <PageHeader title="Platform users" />
      <Card>
        <DataTable
          columns={["Email", "Role", "Org"]}
          rows={[
            ["admin@bookly.app", "Platform admin", "Bookly"],
            ["success@bookly.app", "CSM", "Bookly"],
            ["michael@apextrade.com", "Org owner", "Apex Trade Limited"],
          ]}
        />
      </Card>
    </div>
  );
}
