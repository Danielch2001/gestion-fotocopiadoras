import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import '../styles/AdminPanel.css';

const AdminPanel = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        // Redirigir si el usuario no es administrador
        if (!user || user.rol !== 'admin') {
            navigate('/login');
        }
    }, [user, navigate]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="admin-panel">
            <header className="admin-header">
                <div className="logo">
                    <div className="circle"></div>
                    <h1>TecnoQuito Admin</h1>
                </div>
                <nav className="menu">
                    <ul>
                        <li><a href="/admin/dashboard">Dashboard</a></li>
                        <li><a href="/admin/fotocopiadoras">Gestión Fotocopiadoras</a></li>
                    </ul>
                </nav>
                <button className="logout-btn" onClick={handleLogout}>
                    Cerrar Sesión
                </button>
            </header>
            <main className="admin-main">
                <h2>Bienvenido Administrador</h2>
                <p>Desde aquí puedes gestionar las fotocopiadoras y visualizar estadísticas relevantes.</p>
            </main>
        </div>
    );
};

export default AdminPanel;
