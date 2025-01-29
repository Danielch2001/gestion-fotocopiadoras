const pool = require('../config/db');


const getFechasMayorUso = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT f.fecha, COUNT(*) as total_usos
      FROM historial_uso h
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
      EXTRACT(HOUR FROM h.fecha_inicio) AS hora, 
      f.modelo AS nombre_impresora,
      COUNT(*) AS total_usos
    FROM historial_uso h
    JOIN fotocopiadora f ON h.idfotocopiadora = f.idfotocopiadora
    GROUP BY hora, f.modelo
    ORDER BY total_usos DESC
    LIMIT 5;
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
      FROM historial_uso h
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

// 4️⃣ Obtener los clientes con más reservas y alquileres
const getMejoresClientes = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
          c.idcliente,
          c.nombre,
          COUNT(r.idreserva) AS total_reservas,
          COUNT(h.iduso) AS total_alquileres
      FROM clientes c
      LEFT JOIN reservas r ON c.idcliente = r.idcliente
      LEFT JOIN historial_uso h ON c.idcliente = h.idcliente
      GROUP BY c.idcliente, c.nombre
      ORDER BY total_reservas DESC, total_alquileres DESC
      LIMIT 10;
    `);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error al obtener mejores clientes:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// 5️⃣ Obtener fotocopiadoras que requieren mantenimiento
const getFotocopiadorasMantenimiento = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
          f.idfotocopiadora,
          f.modelo,
          f.marca,
          d.contador_impresiones,
          d.toner_actual,
          d.ultima_actualizacion
      FROM fotocopiadora f
      JOIN datos_impresoras d ON f.idfotocopiadora = d.idfotocopiadora
      WHERE d.contador_impresiones > 50000 OR d.toner_actual < 20;
    `);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error al obtener fotocopiadoras para mantenimiento:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

module.exports = {
  getFechasMayorUso,
  getHorasMayorUso,
  getFotocopiadorasMasUsadas,
  getMejoresClientes,
  getFotocopiadorasMantenimiento
};
