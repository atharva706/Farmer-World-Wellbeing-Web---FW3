// src/Components/AuthPage.jsx

import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Import your AuthContext

// API configuration
const API_BASE_URL = import.meta.env.VITE_BACKEND_URI;

const AuthPage = () => {
    // State to toggle between Login and Sign Up views
    const [isLogin, setIsLogin] = useState(true);

    // Form state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Auth context and navigation
    const { isAuthenticated, login } = useContext(AuthContext);
    const navigate = useNavigate();

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    // Handle form submission (both Login and Sign Up)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const endpoint = isLogin ? `${API_BASE_URL}/login` : `${API_BASE_URL}/signup`;
        const body = isLogin ? { email, password } : { name, email, password };
        
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            const data = await response.json();

            if (response.ok) {
                // Successful login or sign-up
                login(data.token, data.user);
                navigate('/'); // Redirect to Home or Dashboard
            } else {
                // Handle API error messages
                setError(data.message || 'An unknown error occurred.');
            }
        } catch (err) {
            console.error('Authentication Error:', err);
            setError('Network error. Could not connect to the server.');
        } finally {
            setLoading(false);
        }
    };

    // If already authenticated, show nothing or a small message (will be redirected by useEffect)
    if (isAuthenticated) {
        return <div className="text-center p-10">Redirecting...</div>;
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-green-50 p-4">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl border border-green-200 animate-slideInDown">
                
                <h2 className="text-3xl font-bold text-center mb-6 text-green-700">
                    {isLogin ? 'Welcome Back!' : 'Join FW3 Today'}
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required={!isLogin}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition duration-150"
                        />
                    )}
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition duration-150"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition duration-150"
                    />

                    {error && (
                        <p className="text-sm text-red-600 font-medium text-center bg-red-100 p-2 rounded-lg">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 rounded-lg text-lg font-semibold shadow-md transition duration-300 
                            ${loading ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700 active:scale-[0.98]'}`
                        }
                    >
                        {loading ? 'Processing...' : (isLogin ? 'LOG IN' : 'SIGN UP')}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setError('');
                            setName('');
                            setEmail('');
                            setPassword('');
                        }}
                        className="text-sm text-green-600 hover:text-green-800 font-medium transition duration-150"
                    >
                        {isLogin
                            ? "Don't have an account? Sign Up"
                            : "Already have an account? Log In"
                        }
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;