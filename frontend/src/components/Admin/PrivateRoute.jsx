import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const PrivateRoute = ({ children }) => {
  const { usuario, carregando } = useAuth();

  if (carregando) {
    return <div>Carregando...</div>;
  }

  if (!usuario) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default PrivateRoute;
