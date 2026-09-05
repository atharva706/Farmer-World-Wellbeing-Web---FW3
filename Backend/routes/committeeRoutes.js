// routes/committeeRoutes.js (Final Corrected Version)

import express from "express"
// 🎯 FIX: Use Named Imports {} since controller functions now use 'export const'
import { getCommitteeData, castVote } from '../controllers/committeeController.js'; 
// Use Named Import {} since middleware now uses 'export const'

const router = express.Router();

export default router;