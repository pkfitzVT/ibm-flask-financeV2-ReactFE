// src/components/PrivateRoute.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

export default function PrivateRoute({ children }) {
    const { isAuthenticated } = useAuth();
    return isAuthenticated
        ? children
        : <Navigate to="/login" replace />;
}

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
};
