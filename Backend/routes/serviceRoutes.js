// routes/serviceRoutes.js (FINAL FIX: Authentication Middleware Permanently Removed)

import express from 'express';
const router = express.Router(); 

// Import the entire controller object
import * as serviceController from '../controllers/serviceController.js'; 

// 🚨 REMOVE the import for authentication middleware:
// import { authenticateToken } from '../middlewares/auth.js'; 

// NOTE: All routes are now UNPROTECTED.
router.post(
  '/book-appointment', 
  // REMOVED: authenticateToken, 
  serviceController.bookAppointment
);

router.post(
  '/emergency-trigger', 
  // 🚨 CRITICAL FIX: REMOVE 'authenticateToken' from here 
  serviceController.emergencyTrigger
);

router.post(
  '/submit-tech-feedback', 
  // REMOVED: authenticateToken, 
  serviceController.submitTechFeedback
);

export default router;