// routes/appraisalRoutes.js

const express = require('express');
const router = express.Router();
const appraisalController = require('../controllers/appraisalController');

router.get('/appraisal', appraisalController.getAllAppraisals);
router.get('/appraisal/:claimId', appraisalController.getAppraisalById);
router.post('/appraisal', appraisalController.createAppraisal);

module.exports = router;
