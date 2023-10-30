import { ComponentType, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

interface PrivateProps {
  component: ComponentType;
}

export const PrivateRoute: React.FC<PrivateProps> = ({ component: Component }) => {
  const { signed } = useContext(AuthContext);

  return signed ? <Component /> : <Navigate to="/" />;
};
