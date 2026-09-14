import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { adminUser, currentUser } from "../data/seed";
import type { SessionUser } from "../types";

const KEY = "bookly.session";

interface AuthState {
  user: SessionUser | null;
  loading: boolean;
  login: (email: string, password: string, remember: boolean) => Promise<string>;
  register: (payload: { name: string; email: string; orgName: string }) => Promise<void>;
  logout: () => void;
  completeOnboarding: () => void;
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      try {
        setUser(JSON.parse(raw) as SessionUser);
      } catch {
        localStorage.removeItem(KEY);
      }
    }
    const t = window.setTimeout(() => setLoading(false), 700);
    return () => window.clearTimeout(t);
  }, []);

  const persist = (next: SessionUser | null, remember = true) => {
    setUser(next);
    if (next && remember) localStorage.setItem(KEY, JSON.stringify(next));
    else localStorage.removeItem(KEY);
  };

  const value = useMemo<AuthState>(
    () => ({
      user,
      loading,
      async login(email, password, remember) {
        await new Promise((r) => setTimeout(r, 400));
        const e = email.trim().toLowerCase();
        if (!password) throw new Error("Enter your password.");
        if (e === adminUser.email) {
          persist(adminUser, remember);
          return "/admin";
        }
        persist({ ...currentUser, email: e || currentUser.email }, remember);
        return "/app/dashboard";
      },
      async register(payload) {
        await new Promise((r) => setTimeout(r, 500));
        persist({
          ...currentUser,
          name: payload.name,
          email: payload.email,
        });
        sessionStorage.setItem("bookly.orgName", payload.orgName);
        sessionStorage.setItem("bookly.onboarding", "1");
      },
      logout() {
        persist(null);
      },
      completeOnboarding() {
        sessionStorage.removeItem("bookly.onboarding");
      },
    }),
    [user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
