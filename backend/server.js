const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const usuariosRoutes = require('./routes/usuarios');
const reservaRoutes = require('./routes/reserva');
const fotocopiadorasRoutes = require('./routes/fotocopiadoras');

//prueba rutas admin
const adminRoutes = require('./routes/admin');

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/reserva', reservaRoutes);
app.use('/api/fotocopiadoras', fotocopiadorasRoutes);

// Rutas protegidas para administradores
app.use('/admin', adminRoutes);





app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
