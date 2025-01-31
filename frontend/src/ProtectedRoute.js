import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

const ProtectedRoute = ({ role, children }) => {
  const { user } = useContext(AuthContext);

  console.log("Usuario actual:", user); // 🔍 Verifica si user existe
  console.log("Rol esperado:", role);
  
  if (!user) {
    console.log("Redirigiendo a login...");
    return <Navigate to="/login" />;
  }

  if (role && user.rol !== role) {
    console.log(`Acceso denegado. Esperado: ${role}, encontrado: ${user.rol}`);
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
