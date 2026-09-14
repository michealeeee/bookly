import { useState, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { Field, Input, Select, Textarea } from "../../components/ui/Field";
import { Logo } from "../../components/brand/Logo";
import { useAuth } from "../../store/AuthContext";
import { useBook } from "../../store/BookContext";

const steps = ["Organisation", "Business", "Accounting", "Tax", "Team", "Complete"];

export function OnboardingPage() {
  const [step, setStep] = useState(0);
  const { completeOnboarding, user } = useAuth();
  const { org, setOrg } = useBook();
  const nav = useNavigate();
  const name = sessionStorage.getItem("bookly.orgName") || org.name;

  const next = () => setStep((s) => Math.min(s + 1, 5));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-line bg-white px-6 py-4">
        <Link to="/">
          <Logo />
        </Link>
      </header>
      <div className="mx-auto max-w-2xl px-4 py-10">
        <div className="mb-8 flex gap-1">
          {steps.map((s, i) => (
            <div key={s} className="flex-1">
              <div className={`h-1.5 rounded-full ${i <= step ? "bg-teal" : "bg-line"}`} />
              <p className="mt-2 hidden text-[11px] text-slate sm:block">
                {String(i + 1).padStart(2, "0")} {s}
              </p>
            </div>
          ))}
        </div>

        {step === 0 && (
          <Block title="Organisation" onNext={next}>
            <Field label="Organisation name">
              <Input defaultValue={name} onBlur={(e) => setOrg({ ...org, name: e.target.value })} />
            </Field>
            <Field label="Logo">
              <div className="flex items-center gap-3">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-navy text-lg text-white">{org.logoText}</div>
                <Button type="button" variant="secondary" onClick={() => alert("Logo upload is simulated.")}>
                  Upload logo
                </Button>
              </div>
            </Field>
            <Field label="Address">
              <Textarea defaultValue={org.address} onBlur={(e) => setOrg({ ...org, address: e.target.value })} />
            </Field>
            <Field label="Phone">
              <Input defaultValue={org.phone} />
            </Field>
            <Field label="Email">
              <Input defaultValue={org.email} />
            </Field>
          </Block>
        )}
        {step === 1 && (
          <Block title="Business" onNext={next} onBack={back}>
            <Field label="Business type">
              <Select defaultValue={org.type} onChange={(e) => setOrg({ ...org, type: e.target.value as typeof org.type })}>
                {["Company", "SME", "Startup", "NGO", "Partnership", "Professional services"].map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </Select>
            </Field>
            <Field label="Industry">
              <Input defaultValue={org.industry} onBlur={(e) => setOrg({ ...org, industry: e.target.value })} />
            </Field>
            <Field label="Number of employees">
              <Select defaultValue={org.employees}>
                {["1–10", "11–24", "25–50", "51–200", "200+"].map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </Select>
            </Field>
          </Block>
        )}
        {step === 2 && (
          <Block title="Accounting" onNext={next} onBack={back}>
            <Field label="Currency">
              <Select defaultValue={org.currency}>
                {["GHS", "NGN", "KES", "ZAR", "USD", "GBP"].map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </Select>
            </Field>
            <Field label="Financial year">
              <Select defaultValue={org.financialYear}>
                <option>January – December</option>
                <option>April – March</option>
                <option>July – June</option>
              </Select>
            </Field>
            <Field label="Accounting method">
              <Select defaultValue={org.accountingMethod}>
                <option>Accrual</option>
                <option>Cash</option>
              </Select>
            </Field>
          </Block>
        )}
        {step === 3 && (
          <Block title="Tax" onNext={next} onBack={back}>
            <Field label="Tax registration status">
              <Select defaultValue={org.taxRegistered ? "Registered" : "Not registered"}>
                <option>Registered</option>
                <option>Not registered</option>
              </Select>
            </Field>
            <Field label="Tax ID">
              <Input defaultValue={org.taxId} />
            </Field>
            <Field label="Standard VAT rate (%)">
              <Input type="number" defaultValue={org.vatRate} />
            </Field>
          </Block>
        )}
        {step === 4 && (
          <Block title="Invite your team" onNext={next} onBack={back}>
            {["Accountant", "Finance Manager", "Employees"].map((role) => (
              <Field key={role} label={role}>
                <Input placeholder={`${role.toLowerCase()}@company.com`} />
              </Field>
            ))}
            <p className="text-xs text-slate">Invites are simulated — nobody will be emailed.</p>
          </Block>
        )}
        {step === 5 && (
          <div className="rounded-3xl border border-line bg-white p-10 text-center">
            <p className="display text-4xl text-navy">Your Bookly workspace is ready.</p>
            <p className="mt-3 text-slate">
              Welcome{user?.name ? `, ${user.name.split(" ")[0]}` : ""}. {name} is set up with mock books so you can
              explore the product immediately.
            </p>
            <Button
              className="mt-8"
              size="lg"
              onClick={() => {
                const picked = sessionStorage.getItem("bookly.plan");
                if (picked) setOrg({ ...org, plan: picked });
                completeOnboarding();
                nav("/app/dashboard");
              }}
            >
              Go to Dashboard
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function Block({
  title,
  children,
  onNext,
  onBack,
}: {
  title: string;
  children: ReactNode;
  onNext: () => void;
  onBack?: () => void;
}) {
  return (
    <form
      className="space-y-4 rounded-3xl border border-line bg-white p-6"
      onSubmit={(e) => {
        e.preventDefault();
        onNext();
      }}
    >
      <h1 className="text-2xl font-semibold text-navy">{title}</h1>
      {children}
      <div className="flex justify-between pt-2">
        {onBack ? (
          <Button type="button" variant="secondary" onClick={onBack}>
            Back
          </Button>
        ) : (
          <span />
        )}
        <Button type="submit">Continue</Button>
      </div>
    </form>
  );
}
