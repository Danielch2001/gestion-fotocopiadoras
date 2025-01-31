import React, { useState, useContext } from "react";
import { AuthContext } from "../AuthContext";
import "../styles/FotocopiadorasTable.css";

const FotocopiadorasTable = ({ fotocopiadoras, tipo }) => {
  const { user } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDates, setSelectedDates] = useState({});

  // Función para manejar los cambios en las fechas
  const handleDateChange = (id, field, value) => {
    setSelectedDates((prevDates) => ({
      ...prevDates,
      [id]: { ...prevDates[id], [field]: value },
    }));

    console.log(`📅 Fecha ${field} cambiada para ID ${id}:`, value);
  };

  // Filtrar fotocopiadoras por búsqueda
  const filteredFotocopiadoras = fotocopiadoras.filter((fotocopiadora) =>
    `${fotocopiadora.modelo} ${fotocopiadora.marca} ${fotocopiadora.ubicacion}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleAccion = async (idfotocopiadora) => {
    if (!user || !user.id) {
      alert("Error: No se ha identificado el usuario.");
      return;
    }

    let { fechainicio, fechafin } = selectedDates[idfotocopiadora] || {};

    // **Formato correcto de fecha y evitar undefined**
    fechainicio = fechainicio ? new Date(fechainicio).toISOString().split("T")[0] : null;
    fechafin = fechafin ? new Date(fechafin).toISOString().split("T")[0] : null;

    console.log("📤 Enviando datos al backend:", { idcliente: user.id, idfotocopiadora, fechainicio, fechafin });

    // 🔴 Validaciones especiales SOLO para alquiler
    if (tipo === "alquiler") {
      if (!fechainicio || !fechafin) {
        alert("⚠️ Debes seleccionar ambas fechas para alquilar.");
        return;
      }
      if (new Date(fechainicio) > new Date(fechafin)) {
        alert("⚠️ La fecha de inicio no puede ser mayor a la fecha de fin.");
        return;
      }
    }

    let endpoint = "";
    let mensaje = "";
    let bodyData = {
      idcliente: user.id,
      idfotocopiadora,
      fechainicio,
      fechafin,
    };

    if (tipo === "reserva") {
      endpoint = "http://localhost:5000/api/operaciones/reservar";
      mensaje = "Reservada con éxito";
    } else if (tipo === "compra") {
      endpoint = "http://localhost:5000/api/operaciones/comprar";
      mensaje = "Gracias por comprar con nosotros. Nos contactaremos con usted para finalizar el proceso.";
    } else if (tipo === "alquiler") {
      endpoint = "http://localhost:5000/api/operaciones/alquilar";
      mensaje = "Gracias por alquilar con nosotros. Nos contactaremos con usted para finalizar el proceso.";
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      });

      const data = await response.json();

      if (response.ok) {
        if (tipo === "compra") {
          alert(`${mensaje}\nPrecio total: $${data.precio || "No disponible"}`);
        } else if (tipo === "alquiler") {
          alert(`${mensaje}\nPrecio total del alquiler: $${data.precio_total || "No disponible"}`);
        } else {
          alert(`${mensaje}\nPrecio aproximado: $${data.precio_aproximado || "No disponible"}`);
        }
      } else {
        alert(`❌ Error: ${data.message}`);
      }
    } catch (error) {
      console.error("🚨 Error en la solicitud:", error);
    }
  };

  return (
    <div className="table-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar fotocopiadora..."
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>Modelo</th>
            <th>Marca</th>
            <th>Ubicación</th>
            <th>Fecha Inicio</th>
            {tipo === "alquiler" && <th>Fecha Fin</th>}
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {filteredFotocopiadoras.map((fotocopiadora) => (
            <tr key={fotocopiadora.idfotocopiadora}>
              <td>{fotocopiadora.modelo}</td>
              <td>{fotocopiadora.marca}</td>
              <td>{fotocopiadora.ubicacion}</td>
              <td>
                <input
                  type="date"
                  value={selectedDates[fotocopiadora.idfotocopiadora]?.fechainicio || ""}
                  onChange={(e) => handleDateChange(fotocopiadora.idfotocopiadora, "fechainicio", e.target.value)}
                />
              </td>
              {tipo === "alquiler" && (
                <td>
                  <input
                    type="date"
                    value={selectedDates[fotocopiadora.idfotocopiadora]?.fechafin || ""}
                    onChange={(e) => handleDateChange(fotocopiadora.idfotocopiadora, "fechafin", e.target.value)}
                  />
                </td>
              )}
              <td>
                <button
                  onClick={() => handleAccion(fotocopiadora.idfotocopiadora)}
                  disabled={tipo === "alquiler" && (!selectedDates[fotocopiadora.idfotocopiadora]?.fechainicio || !selectedDates[fotocopiadora.idfotocopiadora]?.fechafin)}
                >
                  {tipo === "reserva" ? "Reservar" : tipo === "compra" ? "Comprar" : "Alquilar"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FotocopiadorasTable;
