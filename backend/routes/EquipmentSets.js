const express = require("express");
const router = express.Router();
const authorize = require('../middleware/authorize');

const EquipmentSetContrllers = require("../controllers/equipments_sets");

/* List All Equipment */
router.get("/listallequipmentset", authorize, EquipmentSetContrllers.listAllEquipmentSets);

/* List All Equipments to PackageUse*/
router.get("/listallequiptoequipset", authorize, EquipmentSetContrllers.listAllEquipmentsToEquipmentSet);

/* Create New Equipment */
router.post("/addnewequipmentset", authorize, EquipmentSetContrllers.createNewEquipmentSet);

/* List Equipment to Edit*/
router.post("/listequipmentset", authorize, EquipmentSetContrllers.listEquipmentSetsToEdit);

/* Edit Equipment */
router.put("/editequipmentset", authorize, EquipmentSetContrllers.editEquipmentSet);
/* Delete Equipment */
router.put("/delequipmentset", authorize, EquipmentSetContrllers.deleteEquipmentSet);

module.exports = router;
