const express = require("express");
const router = express.Router();
const {
  getAllFotocopiadoras,
  getFotocopiadorasDisponibles,
  addFotocopiadora,
  updateFotocopiadora,
  deleteFotocopiadora,
} = require("../controllers/fotocopiadorasController");
const verificarToken = require("../middlewares/authMiddleware");
const verificarRol = require("../middlewares/verificarRol");

// 📌 Ruta para obtener todas las fotocopiadoras (solo admin)
router.get("/", verificarToken, verificarRol(["admin"]), getAllFotocopiadoras);

// 📌 Ruta para obtener fotocopiadoras disponibles
router.get("/disponibles", getFotocopiadorasDisponibles);

// 📌 Ruta para agregar una nueva fotocopiadora (solo admin)
router.post("/", verificarToken, verificarRol(["admin"]), addFotocopiadora);

// 📌 Ruta para actualizar una fotocopiadora (solo admin)
router.put("/:id", verificarToken, verificarRol(["admin"]), updateFotocopiadora);

// 📌 Ruta para eliminar una fotocopiadora (solo admin)
router.delete("/:id", verificarToken, verificarRol(["admin"]), deleteFotocopiadora);

module.exports = router;
