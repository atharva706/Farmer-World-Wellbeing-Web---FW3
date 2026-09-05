import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import logo from "../assets/Images/logo.png";
import { useTheme } from "../context/ThemeContext";
import Header from "../Pages/Header";
import Footer from "../Pages/Footer";

// ── Service card data ──────────────────────────────────────────────────────
const SERVICE_CARDS_DATA = [
  {
    title: "Soil Testing",
    link: "/soil-testing",
    emoji: "🌱",
    description: "Book appointments for soil health analysis and get tailored crop recommendations.",
    accent: "from-emerald-500 to-green-600",
    lightBg: "bg-emerald-50 border-emerald-200 hover:border-emerald-400",
    imgUrl: "https://thumbs.dreamstime.com/b/farmer-s-hands-testing-soil-quality-test-tube-agriculture-soil-analysis-farming-grow-farmer-s-hands-testing-soil-quality-331251482.jpg",
  },
  {
    title: "Gov Assistance",
    link: "/gov-assistance",
    emoji: "🏛️",
    description: "Trigger emergency protocols and connect with state relief during disasters.",
    accent: "from-blue-500 to-indigo-600",
    lightBg: "bg-blue-50 border-blue-200 hover:border-blue-400",
    imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbu38TYyyMyjZz_r4mL_WUSf1BfgvwjEuWFQ&s",
  },
  {
    title: "Market Committee",
    link: "/market-commitee",
    emoji: "📊",
    description: "Elect your village market committee and ensure fair pricing (Hamibhav) for produce.",
    accent: "from-amber-500 to-orange-500",
    lightBg: "bg-amber-50 border-amber-200 hover:border-amber-400",
    imgUrl: "https://img.freepik.com/premium-photo/fresh-fruits-vegetables-sale-market-stall-generated-by-ai_762026-121215.jpg",
  },
  {
    title: "Deal Committee",
    link: "/deal-commitee",
    emoji: "🐄",
    description: "Facilitate fair livestock trade — cattle, goats, poultry — with expert mediation.",
    accent: "from-lime-500 to-green-600",
    lightBg: "bg-lime-50 border-lime-200 hover:border-lime-400",
    imgUrl: "https://geopard.tech/wp-content/uploads/2022/05/48-min.jpg",
  },
  {
    title: "Tech Support",
    link: "/tech-support",
    emoji: "💻",
    description: "Village youth teams provide hands-on platform training and relay feedback.",
    accent: "from-violet-500 to-purple-600",
    lightBg: "bg-violet-50 border-violet-200 hover:border-violet-400",
    imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPYQXKC0zMu-yjp4j9rqiafhEzfPsYHtq_oQ&s",
  },
];

// ── Stat counter strip ─────────────────────────────────────────────────────
const STATS = [
  { value: "5,000+", label: "Farmers Served" },
  { value: "120+",   label: "Villages Covered" },
  { value: "3",      label: "Active Committees" },
  { value: "24/7",   label: "Emergency Support" },
];

