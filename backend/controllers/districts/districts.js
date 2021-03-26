const { districts } = require("../../models");
const { Op } = require("sequelize");

/* List Customer Type */
exports.List_Find_Province = async (req, res) => {
  try {
    const result = await districts.findAll({
      attributes: ["amphoe", "province", "amphoe_code", "province_code"],
      group: 'province'
    });
    res.json({ response: "OK", result: result });
  } catch (error) {
    console.log(error);
    res.json({ response: "FAILED", result: error });
  }
};

/* List Find Amphoe */
exports.List_Find_Amphoe = async (req, res) => {
  try {
    const result = await districts.findAll({
      attributes: ["district", "amphoe", "district_code", "amphoe_code"],
      where: {
        [Op.or]: {
          province_code: req.body.province_code !== undefined ? req.body.province_code : '',
          province: {
            [Op.substring]: req.body.province
          },
        }
      },
      group: 'amphoe'
    });
    res.json({ response: "OK", result: result });
  } catch (error) {
    console.log(error);
    res.json({ response: "FAILED", result: error });
  }
};

/* List Find District*/
exports.List_Find_District = async (req, res) => {
  try {
    const result = await districts.findAll({
      attributes: ["id", "district", "zipcode", "district_code"],
      where: {
        [Op.or]: {
          amphoe_code: req.body.amphoe_code !== undefined ? req.body.amphoe_code : '',
          amphoe: {
            [Op.substring]: req.body.amphoe
          },
        }
      },
      group: 'district'
    });
    res.json({ response: "OK", result: result });
  } catch (error) {
    console.log(error);
    res.json({ response: "FAILED", result: error });
  }
};
