const mongoose = require("mongoose");

const auditSchema = new mongoose.Schema({
  leakageId: { type: String, required: true },
  auditorId: { type: String, required: true },
  actualSavings: { type: Number, required: true },
  pendingSavings: { type: Number, required: true },
  note: { type: String },
});

module.exports = mongoose.model("Audit", auditSchema);
