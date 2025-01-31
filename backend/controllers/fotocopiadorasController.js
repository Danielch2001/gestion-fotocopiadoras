const fotocopiadorasService = require("../services/fotocopiadorasService");

// 📌 Obtener todas las fotocopiadoras
const getAllFotocopiadoras = async (req, res) => {
  try {
    const fotocopiadoras = await fotocopiadorasService.getAllFotocopiadoras();
    res.status(200).json(fotocopiadoras);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las fotocopiadoras", error: error.message });
  }
};

// 📌 Obtener fotocopiadoras disponibles
const getFotocopiadorasDisponibles = async (req, res) => {
  try {
    const disponibles = await fotocopiadorasService.getFotocopiadorasDisponibles();
    res.status(200).json(disponibles);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las fotocopiadoras disponibles", error: error.message });
  }
};

// 📌 Agregar una nueva fotocopiadora
const addFotocopiadora = async (req, res) => {
  try {
    const nuevaFotocopiadora = await fotocopiadorasService.addFotocopiadora(req.body);
    res.status(201).json({ message: "Fotocopiadora agregada con éxito", data: nuevaFotocopiadora });
  } catch (error) {
    res.status(500).json({ message: "Error al agregar la fotocopiadora", error: error.message });
  }
};

// 📌 Actualizar una fotocopiadora
const updateFotocopiadora = async (req, res) => {
  try {
    const { id } = req.params;
    const fotocopiadoraActualizada = await fotocopiadorasService.updateFotocopiadora(id, req.body);
    if (!fotocopiadoraActualizada) {
      return res.status(404).json({ message: "Fotocopiadora no encontrada" });
    }
    res.status(200).json({ message: "Fotocopiadora actualizada con éxito", data: fotocopiadoraActualizada });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la fotocopiadora", error: error.message });
  }
};

// 📌 Eliminar una fotocopiadora
const deleteFotocopiadora = async (req, res) => {
  try {
    const { id } = req.params;
    const respuesta = await fotocopiadorasService.deleteFotocopiadora(id);
    if (!respuesta) {
      return res.status(404).json({ message: "Fotocopiadora no encontrada" });
    }
    res.status(200).json({ message: "Fotocopiadora eliminada con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la fotocopiadora", error: error.message });
  }
};

module.exports = {
  getAllFotocopiadoras,
  getFotocopiadorasDisponibles,
  addFotocopiadora,
  updateFotocopiadora,
  deleteFotocopiadora,
};
