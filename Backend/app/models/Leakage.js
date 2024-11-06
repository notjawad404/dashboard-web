const mongoose = require("mongoose");

const leakageSchema = new mongoose.Schema({
  leakageId: { type: String, required: true },
  leakageType: { type: String, required: true },
  modelScore: { type: Number, required: true },
  estimateSavings: { type: Number, required: true },
  observations: { type: String },
  urgency: { type: String, enum: ["low", "medium", "high"], required: true },
  status: { type: String, enum: ["pending", "confirm", "rejected"], required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Leakage", leakageSchema);


