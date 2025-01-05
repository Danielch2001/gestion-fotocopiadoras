import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Importa ambos aquí
import axios from 'axios';

function Login({ setUser }) {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Usa solo esta definición

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        correo,
        contraseña,
      });

      const { token, rol } = response.data;

      // Guardar el token y rol en localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('rol', rol);

      // Configurar el usuario global
      setUser({ correo, rol });

      // Redirigir según el rol
      if (rol === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Correo o contraseña incorrectos');
    }
  };

  return (
    <div>
      <h1>Login</h1>
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
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>
        ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
      </p>
    </div>
  );
}

export default Login;
