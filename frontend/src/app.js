import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AdminPanel from './components/AdminPanel';
import ProtectedRoute from './ProtectedRoute';
import Home from './components/Home'; // Importa el componente Home si ya lo tienes

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Redirige la raíz (/) al Home */}
                <Route path="/" element={<Navigate to="/home" />} />
                {/* Ruta del Home */}
                <Route path="/home" element={<Home />} />
                {/* Otras rutas */}
                <Route path="/register" element={<Register />}/>
                <Route path="/login" element={<Login />} />
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
            </Routes>
        </Router>
    );
};

export default App;
