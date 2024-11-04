const Policy = require('../models/Policy');

// Get all policies
exports.getPolicies = async (req, res) => {
  try {
    const policies = await Policy.find();
    res.json(policies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a policy by claimId
exports.getPolicyByClaimId = async (req, res) => {
  try {
    const policy = await Policy.findOne({ claimId: req.params.claimId });
    if (!policy) return res.status(404).json({ message: 'Policy not found' });
    res.json(policy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new policy
exports.createPolicy = async (req, res) => {
  const policyData = req.body;

  try {
    const policy = new Policy(policyData);
    await policy.save();
    res.status(201).json(policy);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
