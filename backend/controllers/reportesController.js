const pool = require("../config/db");

// 📌 Generar un informe detallado con fechas de inicio y fin
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

// 📌 Generar informe con la impresora más usada y sus veces de uso
const reportesReto = async (req, res) => {
  const { fechaInicio, fechaFin } = req.query;

  if (!fechaInicio || !fechaFin) {
    return res.status(400).json({ message: "Debe proporcionar una fecha de inicio y fin." });
  }

  try {
    // Consulta de cantidad de usos por cliente e impresora
    const result = await pool.query(`
      SELECT 
        c.nombre AS cliente, 
        f.modelo AS fotocopiadora, 
        COUNT(h.idfotocopiadora) AS veces_usada
      FROM historial_uso h
      JOIN clientes c ON h.idcliente = c.idcliente
      JOIN fotocopiadora f ON h.idfotocopiadora = f.idfotocopiadora
      WHERE h.fecha_inicio >= $1 AND h.fecha_fin <= $2
      GROUP BY c.nombre, f.modelo
      ORDER BY veces_usada DESC;
    `, [fechaInicio, fechaFin]);

    // Consulta para obtener la impresora más usada
    const masUsada = await pool.query(`
      SELECT f.modelo AS fotocopiadora_mas_usada, COUNT(h.idfotocopiadora) AS cantidad_usada
      FROM historial_uso h
      JOIN fotocopiadora f ON h.idfotocopiadora = f.idfotocopiadora
      WHERE h.fecha_inicio >= $1 AND h.fecha_fin <= $2
      GROUP BY f.modelo
      ORDER BY cantidad_usada DESC
      LIMIT 1;
    `, [fechaInicio, fechaFin]);

    res.status(200).json({
      reportes: result.rows,
      fotocopiadora_mas_usada: masUsada.rows.length > 0 ? masUsada.rows[0] : null
    });
  } catch (error) {
    console.error("🚨 Error al generar el informe de reportesReto:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = { generarReporte, reportesReto };
