import React, { useState, useContext } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/Reportes.css";

const ReportesAdmin = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [reporteData, setReporteData] = useState(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const generarReporte = async () => {
    if (!fechaInicio || !fechaFin) {
      alert("⚠️ Debes seleccionar una fecha de inicio y una fecha de fin.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/reportes?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`
      );

      if (!response.ok) {
        throw new Error("Error al generar el reporte");
      }

      const data = await response.json();
      setReporteData(data);
    } catch (error) {
      console.error("🚨 Error al generar el reporte:", error);
      alert("No se pudo generar el reporte.");
    }
  };

  return (
    <div className="admin-panel">
      {/* 🔹 Encabezado de Administración */}
      <header className="admin-header">
        <h1>TecnoQuito Admin</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </header>

      {/* 🔹 Contenido principal */}
      <main className="admin-main">
        <h2>Generar Reportes</h2>

        <div className="reportes-filtros">
          <label>Fecha Inicio:</label>
          <input
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
          />

          <label>Fecha Fin:</label>
          <input
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
          />

          <button className="report-btn" onClick={generarReporte}>
            📊 Generar Reporte
          </button>
        </div>

        {/* 🔹 Mostrar datos del reporte si existen */}
        {reporteData && (
          <div className="reporte-resultados">
            <h3>Resultados del Reporte</h3>
            <table>
              <thead>
                <tr>
                  <th>ID Cliente</th>
                  <th>Cliente</th>
                  <th>Fotocopiadora</th>
                  <th>Fecha Inicio</th>
                  <th>Fecha Fin</th>
                  <th>Impresiones</th>
                </tr>
              </thead>
              <tbody>
                {reporteData.map((item) => (
                  <tr key={`${item.idcliente}-${item.fechainicio}`}>
                    <td>{item.idcliente}</td>
                    <td>{`${item.nombre} ${item.apellido || ""}`.trim()}</td>
                    <td>{item.fotocopiadora}</td>
                    <td>{new Date(item.fechainicio).toLocaleString()}</td>
                    <td>{new Date(item.fechafin).toLocaleString()}</td>
                    <td>{item.contador_impresiones}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default ReportesAdmin;
