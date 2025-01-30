import axios from "axios";

const API_URL = "http://localhost:5000/api/operaciones"; // Ajusta para producción

export const realizarAccion = async (tipo, idfotocopiadora, idcliente) => {
  try {
    const url = `${API_URL}/${tipo}`;
    const body = {
      idcliente,
      idfotocopiadora,
      fecha_inicio: "2024-07-01T08:00:00",
      fecha_fin: "2024-07-01T18:00:00",
      precio_aproximado: 50.0,
    };

    await axios.post(url, body);
    alert(`${tipo} realizada con éxito`);
  } catch (error) {
    console.error(`Error al ${tipo}:`, error);
  }
};
