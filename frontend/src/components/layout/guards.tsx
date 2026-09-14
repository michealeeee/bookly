import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../store/AuthContext";
import { LoadingScreen } from "../brand/LoadingScreen";

export function RequireAuth({ admin }: { admin?: boolean }) {
  const { user, loading } = useAuth();
  const loc = useLocation();
  if (loading) return <LoadingScreen />;
  if (!user) return <Navigate to="/login" replace state={{ from: loc.pathname }} />;
  if (admin && user.role !== "platform_admin") return <Navigate to="/app/dashboard" replace />;
  if (!admin && user.role === "platform_admin" && loc.pathname.startsWith("/app")) {
    return <Navigate to="/admin" replace />;
  }
  return <Outlet />;
}
