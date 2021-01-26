const express = require("express");
const router = express.Router();

const PackagesContrllers = require("../controllers/packages");

/* Create Equipment */
router.post("/addnewpackage", PackagesContrllers.Create_New_Packages);

/* List Equipment to Edit*/
router.post("/listpackages", PackagesContrllers.List_Packages_to_Edit);

/* Edit Equipment */
router.put("/editpackage", PackagesContrllers.Edit_Packages);
/* Delete Equipment */
router.put("/delpackage", PackagesContrllers.Delete_Packages);

module.exports = router;
