import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = () => {
  const { authorized } = useAuth();

  if (authorized === null) return "Завантаження.....";

  return authorized ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
