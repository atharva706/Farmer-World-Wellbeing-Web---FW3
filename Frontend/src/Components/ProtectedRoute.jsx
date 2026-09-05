// src/Components/ProtectedRoute.jsx

import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

/**
 * A wrapper component that checks for authentication.
 * If authenticated, it renders the child component (the protected page).
 * If NOT authenticated, it redirects the user to the /auth (Login/Sign Up) page.
 */
const ProtectedRoute = ({ element: Component, ...rest }) => {
    const { isAuthenticated } = useContext(AuthContext);

    // If the user is authenticated, render the component passed via the 'element' prop.
    // Otherwise, redirect them to the /auth page.
    return isAuthenticated ? <Component {...rest} /> : <Navigate to="/auth" replace />;
};

export default ProtectedRoute;