const { users, districts, roles } = require("../models");
// const { Op } = require("sequelize");
// const jwt = require("jsonwebtoken");

exports.list_user_login = (req, res) => {
  try {
    users.findAll({
      include: roles
    }).then((data) => {
      res.json(data);
    });
  } catch (e) {
    console.log(e);
    throw e;
  }
};
exports.finddistricts = (req, res) => {
  try {
    districts.findAll({where:{id:req.params.id}}).then((data) => {
      res.json(data);
    });
  } catch (e) {
    console.log(e);
    throw e;
  }
};
