const Claim = require('../models/Claim');

// Get all claims
exports.getAllClaims = async (req, res) => {
  try {
    const claims = await Claim.find();
    res.status(201).json(claims);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single claim by ID
exports.getClaimById = async (req, res) => {
  try {
    const claim = await Claim.findById(req.params.id);
    if (claim == null) {
      return res.status(404).json({ message: 'Claim not found' });
    }
    res.json(claim);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new claim
exports.createClaim = async (req, res) => {
  const claim = new Claim(req.body);
  try {
    const newClaim = await claim.save();
    res.status(201).json(newClaim);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
