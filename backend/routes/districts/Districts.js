const express = require("express");
const router = express.Router();
const authorize = require('../../middleware/authorize');

const DistrictContrllers = require("../../controllers/districts/districts");

/* List Find Province */
router.get("/findprovince", authorize, DistrictContrllers.List_Find_Province);
/* List Find Amphoe */
router.post("/findamphoe", authorize, DistrictContrllers.List_Find_Amphoe);
/* List Find District */
router.post("/finddistrict", authorize, DistrictContrllers.List_Find_District);

module.exports = router;
