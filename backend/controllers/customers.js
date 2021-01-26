const { customers, customer_types, customer_tax_invoices } = require("../models");
const Sequelize = require("sequelize");
const helper = require("../helper/sku");

/*------------------------------ Customer ------------------------------*/
/* List Customer Type Selector */
exports.List_Customer_type = async (req, res) => {
  try {
    const result = await customer_types.findAll({
      attributes: ["id", "name"],
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
/* List All Customer */
exports.List_All_Customer = async (req, res) => {
  try {
    const result = await customers.findAll({
      attributes: [
        "id",
        "name",
        "updated_at",
        [Sequelize.fn("date_format", Sequelize.col("`customers`.`created_at`"), "%b %d, %Y"), "created_at_date"],
        [Sequelize.fn("date_format", Sequelize.col("`customers`.`created_at`"), "%h:%i %p"), "created_at_datetime"],
      ],
      include: [
        {
          model: customer_tax_invoices,
          attributes: ["title", "updated_at"],
        },
        {
          model: customer_types,
          attributes: ["name", "updated_at"],
        },
      ],
      where: {
        is_active: 1,
        is_delete: 0
      },
      order: [["created_at", "DESC"]]
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
/* Create Customer */
exports.Create_customer = async (req, res) => {
  const { name, telephone_number, mobile_phone_number, line_id, type_id, address, district_id } = req.body;
  const getMaxCustomerId = await customers.findOne({ attributes: [[Sequelize.fn('MAX', Sequelize.col('id')), "maxCustomerId"]] })
  try {
    const result = await customers.create({
      id: getMaxCustomerId.dataValues.maxCustomerId !== null ? helper.SKUincrementer(getMaxCustomerId.dataValues.maxCustomerId) : "BNP0000001",
      name: name,
      telephone_number: telephone_number,
      mobile_phone_number: mobile_phone_number,
      line_id: line_id,
      type_id: type_id,
      address: address,
      district_id: district_id
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
/* Edit Customer */
exports.Edit_customer = async (req, res) => {
  const { id, name, telephone_number, mobile_phone_number, line_id, address, district_id } = req.body;
  try {
    const result = await customers.update({
      name: name,
      telephone_number: telephone_number,
      mobile_phone_number: mobile_phone_number,
      line_id: line_id,
      address: address,
      district_id: district_id
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
/* Delete Customer (update is_delete) */
exports.Delete_customer = async (req, res) => {
  try {
    const result = await customers.update({
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

/*------------------------------ Customer Tax Invoice ------------------------------*/
/* Create Customer Tax Invoice */
exports.Create_customers_tax_invoice = async (req, res) => {
  const { id, title, tax_id, flash_number, email, telephone_number, mobile_phone_number, address, district_id } = req.body;
  try {
    const result = await customer_tax_invoices.create({
      id: id,
      title: title,
      tax_id: tax_id,
      flash_number: flash_number,
      email: email,
      telephone_number: telephone_number,
      mobile_phone_number: mobile_phone_number,
      address: address,
      district_id: district_id
    });
    res.json({
      response: "OK",
      result: result
    });
  } catch (error) {
    console.log(error);
    res.json({ response: "FAILED", result: error });
  }
};
/* List Customer Tax Invoice to Edit */
exports.List_customers_tax_invoice_to_Edit = async (req, res) => {
  try {
    const result = await customer_tax_invoices.findAll({
      attributes: ['title', 'tax_id', 'flash_number', 'email', 'telephone_number', 'mobile_phone_number', 'address', 'district_id'],
      where: {
        id: req.body.id,
        is_active: 1,
        is_delete: 0
      }
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
/* Edit Customer Tax Invoice */
exports.Edit_customers_tax_invoice = async (req, res) => {
  const { id, tax_id, title, flash_number, email, telephone_number, mobile_phone_number, address, district_id } = req.body;
  try {
    const result = await customer_tax_invoices.update({
      title: title,
      tax_id: tax_id,
      flash_number: flash_number,
      email: email,
      telephone_number: telephone_number,
      mobile_phone_number: mobile_phone_number,
      address: address,
      district_id: district_id
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
/* Delete Customer Tax Invoice  (update is_delete) */
exports.Delete_customers_tax_invoice = async (req, res) => {
  try {
    const result = await customer_tax_invoices.update({
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