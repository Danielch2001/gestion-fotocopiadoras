import React, { useEffect, useState } from "react";
import "../styles/NotificacionesAdmin.css";

const NotificacionesAdmin = () => {
  const [notificaciones, setNotificaciones] = useState([]);

  useEffect(() => {
    const fetchNotificaciones = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/notificaciones/");
        const data = await response.json();
        setNotificaciones(data);
      } catch (error) {
        console.error("Error al obtener notificaciones:", error);
      }
    };

    fetchNotificaciones();
  }, []);

  return (
    <div className="admin-panel">
      <h2>📢 Notificaciones de Mantenimiento</h2>
      <table className="notificaciones-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Mensaje</th>
            <th>Fecha</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {notificaciones.map((noti) => (
            <tr key={noti.id}>
              <td>{noti.id}</td>
              <td>{noti.mensaje}</td>
              <td>{new Date(noti.fecha).toLocaleString()}</td>
              <td>{noti.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NotificacionesAdmin;
