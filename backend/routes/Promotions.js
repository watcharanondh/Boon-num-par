const express = require("express");
const router = express.Router();

const PromotionsContrllers = require("../controllers/promotions");

/* List All Equipment */
router.get("/listallpromotions", PromotionsContrllers.listAllPromotions);

/* Create New Equipment */
router.post("/addnewpromotion", PromotionsContrllers.createNewPromotion);

/* List Equipment to Edit*/
router.post("/listpromotions", PromotionsContrllers.listPromotionToEdit);

/* Edit Equipment */
router.put("/editpromotion", PromotionsContrllers.editPromotion);

/* Delete Equipment */
router.put("/delpromotion", PromotionsContrllers.deletePromotion);

module.exports = router;
