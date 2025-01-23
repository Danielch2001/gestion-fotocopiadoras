const express = require('express');
const pool = require('../config/db');
const router = express.Router();

// Obtener fotocopiadoras disponibles
router.post('/disponibles', async (req, res) => {
    const { fechahorainicio, fechahorafin } = req.body;

    try {
        const disponibles = await pool.query(
            `SELECT * FROM fotocopiadora 
             WHERE idfotocopiadora NOT IN (
                 SELECT idfotocopiadora FROM reserva 
                 WHERE (fechahorainicio < $2 AND fechahorafin > $1)
             )`,
            [fechahorainicio, fechahorafin]
        );

        res.json(disponibles.rows);
    } catch (error) {
        console.error('Error al obtener fotocopiadoras disponibles:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

// Crear una reserva
router.post('/crear', async (req, res) => {
    const { idcliente, idfotocopiadora, fechahorainicio, fechahorafin, precio_aproximado } = req.body;

    try {
        await pool.query(
            `INSERT INTO reserva (idcliente, idfotocopiadora, fechahorainicio, fechahorafin, precio_aproximado)
             VALUES ($1, $2, $3, $4, $5)`,
            [idcliente, idfotocopiadora, fechahorainicio, fechahorafin, precio_aproximado]
        );

        res.status(201).json({ message: 'Reserva creada exitosamente' });
    } catch (error) {
        console.error('Error al crear reserva:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

module.exports = router;
