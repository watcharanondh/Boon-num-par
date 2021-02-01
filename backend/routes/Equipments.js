const express = require("express");
const router = express.Router();

const EquipmentContrllers = require("../controllers/equipments");

/* List All Equipment */
router.get("/listallequipment", EquipmentContrllers.listAllEquipments);

/* Create New Equipment */
router.post("/addnewequipment", EquipmentContrllers.createNewEquipment);

/* List Equipment to Edit*/
router.post("/listequipment", EquipmentContrllers.listEquipmentsToEdit);

/* Edit Equipment */
router.put("/editequipment", EquipmentContrllers.editEquipment);
/* Delete Equipment */
router.put("/delequipment", EquipmentContrllers.deleteEquipment);

module.exports = router;
