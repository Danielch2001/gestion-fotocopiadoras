const express = require("express");
const { generarReporte, reportesReto } = require("../controllers/reportesController");

const router = express.Router();

// 📊 Ruta para generar reportes generales
router.get("/reportes", generarReporte);

// 🔍 Ruta para obtener la impresora más usada
router.get("/reportesReto", reportesReto);

module.exports = router;
