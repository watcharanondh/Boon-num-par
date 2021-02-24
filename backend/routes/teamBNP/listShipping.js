const express = require("express");
const router = express.Router();
const authorize = require('../../middleware/authorize');

const ShippingContrllers = require("../../controllers/teamBNP/listShipping");

/* List All Shipping */
router.get("/listallshipping", authorize, ShippingContrllers.listAllShipping);

module.exports = router;
