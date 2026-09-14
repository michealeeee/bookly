import { audit, branches, departments, taxRates } from "../../data/seed";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { Card } from "../../components/ui/Card";
import { DataTable } from "../../components/ui/DataTable";
import { Field, Input, Select } from "../../components/ui/Field";
import { PageHeader } from "../../components/ui/PageHeader";
import { useBook } from "../../store/BookContext";
import { useToast } from "../../store/ToastContext";
import { plans } from "../../data/pricing";
import { PlanGrid } from "../../components/marketing/PlanGrid";
import { Modal } from "../../components/ui/Modal";
import { useState } from "react";

export function TaxRatesPage() {
  return (
    <div>
      <PageHeader title="Tax Rates" />
      <Card>
        <DataTable
          columns={["Name", "Rate", "Type", "Status"]}
          rows={taxRates.map((t) => [t.name, `${t.rate}%`, t.type, <Badge key={t.id}>{t.status}</Badge>])}
        />
      </Card>
    </div>
  );
}

export function TaxLiabilitiesPage() {
  return (
    <div>
      <PageHeader title="Tax Liabilities" />
      <Card className="p-5 text-sm">
        <p>VAT payable (Sep): GH₵8,236</p>
        <p className="mt-2">PAYE (Aug): GH₵4,810</p>
        <p className="mt-2">Withholding: GH₵980</p>
      </Card>
    </div>
  );
}

export function TaxReturnsPage() {
  const { toast } = useToast();
  return (
    <div>
      <PageHeader title="Tax Returns" actions={<Button onClick={() => toast("Return marked as filed.")}>File return</Button>} />
      <Card>
        <DataTable
          columns={["Period", "Type", "Status"]}
          rows={[
            ["Aug 2026", "VAT", <Badge key="1">Filed</Badge>],
            ["Sep 2026", "VAT", <Badge key="2">Draft</Badge>],
            ["Q2 2026", "CIT estimate", <Badge key="3">Review</Badge>],
          ]}
        />
      </Card>
    </div>
  );
}

export function UsersPage() {
  const { team, addUser } = useBook();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  return (
    <div>
      <PageHeader title="Users" actions={<Button onClick={() => setOpen(true)}>Invite user</Button>} />
      <Card>
        <DataTable
          columns={["Name", "Email", "Role", "Department", "Branch", "Status"]}
          rows={team.map((u) => [u.name, u.email, u.role, u.department, u.branch, <Badge key={u.id}>{u.status}</Badge>])}
        />
      </Card>
      <Modal open={open} title="Invite" onClose={() => setOpen(false)}>
        <form
          className="space-y-3"
          onSubmit={async (e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            await addUser({
              name: String(fd.get("name")),
              email: String(fd.get("email")),
              role: String(fd.get("role")),
              department: "Finance",
              branch: "Accra HQ",
              status: "Invited",
            });
            toast("Invite sent (simulated).");
            setOpen(false);
          }}
        >
          <Field label="Name">
            <Input name="name" required />
          </Field>
          <Field label="Email">
            <Input name="email" type="email" required />
          </Field>
          <Field label="Role">
            <Select name="role">
              {["Accountant", "Finance Manager", "Employee"].map((r) => (
                <option key={r}>{r}</option>
              ))}
            </Select>
          </Field>
          <Button className="w-full">Send invite</Button>
        </form>
      </Modal>
    </div>
  );
}

