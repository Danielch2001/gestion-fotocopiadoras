const express = require("express");
const { check, validationResult } = require("express-validator"); // Para validar datos
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

// 📌 Middleware de autenticación y permisos (para rutas protegidas)
const authAdmin = [verificarToken, verificarRol(["admin"])];

// 📌 Ruta para obtener todas las fotocopiadoras (Solo Admin)
router.get("/", authAdmin, getAllFotocopiadoras);

// 📌 Ruta para obtener fotocopiadoras disponibles (Público)
router.get("/disponibles", getFotocopiadorasDisponibles);

// 📌 Ruta para agregar una nueva fotocopiadora (Solo Admin)
router.post(
  "/",
  authAdmin,
  [
    check("modelo").notEmpty().withMessage("El modelo es obligatorio"),
    check("marca").notEmpty().withMessage("La marca es obligatoria"),
    check("estado").isIn(["disponible", "alquilada", "vendida"]).withMessage("Estado no válido"),
    check("precio").isNumeric().withMessage("El precio debe ser un número"),
    check("descripcion").notEmpty().withMessage("La descripción es obligatoria"),
    check("ubicacion").notEmpty().withMessage("La ubicación es obligatoria"),
    check("fecha_adquisicion").isISO8601().withMessage("Fecha de adquisición inválida"),
    check("contador_impresiones").isInt({ min: 0 }).withMessage("El contador debe ser un número positivo"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  addFotocopiadora
);

// 📌 Ruta para actualizar una fotocopiadora (Solo Admin)
router.put(
  "/:id",
  authAdmin,
  [
    check("id").isInt().withMessage("ID inválido"),
    check("modelo").optional().notEmpty().withMessage("El modelo no puede estar vacío"),
    check("marca").optional().notEmpty().withMessage("La marca no puede estar vacía"),
    check("estado").optional().isIn(["disponible", "alquilada", "vendida"]).withMessage("Estado no válido"),
    check("precio").optional().isNumeric().withMessage("El precio debe ser un número"),
    check("descripcion").optional().notEmpty().withMessage("La descripción no puede estar vacía"),
    check("ubicacion").optional().notEmpty().withMessage("La ubicación no puede estar vacía"),
    check("fecha_adquisicion").optional().isISO8601().withMessage("Fecha de adquisición inválida"),
    check("contador_impresiones").optional().isInt({ min: 0 }).withMessage("El contador debe ser un número positivo"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  updateFotocopiadora
);

// 📌 Ruta para eliminar una fotocopiadora (Solo Admin)
router.delete(
  "/:id",
  authAdmin,
  [check("id").isInt().withMessage("ID inválido")],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  deleteFotocopiadora
);

module.exports = router;
