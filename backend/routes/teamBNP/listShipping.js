const express = require("express");
const router = express.Router();
const authorize = require('../../middleware/authorize');

const ShippingContrllers = require("../../controllers/teamBNP/listShipping");

/* List All Shipping */
router.post("/listallshipping", authorize, ShippingContrllers.listAllShipping);

/* List One Shipping to See */
router.post("/listshippingtosee", authorize, ShippingContrllers.listShippingtoSee);

/* List Teams to Assign Shipping */
router.get("/listteamtoshipping", authorize, ShippingContrllers.listTeamstoAssignShipping);

/* Assign Team to Work */
router.post("/assignworkteam", authorize, ShippingContrllers.AssignWorkTeam);

module.exports = router;
