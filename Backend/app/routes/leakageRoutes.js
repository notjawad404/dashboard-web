const express = require("express");
const router = express.Router();
const { createLeakage, getLeakages, updateLeakage } = require("../controllers/leakageController");

// Route to create a new leakage
router.post("/leakage", createLeakage);

// Route to get all leakages
router.get("/leakages", getLeakages);

// Route to update a leakage by ID
router.put("/leakages/:id", updateLeakage);

module.exports = router;


