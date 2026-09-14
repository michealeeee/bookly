import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Building2, CreditCard, LayoutDashboard, LogOut, Menu, Users, X } from "lucide-react";
import { Logo } from "../brand/Logo";
import { useAuth } from "../../store/AuthContext";

const items = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/admin/organisations", label: "Organisations", icon: Building2 },
  { to: "/admin/subscriptions", label: "Subscriptions", icon: CreditCard },
  { to: "/admin/users", label: "Users", icon: Users },
];

export function AdminShell() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const [open, setOpen] = useState(false);

  const links = (
    <nav className="space-y-1">
      {items.map((i) => (
        <NavLink
          key={i.to}
          to={i.to}
          end={i.end}
          onClick={() => setOpen(false)}
          className={({ isActive }) =>
            `flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${isActive ? "bg-white/10" : "text-white/70 hover:bg-white/5"}`
          }
        >
          <i.icon className="h-4 w-4" />
          {i.label}
        </NavLink>
      ))}
    </nav>
  );

  return (
    <div className="flex min-h-dvh bg-paper">
      <aside className="sticky top-0 hidden h-dvh w-60 flex-col bg-navy p-4 text-white md:flex">
        <Logo inverted />
        <p className="mt-2 text-xs text-teal">SaaS Administration</p>
        <div className="mt-8 flex-1">{links}</div>
        <button
          className="mt-auto flex items-center gap-2 px-3 py-2 text-sm text-white/60"
          onClick={() => {
            logout();
            nav("/");
          }}
        >
          <LogOut className="h-4 w-4" /> Log out
        </button>
      </aside>
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-navy/40" onClick={() => setOpen(false)} />
          <aside className="relative flex h-full w-[min(18rem,88vw)] flex-col bg-navy p-4 text-white">
            <div className="mb-6 flex items-center justify-between">
              <Logo inverted />
              <button onClick={() => setOpen(false)} aria-label="Close">
                <X />
              </button>
            </div>
            {links}
          </aside>
        </div>
      )}
      <div className="min-w-0 flex-1">
        <header className="flex h-14 items-center justify-between gap-3 border-b border-line bg-white px-3 sm:px-5">
          <div className="flex items-center gap-2">
            <button className="grid h-11 w-11 place-items-center md:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </button>
            <p className="font-medium text-navy">Bookly Control</p>
          </div>
          <p className="truncate text-xs text-slate sm:text-sm">{user?.email}</p>
        </header>
        <main className="p-3 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
