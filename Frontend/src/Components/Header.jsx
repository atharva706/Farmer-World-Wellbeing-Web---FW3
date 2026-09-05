import React from "react";
import logo from "../assets/Images/logo.png";

const Header = () => {
  const navItems = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Contact", link: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-green-900 via-green-800 to-emerald-700 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.3)] border-b border-green-600 mb-[25px]">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6 md:px-10 ">
        
        {/* --- Logo Section --- */}
        <div className="flex items-center gap-3 cursor-pointer">
          <img
            src={logo}
            alt="Farmer World Wellbeing Web Logo"
            className="h-[70px] w-[70px] rounded-full border-2 border-yellow-400 hover:shadow-[0_0_20px_rgba(255,255,100,0.6)] transition-transform duration-500 hover:scale-110"
          />
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
            <span className="text-yellow-300 drop-shadow-[0_0_6px_rgba(255,255,100,0.7)]">
              Farmer World
            </span>{" "}
            <span className="text-green-200">Wellbeing Web</span>{" "}
            <span className="text-yellow-400">FW3</span>
          </h1>
        </div>

        {/* --- Desktop Navigation --- */}
        <nav className="hidden md:flex items-center gap-10 text-lg font-semibold text-green-50">
          {navItems.map(({ name, link }) => (
            <a
              key={name}
              href={link}
              className="relative group transition-all duration-300 hover:text-yellow-300"
            >
              {name}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-400 rounded-full transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* --- Mobile Menu Icon --- */}
        <button
          aria-label="Open mobile menu"
          className="md:hidden text-yellow-400 hover:scale-110 transition-transform duration-300 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
