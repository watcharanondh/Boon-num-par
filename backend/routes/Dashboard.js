const express = require("express");
const router = express.Router();

const DashboardContrllers = require("../controllers/dashboard");

/* List All Quotations */
router.get("/showall", DashboardContrllers.List_All_Dashboard);

module.exports = router;
