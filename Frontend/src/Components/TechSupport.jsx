import React, { useState } from 'react';
import {
  LightBulbIcon,
  AcademicCapIcon,
  ChatBubbleBottomCenterTextIcon,
  UserGroupIcon,
  PaperAirplaneIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/solid';
import { useTheme } from '../context/ThemeContext';
import Layout from '../Pages/Layout';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URI;

const FEEDBACK_TYPES = [
  { value: 'Adoption Feedback',              icon: '📈', desc: 'How farmers are using the platform' },
  { value: 'Technical Bug Report',           icon: '🐛', desc: 'Something is broken or not working' },
  { value: 'Content Clarification Request',  icon: '❓', desc: 'Content that is confusing or unclear' },
  { value: 'Feature Request from Villagers', icon: '💡', desc: 'New features farmers have asked for' },
];

const TEAM_STATS = [
  { label: 'Active Volunteers', val: '12', icon: '👥' },
  { label: 'Farmers Onboarded', val: '184', icon: '👨‍🌾' },
  { label: 'Reports Filed',     val: '37',  icon: '📋' },
  { label: 'Villages Covered',  val: '4',   icon: '🏘️' },
];

const TechSupport = () => {
  const { isDark } = useTheme();
  const [feedbackType, setFeedbackType]       = useState(FEEDBACK_TYPES[0].value);
  const [feedbackDetails, setFeedbackDetails] = useState('');
  const [villageTeamMember, setVillageTeamMember] = useState('');
  const [submitStatus, setSubmitStatus]       = useState(null); // null | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage]       = useState('');

  const clearStatus = () => {
    if (submitStatus === 'success' || submitStatus === 'error') {
      setSubmitStatus(null); setErrorMessage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearStatus();
    if (!villageTeamMember.trim() || !feedbackDetails.trim()) {
      setSubmitStatus('error');
      setErrorMessage('Please fill in your Name/ID and the Details field.');
      return;
    }
    setSubmitStatus('loading');
    try {
      const res = await fetch(`${API_BASE_URL}/submit-tech-feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ feedbackType, feedbackDetails, villageTeamMember, villageName: 'Shendurjane' }),
      });
      if (!res.ok) {
        let msg = `Server Error (${res.status}).`;
        try { const d = await res.json(); msg = d.message || msg; } catch {}
        throw new Error(msg);
      }
      setSubmitStatus('success');
      setFeedbackDetails('');
      setVillageTeamMember('');
    } catch (err) {
      setSubmitStatus('error');
      setErrorMessage(err.message);
    }
  };

  /* ── shared styles ── */
  const page = isDark ? 'bg-gradient-to-b from-slate-900 via-slate-800 to-gray-900' : 'bg-logo-blur';
  const card = isDark ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-gray-100 shadow-sm';
  const input = `w-full px-4 py-2.5 rounded-xl border text-sm transition duration-200 focus:outline-none focus:ring-2
    ${isDark ? 'bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400 focus:ring-violet-500 focus:border-violet-500'
              : 'bg-white border-gray-200 text-gray-800 placeholder-gray-400 focus:ring-green-500 focus:border-green-400 shadow-sm'}`;
  const labelCls = `block text-xs font-semibold uppercase tracking-wide mb-1.5 ${isDark ? 'text-slate-400' : 'text-gray-500'}`;

  return (
    <Layout>
      <div className={`min-h-screen transition-colors duration-300 ${page}`}>

        {/* ── Hero ── */}
        <div className={`border-b ${isDark ? 'border-slate-800' : 'border-green-200/60'}`}>
          <div className="max-w-6xl mx-auto px-6 py-10">
            <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full inline-block mb-3 ${isDark ? 'bg-violet-900/40 text-violet-400 border border-violet-700/50' : 'bg-violet-100 text-violet-700 border border-violet-300'}`}>
              Tech Support
            </span>
            <h1 className={`text-3xl md:text-4xl font-extrabold mb-2 ${isDark ? 'text-slate-100' : 'text-gray-900'}`}>
              💻 Village Tech Adoption Team
            </h1>
            <p className={`text-base max-w-xl ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
              Bridging the digital gap — village youth train farmers and relay real-world feedback to the FW3 central team.
            </p>
          </div>
        </div>

        {/* ── Stats strip ── */}
        <div className={`border-b ${isDark ? 'border-slate-800' : 'border-green-200/60'}`}>
          <div className="max-w-6xl mx-auto px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {TEAM_STATS.map(({ label, val, icon }) => (
              <div key={label} className={`rounded-xl p-3 ${isDark ? 'bg-slate-700/50' : 'bg-gray-50'}`}>
                <p className="text-xl mb-0.5">{icon}</p>
                <p className={`font-extrabold text-xl ${isDark ? 'text-slate-100' : 'text-gray-900'}`}>{val}</p>
                <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="grid lg:grid-cols-2 gap-8">

            {/* ── Left: Mission + Team ── */}
            <div className="space-y-6">

              {/* Mission card */}
              <div className={`rounded-2xl overflow-hidden ${card}`}>
                <div className={`px-6 py-4 border-b flex items-center gap-2 ${isDark ? 'border-slate-700 bg-slate-700/50' : 'border-gray-100 bg-gray-50'}`}>
                  <UserGroupIcon className={`h-5 w-5 ${isDark ? 'text-violet-400' : 'text-violet-600'}`} />
                  <h2 className={`font-extrabold text-lg ${isDark ? 'text-slate-100' : 'text-gray-900'}`}>Mission & Mandate</h2>
                </div>
                <div className="p-6 space-y-4">
                  <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                    This temporary team, composed of selected village youth, has two core responsibilities:
                  </p>
                  <div className="space-y-4">
                    {[
                      {
                        Icon: AcademicCapIcon,
                        title: 'Education & Onboarding',
                        desc: 'Teach farmers and villagers how to use every feature of the FW3 platform.',
                        color: isDark ? 'text-violet-400' : 'text-violet-600',
                        bg: isDark ? 'bg-violet-900/30' : 'bg-violet-50',
                      },
                      {
                        Icon: ChatBubbleBottomCenterTextIcon,
                        title: 'Feedback Channel',
                        desc: 'Report adoption challenges, bugs, and feature ideas back to the central tech team.',
                        color: isDark ? 'text-blue-400' : 'text-blue-600',
                        bg: isDark ? 'bg-blue-900/30' : 'bg-blue-50',
                      },
                    ].map(({ Icon, title, desc, color, bg }) => (
                      <div key={title} className={`rounded-xl p-4 flex items-start gap-3 ${bg}`}>
                        <Icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${color}`} />
                        <div>
                          <p className={`font-bold text-sm ${isDark ? 'text-slate-100' : 'text-gray-900'}`}>{title}</p>
                          <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>{desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Termination notice */}
                  <div className={`rounded-xl p-4 border ${isDark ? 'bg-amber-900/20 border-amber-700/50' : 'bg-amber-50 border-amber-200'}`}>
                    <p className={`text-xs font-bold uppercase tracking-wide mb-1 ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>⚠️ Termination Clause</p>
                    <p className={`text-xs ${isDark ? 'text-amber-300/80' : 'text-amber-800'}`}>
                      This team is <strong>temporary</strong>. Once the community is proficient with FW3, the team will be dissolved — keeping the programme cost-effective and goal-focused.
                    </p>
                  </div>
                </div>
              </div>

              {/* How it works */}
              <div className={`rounded-2xl p-6 ${card}`}>
                <p className={`text-xs font-bold uppercase tracking-wider mb-4 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>How It Works</p>
                <ol className="space-y-4">
                  {[
                    ['🧑‍🤝‍🧑', 'Youth volunteers selected from the village'],
                    ['📱', 'Hands-on training sessions with farmers'],
                    ['📝', 'Feedback collected and categorised'],
                    ['🔄', 'Reports sent to central FW3 tech team'],
                    ['✅', 'Improvements rolled out to the platform'],
                  ].map(([icon, text], i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${isDark ? 'bg-slate-700 text-slate-300' : 'bg-gray-100 text-gray-600'}`}>{i + 1}</span>
                      <span className={`text-sm ${isDark ? 'text-slate-300' : 'text-gray-600'}`}><span className="mr-1.5">{icon}</span>{text}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* ── Right: Feedback form ── */}
            <div className={`rounded-2xl overflow-hidden ${card}`}>
              <div className={`px-6 py-4 border-b ${isDark ? 'border-slate-700 bg-slate-700/50' : 'border-gray-100 bg-gray-50'}`}>
                <div className="flex items-center gap-2">
                  <LightBulbIcon className={`h-5 w-5 ${isDark ? 'text-violet-400' : 'text-violet-600'}`} />
                  <h2 className={`font-extrabold text-lg ${isDark ? 'text-slate-100' : 'text-gray-900'}`}>Submit a Report</h2>
                </div>
                <p className={`text-xs mt-1 ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>For village tech team members only</p>
              </div>

              <div className="p-6">
                {/* Status messages */}
                {submitStatus === 'success' && (
                  <div className={`mb-5 rounded-xl p-4 flex items-start gap-3 ${isDark ? 'bg-green-900/20 border border-green-700' : 'bg-green-50 border border-green-300'}`}>
                    <CheckCircleIcon className={`h-5 w-5 flex-shrink-0 mt-0.5 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                    <div>
                      <p className={`font-bold text-sm ${isDark ? 'text-green-400' : 'text-green-700'}`}>Report Submitted!</p>
                      <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>The central FW3 tech team has been notified by email and will review shortly.</p>
                    </div>
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className={`mb-5 rounded-xl p-4 border text-sm ${isDark ? 'bg-red-900/20 border-red-700 text-red-400' : 'bg-red-50 border-red-200 text-red-700'}`}>
                    <strong>Error:</strong> {errorMessage || 'Something went wrong. Try again.'}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className={labelCls}>Your Name / Volunteer ID *</label>
                    <input type="text" value={villageTeamMember} onChange={e => { setVillageTeamMember(e.target.value); clearStatus(); }}
                      placeholder="e.g., Sunil Varma (Vol-045)" required className={input} />
                  </div>

                  <div>
                    <label className={labelCls}>Report Category *</label>
                    <div className="space-y-2">
                      {FEEDBACK_TYPES.map(({ value, icon, desc }) => (
                        <label key={value} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-150 ${
                          feedbackType === value
                            ? (isDark ? 'border-violet-500 bg-violet-900/20 ring-1 ring-violet-500/30' : 'border-violet-500 bg-violet-50 ring-1 ring-violet-200')
                            : (isDark ? 'border-slate-600 hover:border-slate-500' : 'border-gray-200 hover:border-gray-300')
                        }`}>
                          <input type="radio" name="feedbackType" value={value} checked={feedbackType === value}
                            onChange={() => { setFeedbackType(value); clearStatus(); }} className="sr-only" />
                          <span className="text-lg flex-shrink-0">{icon}</span>
                          <div>
                            <p className={`text-sm font-semibold leading-tight ${isDark ? 'text-slate-200' : 'text-gray-800'}`}>{value}</p>
                            <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>{desc}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className={labelCls}>Details & Observations *</label>
                    <textarea rows="4" value={feedbackDetails} onChange={e => { setFeedbackDetails(e.target.value); clearStatus(); }}
                      placeholder="Describe what you observed — specific issue, suggestion, or adoption pattern..." required className={input} />
                  </div>

                  <button type="submit" disabled={submitStatus === 'loading'}
                    className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow transition-all duration-200 disabled:opacity-60 ${isDark ? 'bg-violet-600 text-white hover:bg-violet-700' : 'bg-green-700 text-white hover:bg-green-800'}`}>
                    {submitStatus === 'loading' ? (
                      <><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> Sending…</>
                    ) : (
                      <>Send Report to FW3 Team <PaperAirplaneIcon className="h-4 w-4 rotate-45" /></>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TechSupport;
