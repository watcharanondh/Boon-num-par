const { users, user_details, positions, roles } = require("../../models");
const { Op, Sequelize } = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require('fs');
// const { Op } = require("sequelize");

/* User Loging In */
exports.userLogin = async (req, res) => {
  console.log("login: " + JSON.stringify(req.body));
  const { username, password } = req.body;
  const result = await users.findOne({
    include: [
      {
        model: user_details,
        include: [
          {
            model: positions,
            include: [
              {
                model: roles
              }
            ]
          }
        ]
      }
    ],
    where: {
      [Op.and]:
        [
          { username: username },
          { password: { [Op.ne]: null } },
          { username: { [Op.ne]: null } }
        ]
    }
  });
  try {
    if (result) {
      if (bcrypt.compareSync(password, result.password)) {
        if (result.is_active == 1 && result.is_delete == 0) {
          await users.update({ last_login: new Date() }, { where: { username: username, password: result.password } })
          const _payload = {
            name: result.user_detail.name,
            role_id: result.user_detail.position.role.id,
            role_name: result.user_detail.position.role.name,
            profile_url: result.profile_url,
            remember_token: result.remember_token,
            last_login: result.last_login
          };
          const accessToken = jwt.sign(_payload, fs.readFileSync(__dirname + '/../../middleware/private.key'), { expiresIn: '10h' })
          res.json({
            response: "OK",
            accessToken: accessToken,
            result: _payload
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
