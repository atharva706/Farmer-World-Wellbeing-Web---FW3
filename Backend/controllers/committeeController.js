// controllers/committeeController.js (FINAL CORRECTED VERSION - ES Module)

// Import dependencies using ES Module syntax (Named Imports for local files)
import { VILLAGE_COMMITTEE_DATA, VOTED_FARMER_IDS } from '../models/db.js';

// ROUTE 1: COMMITTEE DATA
// Use 'export const' for Named Exports
export const getCommitteeData = (req, res) => {
    console.log(`[API] Fetching Market Committee data for ${req.params.villageId}`);
    res.status(200).json({
        ...VILLAGE_COMMITTEE_DATA,
        voters: Array.from(VOTED_FARMER_IDS),
    });
};

// ROUTE 2: CAST VOTE
// Use 'export const' for Named Exports
export const castVote = (req, res) => {
    const { candidateId, farmerId } = req.body;
    if (!candidateId || !farmerId)
        return res.status(400).json({ message: "Missing candidateId or farmerId" });

    if (VOTED_FARMER_IDS.has(farmerId))
        return res.status(403).json({ message: `Farmer ${farmerId} already voted.` });

    const candidate = VILLAGE_COMMITTEE_DATA.election.candidates.find(c => c.id === candidateId);
    if (!candidate)
        return res.status(404).json({ message: "Candidate not found." });

    candidate.votes += 1;
    VOTED_FARMER_IDS.add(farmerId);
    VILLAGE_COMMITTEE_DATA.voters.push(farmerId); // Keep array in sync for persistence check

    console.log(`[VOTE] ✅ ${farmerId} voted for ${candidate.name}`);
    res.status(200).json({
        success: true,
        message: `Vote recorded for ${candidate.name}`,
        newVoteCount: candidate.votes,
    });
};