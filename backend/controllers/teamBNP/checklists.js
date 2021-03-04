const { checklists, teams, users, user_details, positions } = require("../../models");
const { Op, Sequelize } = require("sequelize");
const helper = require("../../helper/sku");

/* List All Checklist */
exports.listAllChecklists = async (req, res) => {
  try {
    const result = await checklists.findAll({
      attributes: ["checklist_code", "name", "description"],
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
    const { name } = req.body
    if (!name) {
      res.json({ response: "FAILED", result: "please enter name." });
      return
    }
    const getMaxChecklistCode = await checklists.findOne({ attributes: [[Sequelize.fn('MAX', Sequelize.col('checklist_code')), "maxChecklistCode"]] })
    const newChecklistCode = getMaxChecklistCode.dataValues.maxChecklistCode !== null ? helper.SKUincrementer(getMaxChecklistCode.dataValues.maxChecklistCode) : "CHKL000001";
    /*สร้าง checklists*/
    const checklistsResult = await checklists.create({
      checklist_code: newChecklistCode,
      name: name,
      description: '',
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
    const result = await checklists.findAll({
      where: {
        checklist_code: req.body.checklist_code,
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
    const { checklist_code, name } = req.body;
    if (!name) {
      res.json({ response: "FAILED", result: "invalid team name." });
      return
    }
    if (!checklist_code) {
      res.json({ response: "FAILED", result: "checklist is not found." });
      return
    }
    /*แก้ไข checklists*/
    const result = await checklists.update({
      name: name
    }, {
      where: {
        checklist_code: checklist_code
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
    const result = await checklists.update({
      is_delete: 1
    }, {
      where: {
        checklist_code: req.body.checklist_code
      }
    });
    if (result != 0) {
      res.json({
        response: "OK",
        result: "Checklist: " + req.body.checklist_code + " Deleted. Result: " + result,
      });
    } else {
      res.json({
        response: "FAILED",
        result: "Checklist: " + req.body.checklist_code + " Not Found. Result: " + result,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ response: "FAILED", result: error });
  }
};