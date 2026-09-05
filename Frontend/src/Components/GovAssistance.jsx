import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FireIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/solid";
import Header from "./Header";
import { useTheme } from "../context/ThemeContext";
import Layout from "../Pages/Layout";

/* ================================
   FOOTER COMPONENT
================================ */


/* ================================
   MAIN COMPONENT
================================ */
const GovAssistance = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme(); // ✅ enables theme detection

  // Form states
  const [village, setVillage] = useState("");
  const [disasterType, setDisasterType] = useState("");
  const [severity, setSeverity] = useState("Medium");

  // API states
  const [triggerResponse, setTriggerResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTrigger = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTriggerResponse(null);

    const payload = { village, disasterType, severity };

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/emergency-trigger`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // public-facing
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Server Error (${res.status}): ${errText}`);
      }

      const data = await res.json();
      setTriggerResponse({ success: true, ...data });
    } catch (err) {
      console.error("Emergency Trigger Error:", err);
      setTriggerResponse({
        success: false,
        message:
          err.message || "Something went wrong while triggering emergency.",
      });
    } finally {
      setLoading(false);
    }
  };

  const inputClass = `w-full border ${
    isDark ? "border-gray-600 bg-gray-800 text-gray-100" : "border-gray-300 bg-white text-gray-800"
  } p-3 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-green-700 transition duration-200 shadow-sm`;
  const labelClass = `block text-sm font-medium mb-1 ${
    isDark ? "text-gray-200" : "text-gray-700"
  }`;

  return (
    <Layout>
    <div
      className={`flex flex-col min-h-screen font-inter transition-colors duration-300 ${
        isDark ? "bg-gray-950 text-gray-100" : "bg-green-100 text-gray-900"
      }`}
    >
      {/* Main Section */}
      <main className="flex-grow p-8 flex justify-center items-center">
        <div className="w-full max-w-lg mx-auto space-y-6">
          {/* --- Emergency Form --- */}
          <div
            className={`rounded-xl shadow-2xl overflow-hidden p-10 border-t-8 ${
              isDark
                ? "bg-gray-900 border-red-700 text-gray-100"
                : "bg-white border-red-700 text-gray-900"
            }`}
          >
            <div className="text-center mb-8">
              <FireIcon
                className={`h-12 w-12 text-red-700 mx-auto mb-3 animate-pulse`}
              />
              <h2
                className={`text-3xl font-extrabold tracking-tight text-red-700`}
              >
                Emergency Protocol Activation
              </h2>
              <p className="mt-2 text-md text-gray-500 dark:text-gray-300">
                Instantly trigger data sharing for disaster relief coordination.
              </p>
            </div>

            <form onSubmit={handleTrigger} className="space-y-6">
              <div>
                <label htmlFor="village" className={labelClass}>
                  Affected Village Name
                </label>
                <input
                  id="village"
                  type="text"
                  placeholder="e.g., Shendurjane or Kumtha"
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="disasterType" className={labelClass}>
                  Disaster Type
                </label>
                <select
                  id="disasterType"
                  value={disasterType}
                  onChange={(e) => setDisasterType(e.target.value)}
                  required
                  className={inputClass}
                >
                  <option value="">Select Disaster Type...</option>
                  <option value="Flood">Flood</option>
                  <option value="Earthquake">Earthquake</option>
                  <option value="Tsunami">Tsunami</option>
                  <option value="Cyclone">Cyclone</option>
                </select>
              </div>

              <div>
                <label htmlFor="severity" className={labelClass}>
                  Severity
                </label>
                <select
                  id="severity"
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value)}
                  className={inputClass}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>

              {/* --- Emergency Trigger Button --- */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full font-extrabold uppercase py-3 rounded-lg shadow-2xl 
                  hover:bg-red-700 hover:text-white 
                  focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-70 
                  transition duration-200 disabled:bg-red-400 disabled:shadow-none tracking-wider
                  ${
                    isDark
                      ? "bg-gray-800 text-red-400 hover:text-white"
                      : "bg-green-100 text-red-600"
                  }`}
              >
                {loading ? "SENDING ALERT..." : "ACTIVATE EMERGENCY PROTOCOL"}
              </button>
            </form>
          </div>

          {/* --- Response Section --- */}
          {triggerResponse && (
            <div
              className={`mt-8 p-5 rounded-xl border-l-4 ${
                triggerResponse.success
                  ? "bg-green-50 border-green-700 dark:bg-green-900/30"
                  : "bg-red-50 border-red-700 dark:bg-red-900/30"
              }`}
            >
              <h3 className="font-bold text-xl mb-2 flex items-center">
                {triggerResponse.success ? (
                  <CheckCircleIcon className="h-6 w-6 text-green-700 mr-2" />
                ) : (
                  <XCircleIcon className="h-6 w-6 text-red-700 mr-2" />
                )}
                {triggerResponse.success
                  ? "Action Successful!"
                  : "Action Failed!"}
              </h3>

              <p className="text-sm pl-8">
                {triggerResponse.success ? (
                  <>
                    Trigger activated for{" "}
                    <strong>{triggerResponse.village || village}</strong> (
                    {triggerResponse.disasterType || disasterType},{" "}
                    {triggerResponse.severity || severity}).{" "}
                    {triggerResponse.message ||
                      "Emergency alerts sent successfully."}
                  </>
                ) : (
                  <>Error: {triggerResponse.message}</>
                )}
              </p>
            </div>
          )}

          {/* --- Dashboard Redirect --- */}
          <div
            className={`w-full p-6 rounded-xl shadow-xl border ${
              isDark
                ? "bg-gray-900 border-gray-700 text-gray-100"
                : "bg-white border-gray-200 text-gray-800"
            }`}
          >
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <ArrowRightIcon className="h-5 w-5 text-green-700 mr-2" />
              Assistance Dashboard
            </h3>
            <p className="text-sm mb-4 text-gray-600 dark:text-gray-300">
              Access government schemes, claim tracking, and relief records.
            </p>
            <button
              onClick={() => navigate("/assistance-dashboard")}
              className="w-full bg-green-700 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 transition duration-200 flex items-center justify-center"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </main>

     
    </div>
    </Layout>
  );
};

export default GovAssistance;
