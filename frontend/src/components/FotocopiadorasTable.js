import React, { useState } from "react";
import "../styles/FotocopiadorasTable.css";

const FotocopiadorasTable = ({ fotocopiadoras, tipo }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filtrar fotocopiadoras según el término de búsqueda
  const filteredFotocopiadoras = fotocopiadoras.filter((fotocopiadora) =>
    `${fotocopiadora.modelo} ${fotocopiadora.marca} ${fotocopiadora.ubicacion}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleAccion = (idfotocopiadora) => {
    let endpoint = "";
    let mensaje = "";

    if (tipo === "reserva") {
      endpoint = "http://localhost:5000/api/reservar";
      mensaje = "Reservada con éxito";
    } else if (tipo === "compra") {
      endpoint = "http://localhost:5000/api/comprar";
      mensaje = "Comprada con éxito";
    } else if (tipo === "alquiler") {
      endpoint = "http://localhost:5000/api/alquilar";
      mensaje = "Alquilada con éxito";
    }

    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idfotocopiadora }),
    })
      .then((response) => response.json())
      .then((data) => alert(mensaje))
      .catch((error) => console.error("Error:", error));
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
            <button onClick={() => handleAccion(fotocopiadora.idfotocopiadora)}>
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
