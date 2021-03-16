const { users, user_details, positions, roles } = require("../../models");
const { Op, Sequelize } = require("sequelize");
const bcrypt = require("bcryptjs");
const { SKUincrementer, customGenerateSKU } = require("../../helper/sku");

/* List All UserAdmins */
exports.listAllUserAdmins = async (req, res) => {
  try {
    const result = await users.findAll({
      attributes: ['id', 'username', 'email'],
      include: [
        {
          model: user_details,
          attributes: ['user_code'],
          include: [
            {
              model: positions,
              attributes: [['name', 'position_name']],
              where: {
                role_id: 1
              }
            }
          ],
          required: true
        }
      ]
    }).then(admins => {
      if (admins && admins.length != 0) {
        admins.map((admin) => {
          admin.dataValues = { ...admin.user_detail.dataValues, ...admin.dataValues, ...admin.user_detail.position.dataValues }
          delete admin.dataValues.position
          delete admin.dataValues.user_detail
        })
      }
      return admins;
    })
    res.json({
      response: "OK",
      result: result
    });
  } catch (error) {
    console.log(error);
    res.json({ response: "FAILED", result: error });
  }
};

/*List Positions to Create Useradmin */
exports.listPositiontoCreateUseradmin = async (req, res) => {
  try {
    const result = await positions.findAll({
      attributes: ['id', 'name'],
      include: [
        {
          model: roles,
          attributes: ['name'],
          where: {
            role_types: 0,
          },
          required: true
        }
      ],
      where: {
        is_active: 1,
        is_delete: 0
      }
    })
    res.json({
      response: "OK",
      result
    });
  } catch (error) {
    console.log(error);
    res.json({ response: "FAILED", result: error });
  }
}

/* Create UserAdmin */
exports.CreateUserAdmin = async (req, res) => {
  try {
    const { name, position_id, telephone_number } = req.body
    const uname = 'bnpadmin'
    if (!name) { res.json({ response: "FAILED", result: "Invalid name" }); return }
    if (!position_id) { res.json({ response: "FAILED", result: "Invalid position_id" }); return }
    if (!telephone_number) { res.json({ response: "FAILED", result: "Invalid telephone_number" }); return }
    if (telephone_number.length != 10) { res.json({ response: "FAILED", result: "please input telephone number 10 digit" }); return }


    const isCheckTelNo = await user_details.findOne({ where: { telephone_number: telephone_number } })
    if (isCheckTelNo) { res.json({ response: "FAILED", result: "telephone_number already exist." }); return }

    const getMaxAdminCode = await user_details.findOne({
      attributes: [[Sequelize.fn('MAX', Sequelize.col('user_code')), "maxAdminCode"]],
      include: [
        {
          model: positions,
          attributes: ['id'],
          where: {
            role_id: 1
          },
          required: true
        }
      ],
      where: {
        is_active: 1,
        is_delete: 0
      }
    })
    const newAdminCode = getMaxAdminCode.dataValues.maxAdminCode !== null ? SKUincrementer(getMaxAdminCode.dataValues.maxAdminCode) : "ADM0000001";

    const maxUsername = await users.findOne({
      attributes: [[Sequelize.fn('MAX', Sequelize.col('username')), "maxusername"]],
      include: [
        {
          model: user_details,
          attributes: ['id'],
          include: [
            {
              model: positions,
              attributes: ['id'],
              where: {
                role_id: 1
              },
              required: true
            }
          ]
        }
      ],
      where: {
        username: {
          [Op.substring]: uname.replace(/\s/g, '')
        },
        is_active: 1,
        is_delete: 0
      }

    })
    const newAdminUsername = maxUsername.dataValues.maxusername !== null ? SKUincrementer(maxUsername.dataValues.maxusername) : customGenerateSKU(uname, 2);

    const createUsers = await users.create({
      username: newAdminUsername,
      password: "1234",
      remember_token: '',
    })
    const createUserDetail = await user_details.create({
      id: createUsers.dataValues.id,
      user_code: newAdminCode,
      name: name,
      position_id: position_id,
      telephone_number: telephone_number,
      district_id: 1
    })
    res.json({ response: "OK", result: [createUsers, createUserDetail] });
  } catch (error) {
    res.json({ response: "FAILED", result: error });
  }
};

/* List UserAdmin to Edit */
exports.listUserAdmintoEdit = async (req, res) => {
  try {
    const result = await users.findOne({
      attributes: ['id'],
      include: [
        {
          model: user_details,
          attributes: ['name', 'telephone_number'],
          include: [
            {
              model: positions,
              attributes: [['id', 'position_id'], ['name', 'position_name']],
              where: {
                role_id: 1
              }
            }
          ],
          required: true
        }
      ],
      where: {
        id: req.body.id,
        is_active: 1,
        is_delete: 0
      }
    }).then(admin => {
      if (admin) {
        admin.dataValues = {
          ...admin.dataValues,
          ...admin.user_detail.dataValues,
          ...admin.user_detail.position.dataValues
        }
        delete admin.dataValues.position
        delete admin.dataValues.user_detail
      }
      return admin;
    })
    if (result != '' && result !== null) {
      res.json({
        response: "OK",
        result: result,
      });
    } else {
      res.json({ response: "FAILED", result: "Not Found." });
    };
  } catch (error) {
    console.log(error);
    res.json({ response: "FAILED", result: error });
  }
};

/* Edit UserAdmin */
exports.EditUserAdmin = async (req, res) => {
  try {
    const { id, name, position_id, telephone_number } = req.body
    if (!id) { res.json({ response: "FAILED", result: "Invalid id" }); return }
    if (!name) { res.json({ response: "FAILED", result: "Invalid name" }); return }
    if (!position_id) { res.json({ response: "FAILED", result: "Invalid position_id" }); return }
    if (!telephone_number) { res.json({ response: "FAILED", result: "Invalid telephone_number" }); return }
    if (telephone_number.length != 10) { res.json({ response: "FAILED", result: "please input telephone number 10 digit" }); return }

    const isCheckTelNo = await user_details.findOne({ where: { telephone_number: telephone_number } })
    const isCheckTelNoOwned = await user_details.findOne({ where: { telephone_number: telephone_number, id: id } })
    if (isCheckTelNo) {
      if (!isCheckTelNoOwned) {
        res.json({ response: "FAILED", result: "telephone_number already exist." });
        return
      }
    }

    const result = await user_details.update({
      name: name,
      position_id: position_id,
      telephone_number: telephone_number,
    }, {
      where: {
        id: id,
        is_active: 1,
        is_delete: 0
      }
    })
    if (result !== 0) {
      res.json({ response: "OK", result });
    } else {
      res.json({ response: "FAILED", result });
    }
  } catch (error) {
    res.json({ response: "FAILED", result: error });
  }
};

/* Delelte UserAdmin */
exports.DeleteAdmin = async (req, res) => {
  try {
    const user_result = await users.update({
      is_delete: 1
    }, {
      where: {
        id: req.body.id
      }
    })
    const user_detail_result = await user_details.update({
      is_delete: 1
    }, {
      where: {
        id: req.body.id
      }
    })
    if (user_result != 0 && user_detail_result) {
      res.json({
        response: "OK",
        result: `ADMIN ID: ${req.body.id} Deleted. Result:${user_result} ${user_detail_result}`,
      });
    } else {
      res.json({
        response: "FAILED",
        result: `ADMIN ID: ${req.body.id} Not Found. Result:${user_result} ${user_detail_result}`,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ response: "FAILED", result: error });
  }
};