// ── ServiceCard ────────────────────────────────────────────────────────────
function ServiceCard({ title, link, emoji, description, accent, lightBg, imgUrl }) {
  const { isDark } = useTheme();

  if (isDark) {
    // Dark: keep the existing 3-D flip card
    return (
      <div className="group perspective w-full h-64 animate-fadeInUp">
        <div className="relative h-full w-full transition-transform duration-[900ms] transform-style-preserve-3d group-hover:rotate-x-180">
          {/* Front */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white rounded-2xl shadow-lg border border-slate-600 hover:border-blue-400 bg-gradient-to-br from-slate-800 via-slate-700 to-gray-800 backface-hidden p-6 transition-all duration-500">
            <span className="text-4xl mb-3">{emoji}</span>
            <h3 className="text-2xl font-extrabold tracking-wide">{title}</h3>
            <div className="mt-3 w-8 h-1 rounded-full bg-blue-400" />
          </div>
          {/* Back */}
          <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl shadow-lg border border-slate-600 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 rotate-x-180 backface-hidden p-5">
            <img src={imgUrl} alt={title} className="h-28 w-full rounded-xl object-cover mb-3 shadow-md" />
            <Link to={link} className="mt-2 rounded-full px-6 py-2 text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 hover:scale-105">
              Explore →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Light: clean card with icon, description, and a CTA
  return (
    <div className={`group relative flex flex-col rounded-2xl border-2 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white ${lightBg}`}>
      {/* Accent top bar */}
      <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r ${accent}`} />

      <div className="flex items-start gap-4 mb-4">
        <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-gradient-to-br ${accent} shadow-md`}>
          {emoji}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-700 transition-colors duration-200">
            {title}
          </h3>
          <p className="text-sm text-gray-500 mt-0.5 leading-relaxed">{description}</p>
        </div>
      </div>

      <div className="mt-auto pt-3 border-t border-gray-100">
        <Link
          to={link}
          className={`inline-flex items-center gap-1.5 text-sm font-semibold bg-gradient-to-r ${accent} bg-clip-text text-transparent group-hover:gap-2.5 transition-all duration-200`}
        >
          Learn more
          <svg className="w-4 h-4 text-current" style={{stroke: 'url(#grad)'}} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

// ── Main Home ──────────────────────────────────────────────────────────────
function Home() {
  const { isDark } = useTheme();

  return (
    <div className={`flex min-h-screen flex-col font-inter transition-colors duration-300 ${
      isDark ? "bg-gradient-to-b from-slate-900 via-slate-800 to-gray-900" : "bg-logo-blur"
    }`}>
      <Header />

      {/* ── Hero ── */}
      <section className={`relative overflow-hidden py-20 md:py-28 transition-colors duration-300 ${
        isDark ? "bg-slate-800/60" : ""
      }`}>
        {/* Light theme: decorative blobs */}
        {!isDark && (
          <>
            <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full bg-green-300/30 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -right-16 w-80 h-80 rounded-full bg-emerald-400/25 blur-3xl" />
          </>
        )}

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          {/* Badge */}
          <span className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 ${
            isDark
              ? "bg-blue-900/40 text-blue-300 border border-blue-700/50"
              : "bg-green-100 text-green-700 border border-green-300"
          }`}>
            🌾 India's Farmer Digital Platform
          </span>

          <h1 className={`text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6 ${
            isDark ? "text-slate-100" : "text-gray-900"
          }`}>
            Empowering Farmers,{" "}
            <span className={`${
              isDark
                ? "text-blue-300"
                : "bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent"
            }`}>
              Enriching Lives
            </span>
          </h1>

          <p className={`mx-auto max-w-2xl text-lg md:text-xl leading-relaxed mb-10 ${
            isDark ? "text-slate-300" : "text-gray-600"
          }`}>
            FW3 is your all-in-one digital companion — from soil testing and government
            assistance to fair market pricing and livestock trade. Built for rural India.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/soil-testing"
              className={`px-7 py-3.5 rounded-xl font-bold text-base shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                isDark
                  ? "bg-blue-600 text-white hover:bg-blue-500"
                  : "bg-gradient-to-r from-green-600 to-emerald-500 text-white hover:from-green-700 hover:to-emerald-600 shadow-green-200"
              }`}
            >
              Get Started →
            </Link>
            <Link
              to="/about"
              className={`px-7 py-3.5 rounded-xl font-semibold text-base border-2 transition-all duration-300 hover:scale-105 ${
                isDark
                  ? "border-slate-600 text-slate-200 hover:border-blue-400 hover:text-blue-300"
                  : "border-green-400 text-green-700 hover:border-green-600 hover:bg-green-50"
              }`}
            >
              Learn About FW3
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <section className={`py-8 border-y transition-colors duration-300 ${
        isDark ? "border-slate-800" : "border-green-200/60"
      }`}>
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {STATS.map(({ value, label }) => (
            <div key={label}>
              <p className={`text-2xl md:text-3xl font-extrabold ${
                isDark ? "text-blue-300" : "text-green-600"
              }`}>{value}</p>
              <p className={`text-xs font-medium mt-0.5 uppercase tracking-wide ${
                isDark ? "text-slate-400" : "text-gray-500"
              }`}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Services ── */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-5 py-16">
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-extrabold mb-3 ${
            isDark ? "text-slate-100" : "text-gray-900"
          }`}>
            Our Core Services
          </h2>
          <p className={`text-base max-w-xl mx-auto ${isDark ? "text-slate-400" : "text-gray-500"}`}>
            Everything a farmer needs — in one place, accessible from any device.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_CARDS_DATA.map((card, i) => (
            <ServiceCard key={i} {...card} />
          ))}
        </div>
      </main>

      {/* ── "Why FW3" strip (light theme only) ── */}
      {!isDark && (
        <section className="bg-gradient-to-r from-green-700 via-green-600 to-emerald-600 py-14 px-6">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-3">
              Built for Bharat's Farmers
            </h2>
            <p className="text-green-100 text-base max-w-2xl mx-auto mb-8">
              FW3 bridges the gap between rural farmers and the digital world — ensuring
              no scheme goes unclaimed, no emergency goes unheard, and no farmer sells
              below a fair price.
            </p>
            <Link
              to="/about"
              className="inline-block px-8 py-3 rounded-xl bg-white text-green-700 font-bold shadow-lg hover:bg-green-50 transition-all duration-300 hover:scale-105"
            >
              Read Our Story
            </Link>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}

export default Home;
