const { users, districts } = require("../models");
const bcrypt = require("bcryptjs");
// const { Op } = require("sequelize");
// const jwt = require("jsonwebtoken");

/* User Loging In */
exports.User_login = async (req, res) => {
  console.log("login: " + JSON.stringify(req.body));
  const { username, password } = req.body;
  const result = await users.findOne({ where: { username: username } });
  try {
    if (result) {
      if (bcrypt.compareSync(password, result.password)) {
        if (result.is_active == 1 && result.is_delete == 0) {
          res.json({
            response: "OK",
            result: result,
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
exports.User_Register = async (req, res) => {
  try {
    console.log("register: " + JSON.stringify(req.body));
    req.body.password = await bcrypt.hash(req.body.password, 8);
    const result = await users.create(req.body);
    res.json({ response: "Registered.", result: result });
  } catch (error) {
    res.json({ response: "Regis Failed", result: error });
  }
};

exports.finddistricts = (req, res) => {
  try {
    districts.findAll({ where: { id: req.params.id } }).then(data => {
      res.json(data);
    });
  } catch (e) {
    console.log(e);
    throw e;
  }
};
