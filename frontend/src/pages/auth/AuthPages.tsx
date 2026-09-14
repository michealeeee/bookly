import { useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { plans } from "../../data/pricing";
import { Button } from "../../components/ui/Button";
import { Field, Input } from "../../components/ui/Field";
import { useAuth } from "../../store/AuthContext";

export function LoginPage() {
  const { login } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();
  const [email, setEmail] = useState("michael@apextrade.com");
  const [password, setPassword] = useState("password");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-navy">Welcome back</h1>
      <p className="mt-1 text-sm text-slate">Log in to your Bookly organisation.</p>
      <form
        className="mt-6 space-y-4"
        onSubmit={async (e) => {
          e.preventDefault();
          setBusy(true);
          setError("");
          try {
            const to = await login(email, password, remember);
            const from = (loc.state as { from?: string } | null)?.from;
            nav(from && from.startsWith("/") ? from : to);
          } catch (err) {
            setError(err instanceof Error ? err.message : "Unable to log in");
          } finally {
            setBusy(false);
          }
        }}
      >
        <Field label="Email">
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </Field>
        <Field label="Password">
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </Field>
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-slate">
            <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
            Remember me
          </label>
          <Link to="/forgot-password" className="text-teal">
            Forgot password
          </Link>
        </div>
        {error && <p className="text-sm text-loss">{error}</p>}
        <Button className="w-full" disabled={busy}>
          {busy ? "Signing in…" : "Log in"}
        </Button>
      </form>
      <div className="mt-6 grid gap-2">
        <Button variant="secondary" type="button" onClick={() => alert("Social login is UI-only in this demo.")}>
          Continue with Google
        </Button>
        <Button variant="secondary" type="button" onClick={() => alert("Social login is UI-only in this demo.")}>
          Continue with Microsoft
        </Button>
      </div>
      <p className="mt-6 text-center text-sm text-slate">
        New to Bookly?{" "}
        <Link to="/#pricing" className="text-teal">
          Pick a plan
        </Link>
      </p>
      <p className="mt-4 text-center text-xs text-slate">
        Platform admin: admin@bookly.app · any password
      </p>
    </div>
  );
}

export function RegisterPage() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [params] = useSearchParams();
  const planId = params.get("plan") ?? "";
  const plan = plans.find((p) => p.id === planId);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    orgName: "",
    orgType: "Company",
    country: "Ghana",
    currency: "GHS",
  });
  const [busy, setBusy] = useState(false);
  const strength =
    form.password.length > 10 && /[A-Z]/.test(form.password) && /\d/.test(form.password)
      ? "Strong"
      : form.password.length >= 8
        ? "Medium"
        : form.password
          ? "Weak"
          : "";

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div>
      <h1 className="text-2xl font-semibold text-navy">Create your organisation</h1>
      {plan ? (
        <p className="mt-1 text-sm text-slate">
          {plan.name} · ${plan.monthly}/mo billed monthly ·{" "}
          <Link to="/#pricing" className="text-teal">
            Change plan
          </Link>
        </p>
      ) : (
        <p className="mt-1 text-sm text-slate">
          Start from a plan on the{" "}
          <Link to="/#pricing" className="text-teal">
            home page
          </Link>
          .
        </p>
      )}
      <form
        className="mt-6 space-y-4"
        onSubmit={async (e) => {
          e.preventDefault();
          if (form.password.length < 8) return;
          setBusy(true);
          await register({ name: form.name, email: form.email, orgName: form.orgName });
          if (plan) sessionStorage.setItem("bookly.plan", plan.name);
          nav("/onboarding");
        }}
      >
        <Field label="Full name">
          <Input value={form.name} onChange={(e) => set("name", e.target.value)} required />
        </Field>
        <Field label="Email">
          <Input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} required />
        </Field>
        <Field label="Password" hint={strength ? `Strength: ${strength}` : "At least 8 characters"}>
          <Input type="password" value={form.password} onChange={(e) => set("password", e.target.value)} required />
        </Field>
        <Field label="Organisation name">
          <Input value={form.orgName} onChange={(e) => set("orgName", e.target.value)} required />
        </Field>
        <Field label="Organisation type">
          <select
            className="w-full rounded-xl border border-line px-3.5 py-2.5 text-sm"
            value={form.orgType}
            onChange={(e) => set("orgType", e.target.value)}
          >
            {["Company", "SME", "Startup", "NGO", "Partnership", "Professional services"].map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Country">
            <select
              className="w-full rounded-xl border border-line px-3.5 py-2.5 text-sm"
              value={form.country}
              onChange={(e) => set("country", e.target.value)}
            >
              {["Ghana", "Nigeria", "Kenya", "South Africa", "United Kingdom", "United States"].map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </Field>
          <Field label="Currency">
            <select
              className="w-full rounded-xl border border-line px-3.5 py-2.5 text-sm"
              value={form.currency}
              onChange={(e) => set("currency", e.target.value)}
            >
              {["GHS", "NGN", "KES", "ZAR", "USD", "GBP", "EUR"].map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </Field>
        </div>
        <Button className="w-full" disabled={busy}>
          Continue to onboarding
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-slate">
        Already have an account?{" "}
        <Link to="/login" className="text-teal">
          Log in
        </Link>
      </p>
    </div>
  );
}

export function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  return (
    <div>
      <h1 className="text-2xl font-semibold text-navy">Reset password</h1>
      <p className="mt-1 text-sm text-slate">We’ll email a reset link. Simulated only.</p>
      {sent ? (
        <p className="mt-6 text-sm text-gain">Check your inbox — then open the reset page.</p>
      ) : (
        <form
          className="mt-6 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <Field label="Email">
            <Input type="email" required />
          </Field>
          <Button className="w-full">Send reset link</Button>
        </form>
      )}
      <Link to="/reset-password" className="mt-4 inline-block text-sm text-teal">
        Continue to reset (demo)
      </Link>
    </div>
  );
}

export function ResetPasswordPage() {
  const nav = useNavigate();
  return (
    <div>
      <h1 className="text-2xl font-semibold text-navy">Choose a new password</h1>
      <form
        className="mt-6 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          nav("/login");
        }}
      >
        <Field label="New password">
          <Input type="password" required minLength={8} />
        </Field>
        <Field label="Confirm password">
          <Input type="password" required minLength={8} />
        </Field>
        <Button className="w-full">Update password</Button>
      </form>
    </div>
  );
}

export function VerifyEmailPage() {
  const nav = useNavigate();
  return (
    <div className="text-center">
      <h1 className="text-2xl font-semibold text-navy">Verify your email</h1>
      <p className="mt-2 text-sm text-slate">We sent a 6-digit code. Use 123456 in this demo.</p>
      <form
        className="mt-6 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          nav("/onboarding");
        }}
      >
        <Input className="text-center tracking-[0.4em]" maxLength={6} defaultValue="123456" />
        <Button className="w-full">Verify</Button>
      </form>
    </div>
  );
}
