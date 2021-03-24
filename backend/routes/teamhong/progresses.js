const express = require("express");
const router = express.Router();
const authorize = require('../../middleware/authorize');

const ProgressesContrllers = require("../../controllers/teamhong/progresses");

/* List All Shipping */
router.post("/listtask", authorize, ProgressesContrllers.listTask);

/* List One Shipping to See */
router.post("/listchart", authorize, ProgressesContrllers.listChart);

module.exports = router;
