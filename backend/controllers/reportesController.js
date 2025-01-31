const pool = require("../config/db");

// 📌 Generar un informe basado en un rango de fechas
const generarReporte = async (req, res) => {
  const { fechaInicio, fechaFin } = req.query;

  if (!fechaInicio || !fechaFin) {
    return res.status(400).json({ message: "Debe proporcionar una fecha de inicio y fin." });
  }

  try {
    const result = await pool.query(`
      SELECT 
        c.idcliente, 
        c.nombre, 
        c.apellido, 
        f.modelo AS fotocopiadora, 
        r.fechainicio, 
        r.fechafin, 
        f.contador_impresiones 
      FROM reservas r
      JOIN clientes c ON r.idcliente = c.idcliente
      JOIN fotocopiadora f ON r.idfotocopiadora = f.idfotocopiadora
      WHERE r.fechainicio >= $1 AND r.fechafin <= $2
      ORDER BY r.fechainicio ASC;
    `, [fechaInicio, fechaFin]);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("🚨 Error al generar el informe:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = { generarReporte };
