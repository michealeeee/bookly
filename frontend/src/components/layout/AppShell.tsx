import { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { Bell, FileText, Landmark, LayoutDashboard, LogOut, Menu, Search, Wallet, X } from "lucide-react";
import { Logo } from "../brand/Logo";
import { useAuth } from "../../store/AuthContext";
import { useBook } from "../../store/BookContext";
import { initials } from "../../lib/format";
import { bottomNav, primaryNav } from "./nav";

const mobileTabs = [
  { to: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/app/invoices", label: "Invoices", icon: FileText },
  { to: "/app/expenses", label: "Expenses", icon: Wallet },
  { to: "/app/banking", label: "Bank", icon: Landmark },
];

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
      <div className="flex items-start justify-between px-4 py-4">
        <div className="min-w-0">
          <Link to="/app/dashboard" onClick={() => setDrawer(false)}>
            <Logo inverted />
          </Link>
          <p className="mt-3 truncate text-xs text-white/50">{org.name}</p>
        </div>
        <button className="rounded-lg p-2 text-white/70 md:hidden" onClick={() => setDrawer(false)} aria-label="Close menu">
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-4">
        {primaryNav.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/app/dashboard"}
            onClick={() => setDrawer(false)}
            className={({ isActive }) =>
              `mb-0.5 flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm ${
                isActive ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            <item.icon className="h-4 w-4 shrink-0 opacity-80" />
            {item.label}
          </NavLink>
        ))}
      </div>
      <div className="border-t border-white/10 p-3">
        {bottomNav.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={() => setDrawer(false)}
            className="mb-1 flex min-h-10 items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[13px] text-white/70 hover:bg-white/5"
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </NavLink>
        ))}
        <Link
          to="/"
          onClick={() => setDrawer(false)}
          className="mb-2 flex min-h-10 items-center rounded-lg px-2.5 py-1.5 text-[13px] text-white/50 hover:text-white/80"
        >
          Landing page
        </Link>
        <div className="mt-2 flex items-center gap-2 rounded-xl bg-white/5 px-2 py-2">
          <div
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-semibold text-navy"
            style={{ background: `hsl(${user?.avatarHue ?? 168} 70% 72%)` }}
          >
            {initials(user?.name ?? "U")}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium text-white">{user?.name}</p>
            <p className="truncate text-[11px] text-white/45">{user?.title}</p>
          </div>
          <button onClick={signOut} className="p-2 text-white/60 hover:text-white" aria-label="Log out">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div className="flex min-h-dvh bg-paper">
      <aside className="sticky top-0 hidden h-dvh w-56 shrink-0 flex-col overflow-hidden bg-navy text-white md:flex lg:w-64">
        <NavBody />
      </aside>
      {drawer && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-navy/40" onClick={() => setDrawer(false)} />
          <aside className="relative flex h-full w-[min(20rem,88vw)] flex-col bg-navy pt-[env(safe-area-inset-top)]">
            <NavBody />
          </aside>
        </div>
      )}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-14 items-center gap-2 border-b border-line bg-white px-3 pt-[env(safe-area-inset-top)] sm:h-16 sm:gap-3 sm:px-4">
          <button
            className="grid h-11 w-11 shrink-0 place-items-center rounded-xl md:hidden"
            onClick={() => setDrawer(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" />
            <input
              placeholder="Search…"
              className="h-10 w-full rounded-xl border border-line bg-paper pl-9 pr-3 text-sm outline-none focus:border-teal"
            />
          </div>
          <div className="flex shrink-0 items-center gap-1 sm:gap-3">
            <button className="relative rounded-xl p-2 text-slate hover:bg-paper" aria-label="Notifications">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-loss" />
            </button>
            <Link to="/app/settings/organisation" className="hidden text-sm font-medium text-navy sm:inline">
              {org.logoText}
            </Link>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden p-3 pb-24 sm:p-4 md:p-6 md:pb-6">
          <Outlet />
        </main>
        <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-4 border-t border-line bg-white pb-[env(safe-area-inset-bottom)] md:hidden">
          {mobileTabs.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              className={({ isActive }) =>
                `flex min-h-14 flex-col items-center justify-center gap-0.5 text-[11px] ${isActive ? "text-teal" : "text-slate"}`
              }
            >
              <tab.icon className="h-5 w-5" />
              {tab.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}
