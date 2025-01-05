const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Para generar el token JWT
const validator = require('validator'); // Validar correos y otros datos

// Registrar usuario
const register = async (req, res) => {
  const { nombre, correo, contraseña, rol } = req.body;

  try {
    // Validar datos
    if (!validator.isEmail(correo)) {
      return res.status(400).json({ message: 'Correo no válido' });
    }

    if (contraseña.length < 8) {
      return res.status(400).json({ message: 'La contraseña debe tener al menos 8 caracteres' });
    }

    // Verificar si el correo ya existe
    const result = await pool.query('SELECT * FROM Usuarios WHERE correo = $1', [correo]);
    if (result.rows.length > 0) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(contraseña, salt);

    // Insertar usuario en la base de datos
    const nuevoUsuario = await pool.query(
      'INSERT INTO Usuarios (nombre, correo, contraseña, rol) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, correo, hashedPassword, rol || 'usuario']
    );

    // Generar token JWT
    const token = jwt.sign(
      {
        idUsuario: nuevoUsuario.rows[0].idusuario,
        rol: nuevoUsuario.rows[0].rol,
      },
      process.env.JWT_SECRET, // Asegúrate de configurar esta variable en el archivo .env
      { expiresIn: '1h' } // Tiempo de expiración del token
    );

    // Responder al cliente
    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      usuario: { id: nuevoUsuario.rows[0].idusuario, nombre, correo, rol: nuevoUsuario.rows[0].rol },
      token, // Enviar el token al cliente
    });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Iniciar sesión
const login = async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
    // Verificar si el usuario existe
    const result = await pool.query('SELECT * FROM Usuarios WHERE correo = $1', [correo]);
    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
    }

    const usuario = result.rows[0];

    // Comparar la contraseña ingresada con el hash almacenado
    const esValida = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!esValida) {
      return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
    }

    // Generar token JWT
    const token = jwt.sign(
      { idUsuario: usuario.idusuario, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login exitoso',
      token, // Enviar token al cliente
      rol: usuario.rol,
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

module.exports = { register, login };
