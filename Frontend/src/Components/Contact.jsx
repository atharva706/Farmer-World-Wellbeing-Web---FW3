import React from "react";
import logo from '../assets/Images/logo.png'

// Base64 logo placeholder

// Header component

// ---------------- Header Component ----------------
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
                {/* Logo & Brand Name */}
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

                {/* Navigation Menu & Theme Toggle */}
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

                    {/* Mobile Menu Icon */}
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
// Footer component
const Footer = () => {
  return (
    <footer className="mt-16 bg-green-800 p-6 text-center text-white shadow-inner font-inter relative z-30">
      <p className="text-sm font-medium">
        &copy; {new Date().getFullYear()} Farmer World Wellbeing Web (FW3). All
        rights reserved.
      </p>
    </footer>
  );
};

// Contact data
const CONTACTS = [
  {
    name: "Ministry of Agriculture & Farmers Welfare",
    website: "https://agricoop.nic.in/",
  },
  {
    name: "National Bank for Agriculture and Rural Development (NABARD)",
    website: "https://www.nabard.org/",
  },
  {
    name: "State Agriculture Department",
    website: "https://www.mahaagri.gov.in/", // example Maharashtra
  },
  {
    name: "Krishi Vigyan Kendra (KVK)",
    website: "https://www.kvk.icar.gov.in/",
  },
  {
    name: "PM-Kisan Scheme Portal",
    website: "https://www.pmkisan.gov.in/",
  },
];

// Contact page
const Contact = () => {
  return (
    <div className="flex flex-col min-h-screen font-inter bg-green-100">
      <Header />

      {/* Hero Section */}
      <section className="bg-green-100/90 py-16 text-center shadow-md">
        <h2 className="text-5xl font-extrabold text-green-900 mb-6">
          Important Government Contacts for Farmers
        </h2>
        <p className="mx-auto max-w-3xl text-lg text-gray-700 px-4">
          These official websites provide information, assistance, and schemes to help farmers manage their farms, access financial support, and get expert guidance.
        </p>
      </section>

      {/* Contact Cards */}
      <main className="container mx-auto flex-1 px-5 py-10">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {CONTACTS.map((contact, index) => (
            <div
              key={index}
              className="bg-green-700/90 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-transform duration-300 transform hover:scale-105"
            >
              <h3 className="text-xl font-bold mb-2">{contact.name}</h3>
              <a
                href={contact.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-300 hover:text-yellow-500 underline break-words"
              >
                {contact.website}
              </a>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
