const express = require("express");
const router = express.Router();

const PackagesContrllers = require("../controllers/packages");

/* List All Packages */
router.get("/listallpackage", PackagesContrllers.List_All_Packages);

/* List All Equipments to PackageUse*/
router.get("/listallequiptopackuse", PackagesContrllers.List_All_Equipments_to_PackageUse);

/* Create Packages */
router.post("/addnewpackage", PackagesContrllers.Create_New_Packages);

/* List Packages to Edit*/
router.post("/listpackages", PackagesContrllers.List_Packages_to_Edit);

/* Edit Packages */
router.put("/editpackage", PackagesContrllers.Edit_Packages);

/* Delete Packages */
router.put("/delpackage", PackagesContrllers.Delete_Packages);

module.exports = router;
