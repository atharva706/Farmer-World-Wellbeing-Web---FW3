import React, { useState, useEffect } from 'react';
import {
  UsersIcon,
  CheckBadgeIcon,
  ChartBarIcon,
  CalendarDaysIcon,
  ArrowRightIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/solid';
import logo from '../assets/Images/logo.png';

// My Header
function Header() {
  return (
    <header
      className="sticky top-0 z-50 bg-gradient-to-r from-green-900 via-green-800 to-emerald-700 
                 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.3)] border-b border-green-600"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6 md:px-10">
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="FW3 Logo"
            className="h-[70px] w-[70px] rounded-full border-2 border-yellow-400 
                       hover:shadow-[0_0_20px_rgba(255,255,100,0.6)] transition-transform 
                       duration-500 hover:scale-110 cursor-pointer"
          />
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight font-inter text-white">
            <span className="text-yellow-300 drop-shadow-[0_0_6px_rgba(255,255,100,0.7)]">
              Farmer World
            </span>{' '}
            <span className="text-green-200">Wellbeing Web</span>{' '}
            <span className="text-yellow-400">FW3</span>
          </h1>
        </div>

        <nav className="hidden md:flex items-center gap-10 text-lg font-semibold text-green-50">
          {['Home', 'About', 'Contact'].map((item) => (
            <a
              key={item}
              href={`/${item.toLowerCase()}`}
              className="relative group transition-all duration-300 hover:text-yellow-300"
            >
              {item}
              <span
                className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-400 rounded-full 
                           transition-all duration-300 group-hover:w-full"
              ></span>
            </a>
          ))}
        </nav>

        <div className="md:hidden text-yellow-400 cursor-pointer hover:scale-110 transition-transform duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </div>
      </div>
    </header>
  );
}

// --- CONFIGURATION & API FUNCTIONS ---
const API_BASE_URL = import.meta.env.VITE_BACKEND_URI;
const MOCK_FARMER_ID = 'FARM101';

