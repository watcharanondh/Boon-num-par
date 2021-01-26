const { packages } = require("../models");
const { Op, Sequelize } = require("sequelize");
const helper = require("../helper/sku");

/* Create New Packages */
exports.Create_New_Packages = async (req, res) => {
  const { name, stock_in } = req.body;
  try {
    const getMaxPackId = await packages.findOne({ attributes: [[Sequelize.fn('MAX', Sequelize.col('id')), "maxPackId"]] })
    console.log(getMaxPackId);
    const result = await packages.create({
      id: getMaxPackId.dataValues.maxPackId !== null ? helper.SKUincrementer(getMaxPackId.dataValues.maxPackId) : "BNPPK0000001",
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

/* List Packages to Edit */
exports.List_Packages_to_Edit = async (req, res) => {
  try {
    const result = await packages.findAll({
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

/* Edit Packages */
exports.Edit_Packages = async (req, res) => {
  const { id, name, stock_in } = req.body;
  try {
    const checkStockOut = await packages.findOne({ attributes: ['stock_out'], where: { id: id } });
    console.log(checkStockOut);
    if (checkStockOut.dataValues.stock_out <= stock_in) {
      const result = await packages.update({
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

/* Delete Packages (Update is_delete) */
exports.Delete_Packages = async (req, res) => {
  try {
    const result = await packages.update({
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
