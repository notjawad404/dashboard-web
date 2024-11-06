const Appraisal = require('../models/Appraisal');

// Get all appraisals
exports.getAllAppraisals = async (req, res) => {
    try {
        const appraisals = await Appraisal.find();
        res.json(appraisals);
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

// Get appraisal by claim ID
// Get appraisal by claim ID
exports.getAppraisalById = async (req, res) => {
    try {
        const appraisal = await Appraisal.findOne({ claimId: req.params.claimId });
        if (appraisal) {
            res.json(appraisal);
        } else {
            res.status(404).send('Appraisal not found');
        }
    } catch (error) {
        res.status(500).send('Server Error');
    }
};


// Add a new appraisal
exports.createAppraisal = async (req, res) => {
    try {
        const newAppraisal = new Appraisal(req.body);
        const savedAppraisal = await newAppraisal.save();
        res.status(201).json(savedAppraisal);
    } catch (error) {
        res.status(400).send('Error saving appraisal');
    }
};
