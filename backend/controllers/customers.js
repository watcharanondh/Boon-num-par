const { customers, customer_types, customer_tax_invoices } = require("../models");
const Sequelize = require("sequelize");

/* List Customer Type Selector */
exports.List_Customer_type = async (req, res) => {
  try {
    const result = await customer_types.findAll({
      attributes: ["id", "name"],
      where: {
        is_active: 1,
        is_delete: 0,
      },
    });
    res.json({ response: "OK", result: result });
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
        is_delete: 0,
        created_user: req.body.created_user
      },
      order: [["created_at", "DESC"]]
    });
    res.json({ response: "OK", result: result });
  } catch (error) {
    console.log(error);
    res.json({ response: "FAILED", result: error });
  }
};

/* Create Customer */
exports.Create_customers = async (req, res) => {
  const {
    id,
    name,
    telephone_number,
    mobile_phone_number,
    line_id,
    type_id,
    address,
    district_id,
    created_user
  } = req.body;
  try {
    const result = await customers.create({
      id: id,
      name: name,
      telephone_number: telephone_number,
      mobile_phone_number: mobile_phone_number,
      line_id: line_id,
      type_id: type_id,
      address: address,
      district_id: district_id,
      created_user: created_user,
      updated_user: created_user
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

/* Create Customer Tax Invoice */
exports.Create_customers_tax_invoice = async (req, res) => {
  const {
    id,
    title,
    tax_id,
    flash_number,
    email,
    telephone_number,
    mobile_phone_number,
    address,
    district_id,
    created_user
  } = req.body;
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
      district_id: district_id,
      created_user: created_user,
      updated_user: created_user
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
