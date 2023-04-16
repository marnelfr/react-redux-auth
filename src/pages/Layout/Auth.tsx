import { useAppSelector } from "../../app/hooks";
import { selectCurrentToken } from "../../features/auth/slices/authSlice";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AuthLayout = () => {
  const token = useAppSelector(selectCurrentToken);
  const location = useLocation();

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default AuthLayout;
