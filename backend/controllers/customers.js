const { customers, customer_types, customer_tax_invoices } = require("../models");
const Sequelize = require("sequelize");
const helper = require("../helper/sku");

/*------------------------------ Customer ------------------------------*/
/* List Customer Type Selector */
exports.listCustomerType = async (req, res) => {
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
exports.listAllCustomers = async (req, res) => {
  try {
    let count_total = 0;
    const result = await customers.findAll({
      attributes: [
        "id",
        "name",
        [Sequelize.fn("date_format", Sequelize.col("`customers`.`updated_at`"), "%d.%m.%Y"), "update"],
        [Sequelize.fn("date_format", Sequelize.col("`customers`.`created_at`"), "%b %d, %Y"), "created_at_date"],
        [Sequelize.fn("date_format", Sequelize.col("`customers`.`created_at`"), "%h:%i %p"), "created_at_datetime"],
      ],
      include: [
        {
          model: customer_tax_invoices,
          attributes: ["title", [Sequelize.fn("date_format", Sequelize.col("`customer_tax_invoices`.`updated_at`"), "%d.%m.%Y"), "update"]],
        },
        {
          model: customer_types,
          attributes: ["name", [Sequelize.fn("date_format", Sequelize.col("`customer_type`.`updated_at`"), "%d.%m.%Y"), "update"]],
        },
      ],
      where: {
        is_active: 1,
        is_delete: 0
      },
      order: [["created_at", "DESC"]]
    }).then(customers_data => {
      customers_data.map((data) => {
        data.dataValues.customer_tax_invoices = data.dataValues.customer_tax_invoices != '' ? data.dataValues.customer_tax_invoices[0].title : "ไม่พบข้อมูล";
        data.dataValues.customer_type = data.dataValues.customer_type.name
        count_total++
      });
      return customers_data;
    });
    if (result != '' && result !== null) {
      res.json({
        response: "OK",
        total: count_total + " รายการ",
        result: result
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
exports.createCustomer = async (req, res) => {
  try {
    /* Customers */
    const { name, telephone_number, mobile_phone_number, line_id, type_id, address, district_id } = req.body;
    const getMaxCustomerId = await customers.findOne({ attributes: [[Sequelize.fn('MAX', Sequelize.col('id')), "maxCustomerId"]] })
    const costomer_id = getMaxCustomerId.dataValues.maxCustomerId !== null ? helper.SKUincrementer(getMaxCustomerId.dataValues.maxCustomerId) : "BNP0000001";
    const customers_result = await customers.create({
      id: costomer_id,
      name: name,
      telephone_number: telephone_number,
      mobile_phone_number: mobile_phone_number,
      line_id: line_id,
      type_id: type_id,
      address: address,
      district_id: district_id
    });

    /* Customers Tax Invoices */
    // cti = customer tax invoice //
    const { cti_title, cti_tax_id, cti_flash_number, cti_email, cti_telephone_number, cti_mobile_phone_number, cti_address, cti_district_id } = req.body;
    const customer_tax_invoices_result = await customer_tax_invoices.create({
      id: costomer_id,
      title: cti_title,
      tax_id: cti_tax_id,
      flash_number: cti_flash_number,
      email: cti_email,
      telephone_number: cti_telephone_number,
      mobile_phone_number: cti_mobile_phone_number,
      address: cti_address,
      district_id: cti_district_id
    });

    if (customers_result && customer_tax_invoices_result) {
      res.json({
        response: "OK",
        result: {
          "customers": customers_result,
          "customers_tax_invoices": customer_tax_invoices_result,
        }
      });
    } else {
      res.json({
        response: "FAILED",
        result: [customers_result, customer_tax_invoices_result]
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ response: "FAILED", result: error });
  }
};

/* List Customer to Edit*/
exports.listCustomerToEdit = async (req, res) => {
  try {
    var result = await customers.findAll({
      attributes: ["id", "name", "telephone_number", "mobile_phone_number", "line_id", "address", "district_id"],
      include: [
        {
          model: customer_tax_invoices,
          attributes: ["title", "tax_id", "flash_number", "email", "telephone_number", "mobile_phone_number", "address", "district_id",],
          where: {
            is_active: 1,
            is_delete: 0
          }
        }
      ],
      where: {
        id: req.body.id,
        is_active: 1,
        is_delete: 0
      }
    })
    .then(all_customers => {
        for (const [key, value] of Object.entries(all_customers[0].customer_tax_invoices[0].dataValues)) {
          let keys = "cti_" + `${key}`; /// set keyObject เพิ่ม cti_ ต่อด้านหน้า ///
          let vals = `${value}`;
          Object.assign(all_customers[0].dataValues,{[keys] : vals})
        }
        delete all_customers[0].dataValues.customer_tax_invoices;
      return all_customers;
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
/* Edit Customer */
exports.editCustomer = async (req, res) => {
  try {
  /* Customers */
    const { id, name, telephone_number, mobile_phone_number, line_id, address, district_id } = req.body;
    const customers_result = await customers.update({
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
  /* Customers Tax Invoices */
    // cti = customer tax invoice //
    const { cti_title, cti_tax_id, cti_flash_number, cti_email, cti_telephone_number, cti_mobile_phone_number, cti_address, cti_district_id } = req.body;
    const customer_tax_invoices_result = await customer_tax_invoices.update({
      title: cti_title,
      tax_id: cti_tax_id,
      flash_number: cti_flash_number,
      email: cti_email,
      telephone_number: cti_telephone_number,
      mobile_phone_number: cti_mobile_phone_number,
      address: cti_address,
      district_id: cti_district_id
    }, {
      where: {
        id: id,
        is_active: 1,
        is_delete: 0
      }
    });
    if (customers_result && customer_tax_invoices_result) {
      res.json({
        response: "OK",
        result: {
          "customers": customers_result,
          "customers_tax_invoices": customer_tax_invoices_result,
        }
      });
    } else {
      res.json({
        response: "FAILED",
        result: [customers_result, customer_tax_invoices_result]
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ response: "FAILED", result: error });
  }
};
/* Delete Customer (update is_delete) */
exports.deleteCustomer = async (req, res) => {
  try {
    const result = await customers.update({
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

/*------------------------------ *ยังไม้ได้ใช้* Customer Tax Invoice ------------------------------*/
/* Create Customer Tax Invoice */
exports.createCustomersTaxInvoice = async (req, res) => {
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
exports.listCustomersTaxInvoiceToEdit = async (req, res) => {
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
exports.editCustomersTaxInvoice = async (req, res) => {
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
exports.deleteCustomersTaxInvoice = async (req, res) => {
  try {
    const result = await customer_tax_invoices.update({
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