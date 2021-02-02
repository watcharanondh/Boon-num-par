const express = require("express");
const router = express.Router();
const authorize = require('../middleware/authorize');

const EquipmentContrllers = require("../controllers/equipments");

/* List All Equipment */
router.get("/listallequipment", authorize, EquipmentContrllers.listAllEquipments);

/* Create New Equipment */
router.post("/addnewequipment", authorize, EquipmentContrllers.createNewEquipment);

/* List Equipment to Edit*/
router.post("/listequipment", authorize, EquipmentContrllers.listEquipmentsToEdit);

/* Edit Equipment */
router.put("/editequipment", authorize, EquipmentContrllers.editEquipment);
/* Delete Equipment */
router.put("/delequipment", authorize, EquipmentContrllers.deleteEquipment);

module.exports = router;
