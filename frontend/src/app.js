import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard"; // Mantiene el Dashboard de usuario
import Reportes from "./components/Reportes";
import AdminPanel from "./components/AdminPanel";
import GestionFotocopiadoras from "./components/GestionFotocopiadoras";
import DashboardAdmin from "./components/DashboardAdmin"; // Nuevo DashboardAdmin
import ProtectedRoute from "./ProtectedRoute";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute role="usuario">
            <Dashboard />
          </ProtectedRoute>
        }
      />
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
    </Routes>
  );
};

export default App;
