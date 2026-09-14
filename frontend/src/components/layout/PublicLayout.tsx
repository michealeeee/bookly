import { useEffect, useState } from "react";
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

  useEffect(() => {
    setOpen(false);
  }, [loc.pathname]);

  return (
    <div className={home ? "min-h-dvh bg-navy text-white" : "min-h-dvh bg-paper text-ink"}>
      <header className="sticky top-0 z-40 border-b border-white/10 bg-navy/90 pt-[env(safe-area-inset-top)] backdrop-blur-xl">
        <div className="mx-auto flex h-14 items-center justify-between gap-3 px-4 sm:h-16 sm:px-6 lg:max-w-6xl">
          <Link to="/" className="min-w-0 shrink-0">
            <Logo inverted />
          </Link>
          <nav className="hidden min-w-0 items-center md:flex md:gap-3 lg:gap-6">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `whitespace-nowrap text-xs lg:text-sm ${isActive ? "text-white" : "text-white/70 hover:text-white"}`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
          <div className="hidden shrink-0 items-center gap-2 md:flex">
            <Link to="/login" className="px-2 text-xs text-white/80 hover:text-white lg:px-3 lg:text-sm">
              Log In
            </Link>
            <Link to="/register">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
          <button
            className="grid h-11 w-11 place-items-center rounded-xl text-white md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <div className="max-h-[calc(100dvh-3.5rem)] overflow-y-auto border-t border-white/10 bg-navy px-4 py-4 md:hidden">
            {links.map((l) => (
              <Link key={l.to} to={l.to} className="block py-3 text-base text-white/80">
                {l.label}
              </Link>
            ))}
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
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
      <footer className="border-t border-white/10 bg-navy pb-[env(safe-area-inset-bottom)] text-white/70">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:py-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo inverted />
            <p className="mt-3 text-sm">Smart bookkeeping for smarter businesses.</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Product</p>
            <Link to="/features" className="mt-2 block py-1 text-sm">
              Features
            </Link>
            <Link to="/pricing" className="mt-2 block py-1 text-sm">
              Pricing
            </Link>
            <Link to="/how-it-works" className="mt-2 block py-1 text-sm">
              How it works
            </Link>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Company</p>
            <Link to="/about" className="mt-2 block py-1 text-sm">
              About
            </Link>
            <Link to="/contact" className="mt-2 block py-1 text-sm">
              Contact
            </Link>
            <Link to="/resources" className="mt-2 block py-1 text-sm">
              Resources
            </Link>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Get started</p>
            <Link to="/register" className="mt-2 block py-1 text-sm">
              Create organisation
            </Link>
            <Link to="/login" className="mt-2 block py-1 text-sm">
              Log in
            </Link>
          </div>
        </div>
        <p className="border-t border-white/10 px-4 py-4 text-center text-xs text-white/40">
          © {new Date().getFullYear()} Bookly. Frontend demo — mock data only.
        </p>
      </footer>
    </div>
  );
}
