const { users, districts } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require('fs') ;
// const { Op } = require("sequelize");

/* User Loging In */
exports.userLogin = async (req, res) => {
  console.log("login: " + JSON.stringify(req.body));
  const { username, password } = req.body;
  const result = await users.findOne({ where: { username: username } });
  try {
    if (result) {
      if (bcrypt.compareSync(password, result.password)) {
        if (result.is_active == 1 && result.is_delete == 0) {
          const accessToken = jwt.sign({ result }, fs.readFileSync(__dirname + '/../middleware/private.key'))
          res.json({
            response: "OK",
            accessToken: accessToken,
            result: result
          });
        } else {
          res.json({
            response: "FAILED",
            result: "This User has been Suspended or Deleted.",
          });
        }
      } else {
        res.json({ response: "FAILED", result: "Invalid Password." });
      }
    } else {
      res.json({ response: "FAILED", result: "Invalid Username." });
    }
  } catch (error) {
    console.log(error);
    res.json({ response: "FAILED", result: error });
  }
};

/* User Regis */
exports.userRegister = async (req, res) => {
  try {
    console.log("register: " + JSON.stringify(req.body));
    req.body.password = await bcrypt.hash(req.body.password, 8);
    const result = await users.create(req.body);
    res.json({ response: "Registered.", result: result });
  } catch (error) {
    res.json({ response: "Regis Failed", result: error });
  }
};