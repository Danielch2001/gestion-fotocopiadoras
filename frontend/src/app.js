import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Reportes from "./components/Reportes";
import AdminPanel from "./components/AdminPanel";
import GestionFotocopiadoras from "./components/GestionFotocopiadoras";
import DashboardAdmin from "./components/DashboardAdmin";
import NotificacionesAdmin from "./components/NotificacionesAdmin"; // Nuevo componente
import ProtectedRoute from "./ProtectedRoute";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Rutas para usuarios normales */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute role="usuario">
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Rutas protegidas para Administradores */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminPanel />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/fotocopiadoras"
        element={
          <ProtectedRoute role="admin">
            <GestionFotocopiadoras />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute role="admin">
            <DashboardAdmin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/reportes"
        element={
          <ProtectedRoute role="admin">
            <Reportes />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/notificaciones"
        element={
          <ProtectedRoute role="admin">
            <NotificacionesAdmin />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
