import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../AuthContext";
import FotocopiadorasTable from "./FotocopiadorasTable";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext); // Ahora obtenemos `user`
  const [opcionSeleccionada, setOpcionSeleccionada] = useState(null);
  const [fotocopiadoras, setFotocopiadoras] = useState([]);

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  useEffect(() => {
    if (opcionSeleccionada) {
      let endpoint = "";
      if (opcionSeleccionada === "reserva") {
        endpoint = "http://localhost:5000/api/fotocopiadoras/disponibles";
      } else if (opcionSeleccionada === "compra") {
        endpoint = "http://localhost:5000/api/fotocopiadoras/disponibles";
      } else if (opcionSeleccionada === "alquiler") {
        endpoint = "http://localhost:5000/api/fotocopiadoras/disponibles";
      }

      fetch(endpoint)
        .then((response) => response.json())
        .then((data) => setFotocopiadoras(data))
        .catch((error) => console.error("Error al obtener datos:", error));
    }
  }, [opcionSeleccionada]);

  if (!user) {
    return <h2>Cargando...</h2>;
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="logo">
          <div className="circle"></div>
          <h1>TecnoQuito</h1>
        </div>
        <nav className="menu">
          <ul>
            <li>
              <button onClick={() => setOpcionSeleccionada("reserva")}>
                Reserva
              </button>
            </li>
            <li>
              <button onClick={() => setOpcionSeleccionada("compra")}>
                Compra
              </button>
            </li>
            <li>
              <button onClick={() => setOpcionSeleccionada("alquiler")}>
                Alquiler
              </button>
            </li>
          </ul>
        </nav>
        <button className="logout-btn" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </header>
      <main className="dashboard-main">
        <h2>Bienvenido a TecnoQuito</h2>
        <p>Ofrecemos servicios de reserva, compra y alquiler de fotocopiadoras empresariales.</p>

        {opcionSeleccionada && (
          <FotocopiadorasTable
            fotocopiadoras={fotocopiadoras}
            tipo={opcionSeleccionada}
            idcliente={user.idusuario} // Pasamos el ID del usuario
          />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
