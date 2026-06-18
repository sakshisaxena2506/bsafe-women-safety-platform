import { Navigate, Outlet, useLocation } from "react-router-dom";
import Loader from "../common/Loader";
import { useAuth } from "../../context/AuthContext";
import { ROUTES } from "../../utils/constants";

export default function ProtectedRoute({ allowedRoles }) {
  const location = useLocation();
  const { isAuthenticated, isAuthLoading, role } = useAuth();

  if (isAuthLoading) {
    return (
      <div className="page-shell grid min-h-screen place-items-center p-4">
        <Loader label="Checking secure session" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.login} replace state={{ from: location }} />;
  }

  if (allowedRoles?.length && !allowedRoles.includes(role)) {
    return <Navigate to={ROUTES.dashboard} replace />;
  }

  return <Outlet />;
}
