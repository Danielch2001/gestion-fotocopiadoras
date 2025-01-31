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

    // Estado para el formulario de agregar/modificar
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedFotocopiadora, setSelectedFotocopiadora] = useState(null);

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
        setEditMode(false);
        setSelectedFotocopiadora({
            modelo: "",
            marca: "",
            estado: "disponible",
            precio: "",
            descripcion: "",
            ubicacion: "",
            fecha_adquisicion: "",
            contador_impresiones: "",
        });
        setShowModal(true);
    };

    const handleEditar = (fotocopiadora) => {
        setEditMode(true);
        setSelectedFotocopiadora(fotocopiadora);
        setShowModal(true);
    };

    const handleEliminar = async (id) => {
        if (!window.confirm("¿Estás seguro de que quieres eliminar esta fotocopiadora?")) return;

        try {
            const response = await fetch(`http://localhost:5000/api/fotocopiadoras/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Error al eliminar la fotocopiadora");
            }

            setFotocopiadoras(fotocopiadoras.filter((f) => f.idfotocopiadora !== id));
            alert("Fotocopiadora eliminada con éxito");
        } catch (error) {
            console.error("🚨 Error al eliminar fotocopiadora:", error);
            alert("No se pudo eliminar la fotocopiadora.");
        }
    };

    const handleChange = (e) => {
        setSelectedFotocopiadora({ ...selectedFotocopiadora, [e.target.name]: e.target.value });
    };

    const handleGuardar = async () => {
        const url = editMode
            ? `http://localhost:5000/api/fotocopiadoras/${selectedFotocopiadora.idfotocopiadora}`
            : "http://localhost:5000/api/fotocopiadoras";

        const method = editMode ? "PUT" : "POST";

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify(selectedFotocopiadora),
            });

            if (!response.ok) {
                throw new Error(`Error al ${editMode ? "modificar" : "agregar"} la fotocopiadora`);
            }

            const data = await response.json();
            alert(data.message);

            setFotocopiadoras((prev) =>
                editMode
                    ? prev.map((f) => (f.idfotocopiadora === selectedFotocopiadora.idfotocopiadora ? data.data : f))
                    : [...prev, data.data]
            );

            setShowModal(false);
        } catch (error) {
            console.error(`🚨 Error al ${editMode ? "modificar" : "agregar"} fotocopiadora:`, error);
            alert(`No se pudo ${editMode ? "modificar" : "agregar"} la fotocopiadora.`);
        }
    };

    return (
        <div className="admin-panel">
            <header className="admin-header">
                <h1>
                    <a href="/admin" className="admin-home-link">TecnoQuito Admin</a>
                </h1>
                <button className="logout-btn" onClick={handleLogout}>Cerrar Sesión</button>
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
                    <button className="add-btn" onClick={handleAgregar}>➕ Agregar</button>
                </div>

                <table className="fotocopiadoras-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Modelo</th>
                            <th>Marca</th>
                            <th>Ubicación</th>
                            <th>Estado</th>
                            <th>Precio</th>
                            <th>Fecha Adquisición</th>
                            <th>Contador Impresiones</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fotocopiadoras
                            .slice() // Creamos una copia para no mutar el estado original
                            .sort((a, b) => a.idfotocopiadora - b.idfotocopiadora) // Ordenamos por ID ascendente
                            .map((fotocopiadora) => (
                                <tr key={fotocopiadora.idfotocopiadora}>
                                    <td>{fotocopiadora.idfotocopiadora}</td>
                                    <td>{fotocopiadora.modelo}</td>
                                    <td>{fotocopiadora.marca}</td>
                                    <td>{fotocopiadora.ubicacion}</td>
                                    <td>{fotocopiadora.estado}</td>
                                    <td>${fotocopiadora.precio}</td>
                                    <td>{new Date(fotocopiadora.fecha_adquisicion).toLocaleDateString()}</td>
                                    <td>{fotocopiadora.contador_impresiones}</td>
                                    <td>
                                        <button className="edit-btn" onClick={() => handleEditar(fotocopiadora)}>✏️</button>
                                        <button className="delete-btn" onClick={() => handleEliminar(fotocopiadora.idfotocopiadora)}>🗑️</button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>

                {showModal && (
                    <div className="modal">
                        <div className="modal-content">
                            <h3>{editMode ? "Editar" : "Agregar"} Fotocopiadora</h3>
                            <input type="text" name="modelo" placeholder="Modelo" value={selectedFotocopiadora.modelo} onChange={handleChange} />
                            <input type="text" name="marca" placeholder="Marca" value={selectedFotocopiadora.marca} onChange={handleChange} />
                            <input type="text" name="ubicacion" placeholder="Ubicación" value={selectedFotocopiadora.ubicacion} onChange={handleChange} />
                            <input type="number" name="precio" placeholder="Precio" value={selectedFotocopiadora.precio} onChange={handleChange} />
                            <textarea name="descripcion" placeholder="Descripción" value={selectedFotocopiadora.descripcion} onChange={handleChange}></textarea>
                            <input type="date" name="fecha_adquisicion" value={selectedFotocopiadora.fecha_adquisicion} onChange={handleChange} />
                            <input type="number" name="contador_impresiones" placeholder="Contador de impresiones" value={selectedFotocopiadora.contador_impresiones} onChange={handleChange} />
                            <button className="save-btn" onClick={handleGuardar}>{editMode ? "Modificar" : "Guardar"}</button>
                            <button className="cancel-btn" onClick={() => setShowModal(false)}>Cancelar</button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default GestionFotocopiadoras;
