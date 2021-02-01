const { sequelize, quotations, customer_tax_invoices, quotation_statuses, quotation_packages, quotation_promotions, customers, districts, packages, promotions } = require("../models");
const { Op, Sequelize } = require("sequelize");
const helper = require("../helper/sku");


/*------------------------------ Create Quatation ------------------------------*/
/* List All Quotations */
exports.listAllQuotations = async (req, res) => {
  try {
    const result = await quotations.findAll({
      attributes: ["id", "quotation_status_id",
        [Sequelize.fn("date_format", Sequelize.col("`quotations`.`event_date`"), "%b %d, %Y"), "event_date"],
        [Sequelize.fn("date_format", Sequelize.col("`quotations`.`event_date`"), "%h:%i %p"), "event_date_datetime"],
        [Sequelize.fn("date_format", Sequelize.col("`quotations`.`area_viewing_date`"), "%b %d, %Y"), "area_viewing_date"],
        [Sequelize.fn("date_format", Sequelize.col("`quotations`.`area_viewing_date`"), "%h:%i %p"), "area_viewing_date_datetime"],
        [Sequelize.fn("date_format", Sequelize.col("`quotations`.`updated_at`"), "%d.%m.%Y"), "update"],
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
    }).then(quotation_data => {
      quotation_data.map((data) => {
        data.dataValues.customer_tax_invoices = data.dataValues.customer.customer_tax_invoices[0].title
        data.dataValues.quotation_status = data.dataValues.quotation_status.name
        delete data.dataValues.customer;
      });
      return quotation_data;
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
/* Update Quotation Confirm Status  */
exports.comfirmQuotationStatus = async (req, res) => {
  try {
    const result = await quotations.update({
      quotation_status_id: 1
    }, {
      where: {
        id: req.body.id
      }
    });
    if (result == 1) {
      res.json({
        response: "OK",
        result: req.body.id + ": Updated. Result: " + result,
      });
    } else {
      res.json({
        response: "FAILED",
        result: req.body.id + ": Not Found. Result: " + result,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ response: "FAILED", result: error });
  }
};
/* List Customer information to Create Quotations  */
exports.listFindCustomerInformation = async (req, res) => {
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
exports.selectPackage = async (req, res) => {
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
exports.listAllPromotions = async (req, res) => {
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
exports.createNewQuotation = async (req, res) => {
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
      quotation_id: newQuotaId,
      package_id: package_id,
      amount: parseInt(amount_savory_food) + parseInt(amount_sweet_food) + parseInt(amount_drink)
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


/*------------------------------ Edit Quatation ------------------------------*/
/* List Quotation to Edit */
exports.listQuotationsToEdit = async (req, res) => {
  try {
    // const result = await quotations.findAll({
    //   attributes: ["id", "event_date", "area_viewing_date", "amount_savory_food", "amount_sweet_food", "amount_drink"],
    //   include: [
    //     {
    //       model: customers,
    //       include: [
    //         {
    //           model: customer_tax_invoices,
    //           attributes: ["title", "tax_id", "flash_number", "email", "telephone_number", "mobile_phone_number", "address"],
    //           include: [
    //             {
    //               model: districts,
    //               attributes: ["district", "amphoe", "province", "zipcode"]
    //             }
    //           ]
    //         },
    //       ],
    //     },
    //     {
    //       model: quotation_promotions,
    //       attributes: ["quotation_id", "promotion_id"],
    //       include: [
    //         {
    //           model: promotions,
    //           attributes: ["id", "name", "discount"]
    //         }
    //       ],
    //       where: { quotation_id: req.body.id }
    //     },
    //     {
    //       model: quotation_packages,
    //       attributes: ["quotation_id", "package_id", "amount"],
    //       include: [
    //         {
    //           model: packages,
    //           attributes: ["id", "name", "price"]
    //         }
    //       ]
    //     }
    //   ],
    //   where: {
    //     id: req.body.id,
    //     is_active: 1,
    //     is_delete: 0
    //   }
    // }).then(quotation_data => {
    //   quotation_data.map((data) => {
    //     /* Customer Data  */
    //     if (data.dataValues.customer) {
    //       data.dataValues.customer_tax_invoices = data.dataValues.customer.customer_tax_invoices[0];
    //       Object.assign(data.dataValues.customer_tax_invoices.dataValues, data.dataValues.customer_tax_invoices.district.dataValues)
    //       delete data.dataValues.customer;
    //     } else {
    //       data.dataValues.customer_tax_invoices = "ไม่พบข้อมูล";
    //     }
    //   });
    //   return quotation_data;
    // });


    /* Customers Data  */
    const quotation_customers_result = await quotations.findAll({
      attributes: ["id", "event_date", "area_viewing_date", "amount_savory_food", "amount_sweet_food", "amount_drink"],
      include: [
        {
          model: customers,
          include: [
            {
              model: customer_tax_invoices,
              attributes: ["title", "tax_id", "flash_number", "email", "telephone_number", "mobile_phone_number", "address"],
              include: [
                {
                  model: districts,
                  attributes: ["district", "amphoe", "province", "zipcode"]
                }
              ]
            },
          ],
        },
      ],
      where: {
        id: req.body.id,
        is_active: 1,
        is_delete: 0
      }
    }).then(quotation_data => {
      quotation_data.map((data) => {
        /* Customer Data  */
        if (data.dataValues.customer) {
          data.dataValues.customer_tax_invoices = data.dataValues.customer.customer_tax_invoices[0];
          Object.assign(data.dataValues.customer_tax_invoices.dataValues, data.dataValues.customer_tax_invoices.district.dataValues)
          Object.assign(data.dataValues, data.dataValues.customer_tax_invoices.dataValues)
          delete data.dataValues.customer;
          delete data.dataValues.customer_tax_invoices;
        } else {
          data.dataValues.customer_tax_invoices = "ไม่พบข้อมูล";
        }
      });
      return quotation_data;
    });


    /* Promotions Data  */
    const quotation_promotions_result = await quotation_promotions.findAll({
      attributes: ["quotation_id", "promotion_id"],
      include: [
        {
          model: promotions,
          attributes: ["id", "name", "discount"]
        }
      ],
      where: {
        quotation_id: req.body.id,
      }
    }).then(promo_data => {
      promo_data.map(data => {
        Object.assign(data.dataValues, data.dataValues.promotion.dataValues)
        delete data.dataValues.promotion;
      });
      return promo_data
    });


    /* Packages Data  */
    const quotation_packages_result = await quotation_packages.findAll({
      attributes: ["quotation_id", "package_id", "amount"],
      include: [
        {
          model: packages,
          attributes: ["id", "name", "price"]
        }
      ],
      where: {
        quotation_id: req.body.id,
      }
    }).then(package_data => {
      package_data.map(data => {
        Object.assign(data.dataValues, data.dataValues.package.dataValues)
        delete data.dataValues.package;
      });
      return package_data
    });

    if (quotation_customers_result != '' && quotation_customers_result !== null) {
      res.json({
        response: "OK",
        result: {
          "customers_data": quotation_customers_result,
          "promotions_data": quotation_promotions_result,
          "packages_data": quotation_packages_result
        }
      });
    } else {
      res.json({ response: "FAILED", result: "Not Found." });
    }
  } catch (error) {
    console.log(error);
    res.json({ response: "FAILED", result: error });
  }
};

/* Edit Quotation */
exports.editQuotation = async (req, res) => {
  try {
    const { id, customer_id, package_id, promotion_id, event_date, area_viewing_date, amount_savory_food, amount_sweet_food, amount_drink, quotation_status_id, note } = req.body;
    /* แก้ไขใบเสนอราคา ตาราง quotations */
    const Quotationresult = await quotations.update({
      customer_id: customer_id,
      event_date: new Date(event_date),
      area_viewing_date: new Date(area_viewing_date),
      amount_savory_food: amount_savory_food,
      amount_sweet_food: amount_sweet_food,
      amount_drink: amount_drink,
      quotation_status_id: quotation_status_id,
      note: note
    },{
      where:{
        id:id,
        is_active: 1,
        is_delete: 0
      }
    });
    /* ลบ และ เพิ่ม Packageใหม่ ตาราง quotation_packages */
    const del_pack_quotation = await quotation_packages.destroy({
      where: {
        quotation_id : id
      }
    });
    const selectPackageresult = await quotation_packages.create({
      quotation_id: id,
      package_id: package_id,
      amount: parseInt(amount_savory_food) + parseInt(amount_sweet_food) + parseInt(amount_drink)
    });
    /*ลบ และ เพิ่ม รายการโปรโมชั่น สำหรับใบเสนอราคานั้นๆ*/
    const del_promo_quotation = await quotation_promotions.destroy({
      where: {
        quotation_id : id
      }
    });
    var ObjPromotions = promotion_id.map(promoId => { return { "quotation_id": id, "promotion_id": promoId } });
    console.log(ObjPromotions);
    const selectPromotionresult = await quotation_promotions.bulkCreate(ObjPromotions);

    res.json({
      response: "OK",
      result:{
        "delete_package_quotation":del_pack_quotation,
        "select_new_package_quotation":selectPackageresult,
        "delete_promotion_quotation":del_promo_quotation,
        "select_new_promotion_quotation":selectPromotionresult
      }
    });
  } catch (error) {
    console.log(error);
    res.json({ response: "FAILED", result: error });
  }
};


/*------------------------------ Delete Quatation ------------------------------*/
/* Delete Quotation */
exports.deleteQuotation = async (req, res) => {
  try {
    const { id } = req.body;
    /* ลบใบเสนอราคา ตาราง quotations */
    const result = await quotations.update({
      is_delete: 1
    }, {
      where: {
        id: req.body.id
      }
    });
    if (result != 0) {
      res.json({
        response: "OK",
        result: req.body.id + ": Deleted. Result: " + result,
      });
    } else {
      res.json({
        response: "FAILED",
        result: req.body.id + ": Not Found. Result: " + result,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ response: "FAILED", result: error });
  }
};



/*------------------------------ FormData Quatation to print ------------------------------*/
/* Header */
exports.head_address_and_date = async (req, res) => {
  try {
    
  } catch (error) {
    console.log(error);
    res.json({ response: "FAILED", result: error });
  }
};
