const express = require("express");
const router = express.Router();
// const authorize = require('../middleware/authorize');

const UserControllers = require("../../controllers/users/users");

/* User Login */
router.post("/login", UserControllers.userLogin);

/* User Register*/
router.post("/regis", UserControllers.userRegister);

module.exports = router;
