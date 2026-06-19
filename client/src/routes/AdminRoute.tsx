import { Navigate } from "react-router-dom";
import useAuthStore from "../store/store";

/**
 * Route guard that only allows Admin and Instructor roles.
 * Unauthenticated users → /login
 * Authenticated Students → / (homepage)
 */
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== "Admin" && user?.role !== "Instructor") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
