const { promotions } = require("../models");
const { Op, Sequelize } = require("sequelize");
const helper = require("../helper/sku");


/* List All Promotions */
exports.listAllPromotions = async (req, res) => {
  try {
    let count_total = await promotions.findOne({
      attributes: [[Sequelize.fn('COUNT', Sequelize.col('*')), 'total']],
      where: {
        is_active: 1,
        is_delete: 0
      }
    });
    const result = await promotions.findAll({
      attributes: [
        "id",
        "name",
        [Sequelize.fn("date_format", Sequelize.col("`promotions`.`updated_at`"), "%d.%m.%Y"), "update"],
        "discount",
      ],
      where: {
        is_active: 1,
        is_delete: 0
      },
      order: [["updated_at", "DESC"]]
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

/* Create New Promotions */
exports.createNewPromotion = async (req, res) => {
  const { name, discount, discount_type } = req.body;
  try {
    const getMaxPromoId = await promotions.findOne({ attributes: [[Sequelize.fn('MAX', Sequelize.col('id')), "maxPromoId"]] })
    console.log(getMaxPromoId);
    const result = await promotions.create({
      id: getMaxPromoId.dataValues.maxPromoId !== null ? helper.SKUincrementer(getMaxPromoId.dataValues.maxPromoId) : "BNPPM0000001",
      name: name,
      discount: discount,
      discount_type: discount_type
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

/* List Promotion to Edit */
exports.listPromotionToEdit = async (req, res) => {
  try {
    const result = await promotions.findAll({
      attributes: ["id", "name", "discount", "discount_type"],
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

/* Edit Promotion */
exports.editPromotion = async (req, res) => {
  const { id, name, discount, discount_type } = req.body;
  try {
    const result = await promotions.update({
      name: name,
      discount: discount,
      discount_type: discount_type
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

  } catch (error) {
    console.log(error);
    res.json({ response: "FAILED", result: error });
  }
};

/* Delete Promotion (Update is_delete) */
exports.deletePromotion = async (req, res) => {
  try {
    const result = await promotions.update({
      is_delete: 1
    }, {
      where: {
        id: req.body.id
      }
    });
    if (result != 0) {
      res.json({
        response: "OK",
        result: "Promotion: " + req.body.id + " Deleted. Result: " + result,
      });
    } else {
      res.json({
        response: "FAILED",
        result: "Promotion: " + req.body.id + " Not Found. Result: " + result,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ response: "FAILED", result: error });
  }
};
