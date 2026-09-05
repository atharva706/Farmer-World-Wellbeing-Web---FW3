// src/Components/TechSupport.jsx (CORRECTED)

import React, { useState } from 'react';
import logo from '../assets/Images/logo.png'
import { LightBulbIcon, AcademicCapIcon, ChatBubbleBottomCenterTextIcon, UserGroupIcon, PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

// --- CONFIGURATION ---
// Accessing the environment variable set in the .env file
const API_BASE_URL = import.meta.env.VITE_BACKEND_URI;


// --- TechSupport Component ---
const TechSupport = () => {
    // State for the feedback form (to be submitted by the Village Tech Team)
    const [feedbackType, setFeedbackType] = useState("Adoption Feedback");
    const [feedbackDetails, setFeedbackDetails] = useState("");
    const [villageTeamMember, setVillageTeamMember] = useState("");
    const [submitStatus, setSubmitStatus] = useState(null); // null, 'loading', 'success', 'error'
    const [errorMessage, setErrorMessage] = useState("");

    // Function to clear status messages when a user starts modifying the form
    const clearStatus = () => {
        if (submitStatus === 'success' || submitStatus === 'error') {
            setSubmitStatus(null);
            setErrorMessage("");
        }
    };

    // API call for feedback submission
    const handleSubmitFeedback = async (e) => {
        e.preventDefault();
        clearStatus(); // Clear any previous status before starting

        setSubmitStatus('loading');
        
        // Basic form validation
        if (!villageTeamMember.trim() || !feedbackDetails.trim()) {
            setSubmitStatus('error');
            setErrorMessage("Please ensure your Name/ID and the Details section are filled out.");
            return;
        }

        const feedbackData = { 
            feedbackType, 
            feedbackDetails, 
            villageTeamMember,
            villageName: "Shendurjane" // Mock/Context value for the village the team is serving
        };

        try {
            const response = await fetch(`${API_BASE_URL}/submit-tech-feedback`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(feedbackData),
            });

            if (!response.ok) {
                // --- CORRECTED ERROR HANDLING: Prevents 'Unexpected token <' by checking for JSON ---
                let errorDetail = `Server Error (${response.status} ${response.statusText}).`;

                try {
                    // Try to parse the response body as JSON (for clean server-side errors)
                    const errorData = await response.json();
                    errorDetail = errorData.message || errorDetail;
                } catch (e) {
                    // If parsing fails (e.g., receiving HTML 404 page), set a generic message
                    errorDetail = `Request failed: Backend URL might be incorrect (got a non-JSON response from ${response.url}).`;
                }
                
                throw new Error(errorDetail); 
                // ---------------------------------------------------------------------------------
            }
            
            // Success response
            setSubmitStatus('success');
            setFeedbackDetails("");
            setVillageTeamMember(""); 

        } catch (error) {
            console.error("Feedback submission failed:", error);
            setSubmitStatus('error');
            setErrorMessage(`Submission failed: ${error.message}`);
        }
    };

    // --- Component Structure (rest remains the same) ---
    return (
        <div className="min-h-screen bg-green-50 p-8">
            
            <div className="max-w-4xl mx-auto">
                
                {/* Header Section (Page Title) */}
                <header className="mb-10 text-center border-b-2 pb-4 border-green-200">
                    <div className="flex items-center justify-center text-green-700 mb-2">
                        <LightBulbIcon className="h-8 w-8 mr-2" />
                        <h1 className="text-4xl font-extrabold tracking-tight">
                            Village Tech Adoption Team
                        </h1>
                    </div>
                    <p className="text-xl text-gray-600">
                        Bridging the gap between the FW3 platform and the community.
                    </p>
                </header>

                {/* Grid for Information and Form */}
                <div className="grid md:grid-cols-2 gap-8">
                    
                    {/* 1. Tech Team Mission and Role */}
                    <div className="bg-white p-6 rounded-xl shadow-xl border-l-4 border-green-600 h-full">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                            <UserGroupIcon className="h-6 w-6 inline mr-2 text-green-600" />
                            Mission & Mandate
                        </h2>
                        
                        <p className="mt-4 text-gray-600">
                            This temporary team, composed of **selected village youth**, is vital for the successful launch of the FW3 platform. Their role is twofold:
                        </p>
                        
                        <ul className="mt-4 space-y-3 text-sm text-gray-700">
                            <li className="flex items-start">
                                <AcademicCapIcon className="h-5 w-5 mr-2 mt-1 text-green-500 flex-shrink-0" />
                                <div>
                                    <span className="font-semibold text-gray-900">Education & Onboarding:</span> Teaching farmers and villagers the initial use of the website and its core services.
                                </div>
                            </li>
                            <li className="flex items-start">
                                <ChatBubbleBottomCenterTextIcon className="h-5 w-5 mr-2 mt-1 text-green-500 flex-shrink-0" />
                                <div>
                                    <span className="font-semibold text-gray-900">Feedback Channel:</span> Providing real-world adoption feedback and bug reports to the main FW3 Tech Team (in urban/semi-rural areas).
                                </div>
                            </li>
                        </ul>
                        
                        <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-300">
                            <h3 className="font-semibold text-yellow-800">Termination Clause:</h3>
                            <p className="text-sm text-yellow-700">
                                This team is temporary and will be **terminated** once the community is proficient with the platform, ensuring the team is cost-effective and task-oriented.
                            </p>
                        </div>
                    </div>

                    {/* 2. Feedback and Issue Submission Form */}
                    <div className="bg-white p-6 rounded-xl shadow-2xl border-t-8 border-green-700">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">
                            Submit Feedback (For Village Team Only)
                        </h2>

                        {/* Status Messages */}
                        {submitStatus === 'success' && (
                            <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-100 border border-green-300">
                                Feedback submitted successfully! The main Tech Team has been notified by **email** and will review it shortly.
                            </div>
                        )}
                        {submitStatus === 'error' && (
                            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 border border-red-300">
                                <strong>Submission failed:</strong> {errorMessage || "Check your network connection or try again."}
                            </div>
                        )}
                        
                        <form onSubmit={handleSubmitFeedback} className="space-y-4">
                            
                            {/* Member Name */}
                            <div>
                                <label htmlFor="member" className="block text-sm font-medium text-gray-700 mb-1">Your Name / ID</label>
                                <input
                                    id="member"
                                    type="text"
                                    value={villageTeamMember}
                                    onChange={(e) => { setVillageTeamMember(e.target.value); clearStatus(); }}
                                    placeholder="e.g., Sunil Varma (Volunteer ID 45)"
                                    required
                                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-green-700 transition duration-200 shadow-sm"
                                />
                            </div>

                            {/* Feedback Type Selector */}
                            <div>
                                <label htmlFor="feedbackType" className="block text-sm font-medium text-gray-700 mb-1">Type of Report</label>
                                <select
                                    id="feedbackType"
                                    value={feedbackType}
                                    onChange={(e) => { setFeedbackType(e.target.value); clearStatus(); }}
                                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-green-700 transition duration-200 shadow-sm bg-white appearance-none"
                                >
                                    <option>Adoption Feedback</option>
                                    <option>Technical Bug Report</option>
                                    <option>Content Clarification Request</option>
                                    <option>Feature Request from Villagers</option>
                                </select>
                            </div>

                            {/* Details Text Area */}
                            <div>
                                <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-1">Details & Observations</label>
                                <textarea
                                    id="details"
                                    rows="4"
                                    value={feedbackDetails}
                                    onChange={(e) => { setFeedbackDetails(e.target.value); clearStatus(); }}
                                    placeholder="Describe the issue, common struggle, or suggestion observed..."
                                    required
                                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-green-700 transition duration-200 shadow-sm"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={submitStatus === 'loading'}
                                className="w-full bg-green-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 transition duration-200 disabled:bg-gray-400 disabled:shadow-none flex items-center justify-center"
                            >
                                {submitStatus === 'loading' ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        SENDING REPORT...
                                    </>
                                ) : (
                                    <>
                                        Submit Feedback to FW3 Tech Team <PaperAirplaneIcon className="h-5 w-5 ml-2 transform rotate-45" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                </div>
                
            </div>
        </div>
    );
};

// Export the component as default
export default TechSupport;