import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Bienvenido a Nuestra Empresa</h1>
      <p>
        Nos especializamos en el alquiler y mantenimiento de fotocopiadoras de las marcas más reconocidas del mercado.
      </p>
      <h2>Marcas con las que trabajamos:</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        <li>Canon</li>
        <li>HP</li>
        <li>Brother</li>
        <li>Ricoh</li>
      </ul>
      <div style={{ marginTop: '20px' }}>
        <Link to="/login">
          <button style={{ marginRight: '10px', padding: '10px 20px' }}>Iniciar Sesión</button>
        </Link>
        <Link to="/register">
          <button style={{ padding: '10px 20px' }}>Registrarse</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
