import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const HomeLayout = () => {
  const { signed } = useAuth();

  if (signed) {
    return <Navigate to="/dashboard/procedures" />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};
