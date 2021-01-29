const express = require("express");
const router = express.Router();

const PromotionsContrllers = require("../controllers/promotions");

/* List All Equipment */
router.get("/listallpromotions", PromotionsContrllers.List_All_Promotions);

/* Create New Equipment */
router.post("/addnewpromotion", PromotionsContrllers.Create_New_Promotions);

/* List Equipment to Edit*/
router.post("/listpromotions", PromotionsContrllers.List_Promotion_to_Edit);

/* Edit Equipment */
router.put("/editpromotion", PromotionsContrllers.Edit_Promotion);

/* Delete Equipment */
router.put("/delpromotion", PromotionsContrllers.Delete_Promotion);

module.exports = router;
