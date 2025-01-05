import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, roles }) => {
  const token = localStorage.getItem('token');
  const rol = localStorage.getItem('rol');

  // Verificar si el usuario está autenticado y tiene el rol requerido
  if (!token || (roles && !roles.includes(rol))) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
