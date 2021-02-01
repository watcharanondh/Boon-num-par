const express = require("express");
const router = express.Router();
const authorize = require('../middleware/authorize');

const DashboardContrllers = require("../controllers/dashboard");

/* List All Quotations */
router.get("/showall", authorize, DashboardContrllers.listAllDashboard);

module.exports = router;
