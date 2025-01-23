import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Importa Link
import { AuthContext } from '../AuthContext';
import '../styles/Login.css';

const Login = () => {
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                correo,
                contraseña,
            });
            const { token, rol } = response.data;
            login({ correo, rol, token });

            // Redirigir según el rol
            navigate(rol === 'admin' ? '/admin' : '/dashboard');
        } catch {
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
            {error && <p className="error">{error}</p>}
            {/* Agregar enlace a registro */}
            <p>
                ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
            </p>
        </div>
    );
};

export default Login;
