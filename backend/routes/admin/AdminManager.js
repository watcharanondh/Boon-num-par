const express = require("express");
const router = express.Router();
const authorize = require('../../middleware/authorize');

const AdminControllers = require("../../controllers/admin/adminmanager");

/* List All UserAdmins */
router.get("/listalladmins", authorize, AdminControllers.listAllUserAdmins);
/*List Positions to Create Useradmin */
router.get("/listpostocreate", authorize, AdminControllers.listPositiontoCreateUseradmin);

/* Create UserAdmin */
router.post("/createadmin", AdminControllers.CreateUserAdmin);
/* List UserAdmin to Edit */
router.post("/listadmin", authorize, AdminControllers.listUserAdmintoEdit);
/* Edit UserAdmin*/
router.post("/editadmin", authorize, AdminControllers.EditUserAdmin);
/* Delete UserAdmin*/
router.post("/deladmin", authorize, AdminControllers.DeleteAdmin);

module.exports = router;
