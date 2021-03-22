const { lineupfood_equipments } = require("../../models");
const { Op, Sequelize } = require("sequelize");
const helper = require("../../helper/sku");

/* List All Checklist */
exports.listAllChecklists = async (req, res) => {
  try {
    const result = await lineupfood_equipments.findAll({
      attributes: ["id", "name", "description", "stock_in", "stock_out"],
      where: {
        is_active: 1,
        is_delete: 0
      },
      order: [["id", "DESC"]]
    })
    if (result != '' && result !== null) {
      res.json({
        response: "OK",
        total: result.length + " รายการ",
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

/* Create Checklist */
exports.CreateChecklist = async (req, res) => {
  try {
    const { name, stock_in } = req.body
    if (!name) {
      res.json({ response: "FAILED", result: "please enter name." });
      return
    }
    if (!stock_in) {
      res.json({ response: "FAILED", result: "please enter stock_in." });
      return
    }
    const getMaxChecklistCode = await lineupfood_equipments.findOne({ attributes: [[Sequelize.fn('MAX', Sequelize.col('code')), "maxChecklistCode"]] })
    const newChecklistCode = getMaxChecklistCode.dataValues.maxChecklistCode !== null ? helper.SKUincrementer(getMaxChecklistCode.dataValues.maxChecklistCode) : "EQUP000001";
    /*สร้าง checklists*/
    const checklistsResult = await lineupfood_equipments.create({
      code: newChecklistCode,
      name: name,
      description: '',
      stock_in: stock_in,
      stock_out: 0,
    });
    res.json({
      response: "OK",
      result: checklistsResult
    });
  } catch (error) {
    console.log(error);
    res.json({ response: "FAILED", result: error });
  }
};

/* List Team to Edit */
exports.listChecklistToEdit = async (req, res) => {
  try {
    const result = await lineupfood_equipments.findAll({
      attributes: ['id', 'name', 'description', 'stock_in'],
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

/* Edit Checklist */
exports.editChecklist = async (req, res) => {
  try {
    const { id, name, stock_in } = req.body;
    if (!name) {
      res.json({ response: "FAILED", result: "please enter name." });
      return
    }
    if (!stock_in) {
      res.json({ response: "FAILED", result: "please enter stock_in." });
      return
    }
    if (!id) {
      res.json({ response: "FAILED", result: "checklist is not found." });
      return
    }
    const equip = await lineupfood_equipments.findOne({ where: { id: id } })
    if (stock_in < parseInt(equip.dataValues.stock_out)) {
      res.json({ response: "FAILED", result: "please input stock_in more than stock_out." });
      return
    }
    /*แก้ไข checklists*/
    const result = await lineupfood_equipments.update({
      name: name,
      stock_in: stock_in
    }, {
      where: {
        id: id
      }
    });
    res.json({
      response: "OK",
      result
    });
  } catch (error) {
    console.log(error);
    res.json({ response: "FAILED", result: error });
  }
};

/* Delete Checklist (Update is_delete) */
exports.deleteChecklist = async (req, res) => {
  try {
    const result = await lineupfood_equipments.update({
      is_delete: 1
    }, {
      where: {
        id: req.body.id
      }
    });
    if (result != 0) {
      res.json({
        response: "OK",
        result: "Checklist: " + req.body.id + " Deleted. Result: " + result,
      });
    } else {
      res.json({
        response: "FAILED",
        result: "Checklist: " + req.body.id + " Not Found. Result: " + result,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ response: "FAILED", result: error });
  }
};