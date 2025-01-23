const pool = require('../config/db'); // Conexión a la base de datos

// Obtener todas las fotocopiadoras
const getAllFotocopiadoras = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM fotocopiadora');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las fotocopiadoras', error });
  }
};

// Agregar una nueva fotocopiadora
const addFotocopiadora = async (req, res) => {
  const { modelo, marca, estado, precio, descripcion, ubicacion } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO fotocopiadora (modelo, marca, estado, precio, descripcion, ubicacion) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [modelo, marca, estado, precio, descripcion, ubicacion]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar la fotocopiadora', error });
  }
};

// Actualizar una fotocopiadora
const updateFotocopiadora = async (req, res) => {
  const { id } = req.params;
  const { modelo, marca, estado, precio, descripcion, ubicacion } = req.body;
  try {
    const result = await pool.query(
      'UPDATE fotocopiadora SET modelo = $1, marca = $2, estado = $3, precio = $4, descripcion = $5, ubicacion = $6 WHERE idfotocopiadora = $7 RETURNING *',
      [modelo, marca, estado, precio, descripcion, ubicacion, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la fotocopiadora', error });
  }
};

// Eliminar una fotocopiadora
const deleteFotocopiadora = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM fotocopiadora WHERE idfotocopiadora = $1', [id]);
    res.status(200).json({ message: 'Fotocopiadora eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la fotocopiadora', error });
  }
};

module.exports = {
  getAllFotocopiadoras,
  addFotocopiadora,
  updateFotocopiadora,
  deleteFotocopiadora,
};
