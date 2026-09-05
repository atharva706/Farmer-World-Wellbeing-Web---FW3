// Home.jsx - Updated version with theme support

import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import logo from "../assets/Images/logo.png";
import { useTheme } from "../context/ThemeContext"; // Import useTheme

// ---------------- Placeholder Components for Missing Imports ----------------

// ThemeToggle - Now uses the theme context
function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="text-yellow-400 bg-green-700 p-2 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300"
    >
      {isDark ? "☀️" : "🌙"}
    </button>
  );
}

// Placeholder for Menu Icon
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
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  );
}

// ---------------- Service Data ----------------
const SERVICE_CARDS_DATA = [
  {
    title: "Soil Testing",
    link: "/soil-testing",
    imgUrl:
      "https://thumbs.dreamstime.com/b/farmer-s-hands-testing-soil-quality-test-tube-agriculture-soil-analysis-farming-grow-farmer-s-hands-testing-soil-quality-331251482.jpg",
  },
  {
    title: "Government Assistance",
    link: "/gov-assistance",
    imgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbu38TYyyMyjZz_r4mL_WUSf1BfgvwjEuWFQ&s",
  },
  {
    title: "Market Committee",
    link: "/market-commitee",
    imgUrl:
      "https://img.freepik.com/premium-photo/fresh-fruits-vegetables-sale-market-stall-generated-by-ai_762026-121215.jpg",
  },
  {
    title: "Deal Committee",
    link: "/deal-commitee",
    imgUrl: "https://geopard.tech/wp-content/uploads/2022/05/48-min.jpg",
  },
  {
    title: "Tech Support",
    link: "/tech-support",
    imgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPYQXKC0zMu-yjp4j9rqiafhEzfPsYHtq_oQ&s",
  },
];

// ---------------- Header Component ----------------
function Header() {
  const { isDark } = useTheme();
  const navItems = ["Home", "About", "Contact"];

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.3)] border-b transition-colors duration-300 ${
        isDark
          ? "bg-gradient-to-r from-slate-900 via-slate-800 to-gray-900 border-slate-700"
          : "bg-gradient-to-r from-green-900 via-green-800 to-emerald-700 border-green-600"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6 md:px-10">
        {/* Logo & Brand Name */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="FW3 Logo"
            className={`h-[70px] w-[70px] rounded-full border-2 transition-transform duration-500 hover:scale-110 cursor-pointer ${
              isDark
                ? "border-blue-400 hover:shadow-[0_0_20px_rgba(100,150,255,0.6)]"
                : "border-yellow-400 hover:shadow-[0_0_20px_rgba(255,255,100,0.6)]"
            }`}
          />
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
            <span
              className={`drop-shadow-[0_0_6px_rgba(255,255,100,0.7)] ${
                isDark ? "text-blue-300" : "text-yellow-300"
              }`}
            >
              Farmer World
            </span>{" "}
            <span className={isDark ? "text-slate-200" : "text-green-200"}>
              Wellbeing Web
            </span>{" "}
            <span className={isDark ? "text-blue-400" : "text-yellow-400"}>
              FW3
            </span>
          </h1>
        </Link>

        {/* Navigation Menu & Theme Toggle */}
        <div className="flex items-center gap-6">
          <nav
            className={`hidden md:flex items-center gap-8 text-lg font-semibold ${
              isDark ? "text-slate-100" : "text-green-50"
            }`}
          >
            {navItems.map((item) => (
              <Link
                key={item}
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className={`relative group transition-all duration-300 ${
                  isDark ? "hover:text-blue-300" : "hover:text-yellow-300"
                }`}
              >
                {item}
                <span
                  className={`absolute left-0 -bottom-1 w-0 h-[2px] rounded-full transition-all duration-300 group-hover:w-full ${
                    isDark ? "bg-blue-400" : "bg-yellow-400"
                  }`}
                ></span>
              </Link>
            ))}
          </nav>

          <ThemeToggle />

          {/* Mobile Menu Icon */}
          <div
            className={`md:hidden cursor-pointer hover:scale-110 transition-transform duration-300 ${
              isDark ? "text-blue-400" : "text-yellow-400"
            }`}
          >
            <Menu className="h-8 w-8" />
          </div>
        </div>
      </div>
    </header>
  );
}

