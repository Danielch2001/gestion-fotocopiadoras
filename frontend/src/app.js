import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import ProtectedRoute from './ProtectedRoute';

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        {/* Página principal */}
        <Route path="/" element={<Home />} />

        {/* Login */}
        <Route path="/login" element={<Login setUser={setUser} />} />

        {/* Registro */}
        <Route path="/register" element={<Register />} />

        {/* Dashboard para usuarios regulares */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute roles={['usuario']}>
              <h1>Bienvenido al Dashboard del Usuario</h1>
            </ProtectedRoute>
          }
        />

        {/* Página de administración */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={['admin']}>
              <h1>Panel de Administración</h1>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};
function handleLogout() {
  localStorage.removeItem('token'); // Eliminar token
  localStorage.removeItem('rol');  // Eliminar rol
  window.location.href = '/login'; // Redirigir al login
}


export default App;
