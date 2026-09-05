import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import logo from '../assets/Images/logo.png';

const QUICK_LINKS = [
    { label: 'Home',              to: '/' },
    { label: 'About FW3',         to: '/about' },
    { label: 'Contact',           to: '/contact' },
];

const SERVICE_LINKS = [
    { label: '🌱 Soil Testing',       to: '/soil-testing' },
    { label: '🏛️ Gov Assistance',     to: '/gov-assistance' },
    { label: '📊 Market Committee',   to: '/market-commitee' },
    { label: '🐄 Deal Committee',     to: '/deal-commitee' },
    { label: '💻 Tech Support',       to: '/tech-support' },
];

function Footer() {
    const { isDark } = useTheme();

    return (
        <footer className={`transition-colors duration-300 ${
            isDark
                ? 'bg-slate-900 border-t border-slate-800'
                : 'bg-green-900 border-t border-green-800'
        }`}>
            {/* Top gradient bridge — connects footer to page body */}
            <div className={`h-px ${
                isDark
                    ? 'bg-gradient-to-r from-transparent via-slate-700 to-transparent'
                    : 'bg-gradient-to-r from-transparent via-green-700 to-transparent'
            }`} />

            <div className="max-w-6xl mx-auto px-6 pt-12 pb-8">
                {/* ── 4-column grid ── */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">

                    {/* Brand column */}
                    <div className="col-span-2 md:col-span-1">
                        <Link to="/" className="flex items-center gap-2 mb-4 group">
                            <img src={logo} alt="FW3" className="h-8 w-8 rounded-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-200" />
                            <span className={`font-extrabold text-base ${isDark ? 'text-slate-100' : 'text-white'}`}>FW3</span>
                        </Link>
                        <p className={`text-sm leading-relaxed mb-4 ${isDark ? 'text-slate-500' : 'text-green-300'}`}>
                            Empowering rural farmers across India with soil testing, government schemes, fair market access, and digital literacy.
                        </p>
                        {/* Social / badge area */}
                        <span className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-medium ${
                            isDark ? 'bg-slate-800 text-slate-400 border border-slate-700' : 'bg-green-800/60 text-green-300 border border-green-700'
                        }`}>
                            🇮🇳 Made for Bharat's Farmers
                        </span>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className={`text-xs font-bold uppercase tracking-widest mb-4 ${isDark ? 'text-slate-500' : 'text-green-500'}`}>
                            Navigation
                        </h4>
                        <ul className="space-y-2.5">
                            {QUICK_LINKS.map(({ label, to }) => (
                                <li key={label}>
                                    <Link to={to} className={`text-sm transition-colors duration-150 ${
                                        isDark ? 'text-slate-400 hover:text-slate-100' : 'text-green-300 hover:text-white'
                                    }`}>
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className={`text-xs font-bold uppercase tracking-widest mb-4 ${isDark ? 'text-slate-500' : 'text-green-500'}`}>
                            Services
                        </h4>
                        <ul className="space-y-2.5">
                            {SERVICE_LINKS.map(({ label, to }) => (
                                <li key={label}>
                                    <Link to={to} className={`text-sm transition-colors duration-150 ${
                                        isDark ? 'text-slate-400 hover:text-slate-100' : 'text-green-300 hover:text-white'
                                    }`}>
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact / helpline */}
                    <div>
                        <h4 className={`text-xs font-bold uppercase tracking-widest mb-4 ${isDark ? 'text-slate-500' : 'text-green-500'}`}>
                            Emergency
                        </h4>
                        <ul className={`space-y-2.5 text-sm ${isDark ? 'text-slate-400' : 'text-green-300'}`}>
                            <li>🆘 Disaster: <span className={`font-bold ${isDark ? 'text-slate-200' : 'text-white'}`}>1078</span></li>
                            <li>🌊 Flood: <span className={`font-bold ${isDark ? 'text-slate-200' : 'text-white'}`}>1800-180-5766</span></li>
                            <li>👮 Police: <span className={`font-bold ${isDark ? 'text-slate-200' : 'text-white'}`}>100</span></li>
                            <li>🏥 Ambulance: <span className={`font-bold ${isDark ? 'text-slate-200' : 'text-white'}`}>108</span></li>
                        </ul>
                    </div>
                </div>

                {/* ── Bottom bar ── */}
                <div className={`flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t text-xs ${
                    isDark
                        ? 'border-slate-800 text-slate-600'
                        : 'border-green-800 text-green-500'
                }`}>
                    <p>&copy; {new Date().getFullYear()} Farmer World Wellbeing Web (FW3). All rights reserved.</p>
                    <p className={isDark ? 'text-slate-700' : 'text-green-700'}>
                        Designed for rural India · Powered by FW3 Tech Team
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
