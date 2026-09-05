import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import logo from '../assets/Images/logo.png';

function ThemeToggle() {
    const { isDark, toggleTheme } = useTheme();
    return (
        <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={`w-8 h-8 flex items-center justify-center rounded-full text-sm shadow-sm transition-all duration-300 ${
                isDark
                    ? 'bg-slate-700/80 hover:bg-slate-600 text-yellow-300 border border-slate-600'
                    : 'bg-white/25 hover:bg-white/40 text-white border border-white/40'
            }`}
        >
            {isDark ? '☀️' : '🌙'}
        </button>
    );
}

function Header() {
    const { isDark } = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);

    const navItems = [
        { label: 'Home',    to: '/' },
        { label: 'About',   to: '/about' },
        { label: 'Contact', to: '/contact' },
    ];

    return (
        <>
            <header className={`sticky top-0 z-50 transition-colors duration-300 ${
                isDark
                    ? 'bg-slate-900/98 border-b border-slate-800 shadow-[0_1px_0_0_rgba(255,255,255,0.04),0_4px_24px_rgba(0,0,0,0.5)]'
                    : 'bg-gradient-to-r from-green-800 via-green-700 to-emerald-600 shadow-[0_2px_16px_rgba(0,80,40,0.35)]'
            }`}>
                <div className="max-w-6xl mx-auto flex items-center justify-between h-[60px] px-5 md:px-8">

                    {/* ── Brand ── */}
                    <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group">
                        <div className={`relative flex-shrink-0 rounded-full p-0.5 transition-all duration-300 ${
                            isDark ? 'bg-blue-500/20 group-hover:bg-blue-500/40' : 'bg-white/20 group-hover:bg-white/30'
                        }`}>
                            <img
                                src={logo}
                                alt="FW3"
                                className="h-9 w-9 rounded-full object-cover block"
                            />
                        </div>
                        <div className="leading-none">
                            <div className="flex items-baseline gap-1.5">
                                <span className={`text-base font-extrabold tracking-tight ${isDark ? 'text-blue-300' : 'text-yellow-300'}`}>
                                    FW3
                                </span>
                                <span className={`hidden sm:inline text-sm font-semibold ${isDark ? 'text-slate-400' : 'text-green-200'}`}>
                                    ·
                                </span>
                                <span className={`hidden sm:inline text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-green-100'}`}>
                                    Farmer World Wellbeing Web
                                </span>
                            </div>
                        </div>
                    </Link>

                    {/* ── Desktop nav ── */}
                    <div className="hidden md:flex items-center gap-0.5">
                        <nav className="flex items-center">
                            {navItems.map(({ label, to }) => (
                                <NavLink
                                    key={label}
                                    to={to}
                                    end={to === '/'}
                                    className={({ isActive }) =>
                                        `relative px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                                            isActive
                                                ? isDark
                                                    ? 'text-blue-300 bg-blue-950/60'
                                                    : 'text-yellow-200 bg-white/20'
                                                : isDark
                                                    ? 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                                                    : 'text-green-100 hover:text-white hover:bg-white/15'
                                        }`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            {label}
                                            {isActive && (
                                                <span className={`absolute bottom-1 left-4 right-4 h-[2px] rounded-full ${isDark ? 'bg-blue-400' : 'bg-yellow-300'}`} />
                                            )}
                                        </>
                                    )}
                                </NavLink>
                            ))}
                        </nav>

                        {/* Divider */}
                        <div className={`w-px h-5 mx-2 ${isDark ? 'bg-slate-700' : 'bg-white/20'}`} />

                        <ThemeToggle />
                    </div>

                    {/* ── Mobile controls ── */}
                    <div className="md:hidden flex items-center gap-2">
                        <ThemeToggle />
                        <button
                            aria-label="Toggle menu"
                            onClick={() => setMobileOpen(o => !o)}
                            className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors duration-200 ${
                                isDark
                                    ? 'text-slate-300 hover:bg-slate-800'
                                    : 'text-white hover:bg-white/15'
                            }`}
                        >
                            {mobileOpen ? (
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* ── Mobile dropdown ── */}
                {mobileOpen && (
                    <div className={`md:hidden border-t px-4 py-2 space-y-0.5 ${
                        isDark
                            ? 'border-slate-800 bg-slate-900'
                            : 'border-green-600/40 bg-green-800'
                    }`}>
                        {navItems.map(({ label, to }) => (
                            <NavLink
                                key={label}
                                to={to}
                                end={to === '/'}
                                onClick={() => setMobileOpen(false)}
                                className={({ isActive }) =>
                                    `flex items-center px-3 py-2.5 rounded-lg text-sm font-semibold transition-all duration-150 ${
                                        isActive
                                            ? isDark ? 'bg-blue-950/60 text-blue-300' : 'bg-white/20 text-yellow-200'
                                            : isDark ? 'text-slate-300 hover:bg-slate-800/80 hover:text-slate-100' : 'text-green-100 hover:bg-white/10 hover:text-white'
                                    }`
                                }
                            >
                                {label}
                            </NavLink>
                        ))}
                    </div>
                )}
            </header>
        </>
    );
}

export default Header;
