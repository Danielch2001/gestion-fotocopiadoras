import React from 'react';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Bienvenidos a Gestión Fotocopiadoras</h1>
      </header>
      <section className="home-content">
        <h2>¿Quiénes somos?</h2>
        <p>
          Somos una empresa dedicada al alquiler de impresoras y fotocopiadoras empresariales. 
          Ofrecemos servicios de mantenimiento, venta de equipos y repuestos para garantizar 
          el mejor rendimiento de sus equipos.
        </p>
        <h2>¿Qué ofrecemos?</h2>
        <ul>
          <li>Alquiler de impresoras empresariales</li>
          <li>Mantenimiento técnico especializado</li>
          <li>Venta de impresoras y fotocopiadoras</li>
          <li>Repuestos originales para equipos</li>
        </ul>
        <div className="home-buttons">
          <button onClick={() => (window.location.href = '/login')}>Iniciar Sesión</button>
          <button onClick={() => (window.location.href = '/register')}>Registrarse</button>
        </div>
      </section>
    </div>
  );
};

export default Home;
