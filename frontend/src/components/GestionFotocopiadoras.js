import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/GestionFotocopiadoras.css";

const GestionFotocopiadoras = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [fotocopiadoras, setFotocopiadoras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Estado para el modal de agregar fotocopiadora
  const [showModal, setShowModal] = useState(false);
  const [newFotocopiadora, setNewFotocopiadora] = useState({
    modelo: "",
    marca: "",
    estado: "disponible",
    precio: "",
    descripcion: "",
    ubicacion: "",
    fecha_adquisicion: "",
    contador_impresiones: "",
  });

  useEffect(() => {
    if (!user || user.rol !== "admin") {
      navigate("/login");
      return;
    }

    const fetchFotocopiadoras = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/fotocopiadoras", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }

        const data = await response.json();
        setFotocopiadoras(data);
      } catch (error) {
        console.error("🚨 Error al obtener fotocopiadoras:", error);
        setError("No se pudieron cargar los datos.");
      } finally {
        setLoading(false);
      }
    };

    fetchFotocopiadoras();
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleAgregar = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewFotocopiadora({
      modelo: "",
      marca: "",
      estado: "disponible",
      precio: "",
      descripcion: "",
      ubicacion: "",
      fecha_adquisicion: "",
      contador_impresiones: "",
    });
  };

  const handleChange = (e) => {
    setNewFotocopiadora({ ...newFotocopiadora, [e.target.name]: e.target.value });
  };

  const handleGuardar = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/fotocopiadoras/agregarFotocopiadora", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(newFotocopiadora),
      });

      if (!response.ok) {
        throw new Error("Error al agregar la fotocopiadora");
      }

      const data = await response.json();
      alert(data.message);
      setFotocopiadoras([...fotocopiadoras, data.data]); // Actualizar la lista
      handleCloseModal();
    } catch (error) {
      console.error("🚨 Error al agregar fotocopiadora:", error);
      alert("No se pudo agregar la fotocopiadora.");
    }
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
            <li><a href="/admin">Dashboard</a></li>
            <li><a href="/admin/fotocopiadoras">Gestión Fotocopiadoras</a></li>
          </ul>
        </nav>
        <button className="logout-btn" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </header>

      <main className="admin-main">
        <h2>Gestión de Fotocopiadoras</h2>

        <div className="actions">
          <input
            type="text"
            placeholder="Buscar fotocopiadora..."
            className="search-bar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="add-btn" onClick={handleAgregar}>
            ➕ Agregar
          </button>
        </div>

        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <h3>Agregar Fotocopiadora</h3>
              <input type="text" name="modelo" placeholder="Modelo" value={newFotocopiadora.modelo} onChange={handleChange} />
              <input type="text" name="marca" placeholder="Marca" value={newFotocopiadora.marca} onChange={handleChange} />
              <input type="text" name="ubicacion" placeholder="Ubicación" value={newFotocopiadora.ubicacion} onChange={handleChange} />
              <input type="text" name="precio" placeholder="Precio" value={newFotocopiadora.precio} onChange={handleChange} />
              <textarea name="descripcion" placeholder="Descripción" value={newFotocopiadora.descripcion} onChange={handleChange}></textarea>
              <input type="date" name="fecha_adquisicion" value={newFotocopiadora.fecha_adquisicion} onChange={handleChange} />
              <input type="number" name="contador_impresiones" placeholder="Contador de impresiones" value={newFotocopiadora.contador_impresiones} onChange={handleChange} />
              <button className="save-btn" onClick={handleGuardar}>Guardar</button>
              <button className="cancel-btn" onClick={handleCloseModal}>Cancelar</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default GestionFotocopiadoras;
