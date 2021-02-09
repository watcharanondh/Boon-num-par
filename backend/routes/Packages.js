const express = require("express");
const router = express.Router();
const authorize = require('../middleware/authorize');

const PackagesContrllers = require("../controllers/packages");

/* List All Packages */
router.get("/listallpackage", authorize, PackagesContrllers.listAllPackages);

/* List All Equipments to PackageUse*/
router.get("/listallequipsettopackuse", authorize, PackagesContrllers.listAllEquipmentSetsToPackageUse);

/* Create Packages */
router.post("/addnewpackage", authorize, PackagesContrllers.createNewPackage);

/* List Packages to Edit*/
router.post("/listpackages", authorize, PackagesContrllers.listPackagesToEdit);

/* Edit Packages */
router.put("/editpackage", authorize, PackagesContrllers.editPackage);

/* Delete Packages */
router.put("/delpackage", authorize, PackagesContrllers.deletePackage);

module.exports = router;
