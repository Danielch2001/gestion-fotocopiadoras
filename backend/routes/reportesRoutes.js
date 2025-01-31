const express = require("express");
const { generarReporte } = require("../controllers/reportesController");

const router = express.Router();

// 📝 Ruta para generar reportes con fechas de inicio y fin
router.get("/reportes", generarReporte);

module.exports = router;
