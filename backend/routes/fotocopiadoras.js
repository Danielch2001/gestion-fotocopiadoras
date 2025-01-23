const express = require('express');
const router = express.Router();
const {
  getAllFotocopiadoras,
  addFotocopiadora,
  updateFotocopiadora,
  deleteFotocopiadora,
} = require('../controllers/fotocopiadorasController'); // Importar los controladores correctamente
const verificarToken = require('../middlewares/authMiddleware');
const verificarRol = require('../middlewares/verificarRol');

// Ruta para obtener todas las fotocopiadoras
router.get('/', verificarToken, verificarRol(['admin']), getAllFotocopiadoras);

// Ruta para agregar una nueva fotocopiadora
router.post('/', verificarToken, verificarRol(['admin']), addFotocopiadora);

// Ruta para actualizar una fotocopiadora
router.put('/:id', verificarToken, verificarRol(['admin']), updateFotocopiadora);

// Ruta para eliminar una fotocopiadora
router.delete('/:id', verificarToken, verificarRol(['admin']), deleteFotocopiadora);

module.exports = router;
