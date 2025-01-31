import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // 📌 Cargar el usuario desde localStorage al iniciar
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user)); // Guardar en localStorage
    } else {
      localStorage.removeItem('user'); // Eliminar si no hay usuario
    }
  }, [user]);

  const login = ({ token, id, rol, correo, nombre }) => {
    const userData = { token, id, rol, correo, nombre };
    localStorage.setItem('user', JSON.stringify(userData)); // Guardar en localStorage
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('user'); // Eliminar usuario al cerrar sesión
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
