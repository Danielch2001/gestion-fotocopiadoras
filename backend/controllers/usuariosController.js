const pool = require('../config/db');

// Obtener todos los usuarios
const getUsuarios = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Usuarios');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

module.exports = { getUsuarios };
