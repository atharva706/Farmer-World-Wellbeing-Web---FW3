import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import Layout from "../Pages/Layout";

const officers = [
  { name: "Yogesh Kadam", title: "Sr. Soil Scientist", available: true },
  { name: "Atharva Kulkarni", title: "Field Officer", available: true },
  { name: "Rupali Shirnath", title: "Lab Analyst", available: true },
  { name: "Ankit Khamitkar", title: "Field Officer", available: false },
];

const STEPS = ["Personal Info", "Contact & Officer", "Farm Location", "Confirm"];

const SoilTesting = () => {
  const { isDark } = useTheme();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [officer, setOfficer] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmation, setConfirmation] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleBooking = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const bookingData = {
      farmerName: name, farmerPhone: phone, village: city,
      preferredDate: date, landLocation: `${addressLine1}, ${city}, Pincode: ${pincode}`,
      time, officer, email, pincode,
    };
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/book-appointment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });
      if (!response.ok) {
        let msg = `Server Error (${response.status}).`;
        try { const d = await response.json(); msg = d.message || msg; } catch {}
        throw new Error(msg);
      }
      const result = await response.json();
      setConfirmation({ ...bookingData, appointmentId: result.appointment.id, officerEmail: "officer@gov.in" });
      setStep(0); setName(""); setDate(""); setTime(""); setOfficer("");
      setAddressLine1(""); setCity(""); setPincode(""); setEmail(""); setPhone("");
    } catch (err) {
      alert(`Booking Failed: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  /* ── shared styles ── */
  const page = isDark
    ? "bg-gradient-to-b from-slate-900 via-slate-800 to-gray-900"
    : "bg-logo-blur";

  const card = isDark
    ? "bg-slate-800 border border-slate-700"
    : "bg-white border border-gray-100 shadow-md";

  const input = `w-full px-4 py-2.5 rounded-xl border text-sm transition duration-200
    focus:outline-none focus:ring-2
    ${isDark
      ? "bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400 focus:ring-emerald-500 focus:border-emerald-500"
      : "bg-white border-gray-200 text-gray-800 placeholder-gray-400 focus:ring-green-500 focus:border-green-400 shadow-sm"}`;

  const label = `block text-xs font-semibold uppercase tracking-wide mb-1.5 ${isDark ? "text-slate-400" : "text-gray-500"}`;

  const sectionTitle = `text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2 ${isDark ? "text-emerald-400" : "text-green-700"}`;

  return (
    <Layout>
      <div className={`min-h-screen transition-colors duration-300 ${page}`}>

        {/* ── Page hero ── */}
        <div className={`border-b ${isDark ? "border-slate-800" : "border-green-200/60"}`}>
          <div className="max-w-6xl mx-auto px-6 py-10">
            <div className="flex items-center gap-3 mb-2">
              <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${isDark ? "bg-emerald-900/40 text-emerald-400 border border-emerald-700/50" : "bg-green-100 text-green-700 border border-green-300"}`}>
                Core Service
              </span>
            </div>
            <h1 className={`text-3xl md:text-4xl font-extrabold mb-2 ${isDark ? "text-slate-100" : "text-gray-900"}`}>
              🌿 Soil Testing Appointment
            </h1>
            <p className={`text-base max-w-xl ${isDark ? "text-slate-400" : "text-gray-500"}`}>
              Book a certified officer to visit your farm, analyse soil health, and recommend the best crops for sustainable yield.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-10 grid lg:grid-cols-3 gap-8">

            {/* ── Left: info panel ── */}
            <div className="space-y-6">
              {/* Step tracker */}
              <div className={`rounded-2xl p-6 ${card}`}>
                <p className={`text-xs font-bold uppercase tracking-wider mb-4 ${isDark ? "text-slate-400" : "text-gray-500"}`}>Progress</p>
                <ol className="space-y-3">
                  {STEPS.map((s, i) => (
                    <li key={s} className="flex items-center gap-3">
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors duration-200
                        ${i < step ? (isDark ? "bg-emerald-600 text-white" : "bg-green-600 text-white")
                          : i === step ? (isDark ? "bg-blue-500 text-white" : "bg-green-700 text-white ring-4 ring-green-200")
                          : (isDark ? "bg-slate-700 text-slate-400" : "bg-gray-100 text-gray-400")}`}>
                        {i < step ? "✓" : i + 1}
                      </span>
                      <span className={`text-sm font-medium ${i === step ? (isDark ? "text-slate-100" : "text-gray-900") : (isDark ? "text-slate-500" : "text-gray-400")}`}>
                        {s}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Why soil test */}
              <div className={`rounded-2xl p-6 ${card}`}>
                <p className={sectionTitle}><span>📋</span> Why Test?</p>
                <ul className={`space-y-3 text-sm ${isDark ? "text-slate-300" : "text-gray-600"}`}>
                  {["Identify pH imbalances affecting crops", "Get fertiliser dose recommendations", "Plan crop rotation for better yield", "Certified govt officer does the analysis"].map(t => (
                    <li key={t} className="flex items-start gap-2">
                      <span className={`mt-0.5 flex-shrink-0 ${isDark ? "text-emerald-400" : "text-green-600"}`}>✓</span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Officers */}
              <div className={`rounded-2xl p-6 ${card}`}>
                <p className={sectionTitle}><span>👤</span> Available Officers</p>
                <ul className="space-y-3">
                  {officers.map(o => (
                    <li key={o.name} className="flex items-center justify-between">
                      <div>
                        <p className={`text-sm font-semibold ${isDark ? "text-slate-200" : "text-gray-800"}`}>{o.name}</p>
                        <p className={`text-xs ${isDark ? "text-slate-500" : "text-gray-400"}`}>{o.title}</p>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${o.available ? (isDark ? "bg-emerald-900/40 text-emerald-400" : "bg-green-100 text-green-700") : (isDark ? "bg-slate-700 text-slate-500" : "bg-gray-100 text-gray-400")}`}>
                        {o.available ? "Open" : "Busy"}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* ── Right: form ── */}
            <div className="lg:col-span-2">
              {confirmation ? (
                <div className={`rounded-2xl p-8 ${isDark ? "bg-emerald-900/20 border border-emerald-700" : "bg-green-50 border-2 border-green-400"}`}>
                  <div className="text-center mb-6">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 ${isDark ? "bg-emerald-900/40" : "bg-green-100"}`}>✅</div>
                    <h2 className={`text-2xl font-extrabold ${isDark ? "text-emerald-400" : "text-green-700"}`}>Appointment Booked!</h2>
                    <p className={`text-sm mt-1 ${isDark ? "text-slate-400" : "text-gray-500"}`}>Booking ID: <span className="font-bold">{confirmation.appointmentId}</span></p>
                  </div>
                  <div className={`grid sm:grid-cols-2 gap-4 text-sm rounded-xl p-5 ${isDark ? "bg-slate-700/60" : "bg-white"}`}>
                    {[
                      ["Farmer", confirmation.farmerName],
                      ["Officer", confirmation.officer],
                      ["Date", confirmation.preferredDate],
                      ["Time", confirmation.time],
                      ["Village", confirmation.village],
                      ["Contact", confirmation.farmerPhone],
                    ].map(([k, v]) => (
                      <div key={k}>
                        <p className={`text-xs font-semibold uppercase tracking-wide ${isDark ? "text-slate-500" : "text-gray-400"}`}>{k}</p>
                        <p className={`font-medium mt-0.5 ${isDark ? "text-slate-200" : "text-gray-800"}`}>{v}</p>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setConfirmation(null)}
                    className={`mt-6 w-full py-2.5 rounded-xl font-semibold text-sm transition-colors duration-200 ${isDark ? "bg-slate-700 text-slate-200 hover:bg-slate-600" : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"}`}
                  >
                    Book Another Appointment
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBooking}>
                  <div className={`rounded-2xl overflow-hidden ${card}`}>

                    {/* Progress bar */}
                    <div className={`h-1.5 ${isDark ? "bg-slate-700" : "bg-gray-100"}`}>
                      <div
                        className={`h-full transition-all duration-500 rounded-full ${isDark ? "bg-emerald-500" : "bg-green-600"}`}
                        style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
                      />
                    </div>

                    <div className="p-8">
                      <h2 className={`text-lg font-bold mb-6 ${isDark ? "text-slate-100" : "text-gray-900"}`}>
                        Step {step + 1} — {STEPS[step]}
                      </h2>

                      {/* Step 0: Personal Info */}
                      {step === 0 && (
                        <div className="space-y-5">
                          <div>
                            <label className={label}>Farmer Name *</label>
                            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="E.g., Anil Kumar" required className={input} />
                          </div>
                          <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                              <label className={label}>Preferred Date *</label>
                              <input type="date" value={date} onChange={e => setDate(e.target.value)} required className={input} />
                            </div>
                            <div>
                              <label className={label}>Preferred Time *</label>
                              <input type="time" value={time} onChange={e => setTime(e.target.value)} required className={input} />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Step 1: Contact & Officer */}
                      {step === 1 && (
                        <div className="space-y-5">
                          <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                              <label className={label}>Email Address *</label>
                              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required className={input} />
                            </div>
                            <div>
                              <label className={label}>Phone Number *</label>
                              <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="9876543210" required className={input} />
                            </div>
                          </div>
                          <div>
                            <label className={label}>Select Testing Officer *</label>
                            <div className="grid sm:grid-cols-2 gap-3 mt-1">
                              {officers.filter(o => o.available).map(o => (
                                <label key={o.name} className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all duration-150 ${
                                  officer === o.name
                                    ? (isDark ? "border-emerald-500 bg-emerald-900/20 ring-2 ring-emerald-500/30" : "border-green-500 bg-green-50 ring-2 ring-green-200")
                                    : (isDark ? "border-slate-600 hover:border-slate-500" : "border-gray-200 hover:border-gray-300")
                                }`}>
                                  <input type="radio" name="officer" value={o.name} checked={officer === o.name} onChange={() => setOfficer(o.name)} className="sr-only" required />
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${isDark ? "bg-slate-700 text-slate-300" : "bg-gray-100 text-gray-600"}`}>
                                    {o.name.charAt(0)}
                                  </div>
                                  <div>
                                    <p className={`text-sm font-semibold leading-tight ${isDark ? "text-slate-200" : "text-gray-800"}`}>{o.name}</p>
                                    <p className={`text-xs ${isDark ? "text-slate-500" : "text-gray-400"}`}>{o.title}</p>
                                  </div>
                                </label>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Step 2: Farm Location */}
                      {step === 2 && (
                        <div className="space-y-5">
                          <div>
                            <label className={label}>Address / Landmark *</label>
                            <input type="text" value={addressLine1} onChange={e => setAddressLine1(e.target.value)} placeholder="Farm number, Street, or Landmark" required className={input} />
                          </div>
                          <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                              <label className={label}>Village / City *</label>
                              <input type="text" value={city} onChange={e => setCity(e.target.value)} placeholder="E.g., Shendurjane" required className={input} />
                            </div>
                            <div>
                              <label className={label}>Pincode *</label>
                              <input type="text" value={pincode} onChange={e => setPincode(e.target.value)} placeholder="E.g., 400001" required className={input} />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Step 3: Confirm */}
                      {step === 3 && (
                        <div className="space-y-4">
                          <div className={`rounded-xl p-5 ${isDark ? "bg-slate-700/60" : "bg-gray-50"}`}>
                            <p className={`text-xs font-bold uppercase tracking-wider mb-4 ${isDark ? "text-slate-400" : "text-gray-400"}`}>Review Details</p>
                            <div className="grid sm:grid-cols-2 gap-3 text-sm">
                              {[
                                ["Name", name], ["Officer", officer || "—"],
                                ["Date", date], ["Time", time],
                                ["Email", email], ["Phone", phone],
                                ["Address", addressLine1], ["Village", city],
                                ["Pincode", pincode],
                              ].map(([k, v]) => (
                                <div key={k}>
                                  <p className={`text-xs font-semibold uppercase tracking-wide ${isDark ? "text-slate-500" : "text-gray-400"}`}>{k}</p>
                                  <p className={`font-medium mt-0.5 truncate ${isDark ? "text-slate-200" : "text-gray-800"}`}>{v}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                          <p className={`text-xs ${isDark ? "text-slate-500" : "text-gray-400"}`}>
                            By confirming, an email notification will be sent to the selected officer.
                          </p>
                        </div>
                      )}

                      {/* Navigation */}
                      <div className="flex justify-between items-center mt-8 pt-5 border-t border-dashed border-gray-200 dark:border-slate-700">
                        {step > 0 ? (
                          <button type="button" onClick={() => setStep(s => s - 1)}
                            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors duration-200 ${isDark ? "bg-slate-700 text-slate-300 hover:bg-slate-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                            ← Back
                          </button>
                        ) : <span />}

                        {step < STEPS.length - 1 ? (
                          <button type="button" onClick={() => setStep(s => s + 1)}
                            className={`px-6 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all duration-200 hover:shadow-md ${isDark ? "bg-emerald-600 text-white hover:bg-emerald-500" : "bg-green-700 text-white hover:bg-green-800"}`}>
                            Continue →
                          </button>
                        ) : (
                          <button type="submit" disabled={submitting}
                            className={`px-6 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all duration-200 hover:shadow-md disabled:opacity-60 ${isDark ? "bg-emerald-600 text-white hover:bg-emerald-500" : "bg-green-700 text-white hover:bg-green-800"}`}>
                            {submitting ? "Booking…" : "✅ Confirm Appointment"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
      </div>
    </Layout>
  );
};

export default SoilTesting;
