import React, { useContext } from 'react';
import { AuthContext } from '../AuthContext';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Bienvenido al panel de usuario, {user?.nombre}.</p>
      <button onClick={logout}>Cerrar Sesión</button>
    </div>
  );
};

export default Dashboard;
