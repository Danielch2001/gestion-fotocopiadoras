const express = require('express');
const { 
  getFechasMayorUso, 
  getHorasMayorUso, 
  getFotocopiadorasMasUsadas 
} = require('../controllers/dashboardController');

const router = express.Router();

// Rutas para obtener estadísticas del Dashboard
router.get('/fechas-mayor-uso', getFechasMayorUso);
router.get('/horas-mayor-uso', getHorasMayorUso);
router.get('/fotocopiadoras-mas-usadas', getFotocopiadorasMasUsadas);

module.exports = router;
