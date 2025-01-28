const pool = require('../config/db');

// 1️⃣ Obtener las fechas con mayor uso de fotocopiadoras
const getFechasMayorUso = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT f.fecha, COUNT(*) as total_usos
      FROM historal_uso h
      JOIN fechas f ON h.idfecha = f.idfecha
      GROUP BY f.fecha
      ORDER BY total_usos DESC
      LIMIT 5
    `);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error al obtener fechas con mayor uso:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// 2️⃣ Obtener las horas con mayor uso de fotocopiadoras
const getHorasMayorUso = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        EXTRACT(HOUR FROM fecha_inicio) as hora, 
        COUNT(*) as total_usos
      FROM historal_uso
      GROUP BY hora
      ORDER BY total_usos DESC
      LIMIT 5
    `);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error al obtener horas con mayor uso:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// 3️⃣ Obtener las fotocopiadoras más utilizadas
const getFotocopiadorasMasUsadas = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT f.modelo, f.marca, COUNT(*) as total_usos
      FROM historal_uso h
      JOIN fotocopiadora f ON h.idfotocopiadora = f.idfotocopiadora
      GROUP BY f.modelo, f.marca
      ORDER BY total_usos DESC
      LIMIT 5
    `);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error al obtener fotocopiadoras más usadas:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

module.exports = {
  getFechasMayorUso,
  getHorasMayorUso,
  getFotocopiadorasMasUsadas
};
