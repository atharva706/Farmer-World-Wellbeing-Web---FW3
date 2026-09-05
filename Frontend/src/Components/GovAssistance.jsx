import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FireIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowRightIcon,
  ShieldExclamationIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/solid";
import { useTheme } from "../context/ThemeContext";
import Layout from "../Pages/Layout";

const DISASTER_TYPES = ["Flood", "Earthquake", "Tsunami", "Cyclone", "Drought", "Fire"];
const SEVERITIES = [
  { value: "Low",      color: "text-green-600 bg-green-50 border-green-300" },
  { value: "Medium",   color: "text-yellow-700 bg-yellow-50 border-yellow-300" },
  { value: "High",     color: "text-orange-600 bg-orange-50 border-orange-300" },
  { value: "Critical", color: "text-red-700 bg-red-50 border-red-300" },
];

const GovAssistance = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const [village, setVillage] = useState("");
  const [disasterType, setDisasterType] = useState("");
  const [severity, setSeverity] = useState("Medium");
  const [triggerResponse, setTriggerResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTrigger = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTriggerResponse(null);
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/emergency-trigger`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ village, disasterType, severity }),
      });
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Server Error (${res.status}): ${errText}`);
      }
      const data = await res.json();
      setTriggerResponse({ success: true, ...data });
    } catch (err) {
      setTriggerResponse({ success: false, message: err.message || "Something went wrong." });
    } finally {
      setLoading(false);
    }
  };

  /* ── shared styles ── */
  const page  = isDark ? "bg-gradient-to-b from-slate-900 via-slate-800 to-gray-900" : "bg-logo-blur";
  const card  = isDark ? "bg-slate-800 border border-slate-700" : "bg-white border border-gray-100 shadow-md";
  const input = `w-full px-4 py-2.5 rounded-xl border text-sm transition duration-200 focus:outline-none focus:ring-2
    ${isDark ? "bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400 focus:ring-red-500 focus:border-red-500"
              : "bg-white border-gray-200 text-gray-800 placeholder-gray-400 focus:ring-red-400 focus:border-red-300 shadow-sm"}`;
  const labelCls = `block text-xs font-semibold uppercase tracking-wide mb-1.5 ${isDark ? "text-slate-400" : "text-gray-500"}`;

  return (
    <Layout>
      <div className={`min-h-screen transition-colors duration-300 ${page}`}>

        {/* ── Page hero ── */}
        <div className={`border-b ${isDark ? "border-slate-800" : "border-green-200/60"}`}>
          <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full inline-block mb-3 ${isDark ? "bg-red-900/40 text-red-400 border border-red-700/50" : "bg-red-100 text-red-700 border border-red-200"}`}>
                Emergency Module
              </span>
              <h1 className={`text-3xl md:text-4xl font-extrabold mb-2 ${isDark ? "text-slate-100" : "text-gray-900"}`}>
                Government Assistance
              </h1>
              <p className={`text-base max-w-xl ${isDark ? "text-slate-400" : "text-gray-500"}`}>
                Trigger emergency protocols during disasters and access government schemes, claims, and relief tracking.
              </p>
            </div>
            <button
              onClick={() => navigate("/assistance-dashboard")}
              className={`flex-shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm shadow transition-all duration-200 hover:shadow-md ${isDark ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-green-700 text-white hover:bg-green-800"}`}
            >
              <BuildingLibraryIcon className="h-4 w-4" />
              Open Assistance Dashboard
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="grid lg:grid-cols-5 gap-8">

            {/* ── Left: Emergency form (3/5 width) ── */}
            <div className="lg:col-span-3 space-y-6">
              <div className={`rounded-2xl overflow-hidden ${card}`}>
                {/* Red top bar */}
                <div className="bg-gradient-to-r from-red-700 to-rose-600 px-6 py-4 flex items-center gap-3">
                  <FireIcon className="h-6 w-6 text-white animate-pulse" />
                  <div>
                    <h2 className="text-white font-extrabold text-lg">Emergency Protocol Activation</h2>
                    <p className="text-red-200 text-xs">Instantly share farmer data with State, Tehsildar &amp; Police Patil</p>
                  </div>
                </div>

                <div className="p-7">
                  <form onSubmit={handleTrigger} className="space-y-5">
                    <div>
                      <label className={labelCls}>Affected Village *</label>
                      <input
                        type="text" value={village} onChange={e => setVillage(e.target.value)}
                        placeholder="e.g., Shendurjane or Kumtha" required className={input}
                      />
                    </div>

                    <div>
                      <label className={labelCls}>Disaster Type *</label>
                      <div className="grid grid-cols-3 gap-2">
                        {DISASTER_TYPES.map(d => (
                          <button key={d} type="button" onClick={() => setDisasterType(d)}
                            className={`py-2 px-3 rounded-xl border text-sm font-medium transition-all duration-150 ${
                              disasterType === d
                                ? (isDark ? "bg-red-700 border-red-500 text-white" : "bg-red-600 border-red-500 text-white shadow-sm")
                                : (isDark ? "bg-slate-700 border-slate-600 text-slate-300 hover:border-red-600" : "bg-gray-50 border-gray-200 text-gray-600 hover:border-red-300")
                            }`}>
                            {d}
                          </button>
                        ))}
                      </div>
                      {/* hidden required input trick */}
                      <input type="text" value={disasterType} required readOnly className="sr-only" />
                    </div>

                    <div>
                      <label className={labelCls}>Severity Level *</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {SEVERITIES.map(({ value, color }) => (
                          <button key={value} type="button" onClick={() => setSeverity(value)}
                            className={`py-2 rounded-xl border text-sm font-bold transition-all duration-150 ${
                              severity === value
                                ? (isDark ? "bg-red-800 border-red-500 text-white ring-2 ring-red-500/40" : `${color} ring-2 ring-offset-1 ring-red-400/50 shadow-sm font-extrabold`)
                                : (isDark ? "bg-slate-700 border-slate-600 text-slate-300" : "bg-gray-50 border-gray-200 text-gray-500 hover:border-gray-300")
                            }`}>
                            {value}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      type="submit" disabled={loading}
                      className={`w-full py-3.5 rounded-xl font-extrabold text-sm uppercase tracking-widest shadow-lg transition-all duration-200 disabled:opacity-60
                        ${isDark ? "bg-red-700 text-white hover:bg-red-600 hover:shadow-red-900/40" : "bg-red-600 text-white hover:bg-red-700 hover:shadow-red-200"} hover:shadow-xl`}
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                          Sending Alert...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <ShieldExclamationIcon className="h-4 w-4" /> Activate Emergency Protocol
                        </span>
                      )}
                    </button>
                  </form>

                  {/* Response */}
                  {triggerResponse && (
                    <div className={`mt-5 rounded-xl p-4 border-l-4 flex gap-3 ${
                      triggerResponse.success
                        ? (isDark ? "bg-green-900/20 border-green-500" : "bg-green-50 border-green-600")
                        : (isDark ? "bg-red-900/20 border-red-500" : "bg-red-50 border-red-600")
                    }`}>
                      {triggerResponse.success
                        ? <CheckCircleIcon className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        : <XCircleIcon className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />}
                      <div>
                        <p className={`font-bold text-sm ${triggerResponse.success ? (isDark ? "text-green-400" : "text-green-700") : (isDark ? "text-red-400" : "text-red-700")}`}>
                          {triggerResponse.success ? "Protocol Activated Successfully" : "Activation Failed"}
                        </p>
                        <p className={`text-xs mt-0.5 ${isDark ? "text-slate-400" : "text-gray-500"}`}>
                          {triggerResponse.success
                            ? `Alerts dispatched for ${triggerResponse.village || village} — ${triggerResponse.disasterType || disasterType} (${triggerResponse.severity || severity}). ${triggerResponse.message || ""}`
                            : triggerResponse.message}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ── Right: info + dashboard card (2/5 width) ── */}
            <div className="lg:col-span-2 space-y-6">

              {/* What happens */}
              <div className={`rounded-2xl p-6 ${card}`}>
                <p className={`text-xs font-bold uppercase tracking-wider mb-4 ${isDark ? "text-slate-400" : "text-gray-500"}`}>What Happens Next</p>
                <ol className="space-y-4">
                  {[
                    ["🏛️", "State Govt notified instantly"],
                    ["📋", "Tehsildar receives farmer financial data"],
                    ["👮", "Police Patil & Talathi alerted"],
                    ["💰", "Relief fund processing begins"],
                  ].map(([icon, text], i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold ${isDark ? "bg-slate-700 text-slate-300" : "bg-gray-100 text-gray-600"}`}>{i + 1}</span>
                      <span className={`text-sm ${isDark ? "text-slate-300" : "text-gray-600"}`}><span className="mr-1">{icon}</span>{text}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Dashboard card */}
              <div className={`rounded-2xl p-6 border-t-4 ${isDark ? "bg-slate-800 border-blue-500 border border-slate-700" : "bg-white border-green-600 border shadow-md"}`}>
                <div className="flex items-center gap-3 mb-3">
                  <BuildingLibraryIcon className={`h-7 w-7 ${isDark ? "text-blue-400" : "text-green-700"}`} />
                  <h3 className={`font-extrabold text-lg ${isDark ? "text-slate-100" : "text-gray-900"}`}>Assistance Dashboard</h3>
                </div>
                <p className={`text-sm mb-5 ${isDark ? "text-slate-400" : "text-gray-500"}`}>
                  Browse active government schemes, file financial claims, and track your claim status in one place.
                </p>
                <ul className={`space-y-2 text-sm mb-5 ${isDark ? "text-slate-300" : "text-gray-600"}`}>
                  {["Kisan Samman Nidhi", "Crop Insurance Subsidy", "Flood Relief Fund"].map(s => (
                    <li key={s} className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isDark ? "bg-blue-400" : "bg-green-600"}`} />
                      {s}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => navigate("/assistance-dashboard")}
                  className={`w-full py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200 ${isDark ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-green-700 text-white hover:bg-green-800"}`}
                >
                  Open Dashboard <ArrowRightIcon className="h-4 w-4" />
                </button>
              </div>

              {/* Emergency numbers */}
              <div className={`rounded-2xl p-5 ${isDark ? "bg-red-900/20 border border-red-800/50" : "bg-red-50 border border-red-200"}`}>
                <p className={`text-xs font-bold uppercase tracking-wider mb-3 ${isDark ? "text-red-400" : "text-red-700"}`}>Emergency Helplines</p>
                <div className={`space-y-1.5 text-sm font-medium ${isDark ? "text-slate-300" : "text-gray-700"}`}>
                  <p>🆘 National Disaster: <span className="font-extrabold">1078</span></p>
                  <p>🌊 Flood Helpline: <span className="font-extrabold">1800-180-5766</span></p>
                  <p>👮 Police: <span className="font-extrabold">100</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GovAssistance;
