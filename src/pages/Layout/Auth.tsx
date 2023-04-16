import { useAppSelector } from "../../app/hooks";
import { selectToken } from "../../features/auth/slices/authSlice";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AuthLayout = () => {
  const location = useLocation();
  const token = useAppSelector(selectToken);

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default AuthLayout;
