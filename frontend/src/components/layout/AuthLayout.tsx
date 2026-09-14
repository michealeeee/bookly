import { Link, Outlet } from "react-router-dom";
import { Logo } from "../brand/Logo";

export function AuthLayout() {
  return (
    <div className="grid min-h-dvh md:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-navy p-8 text-white md:flex md:flex-col lg:p-10">
        <Logo inverted />
        <div className="relative z-10 my-auto max-w-md">
          <p className="display text-4xl leading-tight">Books that stay as clear as your strategy.</p>
          <p className="mt-4 text-white/70">
            Invoices, expenses, banking and reports — organised for organisations that need to move quickly.
          </p>
        </div>
        <p className="text-sm text-white/40">Smart bookkeeping for smarter businesses.</p>
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" />
      </div>
      <div className="flex flex-col bg-paper px-4 py-8 sm:px-6">
        <div className="mb-8 md:hidden">
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <div className="mx-auto my-auto w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
