import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import Layout from "../Pages/Layout";

const SoilTesting = () => {
  const { theme } = useTheme();

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

  const officers = [
    "Yogesh Kadam",
    "Atharva Kulkarni",
    "Rupali Shirnath",
    "Ankit Khamitkar",
  ];

  const handleBooking = async (e) => {
    e.preventDefault();

    const bookingData = {
      farmerName: name,
      farmerPhone: phone,
      village: city,
      preferredDate: date,
      landLocation: `${addressLine1}, ${city}, Pincode: ${pincode}`,
      time,
      officer,
      email,
      pincode,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/book-appointment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        let errorDetail = `Server Error (${response.status} ${response.statusText}).`;
        try {
          const errorData = await response.json();
          errorDetail = errorData.message || errorDetail;
        } catch {
          errorDetail = `Request failed: Backend not running or invalid response.`;
        }
        throw new Error(errorDetail);
      }

      const result = await response.json();

      setConfirmation({
        ...bookingData,
        officerEmail: "officer@gov.in",
      });

      setName("");
      setDate("");
      setTime("");
      setOfficer("");
      setAddressLine1("");
      setCity("");
      setPincode("");
      setEmail("");
      setPhone("");

      alert(`Booking Successful! ID: ${result.appointment.id}. Officer notified.`);
    } catch (error) {
      console.error("Submission Error:", error);
      alert(`Booking Failed: ${error.message}`);
    }
  };

  const inputClass = `w-full p-3 rounded-xl border shadow-sm transition duration-300 ease-in-out 
    focus:ring-green-600 focus:border-green-600 
    ${
      theme === "dark"
        ? "bg-gray-900 border-gray-600 text-gray-100 placeholder-gray-400 hover:border-green-500"
        : "bg-white border-gray-300 text-gray-800 hover:border-green-400"
    }`;

  const labelClass = "block text-sm font-semibold mb-1";

  return (
    <Layout>
      <div
        className={`min-h-screen flex flex-col items-center p-8 transition-all duration-500 
          ${
            theme === "dark"
              ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100"
              : "bg-gradient-to-br from-green-50 to-lime-100 text-gray-900"
          }`}
      >
        <div
          className={`w-full max-w-xl mx-auto rounded-3xl shadow-2xl overflow-hidden p-10 border-t-8 transition-all duration-500 
            ${
              theme === "dark"
                ? "bg-gray-800 border-green-500"
                : "bg-white border-green-700"
            }`}
        >
          <div className="text-center mb-8">
            <h2 className="text-4xl font-extrabold text-green-600 drop-shadow-sm">
              🌿 Soil Testing Appointment
            </h2>
            <p className="mt-2 text-lg opacity-80">
              Book your slot and specify your farm location
            </p>
          </div>

          <form onSubmit={handleBooking} className="space-y-6">
            <div>
              <label htmlFor="name" className={labelClass}>
                Farmer Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="E.g., Anil Kumar"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={inputClass}
              />
            </div>

            <h4 className="text-xl font-bold text-green-700 dark:text-green-400 mb-3 border-b-2 border-green-200 pb-2">
              Contact Details
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className={labelClass}>
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="phone" className={labelClass}>
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="officer" className={labelClass}>
                Select Testing Officer
              </label>
              <select
                id="officer"
                value={officer}
                onChange={(e) => setOfficer(e.target.value)}
                required
                className={`${inputClass} bg-white dark:bg-gray-900`}
              >
                <option value="" disabled>
                  Choose an Officer...
                </option>
                {officers.map((off, idx) => (
                  <option key={idx} value={off}>
                    {off}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="date" className={labelClass}>
                  Date
                </label>
                <input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="time" className={labelClass}>
                  Time
                </label>
                <input
                  id="time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                  className={inputClass}
                />
              </div>
            </div>

            <h4 className="text-xl font-bold text-green-700 dark:text-green-400 mb-3 border-b-2 border-green-200 pb-2">
              Farm Location
            </h4>

            <div>
              <label htmlFor="addressLine1" className={labelClass}>
                Address Line 1 / Detailed Location
              </label>
              <input
                id="addressLine1"
                type="text"
                placeholder="Farm number, Street, or Landmark"
                value={addressLine1}
                onChange={(e) => setAddressLine1(e.target.value)}
                required
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className={labelClass}>
                  Village Name / City
                </label>
                <input
                  id="city"
                  type="text"
                  placeholder="E.g., Shendurjane"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="pincode" className={labelClass}>
                  Pincode
                </label>
                <input
                  id="pincode"
                  type="text"
                  placeholder="E.g., 400001"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  required
                  className={inputClass}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-700 text-white font-extrabold text-lg py-3 rounded-xl shadow-lg hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-500/70 transition duration-300 ease-in-out transform hover:scale-[1.005] active:scale-[0.99]"
            >
              ✅ Confirm Appointment
            </button>
          </form>

          {confirmation && (
            <div className="mt-8 p-6 border-2 border-lime-500 rounded-2xl bg-lime-50 dark:bg-gray-700 shadow-inner">
              <h3 className="font-bold text-2xl text-lime-800 dark:text-lime-400 mb-4">
                Booking Success!
              </h3>
              <p>
                <strong>Farmer:</strong> {confirmation.farmerName}
              </p>
              <p>
                <strong>Officer:</strong> {confirmation.officer}
              </p>
              <p className="mt-2 text-sm">
                Email sent to officer:{" "}
                <span className="font-medium">{confirmation.officerEmail}</span>
              </p>
              <p className="mt-3">
                <strong>Date:</strong> {confirmation.preferredDate} |{" "}
                <strong>Time:</strong> {confirmation.time}
              </p>
              <p>
                <strong>Phone:</strong> {confirmation.farmerPhone} |{" "}
                <strong>Email:</strong> {confirmation.email}
              </p>
              <p>
                <strong>Location:</strong> {confirmation.landLocation}
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SoilTesting;
