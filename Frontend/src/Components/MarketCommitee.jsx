import React, { useState, useEffect } from 'react';
import {
  UsersIcon,
  CheckBadgeIcon,
  AcademicCapIcon,
  ChartBarIcon,
  CalendarDaysIcon,
} from '@heroicons/react/24/solid';
import { useTheme } from '../context/ThemeContext';
import Layout from '../Pages/Layout';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URI;
const MOCK_FARMER_ID = 'FARM101';

const fetchCommitteeData = async (villageId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/committee-data/${villageId}`);
    if (!response.ok) throw new Error('Server error');
    return response.json();
  } catch {
    return {
      villageName: 'Kumtha',
      stats: { totalFarmers: 342, votescast: 215, schemesActive: 4, lastElection: 'Oct 2024' },
      currentCommittee: [
        { id: 1, name: 'Suresh P. Mali',       role: 'Chairman',  status: 'Elected (2024-2026)', initials: 'SM' },
        { id: 2, name: 'Lata V. Patil',        role: 'Secretary', status: 'Elected (2024-2026)', initials: 'LP' },
        { id: 3, name: 'Ramesh D. Kulkarni',   role: 'Member',    status: 'Elected (2024-2026)', initials: 'RK' },
      ],
      election: {
        status: 'Active',
        date: '2025-10-30',
        candidates: [
          { id: 'CAND_A', name: 'Anand M. Shinde',  platform: 'Water Management Focus',   votes: 152 },
          { id: 'CAND_B', name: 'Priya K. Deshmukh', platform: 'Crop Insurance Reform',    votes: 198 },
          { id: 'CAND_C', name: 'Vijay R. Jadhav',  platform: 'Direct Market Access',     votes: 105 },
        ],
      },
    };
  }
};

const postVote = async (candidateId, farmerId) => {
  const response = await fetch(`${API_BASE_URL}/cast-vote`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ candidateId, farmerId }),
  });
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || 'Vote failed.');
  }
  return response.json();
};

const MarketCommitee = () => {
  const { isDark } = useTheme();
  const [data, setData]               = useState(null);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);
  const [isLoggedIn]                  = useState(true);
  const [hasVoted, setHasVoted]       = useState(false);
  const [selected, setSelected]       = useState(null);
  const [voteMsg, setVoteMsg]         = useState(null);
  const [voteLoading, setVoteLoading] = useState(false);

  useEffect(() => {
    fetchCommitteeData('123')
      .then(d => { setData(d); if (d.voters?.includes(MOCK_FARMER_ID)) setHasVoted(true); setLoading(false); })
      .catch(() => { setError('Could not load committee information.'); setLoading(false); });
  }, []);

  const handleVote = async (e) => {
    e.preventDefault();
    if (!selected) return setVoteMsg({ ok: false, text: 'Please select a candidate first.' });
    setVoteLoading(true); setVoteMsg(null);
    try {
      const result = await postVote(selected.id, MOCK_FARMER_ID);
      setHasVoted(true);
      setVoteMsg({ ok: true, text: result.message });
      setData(prev => ({
        ...prev,
        election: { ...prev.election, candidates: prev.election.candidates.map(c => c.id === selected.id ? { ...c, votes: result.newVoteCount } : c) },
      }));
    } catch (err) {
      setVoteMsg({ ok: false, text: err.message });
    } finally {
      setVoteLoading(false);
    }
  };

  const page = isDark ? 'bg-gradient-to-b from-slate-900 via-slate-800 to-gray-900' : 'bg-logo-blur';
  const card = isDark ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-gray-100 shadow-sm';

  if (loading && !data) return (
    <Layout>
      <div className={`flex justify-center items-center min-h-[60vh] gap-3 ${isDark ? 'text-blue-400' : 'text-green-700'}`}>
        <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
        <p className="font-medium">Loading Market Committee Data…</p>
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

  const totalVotes = data.election.candidates.reduce((s, c) => s + c.votes, 0);

  return (
    <Layout>
      <div className={`min-h-screen transition-colors duration-300 ${page}`}>

        {/* ── Hero ── */}
        <div className={`border-b ${isDark ? 'border-slate-800' : 'border-green-200/60'}`}>
          <div className="max-w-6xl mx-auto px-6 py-10">
            <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full inline-block mb-3 ${isDark ? 'bg-amber-900/40 text-amber-400 border border-amber-700/50' : 'bg-amber-100 text-amber-700 border border-amber-300'}`}>
              Market Committee
            </span>
            <h1 className={`text-3xl md:text-4xl font-extrabold mb-2 ${isDark ? 'text-slate-100' : 'text-gray-900'}`}>
              📊 Village Market Committee
            </h1>
            <p className={`text-base max-w-xl ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
              <span className={`font-semibold ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>{data.villageName} Village</span> · Ensuring fair pricing (Hamibhav) for every farmer's produce.
            </p>
          </div>
        </div>

        {/* ── Stats strip ── */}
        <div className={`border-b ${isDark ? 'border-slate-800' : 'border-green-200/60'}`}>
          <div className="max-w-6xl mx-auto px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { label: 'Registered Farmers', val: data.stats.totalFarmers, icon: '👨‍🌾' },
              { label: 'Votes Cast',          val: data.stats.votescast,    icon: '🗳️' },
              { label: 'Active Schemes',      val: data.stats.schemesActive,icon: '📋' },
              { label: 'Last Election',       val: data.stats.lastElection, icon: '📅' },
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

          {/* ── Voting Section ── */}
          <div className={`rounded-2xl overflow-hidden ${card}`}>
            <div className={`px-6 py-4 border-b flex items-center justify-between ${isDark ? 'border-slate-700 bg-slate-700/50' : 'border-gray-100 bg-gray-50'}`}>
              <div className="flex items-center gap-2">
                <AcademicCapIcon className={`h-5 w-5 ${isDark ? 'text-blue-400' : 'text-green-700'}`} />
                <h2 className={`font-extrabold text-lg ${isDark ? 'text-slate-100' : 'text-gray-900'}`}>Election Voting Portal</h2>
              </div>
              <div className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full ${isDark ? 'bg-green-900/40 text-green-400' : 'bg-green-100 text-green-700'}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block" />
                {data.election.status}
              </div>
            </div>

            <div className="p-6">
              {!isLoggedIn ? (
                <div className={`rounded-xl p-5 border border-yellow-300 ${isDark ? 'bg-yellow-900/20 text-yellow-300' : 'bg-yellow-50 text-yellow-800'}`}>
                  <p className="font-bold mb-1">Voting Access Restricted</p>
                  <p className="text-sm">Please log in as a registered farmer to participate.</p>
                </div>
              ) : hasVoted ? (
                <div>
                  <div className={`flex items-center gap-2 mb-5 ${isDark ? 'text-green-400' : 'text-green-700'}`}>
                    <CheckBadgeIcon className="h-6 w-6" />
                    <span className="font-extrabold text-lg">Thank you — your vote is secured!</span>
                  </div>
                  <div className="space-y-4">
                    {data.election.candidates.map(c => {
                      const pct = totalVotes ? Math.round((c.votes / totalVotes) * 100) : 0;
                      return (
                        <div key={c.id}>
                          <div className="flex items-center justify-between mb-1.5">
                            <div>
                              <span className={`font-semibold text-sm ${isDark ? 'text-slate-200' : 'text-gray-800'}`}>{c.name}</span>
                              <span className={`ml-2 text-xs ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>{c.platform}</span>
                            </div>
                            <span className={`text-sm font-bold ${isDark ? 'text-blue-300' : 'text-green-700'}`}>{pct}%</span>
                          </div>
                          <div className={`h-2.5 rounded-full overflow-hidden ${isDark ? 'bg-slate-700' : 'bg-gray-100'}`}>
                            <div className={`h-full rounded-full transition-all duration-700 ${isDark ? 'bg-blue-500' : 'bg-green-600'}`} style={{ width: `${pct}%` }} />
                          </div>
                          <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>{c.votes} votes</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <form onSubmit={handleVote}>
                  {voteMsg && (
                    <div className={`mb-4 rounded-xl px-4 py-3 text-sm font-medium ${voteMsg.ok ? (isDark ? 'bg-green-900/30 text-green-400' : 'bg-green-50 text-green-700') : (isDark ? 'bg-red-900/30 text-red-400' : 'bg-red-50 text-red-700')}`}>
                      {voteMsg.text}
                    </div>
                  )}
                  <p className={`text-sm mb-4 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                    Select your preferred candidate for the {data.villageName} Market Committee:
                  </p>
                  <div className="space-y-3 mb-5">
                    {data.election.candidates.map(c => (
                      <label key={c.id} className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-150 ${
                        selected?.id === c.id
                          ? (isDark ? 'border-blue-500 bg-blue-900/20 ring-2 ring-blue-500/20' : 'border-green-500 bg-green-50 ring-2 ring-green-200')
                          : (isDark ? 'border-slate-600 hover:border-slate-500 hover:bg-slate-700/40' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50')
                      }`}>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors duration-150 ${
                          selected?.id === c.id ? (isDark ? 'border-blue-400 bg-blue-500' : 'border-green-600 bg-green-600') : (isDark ? 'border-slate-500' : 'border-gray-300')
                        }`}>
                          {selected?.id === c.id && <span className="w-2 h-2 rounded-full bg-white block" />}
                        </div>
                        <input type="radio" name="candidate" value={c.id} checked={selected?.id === c.id} onChange={() => setSelected(c)} className="sr-only" />
                        <div>
                          <p className={`font-bold text-sm ${isDark ? 'text-slate-100' : 'text-gray-900'}`}>{c.name}</p>
                          <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Platform: {c.platform}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                  <button type="submit" disabled={voteLoading || !selected}
                    className={`w-full py-3 rounded-xl font-extrabold text-sm tracking-wide transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2 ${isDark ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-green-700 text-white hover:bg-green-800'}`}>
                    {voteLoading ? <><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> Casting Vote…</> : '🗳️ Cast My Vote'}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* ── Committee Members ── */}
          <div className={`rounded-2xl overflow-hidden ${card}`}>
            <div className={`px-6 py-4 border-b flex items-center gap-2 ${isDark ? 'border-slate-700 bg-slate-700/50' : 'border-gray-100 bg-gray-50'}`}>
              <UsersIcon className={`h-5 w-5 ${isDark ? 'text-blue-400' : 'text-green-700'}`} />
              <h2 className={`font-extrabold text-lg ${isDark ? 'text-slate-100' : 'text-gray-900'}`}>Current Committee Members</h2>
              <div className="ml-auto flex items-center gap-1.5">
                <CalendarDaysIcon className={`h-4 w-4 ${isDark ? 'text-slate-500' : 'text-gray-400'}`} />
                <span className={`text-xs ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>Term ends {data.election.date}</span>
              </div>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-slate-700">
              {data.currentCommittee.map((m, i) => (
                <div key={m.id} className={`flex items-center gap-4 px-6 py-4 transition-colors duration-150 ${isDark ? 'hover:bg-slate-700/40' : 'hover:bg-gray-50'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-extrabold flex-shrink-0 ${
                    i === 0 ? (isDark ? 'bg-amber-900/50 text-amber-400' : 'bg-amber-100 text-amber-700')
                    : (isDark ? 'bg-slate-700 text-slate-300' : 'bg-gray-100 text-gray-600')
                  }`}>
                    {m.initials}
                  </div>
                  <div className="flex-1">
                    <p className={`font-semibold text-sm ${isDark ? 'text-slate-100' : 'text-gray-900'}`}>{m.name}</p>
                    <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>{m.role}</p>
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${isDark ? 'bg-slate-700 text-slate-400' : 'bg-gray-100 text-gray-500'}`}>{m.status}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default MarketCommitee;
