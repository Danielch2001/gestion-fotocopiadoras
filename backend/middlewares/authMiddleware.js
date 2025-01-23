const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Extrae el token después de "Bearer"
    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifica el token con la clave secreta
        req.user = decoded; // Almacena los datos decodificados en req.user
        next();
    } catch (error) {
        res.status(400).json({ message: 'Token inválido.' });
    }
};

module.exports = { verificarToken };

