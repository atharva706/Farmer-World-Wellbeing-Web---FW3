import React from "react";
import logo from "../assets/Images/logo.png";
import Header from "../Pages/Header";
import Layout from "./Layout";
import { useTheme } from "../context/ThemeContext";

// Footer Component
const Footer = () => {
  return (
    <footer className="mt-16 bg-green-100/95 p-6 text-center text-gray-900 shadow-inner font-inter relative z-30">
      <p className="text-sm font-medium">
        &copy; {new Date().getFullYear()} Farmer World Wellbeing Web (FW3). All rights reserved.
      </p>
    </footer>
  );
};

// About Page
const About = () => {
  const { isDark } = useTheme(); // ✅ Correct placement (inside component, not JSX)

  return (
    <>
      
      <Layout>
        <style>{`
          .bg-logo-blur {
            position: relative;
            background-color: ${isDark ? "#1a1a1a" : "#f0fdf4"}; /* dynamic bg */
          }
          .bg-logo-blur::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: url('/background-logo.png');
            background-position: center center;
            background-repeat: no-repeat;
            background-size: 150%;
            opacity: 0.3;
            filter: blur(8px) grayscale(50%);
            z-index: 10;
          }
          .font-inter { font-family: 'Inter', sans-serif; }
        `}</style>

        <div className="bg-logo-blur flex min-h-screen flex-col font-inter">
          {/* Hero Section */}
          <section className="py-16 text-center relative z-20 shadow-md">
            <h2 className="mb-5 text-5xl font-extrabold tracking-tight">
              About Farmer World Wellbeing Web (FW3)
            </h2>
            <p className="mx-auto max-w-4xl text-xl text-gray-700 font-medium px-4">
              Farmer World Wellbeing Web (FW3) is a transformative digital initiative
              designed to empower rural Indian farmers by integrating essential services
              into a single platform. The project focuses on soil testing, government
              assistance, market access, livestock trade, and digital literacy through
              a seamless web experience.
            </p>
          </section>

          {/* Paragraph Content */}
          <main className="container mx-auto flex-1 px-6 py-12 relative z-20">
            <div className="p-10 rounded-2xl shadow-2xl backdrop-blur-sm leading-relaxed text-gray-800 text-lg bg-white/80">
              <p className="mb-6">
                The platform enables farmers to book appointments for soil testing,
                where officers analyze soil health, recommend suitable crops, and
                suggest crop rotation practices for long-term sustainability. During
                times of crisis such as floods, earthquakes, or tsunamis, FW3 plays a
                critical role by instantly sharing farmers’ financial details with the
                State Government, Tehsildar, Talathi, and Police Patil, ensuring that
                relief measures are processed swiftly. It also serves as a hub for
                village-specific government schemes, ensuring farmers do not miss out
                on opportunities for assistance.
              </p>

              <p className="mb-6">
                A unique feature of FW3 is the Village Market Committee, a decentralized
                body made up entirely of local village members, elected directly through
                the platform. Supported by Panchayat funding, the committee’s goal is to
                guarantee “Hamibhav” (fair profit pricing) for farmers’ produce,
                addressing one of the biggest challenges faced by Indian farmers—profit
                deficit. Complementing this, a Deal Committee also functions under the
                market system, focusing on livestock exchanges. This body facilitates
                the buying and selling of cattle, goats, chickens, and other livestock,
                thereby strengthening rural economies.
              </p>

              <p>
                To ensure smooth adoption of this system, FW3 also establishes a
                temporary Local Tech Support Team. Comprised of village youth selected
                through a general process, this team is responsible for teaching
                villagers the initial usage of the platform and relaying critical
                feedback to the central tech team based in urban or semi-rural regions.
                Once the villagers become comfortable with FW3, the tech team’s role
                will naturally phase out, leaving behind a digitally empowered rural
                community.
              </p>
            </div>
          </main>

          <Footer />
        </div>
      </Layout>
    </>
  );
};

export default About;