// Fetch committee data from backend or fallback to mock
const fetchCommitteeData = async (villageId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/committee-data/${villageId}`);
    if (!response.ok) throw new Error('Server error');
    return response.json();
  } catch {
    // Fallback mock data
    return {
      villageName: 'Kumtha',
      currentCommittee: [
        { id: 1, name: 'Suresh P. Mali', role: 'Chairman', status: 'Elected (2024-2026)' },
        { id: 2, name: 'Lata V. Patil', role: 'Secretary', status: 'Elected (2024-2026)' },
        { id: 3, name: 'Ramesh D. Kulkarni', role: 'Member', status: 'Elected (2024-2026)' },
      ],
      election: {
        status: 'Active',
        date: '2025-10-30',
        candidates: [
          { id: 'CAND_A', name: 'Anand M. Shinde', platform: 'Water Management Focus', votes: 152 },
          { id: 'CAND_B', name: 'Priya K. Deshmukh', platform: 'Crop Insurance Reform', votes: 198 },
          { id: 'CAND_C', name: 'Vijay R. Jadhav', platform: 'Direct Market Access', votes: 105 },
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
    const errorData = await response.json();
    throw new Error(errorData.message || 'Vote failed due to a server error.');
  }

  return response.json();
};

// --- MAIN COMPONENT ---
const MarketCommitee = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [hasVoted, setHasVoted] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [voteMessage, setVoteMessage] = useState(null);

  const handleVote = async (e) => {
    e.preventDefault();
    if (!selectedCandidate)
      return setVoteMessage({ success: false, text: 'Please select a candidate.' });

    if (!isLoggedIn)
      return setVoteMessage({ success: false, text: 'Login required to vote.' });

    setLoading(true);
    setVoteMessage(null);

    try {
      const result = await postVote(selectedCandidate.id, MOCK_FARMER_ID);
      setHasVoted(true);
      setVoteMessage({ success: true, text: result.message });
      setData((prev) => ({
        ...prev,
        election: {
          ...prev.election,
          candidates: prev.election.candidates.map((c) =>
            c.id === selectedCandidate.id ? { ...c, votes: result.newVoteCount } : c
          ),
        },
      }));
    } catch (err) {
      setVoteMessage({ success: false, text: `Vote failed: ${err.message}` });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const villageId = '123';
    fetchCommitteeData(villageId)
      .then((data) => {
        setData(data);
        if (data.voters && data.voters.includes(MOCK_FARMER_ID)) setHasVoted(true);
        setLoading(false);
      })
      .catch(() => {
        setError('Could not load committee information.');
        setLoading(false);
      });
  }, []);

  if (loading && !data)
    return (
      <div className="flex justify-center items-center min-h-[50vh] text-green-700">
        <svg className="animate-spin h-8 w-8 mr-3 text-green-700" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 
            5.291A7.962 7.962 0 014 12H0c0 
            3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <p className="text-lg font-medium">Loading Market Committee Data...</p>
      </div>
    );

  if (error)
    return (
      <div className="p-8 text-center bg-red-100 border-l-4 border-red-700 text-red-800 rounded-lg shadow-md max-w-4xl mx-auto">
        <p className="font-bold text-xl">Error Loading Data</p>
        <p>{error}</p>
      </div>
    );

  const renderElectionCard = () => {
    if (!isLoggedIn)
      return (
        <div className="bg-yellow-50 p-6 rounded-xl shadow-md border-l-4 border-yellow-600 text-yellow-800">
          <h3 className="font-bold text-xl mb-1">Voting Access Restricted</h3>
          <p className="text-sm">Please log in as a registered farmer to participate.</p>
        </div>
      );

    if (hasVoted) {
      const totalVotes = data.election.candidates.reduce((sum, c) => sum + c.votes, 0);
      return (
        <div className="bg-green-50 p-6 rounded-xl shadow-md border-l-4 border-green-600">
          <h3 className="text-2xl font-bold text-green-700 mb-4 flex items-center">
            <CheckBadgeIcon className="h-6 w-6 mr-2" />
            Thank You! Your Vote Is Secured.
          </h3>
          {voteMessage?.success && (
            <div className="p-3 mb-4 text-sm rounded-lg bg-green-100 text-green-800 font-semibold">
              {voteMessage.text}
            </div>
          )}
          <ul className="space-y-3">
            {data.election.candidates.map((c) => (
              <li key={c.id}>
                <span className="font-semibold">{c.name}</span>
                <div className="mt-1 flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-green-600 h-2.5 rounded-full"
                      style={{ width: `${(c.votes / totalVotes) * 100}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-xs font-medium text-gray-700 w-10 text-right">
                    {Math.round((c.votes / totalVotes) * 100) || 0}%
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      );
    }

    return (
      <div className="bg-white p-6 rounded-xl shadow-2xl border-t-8 border-green-700">
        <h2 className="text-2xl font-bold text-gray-800 mb-5 flex items-center">
          <AcademicCapIcon className="h-7 w-7 mr-2 text-green-700" />
          Market Committee Voting Portal
        </h2>
        <form onSubmit={handleVote} className="space-y-4">
          {data.election.candidates.map((c) => (
            <label
              key={c.id}
              className={`flex items-center p-4 border rounded-lg cursor-pointer transition duration-150 ${
                selectedCandidate?.id === c.id
                  ? 'border-green-600 ring-2 ring-green-500 bg-green-50'
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              <input
                type="radio"
                name="candidate"
                value={c.id}
                checked={selectedCandidate?.id === c.id}
                onChange={() => setSelectedCandidate(c)}
                className="h-5 w-5 text-green-600 border-gray-300 focus:ring-green-500"
              />
              <div className="ml-3">
                <p className="font-semibold text-lg text-gray-800">{c.name}</p>
                <p className="text-sm text-gray-500">Platform: {c.platform}</p>
              </div>
            </label>
          ))}
          <button
            type="submit"
            disabled={loading || !selectedCandidate}
            className="w-full mt-6 bg-green-700 text-white font-extrabold uppercase py-3 rounded-lg shadow-lg hover:bg-green-800"
          >
            {loading ? 'CASTING VOTE...' : 'CAST MY VOTE'}
          </button>
        </form>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-green-100 p-8">
      <Header />
      <div className="max-w-4xl mx-auto">
        <header className="mb-10 text-center border-b-2 pb-4 border-green-200">
          <div className="flex items-center justify-center text-green-700 mb-2">
            <UsersIcon className="h-8 w-8 mr-2" />
            <h1 className="text-4xl font-extrabold tracking-tight">
              Village Market Committee
            </h1>
          </div>
          <p className="text-xl text-gray-600">
            {data.villageName} Village | Ensuring Farmer Profitability (
            <span className="font-semibold text-green-700">Hamibhav</span>)
          </p>
        </header>

        <div className="mb-10">{renderElectionCard()}</div>
      </div>
    </div>
  );
};

export default MarketCommitee;
