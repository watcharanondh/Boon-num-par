const express = require("express");
const router = express.Router();
// const authorize = require('../middleware/authorize');

const UserControllers = require("../controllers/users");

/* User Login */
router.get("/login", UserControllers.list_user_login);
router.get("/fdst/:id", UserControllers.finddistricts);

module.exports = router;
