const express = require("express");
const router = express.Router();
// const authorize = require('../middleware/authorize');

const UserControllers = require("../controllers/users");

/* User Login */
router.post("/login", UserControllers.User_login);

/* User Register*/
router.post("/regis", UserControllers.User_Register);

module.exports = router;
