import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import '../styles/Login.css';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        correo,
        contraseña,
      });

      const { token, id, rol, nombre } = response.data; // 🔹 Asegurar que `id` se recibe

      // Guarda en el contexto y localStorage
      login({ token, id, rol, correo, nombre });

      // Redirige basado en el rol
      navigate(rol === 'admin' ? '/admin' : '/dashboard');
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      setError('Correo o contraseña incorrectos');
    }
  };

  return (
    <div className="login-container">
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          required
        />
        <button type="submit">Iniciar Sesión</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
