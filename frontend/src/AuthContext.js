import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const rol = localStorage.getItem('rol');
    const correo = localStorage.getItem('correo');
    const nombre = localStorage.getItem('nombre');

    if (token && rol && correo && nombre) {
      setUser({ token, rol, correo, nombre });
    }
  }, []);

  const login = ({ token, rol, correo, nombre }) => {
    localStorage.setItem('token', token);
    localStorage.setItem('rol', rol);
    localStorage.setItem('correo', correo);
    localStorage.setItem('nombre', nombre); // Guarda el nombre en localStorage
    setUser({ token, rol, correo, nombre });
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    navigate('/login'); // Redirige al login
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