// ---------------- ServiceCard Component ----------------
function ServiceCard({ title, link, imgUrl }) {
  const { isDark } = useTheme();

  return (
    <div className="group perspective w-80 h-72 mx-auto animate-fadeInUp">
      <div className="relative h-full w-full transition-transform duration-[900ms] transform-style-preserve-3d group-hover:rotate-x-180">
        {/* Front Side */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center text-white rounded-3xl shadow-[0_8px_25px_rgba(0,0,0,0.3)] border hover:shadow-[0_0_40px_rgba(255,255,100,0.2)] backface-hidden p-6 transition-all duration-500 ${
            isDark
              ? "bg-gradient-to-br from-slate-800 via-slate-700 to-gray-800 border-slate-600 hover:border-blue-400"
              : "bg-gradient-to-br from-green-900 via-emerald-800 to-lime-700 border-green-600 hover:border-yellow-400"
          }`}
        >
          <h3 className="text-3xl font-extrabold tracking-wide drop-shadow-md">
            {title}
          </h3>
          <div
            className={`mt-3 w-10 h-1 rounded-full ${
              isDark ? "bg-blue-400" : "bg-yellow-400"
            }`}
          ></div>
        </div>

        {/* Back Side */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center rounded-3xl shadow-[0_8px_25px_rgba(0,0,0,0.2)] rotate-x-180 backface-hidden p-5 border ${
            isDark
              ? "bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 border-slate-600"
              : "bg-gradient-to-b from-white via-green-50 to-green-100 border-green-300"
          }`}
        >
          <img
            src={imgUrl}
            alt={title}
            className="h-32 w-56 rounded-xl object-cover mb-3 shadow-lg transition-transform duration-500 group-hover:scale-105"
          />
          <Link
            to={link}
            className={`mt-3 rounded-full px-7 py-2.5 font-semibold transition-all duration-300 shadow-md hover:shadow-[0_0_20px_rgba(72,187,120,0.5)] hover:scale-110 active:scale-95 ${
              isDark
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            CLICK HERE !
          </Link>
        </div>
      </div>
    </div>
  );
}

// ---------------- Footer Component ----------------
function Footer() {
  const { isDark } = useTheme();

  return (
    <footer
      className={`mt-16 p-6 text-center shadow-inner font-inter transition-colors duration-300 ${
        isDark ? "bg-slate-900 text-slate-200" : "bg-green-800 text-white"
      }`}
    >
      <p className="text-sm font-medium">
        &copy; {new Date().getFullYear()} Farmer World Wellbeing Web (FW3). All
        rights reserved.
      </p>
    </footer>
  );
}

// ---------------- Main Home Component ----------------
function Home() {
  const { isDark } = useTheme();

  return (
    <div
      className={`flex min-h-screen flex-col font-inter transition-colors duration-300 ${
        isDark
          ? "bg-gradient-to-b from-slate-900 via-slate-800 to-gray-900"
          : "bg-logo-blur"
      }`}
    >
      <Header />

      {/* --- Hero Section --- */}
      <section
        className={`py-16 text-center transition-colors duration-300 ${
          isDark ? "bg-slate-800 text-slate-100" : "bg-green-100"
        }`}
      >
        <h2
          className={`mb-5 text-4xl font-extrabold tracking-tight ${
            isDark ? "text-blue-300" : "text-green-800"
          }`}
        >
          Empowering Farmers, Enriching Lives 👨‍🌾
        </h2>
        <p
          className={`mx-auto max-w-3xl text-xl ${
            isDark ? "text-slate-300" : "text-gray-700"
          }`}
        >
          Welcome to FW3, your digital companion for comprehensive farming
          solutions — providing insights from soil analysis to government
          assistance and efficient market access.
        </p>
      </section>

      {/* --- Services Cards Section --- */}
      <main className="container mx-auto flex-1 px-5 py-12">
        <h2
          className={`mb-10 text-center text-3xl font-bold animate-slideInDown transition-colors duration-300 ${
            isDark ? "text-slate-100" : "text-green-900"
          }`}
        >
          Our Core Services
        </h2>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {SERVICE_CARDS_DATA.map((card, index) => (
            <ServiceCard key={index} {...card} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
