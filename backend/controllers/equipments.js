const { equipments } = require("../models");
const { Op, Sequelize } = require("sequelize");
const helper = require("../helper/sku");

/* Create New Equipments */
exports.Create_New_Equipments = async (req, res) => {
  const { name, stock_in } = req.body;
  try {
    const getMaxEquipId = await equipments.findOne({ attributes: [[Sequelize.fn('MAX', Sequelize.col('id')), "maxEquipId"]] })
    console.log(getMaxEquipId);
    const result = await equipments.create({
      id: getMaxEquipId.dataValues.maxEquipId !== null ? helper.SKUincrementer(getMaxEquipId.dataValues.maxEquipId) : "BNPT0000001",
      name: name,
      stock_in: stock_in
    });
    res.json({
      response: "OK",
      result: result,
    });
  } catch (error) {
    console.log(error);
    res.json({ response: "FAILED", result: error });
  }
};

/* List Equipment to Edit */
exports.List_Equipments_to_Edit = async (req, res) => {
  try {
    const result = await equipments.findAll({
      attributes: ["id", "name", "stock_in"],
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

/* Edit Equipment */
exports.Edit_Equipment = async (req, res) => {
  const { id, name, stock_in } = req.body;
  try {
    const checkStockOut = await equipments.findOne({ attributes: ['stock_out'], where: { id: id } });
    console.log(checkStockOut);
    if (checkStockOut.dataValues.stock_out <= stock_in) {
      const result = await equipments.update({
        name: name,
        stock_in: stock_in
      }, {
        where: {
          id: id,
          is_active: 1,
          is_delete: 0
        }
      });
      res.json({
        response: "OK",
        result: result,
      });
    } else {
      res.json({ response: "FAILED", result: "ไม่สามารถแก้ไข 'จำนวนอุปกรณ์ทั้งหมด' ให้น้อยกว่า 'จำนวนที่ถูกใช้' ได้" });
    }
  } catch (error) {
    console.log(error);
    res.json({ response: "FAILED", result: error });
  }
};

/* Delete Equipment (Update is_delete) */
exports.Delete_Equipment = async (req, res) => {
  try {
    const result = await equipments.update({
      is_delete: 1
    }, {
      where: {
        id: req.body.id
      }
    });
    res.json({
      response: "OK",
      result: result,
    });
  } catch (error) {
    console.log(error);
    res.json({ response: "FAILED", result: error });
  }
};
