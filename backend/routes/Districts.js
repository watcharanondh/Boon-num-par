const express = require("express");
const router = express.Router();

const DistrictContrllers = require("../controllers/districts");

/* List Find Province */
router.post("/findprovince", DistrictContrllers.List_Find_Province);
/* List Find Amphoe */
router.post("/findamphoe", DistrictContrllers.List_Find_Amphoe);
/* List Find District */
router.post("/finddistrict", DistrictContrllers.List_Find_District);

module.exports = router;
