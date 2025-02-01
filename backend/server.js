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
const adminRoutes = require('./routes/admin');

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;

// ✅ CORS para permitir acceso desde React y otros orígenes
app.use(cors({
  origin: ["http://3.144.47.31", "http://localhost:3000"],
  credentials: true,
}));

// ✅ Middlewares
app.use(bodyParser.json());

// ✅ Rutas principales
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/fotocopiadoras', fotocopiadorasRoutes);
app.use('/api/operaciones', operacionesRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use("/api", reportesRoutes);
app.use('/admin', adminRoutes);

// ✅ Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
