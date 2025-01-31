const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();


const authRoutes = require('./routes/auth');
const usuariosRoutes = require('./routes/usuarios');
const fotocopiadorasRoutes = require('./routes/fotocopiadoras');
const operacionesRoutes = require("./routes/operaciones");
const dashboardRoutes = require('./routes/dashboard');
const reportesRoutes = require("./routes/reportesRoutes");

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
app.use('/api/fotocopiadoras', fotocopiadorasRoutes);
app.use('/api/operaciones', operacionesRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use("/api", reportesRoutes);

// Rutas protegidas para administradores
app.use('/admin', adminRoutes);





app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
