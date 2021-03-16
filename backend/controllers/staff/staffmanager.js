const { users, user_details, positions, roles } = require("../../models");
const { Op, Sequelize } = require("sequelize");
const bcrypt = require("bcryptjs");
const { SKUincrementer } = require("../../helper/sku");

/*-------------------- POSITIONS -------------------- */
/* List All Positions */
exports.listAllPositions = async (req, res) => {
  try {
    const result = await positions.findAll({
      attributes: ['id', 'position_code', 'name', 'description'],
      where: {
        is_active: 1,
        is_delete: 0
      }
    })
    if (result != '' && result !== null) {
      res.json({
        response: "OK",
        result: result,
      });
    } else {
      res.json({ response: "FAILED", result: "Not Found." });
    }
  } catch (error) {
    console.log(error);
    res.json({ response: "FAILED", result: error });
  }
};
/* List All Roles to create Position */
exports.listAllRoles = async (req, res) => {
  try {
    const result = await roles.findAll({
      attributes: ['id', 'name'],
      where: {
        role_types: 1,
        is_active: 1,
        is_delete: 0
      }
    })
    if (result != '' && result !== null) {
      res.json({
        response: "OK",
        result: result,
      });
    } else {
      res.json({ response: "FAILED", result: "Not Found." });
    }
  } catch (error) {
    console.log(error);
    res.json({ response: "FAILED", result: error });
  }
};
/* List All Positions */
exports.CreatePosition = async (req, res) => {
  try {
    const { name, description, role_id } = req.body
    if (!name) { res.json({ response: "FAILED", result: "Invalid name" }); return }
    const maxPosCode = await positions.findOne({ attributes: [[Sequelize.fn('MAX', Sequelize.col('position_code')), "maxPosCode"]] })
    const newPosCode = maxPosCode.dataValues.maxPosCode !== null ? SKUincrementer(maxPosCode.dataValues.maxPosCode) : "POS0000001";

    const result = await positions.create({
      position_code: newPosCode,
      name: name,
      description: description,
      role_id: role_id
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
/* List Position to Edit */
exports.listPositiontoEdit = async (req, res) => {
  try {
    const result = await positions.findOne({
      attributes: ['id', 'position_code', 'name', 'description'],
      where: {
        id: req.body.id,
        is_active: 1,
        is_delete: 0
      }
    })
    if (result != '' && result !== null) {
      res.json({
        response: "OK",
        result: result,
      });
    } else {
      res.json({ response: "FAILED", result: "Not Found." });
    }
  } catch (error) {
    console.log(error);
    res.json({ response: "FAILED", result: error });
  }
};
/* Delelte Position */
exports.deletePosition = async (req, res) => {
  try {
    const result = await positions.update({
      is_delete: 1
    }, {
      where: {
        id: req.body.id
      }
    })
    if (result != 0) {
      res.json({
        response: "OK",
        result: "Position ID: " + req.body.id + " Deleted. Result: " + result,
      });
    } else {
      res.json({
        response: "FAILED",
        result: "Position ID: " + req.body.id + " Not Found. Result: " + result,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ response: "FAILED", result: error });
  }
};
/* Edit Position */
exports.editPosition = async (req, res) => {
  try {
    const { id, name, description } = req.body
    if (!id) { res.json({ response: "FAILED", result: "Invalid id" }); return }
    if (!name) { res.json({ response: "FAILED", result: "Invalid name" }); return }
    const result = await positions.update({
      name: name,
      description: description
    }, {
      where: {
        id: id,
        is_active: 1,
        is_delete: 0
      }
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

/*-------------------- STAFFs -------------------- */
/* List All UserStaffs */
exports.listAllStaff = async (req, res) => {
  try {
    const result = await users.findAll({
      attributes: ['id'],
      include: [
        {
          model: user_details,
          attributes: ['user_code', 'name', 'nickname', 'telephone_number'],
          include: [
            {
              model: positions,
              attributes: [['name', 'position_name']],
              where: {
                role_id: {
                  [Op.ne]: 1
                }
              }
            }
          ],
          required: true
        }
      ],
      where: {
        is_active: 1,
        is_delete: 0
      }
    }).then(admins => {
      if (admins && admins.length != 0) {
        admins.map((admin) => {
          admin.dataValues = {
            ...admin.dataValues,
            ...admin.user_detail.dataValues,
            ...admin.user_detail.position.dataValues
          }
          admin.dataValues.nickname = admin.dataValues.nickname ? admin.dataValues.nickname : '-'

          delete admin.dataValues.position
          delete admin.dataValues.user_detail
        })
      }
      return admins;
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
/*List Positions to Create UserStaffs*/
exports.listPositiontoCreate = async (req, res) => {
  try {
    const result = await positions.findAll({
      attributes: ['id', 'name'],
      include: [
        {
          model: roles,
          attributes: [['name', 'role_name']],
          where: {
            role_types: 1,
          },
          required: true
        }
      ],
      where: {
        is_active: 1,
        is_delete: 0
      }
    }).then(pos => {
      pos.map(o => {
        if (o.dataValues.role.dataValues) {
          o.dataValues = { ...o.dataValues, ...o.dataValues.role.dataValues }
          delete o.dataValues.role
        }
      })
      return pos
    })
    if (result != '' && result !== null) {
      res.json({
        response: "OK",
        result: result,
      });
    } else {
      res.json({ response: "FAILED", result: "Not Found." });
    }
  } catch (error) {
    console.log(error);
    res.json({ response: "FAILED", result: error });
  }
}
/* Create UserStaffs*/
exports.CreateStaff = async (req, res) => {
  try {
    const { name, nickname, position_id, telephone_number } = req.body
    if (!name) { res.json({ response: "FAILED", result: "Invalid name" }); return }
    if (!position_id) { res.json({ response: "FAILED", result: "Invalid position_id" }); return }
    if (!telephone_number) { res.json({ response: "FAILED", result: "Invalid telephone_number" }); return }
    if (telephone_number.length != 10) { res.json({ response: "FAILED", result: "please input telephone number 10 digit" }); return }

    const isCheckTelNo = await user_details.findOne({ where: { telephone_number: telephone_number } })
    if (isCheckTelNo) { res.json({ response: "FAILED", result: "telephone_number already exist." }); return }

    const maxUserCodeRole = await user_details.findOne({
      attributes: [[Sequelize.fn('MAX', Sequelize.col('user_code')), "maxUserCode"]],
      where: {
        position_id: position_id,
        is_active: 1,
        is_delete: 0
      }
    })
    const maxUserCode = await user_details.findOne({
      attributes: [[Sequelize.fn('MAX', Sequelize.col('user_code')), "maxUserCode"]],
      where: {
        position_id: {
          [Op.notIn]: [1, 2, 3, 4, 5, 6, 7]
        },
        is_active: 1,
        is_delete: 0
      }
    })

    const newUserCode = maxUserCodeRole.dataValues.maxUserCode !== null ? SKUincrementer(maxUserCodeRole.dataValues.maxUserCode) : (maxUserCode.dataValues.maxUserCode ? SKUincrementer(maxUserCode.dataValues.maxUserCode) : "MEM0000001");

    const createUsers = await users.create({
      username: null,
      password: null,
      remember_token: '',
    })
    const createUserDetail = await user_details.create({
      id: createUsers.dataValues.id,
      user_code: newUserCode,
      name: name,
      nickname: nickname,
      position_id: position_id,
      telephone_number: telephone_number,
      district_id: 1
    })
    res.json({ response: "OK", result: [createUsers, createUserDetail] });
  } catch (error) {
    res.json({ response: "FAILED", result: error });
  }
};
/* List UserStaff to Edit */
exports.listStafftoEdit = async (req, res) => {
  try {
    const result = await users.findOne({
      attributes: ['id'],
      include: [
        {
          model: user_details,
          attributes: ['user_code', 'name', 'nickname', 'telephone_number'],
          include: [
            {
              model: positions,
              attributes: [['id', 'position_id'], ['name', 'position_name']],
              where: {
                role_id: {
                  [Op.ne]: 1
                }
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
    }).then(staff => {
      if (staff) {
        staff.dataValues = {
          ...staff.dataValues,
          ...staff.user_detail.dataValues,
          ...staff.user_detail.position.dataValues
        }
        staff.dataValues.nickname = staff.dataValues.nickname ? staff.dataValues.nickname : '-'
        delete staff.dataValues.position
        delete staff.dataValues.user_detail
      }
      return staff;
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
/* Edit UserStaffs*/
exports.EditStaff = async (req, res) => {
  try {
    const { id, name, nickname, position_id, telephone_number } = req.body
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
      nickname: nickname,
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
/* Delelte UserStaffs */
exports.DeleteStaff = async (req, res) => {
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
        result: `Staff ID: ${req.body.id} Deleted. Result:${user_result} ${user_detail_result}`,
      });
    } else {
      res.json({
        response: "FAILED",
        result: `Staff ID: ${req.body.id} Not Found. Result:${user_result} ${user_detail_result}`,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ response: "FAILED", result: error });
  }
};