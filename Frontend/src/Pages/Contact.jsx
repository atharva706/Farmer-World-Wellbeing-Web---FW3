import React from "react";
import Layout from "./Layout";
import { useTheme } from "../context/ThemeContext";

const CONTACTS = [
  {
    emoji: "🌾",
    name: "Ministry of Agriculture & Farmers Welfare",
    website: "https://agricoop.nic.in/",
    desc: "Central government portal for agricultural policies and farmer welfare schemes.",
  },
  {
    emoji: "🏦",
    name: "NABARD",
    website: "https://www.nabard.org/",
    desc: "National Bank for Agriculture and Rural Development — financing rural India.",
  },
  {
    emoji: "📋",
    name: "State Agriculture Department",
    website: "https://www.mahaagri.gov.in/",
    desc: "Maharashtra state agriculture department for local scheme registration.",
  },
  {
    emoji: "🔬",
    name: "Krishi Vigyan Kendra (KVK)",
    website: "https://www.kvk.icar.gov.in/",
    desc: "Farm science centres offering training, seed distribution, and soil testing.",
  },
  {
    emoji: "💰",
    name: "PM-Kisan Scheme Portal",
    website: "https://www.pmkisan.gov.in/",
    desc: "Check eligibility and receive ₹6,000/year direct income support.",
  },
];

const Contact = () => {
  const { isDark } = useTheme();

  return (
    <Layout>
      <div className={`flex flex-col min-h-screen transition-colors duration-300 ${
        isDark ? "bg-gradient-to-b from-slate-900 via-slate-800 to-gray-900" : "bg-logo-blur"
      }`}>

        {/* ── Hero ── */}
        <section className={`relative overflow-hidden py-14 md:py-18 text-center transition-colors duration-300 ${
          isDark ? "bg-slate-800/60" : ""
        }`}>
          {!isDark && (
            <div className="pointer-events-none absolute top-0 left-0 w-64 h-64 rounded-full bg-green-300/20 blur-3xl" />
          )}
          <div className="relative max-w-2xl mx-auto px-6">
            <span className={`inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5 ${
              isDark ? "bg-blue-900/40 text-blue-300 border border-blue-700/50" : "bg-green-100 text-green-700 border border-green-300"
            }`}>
              Government Resources
            </span>
            <h1 className={`text-4xl md:text-5xl font-extrabold tracking-tight mb-4 ${
              isDark ? "text-blue-300" : "text-gray-900"
            }`}>
              Important Contacts
            </h1>
            <p className={`text-base md:text-lg ${isDark ? "text-slate-300" : "text-gray-600"}`}>
              Official government portals for financial support, crop guidance, and scheme registration.
            </p>
          </div>
        </section>

        {/* ── Cards ── */}
        <main className="max-w-5xl mx-auto w-full px-5 py-12 flex-1">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {CONTACTS.map((contact, index) => (
              <a
                key={index}
                href={contact.website}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex flex-col gap-3 p-6 rounded-2xl border-2 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 no-underline ${
                  isDark
                    ? "bg-slate-700 border-slate-600 hover:border-blue-500 text-slate-100"
                    : "bg-white border-green-100 hover:border-green-400 text-gray-900"
                }`}
              >
                <div className={`text-3xl w-12 h-12 flex items-center justify-center rounded-xl ${
                  isDark ? "bg-slate-600" : "bg-green-50"
                }`}>
                  {contact.emoji}
                </div>
                <div>
                  <h3 className={`font-bold text-base mb-1 group-hover:${isDark ? "text-blue-300" : "text-green-700"} transition-colors duration-200`}>
                    {contact.name}
                  </h3>
                  <p className={`text-sm leading-relaxed ${isDark ? "text-slate-400" : "text-gray-500"}`}>
                    {contact.desc}
                  </p>
                </div>
                <div className={`mt-auto text-xs font-semibold truncate ${
                  isDark ? "text-blue-400" : "text-green-600"
                }`}>
                  {contact.website}
                </div>
              </a>
            ))}
          </div>
        </main>

      </div>
    </Layout>
  );
};

export default Contact;
