import { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { Bell, LogOut, Menu, Search } from "lucide-react";
import { Logo } from "../brand/Logo";
import { useAuth } from "../../store/AuthContext";
import { useBook } from "../../store/BookContext";
import { initials } from "../../lib/format";
import { appNav, bottomNav } from "./nav";

export function AppShell() {
  const { user, logout } = useAuth();
  const { org } = useBook();
  const nav = useNavigate();
  const [drawer, setDrawer] = useState(false);

  const signOut = () => {
    logout();
    nav("/");
  };

  const NavBody = () => (
    <>
      <div className="px-4 py-4">
        <Logo inverted />
        <p className="mt-3 truncate text-xs text-white/50">{org.name}</p>
      </div>
      <div className="flex-1 overflow-y-auto px-3 pb-4">
        {appNav.map((g) => (
          <div key={g.title} className="mb-4">
            <p className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-wider text-white/35">{g.title}</p>
            {g.items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setDrawer(false)}
                className={({ isActive }) =>
                  `mb-0.5 flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[13px] ${
                    isActive ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {item.label}
              </NavLink>
            ))}
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 p-3">
        {bottomNav.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className="mb-1 flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[13px] text-white/70 hover:bg-white/5"
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </NavLink>
        ))}
        <div className="mt-2 flex items-center gap-2 rounded-xl bg-white/5 px-2 py-2">
          <div
            className="grid h-8 w-8 place-items-center rounded-full text-xs font-semibold text-navy"
            style={{ background: `hsl(${user?.avatarHue ?? 168} 70% 72%)` }}
          >
            {initials(user?.name ?? "U")}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium text-white">{user?.name}</p>
            <p className="truncate text-[11px] text-white/45">{user?.title}</p>
          </div>
          <button onClick={signOut} className="text-white/60 hover:text-white" aria-label="Log out">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen bg-paper">
      <aside className="hidden w-64 shrink-0 flex-col bg-navy text-white lg:flex">
        <NavBody />
      </aside>
      {drawer && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-navy/40" onClick={() => setDrawer(false)} />
          <aside className="relative flex h-full w-72 flex-col bg-navy">
            <NavBody />
          </aside>
        </div>
      )}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center gap-3 border-b border-line bg-white px-4">
          <button className="lg:hidden" onClick={() => setDrawer(true)} aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </button>
          <div className="relative hidden max-w-md flex-1 md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" />
            <input
              placeholder="Search invoices, customers, accounts…"
              className="h-10 w-full rounded-xl border border-line bg-paper pl-9 pr-3 text-sm outline-none focus:border-teal"
            />
          </div>
          <div className="ml-auto flex items-center gap-3">
            <button className="relative rounded-xl p-2 text-slate hover:bg-paper">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-loss" />
            </button>
            <Link to="/app/settings/organisation" className="text-sm font-medium text-navy">
              {org.logoText}
            </Link>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden p-4 pb-24 lg:p-6 lg:pb-6">
          <Outlet />
        </main>
        <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-4 border-t border-line bg-white lg:hidden">
          {[
            ["/app/dashboard", "Home"],
            ["/app/invoices", "Invoices"],
            ["/app/expenses", "Expenses"],
            ["/app/banking", "Bank"],
          ].map(([to, label]) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `py-3 text-center text-xs ${isActive ? "text-teal" : "text-slate"}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}
