import { useAuth } from "../hooks/useAuth";
import { Outlet, useLocation, Navigate } from "react-router";

function ProtectedRoutes() {
  const authState = useAuth();
  const location = useLocation();

  if (authState?.loading) return <div>Loading...</div>;

  // if (!authState?.isAuthenticated) return <Navigate to="/login" state={{ from: location }} replace />;

  return <Outlet />;
}

export default ProtectedRoutes;