const express = require('express');
const { reservarFotocopiadora, comprarFotocopiadora, alquilarFotocopiadora } = require('../controllers/operacionesController'); // Verifica que existan

const router = express.Router();

// Rutas para gestionar reservas, compras y alquileres
router.post('/reservar', reservarFotocopiadora);
router.post('/comprar', comprarFotocopiadora);
router.post('/alquilar', alquilarFotocopiadora);

module.exports = router;
