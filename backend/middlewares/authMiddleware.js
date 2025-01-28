const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Almacena el contenido decodificado del token (incluye `nombre`, `rol`, etc.)
    next();
  } catch (error) {
    res.status(400).json({ message: 'Token inválido.' });
  }
};

module.exports = verificarToken;
