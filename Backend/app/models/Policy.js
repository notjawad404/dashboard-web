const mongoose = require('mongoose');

const policySchema = new mongoose.Schema({
  policyNumber: String,
  policyHolder: String,
  policyType: String,
  premium: Number,
  effectiveDate: Date,
  expirationDate: Date,
  coverageDetails: String,
  insuredItems: String,
  upgrades: String,
  internalTags: String,
  claimId: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Policy', policySchema);
