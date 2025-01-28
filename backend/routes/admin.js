const express = require('express');
const router = express.Router();
const verificarToken = require('../middlewares/authMiddleware');
const verificarRol = require('../middlewares/verificarRol');

// Ruta protegida para administrar el dashboard
router.get('/AdminPanel', verificarToken, verificarRol(['admin']), (req, res) => {
  res.status(200).json({ message: 'Bienvenido al panel de administración' });
});

module.exports = router;
