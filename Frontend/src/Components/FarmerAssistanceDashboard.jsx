import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import Layout from '../Pages/Layout';
import {
  ClipboardDocumentListIcon,
  DocumentPlusIcon,
  ClockIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/solid';

// ── Data ──────────────────────────────────────────────────────────────────
const availableSchemes = [
  { id: 1, name: "Kisan Samman Nidhi", village: "Shendurjane", eligibility: "Small & Marginal Farmers", status: "Active", amount: "₹6,000/yr", icon: "🌾" },
  { id: 2, name: "Crop Insurance Subsidy", village: "All Villages", eligibility: "Any Farmer with registered land", status: "Active", amount: "Up to ₹50,000", icon: "🛡️" },
  { id: 3, name: "Flood Relief Fund 2024", village: "Wai Gaon", eligibility: "Farmers with documented flood loss", status: "Closed (Processing)", amount: "Up to ₹1,00,000", icon: "🌊" },
];

const farmerClaims = [
  { id: "CL1001", scheme: "Kisan Samman Nidhi", amount: 6000, date: "2024-03-15", status: "Approved", remarks: "Funds transferred to SBI-123456789." },
  { id: "CL1002", scheme: "Flood Relief Fund 2024", amount: 25000, date: "2024-08-01", status: "In Review", remarks: "Tehsildar verification pending." },
  { id: "CL1003", scheme: "Crop Insurance Subsidy", amount: 12000, date: "2024-07-20", status: "Rejected", remarks: "Missing land registration document." },
];

const STATUS_CONFIG = {
  "Active":             { cls: "bg-green-100 text-green-800",   dot: "bg-green-500" },
  "Approved":           { cls: "bg-green-100 text-green-800",   dot: "bg-green-500" },
  "In Review":          { cls: "bg-amber-100 text-amber-800",   dot: "bg-amber-500" },
  "Processing":         { cls: "bg-amber-100 text-amber-800",   dot: "bg-amber-500" },
  "Closed (Processing)":{ cls: "bg-amber-100 text-amber-800",   dot: "bg-amber-500" },
  "Rejected":           { cls: "bg-red-100 text-red-800",       dot: "bg-red-500" },
  "Pending":            { cls: "bg-blue-100 text-blue-800",     dot: "bg-blue-500" },
};

const StatusBadge = ({ status }) => {
  const cfg = STATUS_CONFIG[status] || { cls: "bg-gray-100 text-gray-700", dot: "bg-gray-400" };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.cls}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {status}
    </span>
  );
};

const TABS = [
  { id: 'schemes', label: 'Active Schemes',  Icon: ClipboardDocumentListIcon },
  { id: 'claim',   label: 'File a Claim',    Icon: DocumentPlusIcon },
  { id: 'status',  label: 'Claim Status',    Icon: ClockIcon },
];

