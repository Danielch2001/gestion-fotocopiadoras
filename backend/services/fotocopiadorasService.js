const pool = require("../config/db");

// 📌 Obtener todas las fotocopiadoras
const getAllFotocopiadoras = async () => {
  const result = await pool.query("SELECT * FROM fotocopiadora");
  return result.rows;
};

// 📌 Obtener fotocopiadoras disponibles
const getFotocopiadorasDisponibles = async () => {
  const result = await pool.query(
    "SELECT * FROM fotocopiadora WHERE estado = 'disponible'"
  );
  return result.rows;
};

// 📌 Agregar una fotocopiadora (actualizado con los nuevos campos)
const addFotocopiadora = async (fotocopiadora) => {
  const { modelo, marca, estado, precio, descripcion, ubicacion, fecha_adquisicion, contador_impresiones } =
    fotocopiadora;
  const result = await pool.query(
    `INSERT INTO fotocopiadora (modelo, marca, estado, precio, descripcion, ubicacion, fecha_adquisicion, contador_impresiones)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    [modelo, marca, estado, precio, descripcion, ubicacion, fecha_adquisicion, contador_impresiones]
  );
  return result.rows[0];
};

// 📌 Actualizar una fotocopiadora
const updateFotocopiadora = async (id, fotocopiadora) => {
  const { modelo, marca, estado, precio, descripcion, ubicacion, fecha_adquisicion, contador_impresiones } =
    fotocopiadora;
  const result = await pool.query(
    `UPDATE fotocopiadora 
     SET modelo = $1, marca = $2, estado = $3, precio = $4, descripcion = $5, ubicacion = $6, fecha_adquisicion = $7, contador_impresiones = $8 
     WHERE idfotocopiadora = $9 RETURNING *`,
    [modelo, marca, estado, precio, descripcion, ubicacion, fecha_adquisicion, contador_impresiones, id]
  );
  return result.rows[0];
};

// 📌 Eliminar una fotocopiadora
const deleteFotocopiadora = async (id) => {
  await pool.query("DELETE FROM fotocopiadora WHERE idfotocopiadora = $1", [id]);
  return { message: "Fotocopiadora eliminada correctamente" };
};

module.exports = {
  getAllFotocopiadoras,
  getFotocopiadorasDisponibles,
  addFotocopiadora,
  updateFotocopiadora,
  deleteFotocopiadora,
};
