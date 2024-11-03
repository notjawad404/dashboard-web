const mongoose = require("mongoose");

const claimSchema = new mongoose.Schema({
  claimNo: { type: String, required: true, },
  claimAmount: { type: Number, required: true, },
  claimType: { type: String, required: true },
  claimHandler: { type: String, required: true },
  claimDate: { type: Date, required: true },
  reportDate: { type: Date },
  description: { type: String },
  notes: { type: String },
  resolutionTimelineEstimate: { type: String },
  paymentsMade: { type: String },
  reports: {
    policeReport: { type: Boolean, default: false },
    witnessReport: { type: Boolean, default: false },
    medicalReport: { type: Boolean, default: false },
    appraisalReport: { type: Boolean, default: false },
  },
  claimLocation: { type: String },
  "internalTags": { type: String }
});

module.exports = mongoose.model("Claim", claimSchema);
