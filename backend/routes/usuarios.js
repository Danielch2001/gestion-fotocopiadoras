const express = require('express');
const { getUsuarios } = require('../controllers/usuariosController');

const router = express.Router();

router.get('/', getUsuarios);

module.exports = router;
