import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const ProtectedRoute = ({ children, role }) => {
  const { user } = useContext(AuthContext);

  // Si no hay usuario autenticado o el rol no coincide
  if (!user || (role && user.rol !== role)) {
    return <Navigate to="/login" />;
  }

  return children; // Si está autenticado y tiene el rol correcto
};

export default ProtectedRoute;