// ── Component ─────────────────────────────────────────────────────────────
const FarmerAssistanceDashboard = () => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('schemes');
  const [claimData, setClaimData] = useState({ farmerId: 'FARM101', schemeId: '', claimAmount: '', description: '' });
  const [claimSubmitted, setClaimSubmitted] = useState(null);
  const [claimLoading, setClaimLoading] = useState(false);

  const handleClaimSubmit = (e) => {
    e.preventDefault();
    setClaimLoading(true);
    setTimeout(() => {
      setClaimSubmitted({
        id: "CL" + Math.floor(Math.random() * 9000 + 1000),
        scheme: availableSchemes.find(s => s.id === parseInt(claimData.schemeId))?.name || "N/A",
        amount: claimData.claimAmount,
        date: new Date().toISOString().slice(0, 10),
        status: "Pending",
        remarks: "Initial submission received.",
      });
      setClaimLoading(false);
      setActiveTab('status');
    }, 1500);
  };

  /* ── shared styles ── */
  const page = isDark ? "bg-gradient-to-b from-slate-900 via-slate-800 to-gray-900" : "bg-logo-blur";
  const card = isDark ? "bg-slate-800 border border-slate-700" : "bg-white border border-gray-100 shadow-sm";
  const input = `w-full px-4 py-2.5 rounded-xl border text-sm transition duration-200 focus:outline-none focus:ring-2
    ${isDark ? "bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400 focus:ring-blue-500 focus:border-blue-500"
              : "bg-white border-gray-200 text-gray-800 placeholder-gray-400 focus:ring-green-500 focus:border-green-400 shadow-sm"}`;
  const labelCls = `block text-xs font-semibold uppercase tracking-wide mb-1.5 ${isDark ? "text-slate-400" : "text-gray-500"}`;

  /* ── Tab content renderers ── */
  const renderSchemes = () => (
    <div className="space-y-4">
      {availableSchemes.map(s => (
        <div key={s.id} className={`rounded-2xl border p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${card}`}>
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${isDark ? "bg-slate-700" : "bg-gray-50"}`}>
              {s.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <h3 className={`font-bold text-base ${isDark ? "text-slate-100" : "text-gray-900"}`}>{s.name}</h3>
                <StatusBadge status={s.status} />
              </div>
              <p className={`text-xs mt-1 ${isDark ? "text-slate-400" : "text-gray-500"}`}>
                Village: <span className={`font-semibold ${isDark ? "text-slate-300" : "text-gray-700"}`}>{s.village}</span>
                &nbsp;·&nbsp;Eligibility: {s.eligibility}
              </p>
              <div className="flex items-center justify-between mt-3 flex-wrap gap-3">
                <span className={`text-sm font-bold ${isDark ? "text-emerald-400" : "text-green-700"}`}>{s.amount}</span>
                <button
                  onClick={() => { setActiveTab('claim'); setClaimData(p => ({ ...p, schemeId: s.id })); }}
                  className={`text-xs font-bold px-4 py-1.5 rounded-lg transition-colors duration-200 ${isDark ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-green-700 text-white hover:bg-green-800"}`}
                >
                  Apply Now →
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderFileClaim = () => (
    <form onSubmit={handleClaimSubmit} className="space-y-5">
      <div className={`rounded-2xl p-6 border ${isDark ? "bg-slate-700/50 border-slate-600" : "bg-gray-50 border-gray-100"}`}>
        <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${isDark ? "text-slate-400" : "text-gray-500"}`}>Filing as</p>
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-extrabold ${isDark ? "bg-blue-900/50 text-blue-300" : "bg-green-100 text-green-700"}`}>F</div>
          <div>
            <p className={`font-bold text-sm ${isDark ? "text-slate-100" : "text-gray-900"}`}>Farmer FARM101</p>
            <p className={`text-xs ${isDark ? "text-slate-500" : "text-gray-400"}`}>Registered village member</p>
          </div>
        </div>
      </div>

      <div>
        <label className={labelCls}>Select Assistance Scheme *</label>
        <select value={claimData.schemeId} onChange={e => setClaimData({ ...claimData, schemeId: e.target.value })} required className={`${input} appearance-none`}>
          <option value="">Choose a scheme...</option>
          {availableSchemes.map(s => <option key={s.id} value={s.id}>{s.name} — {s.village}</option>)}
        </select>
      </div>

      <div>
        <label className={labelCls}>Claim Amount (₹) *</label>
        <input type="number" placeholder="E.g., 25000" value={claimData.claimAmount} onChange={e => setClaimData({ ...claimData, claimAmount: e.target.value })} required min="100" className={input} />
      </div>

      <div>
        <label className={labelCls}>Description of Loss / Need *</label>
        <textarea rows="4" placeholder="Describe the nature of the loss, e.g. 50% crop loss due to heavy rains..." value={claimData.description} onChange={e => setClaimData({ ...claimData, description: e.target.value })} required className={input} />
      </div>

      <div>
        <label className={labelCls}>Supporting Documents</label>
        <div className={`w-full rounded-xl border-2 border-dashed px-4 py-6 text-center transition-colors duration-200 ${isDark ? "border-slate-600 text-slate-500 hover:border-slate-500" : "border-gray-200 text-gray-400 hover:border-gray-300"}`}>
          <p className="text-sm">📎 Drag & drop files or <span className={`font-semibold ${isDark ? "text-blue-400" : "text-green-600"}`}>browse</span></p>
          <p className="text-xs mt-1">Photos, FIR copies, loss reports accepted</p>
          <input type="file" multiple className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
        </div>
      </div>

      <button type="submit" disabled={claimLoading}
        className={`w-full py-3 rounded-xl font-bold text-sm shadow transition-all duration-200 disabled:opacity-60 flex items-center justify-center gap-2 ${isDark ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-green-700 text-white hover:bg-green-800"}`}>
        {claimLoading ? (
          <><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> Submitting…</>
        ) : "Submit Financial Claim →"}
      </button>
    </form>
  );

  const renderClaimStatus = () => (
    <div className="space-y-4">
      {claimSubmitted && !farmerClaims.some(c => c.id === claimSubmitted.id) && (
        <div className={`rounded-2xl p-5 border-2 flex items-start gap-3 ${isDark ? "border-blue-500 bg-blue-900/20" : "border-green-500 bg-green-50"}`}>
          <CheckCircleIcon className={`h-5 w-5 flex-shrink-0 mt-0.5 ${isDark ? "text-blue-400" : "text-green-600"}`} />
          <div>
            <p className={`font-bold text-sm ${isDark ? "text-blue-300" : "text-green-700"}`}>New Claim Submitted</p>
            <p className={`text-xs mt-0.5 ${isDark ? "text-slate-400" : "text-gray-500"}`}>
              Claim ID: <span className="font-mono font-bold">{claimSubmitted.id}</span> · {claimSubmitted.scheme} · ₹{parseInt(claimSubmitted.amount).toLocaleString('en-IN')}
            </p>
          </div>
          <StatusBadge status={claimSubmitted.status} />
        </div>
      )}

      {[...(claimSubmitted && !farmerClaims.some(c => c.id === claimSubmitted.id) ? [claimSubmitted] : []), ...farmerClaims].map(claim => (
        claimSubmitted && claim.id === claimSubmitted.id && farmerClaims.some(c => c.id === claimSubmitted.id) ? null :
        <div key={claim.id} className={`rounded-2xl border overflow-hidden ${card}`}>
          <div className={`px-5 py-3.5 flex items-center justify-between ${isDark ? "bg-slate-700/50 border-b border-slate-700" : "bg-gray-50 border-b border-gray-100"}`}>
            <div>
              <p className={`font-bold text-sm ${isDark ? "text-slate-100" : "text-gray-900"}`}>{claim.scheme}</p>
              <p className={`text-xs font-mono ${isDark ? "text-slate-500" : "text-gray-400"}`}>{claim.id}</p>
            </div>
            <StatusBadge status={claim.status} />
          </div>
          <div className="px-5 py-4">
            <div className={`grid grid-cols-2 gap-3 text-sm mb-3 ${isDark ? "text-slate-300" : "text-gray-700"}`}>
              <div>
                <p className={`text-xs uppercase tracking-wide font-semibold ${isDark ? "text-slate-500" : "text-gray-400"}`}>Amount</p>
                <p className={`font-bold ${isDark ? "text-emerald-400" : "text-green-700"}`}>₹{claim.amount.toLocaleString('en-IN')}</p>
              </div>
              <div>
                <p className={`text-xs uppercase tracking-wide font-semibold ${isDark ? "text-slate-500" : "text-gray-400"}`}>Date Filed</p>
                <p className="font-medium">{claim.date}</p>
              </div>
            </div>
            <div className={`rounded-xl px-4 py-3 border-l-4 text-xs ${isDark ? "bg-slate-700/50 border-slate-500 text-slate-400" : "bg-gray-50 border-gray-300 text-gray-600"}`}>
              <span className="font-semibold">Remarks:</span> {claim.remarks}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const content = activeTab === 'schemes' ? renderSchemes() : activeTab === 'claim' ? renderFileClaim() : renderClaimStatus();

  return (
    <Layout>
      <div className={`min-h-screen transition-colors duration-300 ${page}`}>

        {/* ── Page hero ── */}
        <div className={`border-b ${isDark ? "border-slate-800" : "border-green-200/60"}`}>
          <div className="max-w-6xl mx-auto px-6 py-10">
            <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full inline-block mb-3 ${isDark ? "bg-blue-900/40 text-blue-400 border border-blue-700/50" : "bg-green-100 text-green-700 border border-green-300"}`}>
              Government Assistance
            </span>
            <h1 className={`text-3xl md:text-4xl font-extrabold mb-2 ${isDark ? "text-slate-100" : "text-gray-900"}`}>
              🏛️ Assistance Dashboard
            </h1>
            <p className={`text-base max-w-xl ${isDark ? "text-slate-400" : "text-gray-500"}`}>
              Browse active schemes, file financial claims, and track your relief application status.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-10">
          {/* Tabs */}
          <div className={`flex gap-1 p-1 rounded-2xl mb-8 w-fit ${isDark ? "bg-slate-800 border border-slate-700" : "bg-gray-100"}`}>
            {TABS.map(({ id, label, Icon }) => (
              <button key={id} onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  activeTab === id
                    ? (isDark ? "bg-blue-600 text-white shadow" : "bg-white text-green-800 shadow-sm")
                    : (isDark ? "text-slate-400 hover:text-slate-200" : "text-gray-500 hover:text-gray-700")
                }`}>
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </div>

          {content}
        </div>
      </div>
    </Layout>
  );
};

export default FarmerAssistanceDashboard;
