const express = require('express');
const { verificarToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', verificarToken, (req, res) => {
    res.status(200).json({ message: 'Bienvenido, Administrador' });
});

module.exports = router;
