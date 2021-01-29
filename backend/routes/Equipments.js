const express = require("express");
const router = express.Router();

const EquipmentContrllers = require("../controllers/equipments");

/* List All Equipment */
router.get("/listallequipment", EquipmentContrllers.List_All_Equipments);

/* Create New Equipment */
router.post("/addnewequipment", EquipmentContrllers.Create_New_Equipments);

/* List Equipment to Edit*/
router.post("/listequipment", EquipmentContrllers.List_Equipments_to_Edit);

/* Edit Equipment */
router.put("/editequipment", EquipmentContrllers.Edit_Equipment);
/* Delete Equipment */
router.put("/delequipment", EquipmentContrllers.Delete_Equipment);

module.exports = router;
