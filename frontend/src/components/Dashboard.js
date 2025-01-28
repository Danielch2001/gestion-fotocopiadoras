import React, { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import '../styles/Dashboard.css';

const Dashboard = () => {
    const { logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
        window.location.href = '/login';
    };

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <div className="logo">
                    <div className="circle"></div>
                    <h1>TecnoQuito</h1>
                </div>
                <nav className="menu">
                    <ul>
                        <li><a href="/reserva">Reserva</a></li>
                        <li><a href="/compra">Compra</a></li>
                        <li><a href="/alquiler">Alquiler</a></li>
                    </ul>
                </nav>
                <button className="logout-btn" onClick={handleLogout}>Cerrar Sesión</button>
            </header>
            <main className="dashboard-main">
                <h2>Bienvenido a TecnoQuito</h2>
                <p>Ofrecemos servicios de reserva, compra y alquiler de fotocopiadoras empresariales.</p>
            </main>
        </div>
    );
};

export default Dashboard;
