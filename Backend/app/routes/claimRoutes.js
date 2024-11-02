const express = require('express');
const router = express.Router();
const claimController = require('../controllers/claimController');

router.get('/claims', claimController.getAllClaims);
router.get('/claims/:id', claimController.getClaimById);
router.post('/claims', claimController.createClaim);

module.exports = router;
