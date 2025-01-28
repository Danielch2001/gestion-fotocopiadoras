const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator'); // Librería para validar datos

const register = async (req, res) => {
  const { nombre, correo, contraseña, rol } = req.body;

  try {
    // Validar datos
    if (!nombre || nombre.trim().length < 3) {
      return res.status(400).json({ message: 'El nombre debe tener al menos 3 caracteres.' });
    }

    if (!validator.isEmail(correo)) {
      return res.status(400).json({ message: 'Correo inválido.' });
    }

    if (contraseña.length < 8) {
      return res.status(400).json({ message: 'La contraseña debe tener al menos 8 caracteres.' });
    }

    // Verificar si el correo ya está registrado
    const existeUsuario = await pool.query('SELECT * FROM Usuarios WHERE correo = $1', [correo]);
    if (existeUsuario.rows.length > 0) {
      return res.status(400).json({ message: 'El correo ya está registrado.' });
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
      { idUsuario: nuevoUsuario.rows[0].idusuario, rol: nuevoUsuario.rows[0].rol },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({ message: 'Usuario registrado exitosamente', token, rol: nuevoUsuario.rows[0].rol });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

const login = async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
    // Validar si el usuario existe
    const usuario = await pool.query('SELECT * FROM Usuarios WHERE correo = $1', [correo]);
    if (usuario.rows.length === 0) {
      return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
    }

    // Verificar la contraseña
    const validPassword = await bcrypt.compare(contraseña, usuario.rows[0].contraseña);
    if (!validPassword) {
      return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
    }

    // Generar token JWT
    const token = jwt.sign(
      { idUsuario: usuario.rows[0].idusuario, rol: usuario.rows[0].rol, nombre: usuario.rows[0].nombre },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login exitoso', token, rol: usuario.rows[0].rol,nombre: usuario.rows[0].nombre });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

module.exports = { register, login };
