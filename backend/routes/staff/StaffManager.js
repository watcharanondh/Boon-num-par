const express = require("express");
const router = express.Router();
const authorize = require('../../middleware/authorize');

const StaffControllers = require("../../controllers/staff/staffmanager");

/* List All Positions */
router.get("/listallpositions", authorize, StaffControllers.listAllPositions);
/* List All Roles to Create Position */
router.get("/listallroles", authorize, StaffControllers.listAllRoles);
/* Create new Position */
router.post("/createposition", authorize, StaffControllers.CreatePosition);
/*Position to Edit */
router.post("/listposition", authorize, StaffControllers.listPositiontoEdit);
/* Edit Position */
router.post("/editposition", authorize, StaffControllers.editPosition);
/* Delete Position */
router.post("/delposition", authorize, StaffControllers.deletePosition);


/* List All UserStaffs */
router.get("/listallstaff", authorize, StaffControllers.listAllStaff);
/*List Positions to Create UserStaff */
router.get("/listpostocreate", authorize, StaffControllers.listPositiontoCreate);
/* Create UserStaff */
router.post("/createstaff", StaffControllers.CreateStaff);
/* List UserStaff to Edit */
router.post("/liststaff", authorize, StaffControllers.listStafftoEdit);
/* Edit UserStaff */
router.post("/editstaff", authorize, StaffControllers.EditStaff);
/* Delete UserStaff */
router.post("/delstaff", authorize, StaffControllers.DeleteStaff);

module.exports = router;
