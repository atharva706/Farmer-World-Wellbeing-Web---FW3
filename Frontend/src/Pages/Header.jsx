// components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import logo from '../assets/Images/logo.png';

function ThemeToggle() {
    const { isDark, toggleTheme } = useTheme();
    
    return (
        <button 
            onClick={toggleTheme}
            className="text-yellow-400 bg-green-700 p-2 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300"
        >
            {isDark ? '☀️' : '🌙'}
        </button>
    );
}

function Menu(props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            {...props}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
    );
}

function Header() {
    const { isDark } = useTheme();
    const navItems = ["Home", "About", "Contact"];
    
    return (
        <header className={`sticky top-0 z-50 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.3)] border-b transition-colors duration-300 ${
            isDark 
                ? 'bg-gradient-to-r from-slate-900 via-slate-800 to-gray-900 border-slate-700'
                : 'bg-gradient-to-r from-green-900 via-green-800 to-emerald-700 border-green-600'
        }`}>
            <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6 md:px-10">
                <Link to="/" className="flex items-center gap-3">
                    <img
                        src={logo}
                        alt="FW3 Logo"
                        className={`h-[70px] w-[70px] rounded-full border-2 transition-transform duration-500 hover:scale-110 cursor-pointer ${
                            isDark
                                ? 'border-blue-400 hover:shadow-[0_0_20px_rgba(100,150,255,0.6)]'
                                : 'border-yellow-400 hover:shadow-[0_0_20px_rgba(255,255,100,0.6)]'
                        }`}
                    />
                    <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
                        <span className={`drop-shadow-[0_0_6px_rgba(255,255,100,0.7)] ${
                            isDark ? 'text-blue-300' : 'text-yellow-300'
                        }`}>
                            Farmer World
                        </span>{" "}
                        <span className={isDark ? 'text-slate-200' : 'text-green-200'}>Wellbeing Web</span>{" "}
                        <span className={isDark ? 'text-blue-400' : 'text-yellow-400'}>FW3</span>
                    </h1>
                </Link>

                <div className="flex items-center gap-6">
                    <nav className={`hidden md:flex items-center gap-8 text-lg font-semibold ${
                        isDark ? 'text-slate-100' : 'text-green-50'
                    }`}>
                        {navItems.map((item) => (
                            <Link
                                key={item}
                                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                                className={`relative group transition-all duration-300 ${
                                    isDark ? 'hover:text-blue-300' : 'hover:text-yellow-300'
                                }`}
                            >
                                {item}
                                <span className={`absolute left-0 -bottom-1 w-0 h-[2px] rounded-full transition-all duration-300 group-hover:w-full ${
                                    isDark ? 'bg-blue-400' : 'bg-yellow-400'
                                }`}></span>
                            </Link>
                        ))}
                    </nav>

                    <ThemeToggle />

                    <div className={`md:hidden cursor-pointer hover:scale-110 transition-transform duration-300 ${
                        isDark ? 'text-blue-400' : 'text-yellow-400'
                    }`}>
                        <Menu className="h-8 w-8" />
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;