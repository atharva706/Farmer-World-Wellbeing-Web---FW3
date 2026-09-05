import React, { useState } from 'react';
import { UserIcon, LockClosedIcon, FingerPrintIcon, UserCircleIcon } from '@heroicons/react/24/solid';

// Assuming your .env file is set up correctly
const API_BASE_URL = import.meta.env.VITE_BACKEND_URI;

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Sign Up
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState(''); // Only for Sign Up
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const clearStatus = () => {
        setMessage('');
        setIsError(false);
    };

    const handleAuth = async (e) => {
        e.preventDefault();
        setLoading(true);
        clearStatus();

        const endpoint = isLogin ? '/login' : '/signup';
        const url = `${API_BASE_URL}${endpoint}`;
        
        const payload = { email, password };
        if (!isLogin) {
            payload.name = name;
        }

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
                // Server returned 4xx or 5xx status
                setIsError(true);
                setMessage(data.message || "Authentication failed. Please try again.");
                setLoading(false);
                return;
            }

            // SUCCESS: Store the token and user data
            localStorage.setItem('userToken', data.token);
            localStorage.setItem('userData', JSON.stringify(data.user));

            setIsError(false);
            setMessage(`Success! Logged in as ${data.user.name}. Token saved.`);
            
            // In a real app, you would redirect here (e.g., navigate('/dashboard'))

        } catch (error) {
            console.error("Auth error:", error);
            setIsError(true);
            setMessage(`Network or server connection failed. Is the backend running?`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl border-t-4 border-green-600">
                
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    {isLogin ? 'Sign in to FW3' : 'Create a New Account'}
                </h2>

                <form className="mt-8 space-y-6" onSubmit={handleAuth}>
                    
                    {/* Name Input (Sign Up Only) */}
                    {!isLogin && (
                        <div>
                            <label htmlFor="name" className="sr-only">Full Name</label>
                            <div className="relative">
                                <UserCircleIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => { setName(e.target.value); clearStatus(); }}
                                    className="appearance-none rounded-md relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 transition duration-200"
                                    placeholder="Full Name"
                                />
                            </div>
                        </div>
                    )}
                    
                    {/* Email Input */}
                    <div>
                        <label htmlFor="email-address" className="sr-only">Email address</label>
                        <div className="relative">
                            <UserIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => { setEmail(e.target.value); clearStatus(); }}
                                className="appearance-none rounded-md relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 transition duration-200"
                                placeholder="Email address"
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div>
                        <label htmlFor="password" className="sr-only">Password</label>
                        <div className="relative">
                            <LockClosedIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete={isLogin ? "current-password" : "new-password"}
                                required
                                value={password}
                                onChange={(e) => { setPassword(e.target.value); clearStatus(); }}
                                className="appearance-none rounded-md relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 transition duration-200"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    {/* Status Message */}
                    {message && (
                        <div className={`p-3 text-sm rounded-lg border ${isError ? 'bg-red-100 border-red-400 text-red-700' : 'bg-green-100 border-green-400 text-green-700'}`}>
                            {message}
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400 transition duration-200"
                    >
                        {loading ? (
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            <>
                                <FingerPrintIcon className="h-5 w-5 mr-2" />
                                {isLogin ? 'Sign In' : 'Sign Up'}
                            </>
                        )}
                    </button>
                </form>
                
                {/* Toggle Link */}
                <div className="text-center">
                    <button
                        type="button"
                        onClick={() => {
                            setIsLogin(!isLogin);
                            clearStatus();
                            // Optional: Clear form on toggle
                            setEmail('');
                            setPassword('');
                            setName('');
                        }}
                        className="font-medium text-green-600 hover:text-green-500 transition duration-200"
                    >
                        {isLogin
                            ? "Don't have an account? Sign Up"
                            : "Already have an account? Sign In"
                        }
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Auth;