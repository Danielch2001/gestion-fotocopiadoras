const verificarRol = (rolesPermitidos) => {
    return (req, res, next) => {
      const { rol } = req.user; // El rol debe estar en `req.user` después de verificar el token
      if (!rolesPermitidos.includes(rol)) {
        return res.status(403).json({ message: 'No tienes permisos para realizar esta acción.' });
      }
      next();
    };
  };
  
  module.exports = verificarRol;
  