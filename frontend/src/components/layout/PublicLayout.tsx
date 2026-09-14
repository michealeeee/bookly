import { useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Logo } from "../brand/Logo";
import { Button } from "../ui/Button";

const links = [
  { to: "/features", label: "Features" },
  { to: "/solutions", label: "Solutions" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/pricing", label: "Pricing" },
  { to: "/resources", label: "Resources" },
  { to: "/faq", label: "FAQ" },
];

export function PublicLayout() {
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  const home = loc.pathname === "/";

  return (
    <div className={home ? "min-h-screen bg-navy text-white" : "min-h-screen bg-paper text-ink"}>
      <header className="sticky top-0 z-40 border-b border-white/10 bg-navy/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link to="/" onClick={() => setOpen(false)}>
            <Logo inverted />
          </Link>
          <nav className="hidden items-center gap-7 lg:flex">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `text-sm ${isActive ? "text-white" : "text-white/70 hover:text-white"}`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
          <div className="hidden items-center gap-2 lg:flex">
            <Link to="/login" className="px-3 text-sm text-white/80 hover:text-white">
              Log In
            </Link>
            <Link to="/register">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
          <button className="lg:hidden text-white" onClick={() => setOpen((v) => !v)} aria-label="Menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <div className="border-t border-white/10 bg-navy px-4 py-4 lg:hidden">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="block py-2.5 text-white/80"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-3 flex gap-2">
              <Link to="/login" className="flex-1">
                <Button variant="outline" className="w-full">
                  Log In
                </Button>
              </Link>
              <Link to="/register" className="flex-1">
                <Button className="w-full">Get Started</Button>
              </Link>
            </div>
          </div>
        )}
      </header>
      <Outlet />
      <footer className="border-t border-white/10 bg-navy text-white/70">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-4">
          <div>
            <Logo inverted />
            <p className="mt-3 text-sm">Smart bookkeeping for smarter businesses.</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Product</p>
            <Link to="/features" className="mt-2 block text-sm">Features</Link>
            <Link to="/pricing" className="mt-2 block text-sm">Pricing</Link>
            <Link to="/how-it-works" className="mt-2 block text-sm">How it works</Link>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Company</p>
            <Link to="/about" className="mt-2 block text-sm">About</Link>
            <Link to="/contact" className="mt-2 block text-sm">Contact</Link>
            <Link to="/resources" className="mt-2 block text-sm">Resources</Link>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Get started</p>
            <Link to="/register" className="mt-2 block text-sm">Create organisation</Link>
            <Link to="/login" className="mt-2 block text-sm">Log in</Link>
          </div>
        </div>
        <p className="border-t border-white/10 py-4 text-center text-xs text-white/40">
          © {new Date().getFullYear()} Bookly. Frontend demo — mock data only.
        </p>
      </footer>
    </div>
  );
}
