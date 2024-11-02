const Audit = require("../models/Audit");

exports.createAudit = async (req, res) => {
  try {
    const audit = new Audit(req.body);
    await audit.save();
    res.status(201).json(audit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAudits = async (req, res) => {
  try {
    const audits = await Audit.find();
    res.status(200).json(audits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
