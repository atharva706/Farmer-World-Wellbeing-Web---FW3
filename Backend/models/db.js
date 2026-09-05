// models/db.js (FINAL CORRECTED VERSION - ES Module Exports)

export const VILLAGE_COMMITTEE_DATA = { // Use 'export const'
    villageName: "Shendurjane",
    currentCommittee: [
        { id: 1, name: "Suresh P. Mali", role: "Chairman", status: "Elected (2024-2026)" },
        { id: 2, name: "Lata V. Patil", role: "Secretary", status: "Elected (2024-2026)" },
        { id: 3, name: "Ramesh D. Kulkarni", role: "Member", status: "Elected (2024-2026)" },
    ],
    election: {
        status: "Active",
        date: "2025-10-30",
        candidates: [
            { id: 'CAND_A', name: "Anand M. Shinde", platform: "Water Management Focus", votes: 152 },
            { id: 'CAND_B', name: "Priya K. Deshmukh", platform: "Crop Insurance Reform", votes: 198 },
            { id: 'CAND_C', name: "Vijay R. Jadhav", platform: "Direct Market Access", votes: 105 },
        ]
    },
    voters: ['FARM102']
};

export let VOTED_FARMER_IDS = new Set(VILLAGE_COMMITTEE_DATA.voters); // Use 'export let' (since it's modified)
export const TECHNICAL_FEEDBACK_LOG = []; // Use 'export const'
export const USER_DB = []; // Use 'export const'


// --- CRITICAL FIX: GOVT_RECIPIENTS must be an object of recipient objects ---
export const GOVT_RECIPIENTS = { // Use 'export const'
    // Tehsildar (Example SMS Recipient)
    tehsildar: { 
        email: "atharvak706@gmail.com", 
        phone: '9689722003', // MOCK PHONE NUMBER (replace with real number)
        role: "Tehsildar" 
    },
    // Police (Example SMS Recipient)
    police_patil: { 
        email: "2022bec014@sggs.ac.in", 
        phone: '9518916651', // MOCK PHONE NUMBER (replace with real number)
        role: "Police" 
    },
    // State Gov Disaster Cell (Example Email Recipient, excluded from SMS in controller)
    stateGov: { 
        email: "kulkarnibandhuu@gmail.com", 
        phone: '7709802706', // MOCK PHONE NUMBER
        role: "State Gov Disaster Cell" 
    }
};

// --- Standard Mocks for Tech Leads and single contacts (emails can be real) ---
export const FW3_TECH_LEAD = { email: "atharvak706@gmail.com", role: "FW3 Tech Lead" }; // Use 'export const'
export const OFFICERS_DATA = { email: "2022bec014@sggs.ac.in", role: "FW3 Tech Lead" }; // Use 'export const'

// Soil Testing Officers with their email addresses
export const SOIL_TESTING_OFFICERS = {
    "Yogesh Kadam":      { email: "yogeshkadam@gmail.com",       role: "Soil Testing Officer" },
    "Atharva Kulkarni":  { email: "atharvak706@gmail.com",       role: "Soil Testing Officer" },
    "Rupali Shirnath":   { email: "rupalishinath@gmail.com",     role: "Soil Testing Officer" },
    "Ankit Khamitkar":   { email: "ankitkhamitkar@gmail.com",    role: "Soil Testing Officer" },
};
export const FARMER_DATABASE = { email: "adityakulkarni2608@gmail.com", role: "FW3 Tech Lead" }; // Use 'export const'