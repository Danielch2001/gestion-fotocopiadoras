import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const ProtectedRoute = ({ children, role }) => {
    const { user } = useContext(AuthContext);

    if (!user || user.rol !== role) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;
