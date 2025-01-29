const express = require('express');
const {
  getFechasMayorUso,
  getHorasMayorUso,
  getFotocopiadorasMasUsadas,
  getMejoresClientes,
  getFotocopiadorasMantenimiento
} = require('../controllers/dashboardController');

const router = express.Router();

router.get('/fechas-mayor-uso', getFechasMayorUso);
router.get('/horas-mayor-uso', getHorasMayorUso);
router.get('/fotocopiadoras-mas-usadas', getFotocopiadorasMasUsadas);
router.get('/mejores-clientes', getMejoresClientes);
router.get('/fotocopiadoras-mantenimiento', getFotocopiadorasMantenimiento);

module.exports = router;
