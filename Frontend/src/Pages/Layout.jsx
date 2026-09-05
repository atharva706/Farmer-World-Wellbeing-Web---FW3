import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { useTheme } from '../context/ThemeContext';

function Layout({ children }) {
    const { isDark } = useTheme();

    return (
        <div className={`flex min-h-screen flex-col font-inter transition-colors duration-300 ${
            isDark
                ? 'bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950'
                : 'bg-logo-blur'
        }`}>
            <Header />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    );
}

export default Layout;
