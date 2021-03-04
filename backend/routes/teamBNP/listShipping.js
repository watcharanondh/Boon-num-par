const express = require("express");
const router = express.Router();
const authorize = require('../../middleware/authorize');

const ShippingContrllers = require("../../controllers/teamBNP/listShipping");

/* List All Shipping */
router.get("/listallshipping", authorize, ShippingContrllers.listAllShipping);

/* List Teams to Assign Shipping */
router.get("/listteamtoshipping", authorize, ShippingContrllers.listTeamstoAssignShipping);

module.exports = router;
