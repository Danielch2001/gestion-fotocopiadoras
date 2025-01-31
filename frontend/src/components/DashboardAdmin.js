import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  } from "chart.js";
  import { Bar, Line, Doughnut } from "react-chartjs-2";
import "../styles/DashboardAdmin.css";

// 🔹 Registrar escalas y elementos de Chart.js correctamente
ChartJS.register(
    CategoryScale,  // 📌 Permite usar el eje X en gráficos de barras y líneas
    LinearScale,    // 📌 Permite usar el eje Y en gráficos
    BarElement,     // 📌 Permite gráficos de barras
    LineElement,    // 📌 Permite gráficos de líneas
    PointElement,   // 📌 Permite gráficos de puntos en líneas
    ArcElement,     // 📌 Permite gráficos circulares (doughnut, pie)
    Title,
    Tooltip,
    Legend
  );
  
const DashboardAdmin = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [fechasUso, setFechasUso] = useState([]);
  const [horasUso, setHorasUso] = useState([]);
  const [fotocopiadorasUsadas, setFotocopiadorasUsadas] = useState([]);
  const [mejoresClientes, setMejoresClientes] = useState([]);
  const [mantenimiento, setMantenimiento] = useState([]);

  useEffect(() => {
    if (!user || user.rol !== "admin") {
      navigate("/login");
      return;
    }

    // Cargar datos desde la API
    const fetchData = async () => {
      try {
        const resFechas = await fetch("http://localhost:5000/api/dashboard/fechas-mayor-uso");
        const resHoras = await fetch("http://localhost:5000/api/dashboard/horas-mayor-uso");
        const resFotocopiadoras = await fetch("http://localhost:5000/api/dashboard/fotocopiadoras-mas-usadas");
        const resClientes = await fetch("http://localhost:5000/api/dashboard/mejores-clientes");
        const resMantenimiento = await fetch("http://localhost:5000/api/dashboard/fotocopiadoras-mantenimiento");

        setFechasUso(await resFechas.json());
        setHorasUso(await resHoras.json());
        setFotocopiadorasUsadas(await resFotocopiadoras.json());
        setMejoresClientes(await resClientes.json());
        setMantenimiento(await resMantenimiento.json());
      } catch (error) {
        console.error("Error al cargar datos del dashboard:", error);
      }
    };

    fetchData();
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="dashboard-admin">
      {/* 🔹 Barra superior de administración */}
      <header className="admin-header">
        <h1>TecnoQuito Admin</h1>
        <button className="logout-btn" onClick={handleLogout}>Cerrar Sesión</button>
      </header>

      <main className="admin-main">
        <h2>Panel de Administración</h2>

        {/* 🔹 Gráficos y métricas */}
        <div className="dashboard-grid">
          {/* 📊 Gráfico de Fechas de Mayor Uso */}
          <div className="dashboard-card">
            <h3>Fechas con Mayor Uso</h3>
            <Bar
              data={{
                labels: fechasUso.map(item => item.fecha),
                datasets: [{ label: "Usos", data: fechasUso.map(item => item.total_usos), backgroundColor: "#007bff" }]
              }}
            />
          </div>

          {/* ⏰ Horas con Mayor Uso */}
          <div className="dashboard-card">
            <h3>Horas con Mayor Uso</h3>
            <Line
              data={{
                labels: horasUso.map(item => `${item.hora}:00`),
                datasets: [{ label: "Usos", data: horasUso.map(item => item.total_usos), backgroundColor: "#e74c3c", borderColor: "#e74c3c" }]
              }}
            />
          </div>

          {/* 🖨 Fotocopiadoras Más Usadas */}
          <div className="dashboard-card">
            <h3>Fotocopiadoras Más Usadas</h3>
            <Doughnut
              data={{
                labels: fotocopiadorasUsadas.map(item => item.modelo),
                datasets: [{ data: fotocopiadorasUsadas.map(item => item.total_usos), backgroundColor: ["#f39c12", "#8e44ad", "#2ecc71"] }]
              }}
            />
          </div>

          {/* 🏅 Mejores Clientes */}
          <div className="dashboard-card">
            <h3>Mejores Clientes</h3>
            <ul>
              {mejoresClientes.map(cliente => (
                <li key={cliente.idcliente}>{cliente.nombre} - {cliente.total_reservas} reservas</li>
              ))}
            </ul>
          </div>

          {/* ⚠️ Fotocopiadoras en Mantenimiento */}
          <div className="dashboard-card">
            <h3>Fotocopiadoras en Mantenimiento</h3>
            <ul>
              {mantenimiento.map(item => (
                <li key={item.idfotocopiadora}>{item.modelo} - {item.contador_impresiones} impresiones</li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardAdmin;
