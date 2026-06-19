// src/routes/ProtectedRoute.tsx

import { Navigate } from "react-router-dom";
import useAuthStore from "../store/store";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
