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
        "promotion_code",
        "name",
        [Sequelize.fn("date_format", Sequelize.col("`promotions`.`updated_at`"), "%d.%m.%Y"), "update"],
        "discount",
        "discount_type",
      ],
      where: {
        is_active: 1,
        is_delete: 0
      },
      order: [["updated_at", "DESC"]]
    }).then(promo_data => {
      promo_data.map((data) => {
        data.dataValues.discount_text = data.dataValues.discount_type == 1 ? data.dataValues.discount + " บาท" : data.dataValues.discount + " %"
      });
      return promo_data;
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
    const getMaxPromoCode = await promotions.findOne({ attributes: [[Sequelize.fn('MAX', Sequelize.col('promotion_code')), "maxPromoCode"]] })
    console.log(getMaxPromoCode);
    const result = await promotions.create({
      promotion_code: getMaxPromoCode.dataValues.maxPromoCode !== null ? helper.SKUincrementer(getMaxPromoCode.dataValues.maxPromoCode) : "BNPPM0000001",
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
      attributes: ["promotion_code", "name", "discount", "discount_type"],
      where: {
        promotion_code: req.body.promotion_code,
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
  const { promotion_code, name, discount, discount_type } = req.body;
  try {
    const result = await promotions.update({
      name: name,
      discount: discount,
      discount_type: discount_type
    }, {
      where: {
        promotion_code: promotion_code,
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
        promotion_code: req.body.promotion_code
      }
    });
    if (result != 0) {
      res.json({
        response: "OK",
        result: "Promotion: " + req.body.promotion_code + " Deleted. Result: " + result,
      });
    } else {
      res.json({
        response: "FAILED",
        result: "Promotion: " + req.body.promotion_code + " Not Found. Result: " + result,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ response: "FAILED", result: error });
  }
};
