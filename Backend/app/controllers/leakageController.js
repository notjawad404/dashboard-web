const Leakage = require("../models/Leakage");

exports.createLeakage = async (req, res) => {
  try {
    const leakage = new Leakage(req.body);
    await leakage.save();
    res.status(201).json(leakage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getLeakages = async (req, res) => {
  try {
    const leakages = await Leakage.find();
    res.status(200).json(leakages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateLeakage = async (req, res) => {
  const leakageId = req.params.id;
  try {
    const updatedLeakage = await Leakage.findByIdAndUpdate(leakageId, req.body, {
      new: true, // Returns the updated document
      runValidators: true, // Enforces schema validation
    });
    if (!updatedLeakage) {
      return res.status(404).json({ message: "Leakage not found" });
    }
    res.status(200).json(updatedLeakage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};