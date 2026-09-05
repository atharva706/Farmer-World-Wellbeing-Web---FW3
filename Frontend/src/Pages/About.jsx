import React from "react";
import Layout from "./Layout";
import { useTheme } from "../context/ThemeContext";

const PILLARS = [
  { emoji: "🌱", title: "Soil Health", desc: "Book testing appointments, get crop recommendations and rotation plans." },
  { emoji: "🏛️", title: "Gov Schemes", desc: "Village-specific schemes so no farmer misses financial assistance." },
  { emoji: "📊", title: "Fair Pricing", desc: "Market Committee ensures Hamibhav — fair profit for every farmer." },
  { emoji: "🐄", title: "Livestock Trade", desc: "Deal Committee facilitates transparent cattle and poultry exchange." },
  { emoji: "💻", title: "Digital Literacy", desc: "Village youth teams onboard farmers and relay real-world feedback." },
  { emoji: "🚨", title: "Emergency Relief", desc: "Instant financial data sharing with authorities during disasters." },
];

const About = () => {
  const { isDark } = useTheme();

  return (
    <Layout>
      <div className={`flex min-h-screen flex-col transition-colors duration-300 ${
        isDark ? "bg-gradient-to-b from-slate-900 via-slate-800 to-gray-900" : "bg-logo-blur"
      }`}>

        {/* ── Hero ── */}
        <section className={`relative overflow-hidden py-16 md:py-20 text-center transition-colors duration-300 ${
          isDark ? "bg-slate-800/60" : ""
        }`}>
          {!isDark && (
            <div className="pointer-events-none absolute -top-16 right-0 w-72 h-72 rounded-full bg-green-300/25 blur-3xl" />
          )}
          <div className="relative max-w-3xl mx-auto px-6">
            <span className={`inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5 ${
              isDark ? "bg-blue-900/40 text-blue-300 border border-blue-700/50" : "bg-green-100 text-green-700 border border-green-300"
            }`}>
              About FW3
            </span>
            <h1 className={`text-4xl md:text-5xl font-extrabold tracking-tight mb-5 ${
              isDark ? "text-blue-300" : "text-gray-900"
            }`}>
              Farmer World Wellbeing Web
            </h1>
            <p className={`text-lg md:text-xl leading-relaxed ${isDark ? "text-slate-300" : "text-gray-600"}`}>
              FW3 is a transformative digital initiative designed to empower rural Indian farmers
              by integrating soil testing, government assistance, fair market access, livestock
              trade, and digital literacy into one seamless platform.
            </p>
          </div>
        </section>

        {/* ── Pillars grid ── */}
        <section className={`py-12 border-y ${isDark ? "border-slate-700" : "border-green-100"}`}>
          <div className="max-w-5xl mx-auto px-6">
            <h2 className={`text-2xl font-extrabold mb-5 ${isDark ? "text-slate-100" : "text-gray-900"}`}>
              Six Pillars of FW3
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              {PILLARS.map(({ emoji, title, desc }) => (
                <div key={title} className={`rounded-xl p-5 border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${
                  isDark
                    ? "bg-slate-700/80 border-slate-600 text-slate-200"
                    : "bg-white border-green-100 shadow-sm text-gray-700"
                }`}>
                  <div className="text-2xl mb-2">{emoji}</div>
                  <h3 className={`font-bold text-base mb-1 ${isDark ? "text-slate-100" : "text-gray-900"}`}>{title}</h3>
                  <p className="text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Long-form content ── */}
        <main className="max-w-4xl mx-auto w-full px-6 py-12">
          <div className={`rounded-2xl p-8 md:p-10 shadow-sm leading-relaxed text-base md:text-lg transition-colors duration-300 ${
            isDark
              ? "bg-slate-700/70 text-slate-200 border border-slate-600"
              : "bg-white/90 text-gray-700 border border-green-100 shadow-md"
          }`}>
            <h2 className={`text-2xl font-extrabold mb-5 ${isDark ? "text-slate-100" : "text-gray-900"}`}>
              Our Mission in Detail
            </h2>
            <p className="mb-5">
              The platform enables farmers to book appointments for soil testing,
              where officers analyze soil health, recommend suitable crops, and
              suggest crop rotation practices for long-term sustainability. During
              times of crisis such as floods, earthquakes, or tsunamis, FW3 plays a
              critical role by instantly sharing farmers' financial details with the
              State Government, Tehsildar, Talathi, and Police Patil, ensuring that
              relief measures are processed swiftly. It also serves as a hub for
              village-specific government schemes, ensuring farmers do not miss out
              on opportunities for assistance.
            </p>
            <p className="mb-5">
              A unique feature of FW3 is the Village Market Committee, a decentralized
              body made up entirely of local village members, elected directly through
              the platform. Supported by Panchayat funding, the committee's goal is to
              guarantee <span className={`font-semibold ${isDark ? "text-blue-300" : "text-green-700"}`}>"Hamibhav"</span> (fair
              profit pricing) for farmers' produce, addressing one of the biggest
              challenges faced by Indian farmers — profit deficit. Complementing this,
              a Deal Committee also functions under the market system, focusing on
              livestock exchanges, facilitating the buying and selling of cattle, goats,
              chickens, and other livestock, thereby strengthening rural economies.
            </p>
            <p>
              To ensure smooth adoption of this system, FW3 also establishes a
              temporary Local Tech Support Team. Comprised of village youth selected
              through a general process, this team is responsible for teaching
              villagers the initial usage of the platform and relaying critical
              feedback to the central tech team. Once the villagers become comfortable
              with FW3, the tech team's role will naturally phase out, leaving behind a
              digitally empowered rural community.
            </p>
          </div>
        </main>

      </div>
    </Layout>
  );
};

export default About;
