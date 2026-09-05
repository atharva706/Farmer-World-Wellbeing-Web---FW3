import React, { useState, useEffect } from 'react';
import {
  UsersIcon,
  HandRaisedIcon,
  ScaleIcon,
  CalendarDaysIcon,
  MegaphoneIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/solid';
import { useTheme } from '../context/ThemeContext';
import Layout from '../Pages/Layout';

const fetchDealCommitteeData = async () => {
  await new Promise(r => setTimeout(r, 600));
  return {
    villageName: 'Shendurjane',
    stats: { activeListings: 24, tradesThisMonth: 11, registeredTraders: 87, haatuNextDate: '15 Jul 2026' },
    livestock: [
      { type: 'Bulls & Oxen',  emoji: '🐂', count: 8,  trend: '+3 this week' },
      { type: 'Cows & Calves', emoji: '🐄', count: 6,  trend: 'Stable' },
      { type: 'Goats',         emoji: '🐐', count: 7,  trend: '+1 today' },
      { type: 'Poultry',       emoji: '🐓', count: 3,  trend: 'New listings' },
    ],
    currentCommittee: [
      { id: 101, name: 'Pratap S. More',   role: 'Livestock Specialist', status: 'Elected', initials: 'PM' },
      { id: 102, name: 'Sarika K. Bhosle', role: 'Negotiation Lead',     status: 'Elected', initials: 'SB' },
      { id: 103, name: 'Dilip V. Raut',    role: 'Price Mediator',       status: 'Elected', initials: 'DR' },
    ],
    election: {
      status: 'Nomination Open',
      deadline: '2026-05-20',
      nominations: 5,
    },
  };
};

const DealCommitee = () => {
  const { isDark } = useTheme();
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const [nominated, setNominated] = useState(false);

  useEffect(() => {
    fetchDealCommitteeData()
      .then(d => { setData(d); setLoading(false); })
      .catch(() => { setError('Could not load Deal Committee data.'); setLoading(false); });
  }, []);

  const page = isDark ? 'bg-gradient-to-b from-slate-900 via-slate-800 to-gray-900' : 'bg-logo-blur';
  const card = isDark ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-gray-100 shadow-sm';

  if (loading) return (
    <Layout>
      <div className={`flex justify-center items-center min-h-[60vh] gap-3 ${isDark ? 'text-blue-400' : 'text-green-700'}`}>
        <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
        <p className="font-medium">Loading Deal Committee…</p>
      </div>
    </Layout>
  );

  if (error) return (
    <Layout>
      <div className="p-8 max-w-2xl mx-auto mt-12 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-center">
        <p className="font-bold text-xl mb-1">Failed to Load</p><p>{error}</p>
      </div>
    </Layout>
  );

  return (
    <Layout>
      <div className={`min-h-screen transition-colors duration-300 ${page}`}>

        {/* ── Hero ── */}
        <div className={`border-b ${isDark ? 'border-slate-800' : 'border-green-200/60'}`}>
          <div className="max-w-6xl mx-auto px-6 py-10">
            <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full inline-block mb-3 ${isDark ? 'bg-lime-900/40 text-lime-400 border border-lime-700/50' : 'bg-lime-100 text-lime-700 border border-lime-300'}`}>
              Deal Committee
            </span>
            <h1 className={`text-3xl md:text-4xl font-extrabold mb-2 ${isDark ? 'text-slate-100' : 'text-gray-900'}`}>
              🐄 Village Deal Committee
            </h1>
            <p className={`text-base max-w-xl ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
              <span className={`font-semibold ${isDark ? 'text-lime-400' : 'text-lime-700'}`}>{data.villageName} Village</span> · Fair livestock trade, price mediation, and Haat scheduling.
            </p>
          </div>
        </div>

        {/* ── Stats strip ── */}
        <div className={`border-b ${isDark ? 'border-slate-800' : 'border-green-200/60'}`}>
          <div className="max-w-6xl mx-auto px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { label: 'Active Listings',  val: data.stats.activeListings,   icon: '📋' },
              { label: 'Trades This Month',val: data.stats.tradesThisMonth,  icon: '🤝' },
              { label: 'Reg. Traders',     val: data.stats.registeredTraders, icon: '👥' },
              { label: 'Next Haat',        val: data.stats.haatuNextDate,    icon: '📅' },
            ].map(({ label, val, icon }) => (
              <div key={label} className={`rounded-xl p-3 ${isDark ? 'bg-slate-700/50' : 'bg-gray-50'}`}>
                <p className="text-xl mb-0.5">{icon}</p>
                <p className={`font-extrabold text-lg ${isDark ? 'text-slate-100' : 'text-gray-900'}`}>{val}</p>
                <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">

          {/* ── Livestock listings ── */}
          <div>
            <h2 className={`font-extrabold text-xl mb-4 flex items-center gap-2 ${isDark ? 'text-slate-100' : 'text-gray-900'}`}>
              <ScaleIcon className={`h-5 w-5 ${isDark ? 'text-lime-400' : 'text-lime-700'}`} />
              Current Livestock Listings
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {data.livestock.map(l => (
                <div key={l.type} className={`rounded-2xl p-5 border-2 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${isDark ? 'bg-slate-700/60 border-slate-600' : 'bg-white border-gray-100 shadow-sm'}`}>
                  <p className="text-3xl mb-3">{l.emoji}</p>
                  <p className={`font-bold text-sm ${isDark ? 'text-slate-100' : 'text-gray-900'}`}>{l.type}</p>
                  <p className={`text-3xl font-extrabold my-1 ${isDark ? 'text-lime-400' : 'text-lime-700'}`}>{l.count}</p>
                  <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>{l.trend}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">

            {/* ── Trade services ── */}
            <div className={`rounded-2xl overflow-hidden ${card}`}>
              <div className={`px-6 py-4 border-b flex items-center gap-2 ${isDark ? 'border-slate-700 bg-slate-700/50' : 'border-gray-100 bg-gray-50'}`}>
                <HandRaisedIcon className={`h-5 w-5 ${isDark ? 'text-lime-400' : 'text-lime-700'}`} />
                <h2 className={`font-extrabold text-base ${isDark ? 'text-slate-100' : 'text-gray-900'}`}>Trade Assistance Services</h2>
              </div>
              <div className="p-6 space-y-4">
                {[
                  { icon: '🩺', title: 'Health Certification', desc: 'Certified vet assessment before any trade is finalised.' },
                  { icon: '⚖️', title: 'Price Mediation', desc: 'Committee ensures fair market value — no exploitation.' },
                  { icon: '📅', title: 'Haat Scheduling', desc: 'Monthly local trade fairs with registered buyers & sellers.' },
                  { icon: '🤝', title: 'Negotiation Support', desc: 'Farmer-to-farmer and farmer-to-trader facilitation.' },
                ].map(({ icon, title, desc }) => (
                  <div key={title} className="flex items-start gap-3">
                    <span className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0 ${isDark ? 'bg-slate-700' : 'bg-lime-50'}`}>{icon}</span>
                    <div>
                      <p className={`font-semibold text-sm ${isDark ? 'text-slate-200' : 'text-gray-800'}`}>{title}</p>
                      <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Election card ── */}
            <div className={`rounded-2xl overflow-hidden ${card}`}>
              <div className={`px-6 py-4 border-b flex items-center justify-between ${isDark ? 'border-slate-700 bg-slate-700/50' : 'border-gray-100 bg-gray-50'}`}>
                <div className="flex items-center gap-2">
                  <CalendarDaysIcon className="h-5 w-5 text-yellow-600" />
                  <h2 className={`font-extrabold text-base ${isDark ? 'text-slate-100' : 'text-gray-900'}`}>Committee Election</h2>
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full animate-pulse ${isDark ? 'bg-yellow-900/40 text-yellow-400' : 'bg-yellow-100 text-yellow-800'}`}>
                  {data.election.status}
                </span>
              </div>
              <div className="p-6">
                <div className={`rounded-xl p-4 mb-5 ${isDark ? 'bg-slate-700/50' : 'bg-yellow-50'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <p className={`text-xs font-semibold uppercase tracking-wide ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Nominations so far</p>
                    <span className={`text-2xl font-extrabold ${isDark ? 'text-yellow-400' : 'text-yellow-700'}`}>{data.election.nominations}</span>
                  </div>
                  <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                    Deadline: <span className={`font-bold ${isDark ? 'text-yellow-400' : 'text-yellow-700'}`}>{data.election.deadline}</span>
                  </p>
                </div>

                <p className={`text-sm mb-5 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                  The Deal Committee is democratically elected by village farmers to ensure fair livestock trade and market operations.
                </p>

                {nominated ? (
                  <div className={`rounded-xl p-4 flex items-center gap-3 ${isDark ? 'bg-green-900/20 border border-green-700' : 'bg-green-50 border border-green-300'}`}>
                    <CheckCircleIcon className={`h-5 w-5 flex-shrink-0 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                    <p className={`text-sm font-semibold ${isDark ? 'text-green-400' : 'text-green-700'}`}>Nomination submitted successfully!</p>
                  </div>
                ) : (
                  <button onClick={() => setNominated(true)}
                    className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200 border-2 ${isDark ? 'border-yellow-600 text-yellow-400 hover:bg-yellow-900/20' : 'border-yellow-600 text-yellow-800 hover:bg-yellow-50'}`}>
                    <MegaphoneIcon className="h-4 w-4" /> Nominate a Farmer
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* ── Committee Members ── */}
          <div className={`rounded-2xl overflow-hidden ${card}`}>
            <div className={`px-6 py-4 border-b flex items-center gap-2 ${isDark ? 'border-slate-700 bg-slate-700/50' : 'border-gray-100 bg-gray-50'}`}>
              <UsersIcon className={`h-5 w-5 ${isDark ? 'text-blue-400' : 'text-green-700'}`} />
              <h2 className={`font-extrabold text-lg ${isDark ? 'text-slate-100' : 'text-gray-900'}`}>Current Deal Committee</h2>
            </div>
            <div className={`divide-y ${isDark ? 'divide-slate-700' : 'divide-gray-100'}`}>
              {data.currentCommittee.map(m => (
                <div key={m.id} className={`flex items-center gap-4 px-6 py-4 transition-colors duration-150 ${isDark ? 'hover:bg-slate-700/40' : 'hover:bg-gray-50'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-extrabold flex-shrink-0 ${isDark ? 'bg-lime-900/50 text-lime-400' : 'bg-lime-100 text-lime-700'}`}>
                    {m.initials}
                  </div>
                  <div className="flex-1">
                    <p className={`font-semibold text-sm ${isDark ? 'text-slate-100' : 'text-gray-900'}`}>{m.name}</p>
                    <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>{m.role}</p>
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${isDark ? 'bg-green-900/40 text-green-400' : 'bg-green-100 text-green-700'}`}>{m.status}</span>
                </div>
              ))}
            </div>
            <div className={`px-6 py-3 ${isDark ? 'bg-slate-700/30 border-t border-slate-700' : 'bg-gray-50 border-t border-gray-100'}`}>
              <p className={`text-xs italic ${isDark ? 'text-slate-600' : 'text-gray-400'}`}>
                The Deal Committee operates under the governance of the Market Committee.
              </p>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default DealCommitee;
