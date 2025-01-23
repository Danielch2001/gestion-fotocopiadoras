import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); // Para mostrar mensaje de éxito
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validaciones en el frontend
    if (nombre.trim().length < 3) {
      setError('El nombre debe tener al menos 3 caracteres.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(correo)) {
      setError('Correo inválido.');
      return;
    }

    if (contraseña.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        nombre,
        correo,
        contraseña,
      });
      setSuccess(response.data.message); // Mostrar mensaje de éxito temporal
      setError('');

      // Redirigir al login después de 2 segundos
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al registrarse.');
      setSuccess('');
    }
  };

  return (
    <div className="register-container">
      <h1>Registro</h1>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
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
        <button type="submit">Registrarse</button>
      </form>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </div>
  );
};

export default Register;
