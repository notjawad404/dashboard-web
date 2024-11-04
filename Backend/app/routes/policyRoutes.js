// routes/policyRoutes.js
const express = require('express');
const router = express.Router();
const policyController = require('../controllers/policyController');

// Route to get all policies
router.get('/policy', policyController.getPolicies);

// Route to get a specific policy by ID
router.get('/policy/:claimId', policyController.getPolicyByClaimId);

// Route to create a new policy
router.post('/policy', policyController.createPolicy);

module.exports = router;
