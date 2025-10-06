import { useAuth } from "../hooks/useAuth";

import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { hasAccess } = useAuth();

  if (hasAccess === null) return "Завантаження.....";

  return hasAccess ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
