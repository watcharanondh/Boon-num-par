const { quotations, customer_tax_invoices, quotation_statuses, quotation_packages, quotation_promotions, customers, districts, packages, promotions } = require("../models");
const { Op, Sequelize } = require("sequelize");
const helper = require("../helper/sku");

/* List All Quotations */
exports.List_All_Quotations = async (req, res) => {
  try {
    const result = await quotations.findAll({
      attributes: ["id", "event_date", "area_viewing_date", "quotation_status_id",
        [Sequelize.fn("date_format", Sequelize.col("`quotations`.`updated_at`"), "%d.%m.%Y"), "update"]
      ],
      include: [
        {
          model: customers,
          include: [
            {
              model: customer_tax_invoices,
              attributes: ["title"],
            },
          ],
        },
        {
          model: quotation_statuses,
          attributes: ["name"],
        },
      ],
      where: {
        is_active: 1,
        is_delete: 0
      },
    });
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

/* List Customer information to Create Quotations  */
exports.List_Find_Customer_information = async (req, res) => {
  try {
    const result = await customers.findAll({
      attributes: ["id"],
      include: [
        {
          model: customer_tax_invoices,
          attributes: ["title", "tax_id", "flash_number", "email", "telephone_number", "mobile_phone_number", "address"],
          include: [
            {
              model: districts,
              attributes: ["district", "amphoe", "province", "zipcode"],
            }
          ]
        }
      ],
      where: {
        is_active: 1,
        is_delete: 0,
        [Op.or]: {
          id: req.body.iden,
          name: {
            [Op.substring]: req.body.iden
          },
        }
      },
    });
    res.json({ response: "OK", result: result });
  } catch (error) {
    console.log(error);
    res.json({ response: "FAILED", result: error });
  }
};
/* Select Package to Create Quotations*/
exports.Select_Package = async (req, res) => {
  try {
    const result = await packages.findOne({
      attributes: [
        "id",
        "name",
        "amount_savory_food",
        "amount_sweet_food",
        "amount_drink",
        [Sequelize.fn("date_format", Sequelize.col("`packages`.`updated_at`"), "%d-%m-%Y"), "update"],
        [Sequelize.fn("CONCAT", "อาหารคาว ", Sequelize.col("`packages`.`amount_savory_food`"), ", อาหารหวาน ", Sequelize.col("`packages`.`amount_sweet_food`"), ", เครื่องดื่ม ", Sequelize.col("`packages`.`amount_sweet_food`")), "food_des"],
      ],
      where: {
        id: req.body.id,
        is_active: 1,
        is_delete: 0
      },
      order: [["updated_at", "DESC"]]
    });
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
/* List All Promotions to Create Quotations*/
exports.List_All_Promotions = async (req, res) => {
  try {
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


/* Create New Quotations */
exports.Create_New_Quotations = async (req, res) => {
  try {
    const { customer_id, package_id, promotion_id, event_date, area_viewing_date, amount_savory_food, amount_sweet_food, amount_drink, quotation_status_id, note } = req.body;
    /* สร้างใบเสนอราคา ตาราง quotations */
    const getMaxQuotaId = await quotations.findOne({ attributes: [[Sequelize.fn('MAX', Sequelize.col('id')), "maxQuotaId"]] });
    const newQuotaId = getMaxQuotaId.dataValues.maxQuotaId !== null ? helper.SKUincrementer(getMaxQuotaId.dataValues.maxQuotaId) : "BNPQU0000001"
    const Quotationresult = await quotations.create({
      id: newQuotaId,
      customer_id: customer_id,
      event_date: new Date(event_date),
      area_viewing_date: new Date(area_viewing_date),
      amount_savory_food: amount_savory_food,
      amount_sweet_food: amount_sweet_food,
      amount_drink: amount_drink,
      quotation_status_id: quotation_status_id,
      note: note
    });
    /* เลือก Package ตาราง quotation_packages */
    const selectPackageresult = await quotation_packages.create({
      quotation_id : newQuotaId,
      package_id : package_id
    });
    /*สร้างรายการโปรโมชั่น สำหรับใบเสนอราคานั้นๆ*/
    var ObjPromotions = promotion_id.map(promoId => { return { "quotation_id": newQuotaId, "promotion_id": promoId } });
    console.log(ObjPromotions);
    const selectPromotionresult = await quotation_promotions.bulkCreate(ObjPromotions);

    res.json({
      response: "OK",
      result: {
        "Quotation": Quotationresult,
        "selectPackage": selectPackageresult,
        "selectPromotion": selectPromotionresult
      }
    });
  } catch (error) {
    console.log(error);
    res.json({ response: "FAILED", result: error });
  }
};
