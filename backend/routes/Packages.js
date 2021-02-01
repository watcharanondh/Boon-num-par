const express = require("express");
const router = express.Router();

const PackagesContrllers = require("../controllers/packages");

/* List All Packages */
router.get("/listallpackage", PackagesContrllers.listAllPackages);

/* List All Equipments to PackageUse*/
router.get("/listallequiptopackuse", PackagesContrllers.listAllEquipmentsToPackageUse);

/* Create Packages */
router.post("/addnewpackage", PackagesContrllers.createNewPackage);

/* List Packages to Edit*/
router.post("/listpackages", PackagesContrllers.listPackagesToEdit);

/* Edit Packages */
router.put("/editpackage", PackagesContrllers.editPackage);

/* Delete Packages */
router.put("/delpackage", PackagesContrllers.deletePackage);

module.exports = router;
