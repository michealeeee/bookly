import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Building2, CreditCard, LayoutDashboard, LogOut, Users } from "lucide-react";
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
  return (
    <div className="flex min-h-screen bg-paper">
      <aside className="hidden w-60 flex-col bg-navy p-4 text-white md:flex">
        <Logo inverted />
        <p className="mt-2 text-xs text-teal">SaaS Administration</p>
        <nav className="mt-8 space-y-1">
          {items.map((i) => (
            <NavLink
              key={i.to}
              to={i.to}
              end={i.end}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${isActive ? "bg-white/10" : "text-white/70 hover:bg-white/5"}`
              }
            >
              <i.icon className="h-4 w-4" />
              {i.label}
            </NavLink>
          ))}
        </nav>
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
      <div className="flex-1">
        <header className="flex h-14 items-center justify-between border-b border-line bg-white px-5">
          <p className="font-medium text-navy">Bookly Control</p>
          <p className="text-sm text-slate">{user?.email}</p>
        </header>
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
