const express = require('express');
const verificarToken = require('../middlewares/authMiddleware');

const router = express.Router();

// Ruta protegida para el panel de usuarios
router.get('/dashboard', verificarToken, (req, res) => {
  const { nombre } = req.user; // Accedemos al nombre directamente del token decodificado
  res.status(200).json({ message: `Bienvenido al panel de usuario, ${nombre}` });
});

module.exports = router;
