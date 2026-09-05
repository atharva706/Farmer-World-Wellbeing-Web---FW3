// components/Footer.jsx
import React from 'react';
import { useTheme } from '../context/ThemeContext';

function Footer() {
    const { isDark } = useTheme();
    
    return (
        <footer className={`mt-16 p-6 text-center shadow-inner font-inter transition-colors duration-300 ${
            isDark
                ? 'bg-slate-900 text-slate-200'
                : 'bg-green-800 text-white'
        }`}>
            <p className="text-sm font-medium">
                &copy; {new Date().getFullYear()} Farmer World Wellbeing Web (FW3). All rights reserved.
            </p>
        </footer>
    );
}

export default Footer;