export function RolesPage() {
  const roles = [
    ["Owner", "Full access, billing, users"],
    ["Finance Manager", "Approve expenses, close periods, reports"],
    ["Accountant", "Journals, invoices, reconciliation"],
    ["Employee", "Submit expenses, view own documents"],
  ];
  return (
    <div>
      <PageHeader title="Roles & Permissions" />
      <div className="grid gap-3 md:grid-cols-2">
        {roles.map(([n, d]) => (
          <Card key={n} className="p-5">
            <h3 className="font-semibold text-navy">{n}</h3>
            <p className="mt-1 text-sm text-slate">{d}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function DepartmentsPage() {
  return (
    <div>
      <PageHeader title="Departments" />
      <Card>
        <DataTable columns={["Department"]} rows={departments.map((d) => [d])} />
      </Card>
    </div>
  );
}

export function BranchesPage() {
  return (
    <div>
      <PageHeader title="Branches" />
      <Card>
        <DataTable columns={["Branch"]} rows={branches.map((d) => [d])} />
      </Card>
    </div>
  );
}

export function AuditPage() {
  return (
    <div>
      <PageHeader title="Audit Trail" />
      <Card>
        <DataTable
          columns={["Time", "Actor", "Action", "Entity", "Detail"]}
          rows={audit.map((a) => [new Date(a.at).toLocaleString(), a.actor, a.action, a.entity, a.detail])}
        />
      </Card>
    </div>
  );
}

export function OrgSettingsPage() {
  const { org, setOrg } = useBook();
  const { toast } = useToast();
  return (
    <div>
      <PageHeader title="Organisation" />
      <Card className="max-w-xl space-y-3 p-5">
        <Field label="Name">
          <Input value={org.name} onChange={(e) => setOrg({ ...org, name: e.target.value })} />
        </Field>
        <Field label="Email">
          <Input value={org.email} onChange={(e) => setOrg({ ...org, email: e.target.value })} />
        </Field>
        <Field label="Phone">
          <Input value={org.phone} onChange={(e) => setOrg({ ...org, phone: e.target.value })} />
        </Field>
        <Button onClick={() => toast("Organisation saved.")}>Save</Button>
      </Card>
    </div>
  );
}

export function PreferencesPage() {
  const { toast } = useToast();
  return (
    <div>
      <PageHeader title="Preferences" />
      <Card className="max-w-xl space-y-3 p-5">
        <Field label="Date format">
          <Select defaultValue="DMY">
            <option value="DMY">DD MMM YYYY</option>
            <option value="MDY">MMM DD, YYYY</option>
          </Select>
        </Field>
        <Field label="First day of week">
          <Select>
            <option>Monday</option>
            <option>Sunday</option>
          </Select>
        </Field>
        <Button onClick={() => toast("Preferences saved.")}>Save</Button>
      </Card>
    </div>
  );
}

export function SecurityPage() {
  const { toast } = useToast();
  return (
    <div>
      <PageHeader title="Security" />
      <Card className="max-w-xl space-y-3 p-5">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" defaultChecked /> Require 2FA for finance roles
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" defaultChecked /> Session timeout after 30 minutes
        </label>
        <Button onClick={() => toast("Security settings saved.")}>Save</Button>
      </Card>
    </div>
  );
}

export function IntegrationsPage() {
  const items = ["Stanbic Open Banking", "GCB feeds", "Slack alerts", "Google Workspace SSO"];
  const { toast } = useToast();
  return (
    <div>
      <PageHeader title="Integrations" />
      <div className="grid gap-3 md:grid-cols-2">
        {items.map((i) => (
          <Card key={i} className="flex items-center justify-between p-5">
            <p className="font-medium">{i}</p>
            <Button size="sm" variant="secondary" onClick={() => toast("Connected (simulated).")}>
              Connect
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function HelpPage() {
  return (
    <div>
      <PageHeader title="Help" subtitle="This is a frontend demo with mock data." />
      <Card className="p-5 text-sm text-slate">
        Search the sidebar for invoices, journals, banking and reports. Platform admins sign in as admin@bookly.app.
      </Card>
    </div>
  );
}

export function SubscriptionPage() {
  const { org, setOrg } = useBook();
  const { toast } = useToast();
  const current = plans.find((p) => p.name === org.plan) ?? plans[1];
  return (
    <div>
      <PageHeader
        title="Subscription"
        subtitle="Change plans instantly in this demo. A live product would bill through Stripe or a regional processor."
      />
      <Card className="mb-8 overflow-hidden border-teal/30 bg-gradient-to-br from-mint to-white p-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-teal">Your workspace</p>
        <h2 className="mt-1 text-2xl font-semibold text-navy">{org.name}</h2>
        <p className="mt-2 text-sm text-slate">
          On <span className="font-semibold text-navy">{current.name}</span>
          {` · $${current.monthly}/mo billed monthly · renews 14 Oct 2026`}
        </p>
        <p className="mt-3 text-sm text-ink">{current.tagline}</p>
      </Card>
      <PlanGrid
        currentPlan={org.plan}
        onSelect={(name) => {
          setOrg({ ...org, plan: name });
          toast(name === org.plan ? "You’re already on this plan." : `Moved to ${name}.`);
        }}
      />
    </div>
  );
}
