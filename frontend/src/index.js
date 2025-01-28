import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './app'; // Archivo principal de tu aplicación
import { AuthProvider } from './AuthContext'; // Contexto de autenticación

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>
);
