// App.jsx (Authentication Logic REMOVED)
import React from "react";
// Import Routes and Route from react-router-dom
import { Routes, Route, Navigate } from "react-router-dom"; 

// Import all functional components
import Home from "./Components/Home";
import { ThemeProvider } from "./context/ThemeContext";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import SoilTesting from "./Components/SoilTesting";
import GovAssistance from "./Components/GovAssistance";
import FarmerAssistanceDashboard from "./Components/FarmerAssistanceDashboard";
import MarketCommitee from "./Components/MarketCommitee";
import DealCommitee from "./Components/DealCommitee";
import TechSupport from "./Components/TechSupport";

// Removed: Signup, VerifyOTP, Login, and the custom Route component logic

const App = () => {
  return (
    <ThemeProvider>
      <Routes>
        
        {/* 🟢 Public Routes (All routes are now public) */}
        {/* The structure changes from <Route element={<Route element={Home} />} /> 
            to the standard <Route path="/" element={<Home />} /> */}

        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/soil-testing" element={<SoilTesting />} />
        <Route path="/gov-assistance" element={<GovAssistance />} />
        <Route
          path="/assistance-dashboard"
          element={<FarmerAssistanceDashboard />}
        />
        <Route path="/market-commitee" element={<MarketCommitee />} />
        <Route path="/deal-commitee" element={<DealCommitee />} />
        <Route path="/tech-support" element={<TechSupport />} />

        {/* 🧭 Catch-All — Redirect unknown paths to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;