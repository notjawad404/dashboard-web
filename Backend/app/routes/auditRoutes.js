const express = require("express");
const router = express.Router();
const { createAudit, getAudits } = require("../controllers/auditController");

router.post("/audit", createAudit);
router.get("/audits", getAudits);

module.exports = router;
