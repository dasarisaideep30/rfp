const express = require('express');
const router = express.Router();
const aiController = require('../controllers/ai.controller');
const { authenticate, authorize } = require('../middleware/auth.middleware');

// POST analyze RFP Document
// Protected to ensure only authenticated users can run expensive AI models
router.post('/analyze-rfp', 
  authenticate,
  authorize('SOLUTION_ARCHITECT', 'PROPOSAL_MANAGER'),
  aiController.analyzeRFP
);

module.exports = router;
