const express = require("express");
const router = express.Router();
const authorize = require('../middleware/authorize');

const PromotionsContrllers = require("../controllers/promotions");

/* List All Equipment */
router.get("/listallpromotions", authorize, PromotionsContrllers.listAllPromotions);

/* Create New Equipment */
router.post("/addnewpromotion", authorize, PromotionsContrllers.createNewPromotion);

/* List Equipment to Edit*/
router.post("/listpromotions", authorize, PromotionsContrllers.listPromotionToEdit);

/* Edit Equipment */
router.post("/editpromotion", authorize, PromotionsContrllers.editPromotion);

/* Delete Equipment */
router.post("/delpromotion", authorize, PromotionsContrllers.deletePromotion);

module.exports = router;
