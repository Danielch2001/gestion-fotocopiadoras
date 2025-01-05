import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validar contraseña en el frontend
    if (contraseña.length < 8) {
      setMensaje('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        nombre,
        correo,
        contraseña,
      });

      const { token, usuario } = response.data;

      // Guardar el token en localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(usuario));

      setMensaje('Usuario registrado exitosamente');
    } catch (error) {
      setMensaje(
        error.response?.data?.message || 'Error al registrar usuario'
      );
    }
  };

  return (
    <div>
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
        <button type="submit">Registrar</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}

export default Register;
