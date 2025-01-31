const express = require("express");
const { check, validationResult } = require("express-validator");
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

// Middleware para verificar admin
const authAdmin = [verificarToken, verificarRol(["admin"])];

// 📌 Rutas de fotocopiadoras
router.get("/", authAdmin, getAllFotocopiadoras);
router.get("/disponibles", getFotocopiadorasDisponibles);

router.post("/", authAdmin, [
  check("modelo").notEmpty().withMessage("El modelo es obligatorio"),
  check("precio").isNumeric().withMessage("El precio debe ser un número"),
], validateRequest, addFotocopiadora);

router.put("/:id", authAdmin, [
  check("id").isInt().withMessage("ID inválido"),
], validateRequest, updateFotocopiadora);

router.delete("/:id", authAdmin, deleteFotocopiadora);

// Middleware de validación de datos
function validateRequest(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

module.exports = router;
