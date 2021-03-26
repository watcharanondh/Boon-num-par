const { equipments } = require("../../models");
const { Op, Sequelize } = require("sequelize");
const helper = require("../../helper/sku");


/* List All Equipments */
exports.listAllEquipments = async (req, res) => {
  try {
    let count_total =  await equipments.findOne({
      attributes: [[Sequelize.fn('COUNT', Sequelize.col('*')), 'total']],
      where: {
        is_active: 1,
        is_delete: 0
      }
    });
    const result = await equipments.findAll({
      attributes: [
        "equipment_code",
        "name",
        "stock_out",
        [Sequelize.literal("`stock_in`- `stock_out`"), 'balance_stock'],
      ],
      where: {
        is_active: 1,
        is_delete: 0
      },
      order: [["equipment_code", "DESC"]]
    });
    if (result != '' && result !== null) {
      res.json({
        response: "OK",
        count_total: count_total.dataValues.total + " รายการ",
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

/* Create New Equipments */
exports.createNewEquipment = async (req, res) => {
  const { name, stock_in } = req.body;
  try {
    const getMaxEquipCode = await equipments.findOne({ attributes: [[Sequelize.fn('MAX', Sequelize.col('equipment_code')), "maxEquipCode"]] })
    console.log(getMaxEquipCode);
    const result = await equipments.create({
      equipment_code: getMaxEquipCode.dataValues.maxEquipCode !== null ? helper.SKUincrementer(getMaxEquipCode.dataValues.maxEquipCode) : "BNPT0000001",
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
exports.listEquipmentsToEdit = async (req, res) => {
  try {
    const result = await equipments.findAll({
      attributes: ["equipment_code", "name", "stock_in"],
      where: {
        equipment_code: req.body.equipment_code,
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
exports.editEquipment = async (req, res) => {
  const { equipment_code, name, stock_in } = req.body;
  try {
    const checkStockOut = await equipments.findOne({ attributes: ['stock_out'], where: { equipment_code: equipment_code } });
    console.log(checkStockOut);
    if (checkStockOut.dataValues.stock_out <= stock_in) {
      const result = await equipments.update({
        name: name,
        stock_in: stock_in
      }, {
        where: {
          equipment_code: equipment_code,
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
exports.deleteEquipment = async (req, res) => {
  try {
    const result = await equipments.update({
      is_delete: 1
    }, {
      where: {
        equipment_code: req.body.equipment_code
      }
    });
    if (result != 0) {
      res.json({
        response: "OK",
        result: "Equipment: " + req.body.equipment_code + " Deleted. Result: " + result,
      });
    } else {
      res.json({
        response: "FAILED",
        result: "Equipment: " + req.body.equipment_code + " Not Found. Result: " + result,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ response: "FAILED", result: error });
  }
};
