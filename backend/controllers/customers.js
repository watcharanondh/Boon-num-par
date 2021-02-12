const { customers, customer_types, customer_tax_invoices, districts } = require("../models");
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
      order: [["id", "DESC"]]
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
    const getMaxCustomerId = await customers.findOne({ attributes: [[Sequelize.fn('MAX', Sequelize.col('id')), "maxCustomerId"]] })
    const costomer_id = getMaxCustomerId.dataValues.maxCustomerId !== null ? helper.SKUincrementer(getMaxCustomerId.dataValues.maxCustomerId) : "BNP0000001";
    if (parseInt(req.body.type_id) === 1) {
      /* Customers */
      const { name, telephone_number, mobile_phone_number, line_id, type_id, address, district_id } = req.body;
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
      if (customers_result) {
        res.json({
          response: "OK",
          result: {
            "customers": customers_result
          }
        });
      }
    } else if (parseInt(req.body.type_id) === 2) {
      // cti = customer tax invoice //
      const { name, telephone_number, mobile_phone_number, line_id, type_id, address, district_id, cti_title, cti_tax_id, cti_flash_number, cti_email, cti_telephone_number, cti_mobile_phone_number, cti_address, cti_district_id, cti_vat_type } = req.body;
      /* Email Check */
      const is_email = await customer_tax_invoices.findOne({ where: { email: cti_email } })
      if (is_email) {
        res.json({
          response: "FAILED",
          result: "Email already exists."
        });
      }
      /* TAX ID Check */
      const is_tax_id = await customer_tax_invoices.findOne({ where: { tax_id: cti_tax_id } })
      if (is_tax_id) {
        res.json({
          response: "FAILED",
          result: "Tax ID already exists."
        });
      }

      /* Customers */
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
      const customer_tax_invoices_result = await customer_tax_invoices.create({
        id: costomer_id,
        title: cti_title,
        tax_id: cti_tax_id,
        flash_number: cti_flash_number,
        email: cti_email,
        telephone_number: cti_telephone_number,
        mobile_phone_number: cti_mobile_phone_number,
        address: cti_address,
        district_id: cti_district_id,
        vat_type: cti_vat_type
      });
      if (customers_result && customer_tax_invoices_result) {
        res.json({
          response: "OK",
          result: {
            "customers": customers_result,
            "customers_tax_invoices": customer_tax_invoices_result,
          }
        });
      }
    }else{
      res.json({
        response: "FAILED",
        result: "Invalid type_id"
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
    const find_customer_type = await customers.findOne({ attributes: ['type_id'], where: { id: req.body.id } })
    if (parseInt(find_customer_type.type_id) === 1) {
      var result = await customers.findAll({
        attributes: ["id", "name", "telephone_number", "mobile_phone_number", "line_id", "type_id", "address", "district_id"],
        include: [
          {
            model: districts,
            attributes: ["district", "amphoe", "province", "zipcode", "district_code", "amphoe_code", "province_code"]
          }
        ],
        where: {
          id: req.body.id,
          is_active: 1,
          is_delete: 0
        }
      }).then(all_customers => {
        all_customers[0].dataValues = { ...all_customers[0].dataValues, ...all_customers[0].district.dataValues}
        return all_customers;
      });
    } else if(parseInt(find_customer_type.type_id) === 2) {
      var result = await customers.findAll({
        attributes: ["id", "name", "telephone_number", "mobile_phone_number", "line_id", "type_id", "address", "district_id"],
        include: [
          {
            model: customer_tax_invoices,
            attributes: [["title", "cti_title"], ["tax_id", "cti_tax_id"], ["flash_number", "cti_flash_number"], ["email", "cti_email"], ["telephone_number", "cti_telephone_number"], ["mobile_phone_number", "cti_mobile_phone_number"], ["address", "cti_address"], ["district_id", "cti_district_id"], ["vat_type", "cti_vat_type"]],
            include: [
              {
                model: districts,
                attributes: [["district", "cti_district"], ["amphoe", "cti_amphoe"], ["province", "cti_province"], ["zipcode", "cti_zipcode"], ["district_code", "cti_district_code"], ["amphoe_code", "cti_amphoe_code"], ["province_code", "cti_province_code"]]
              }
            ],
            where: {
              is_active: 1,
              is_delete: 0
            }
          },
          {
            model: districts,
            attributes: [["district","district_personal"], "amphoe", "province", "zipcode", "district_code", "amphoe_code", "province_code"]
          }
        ],
        where: {
          id: req.body.id,
          is_active: 1,
          is_delete: 0
        }
      })
        .then(all_customers => {
          all_customers[0].dataValues = { ...all_customers[0].dataValues, ...all_customers[0].district.dataValues, ...all_customers[0].customer_tax_invoices[0].district.dataValues, ...all_customers[0].customer_tax_invoices[0].dataValues ,...all_customers[0].dataValues.district_personal}
          all_customers[0].dataValues.district = all_customers[0].dataValues.district_personal; /// set ditrict ทับ เพราะโดนแทนที่ตอน query ///  
          all_customers[0].dataValues.check_same_address = all_customers[0].dataValues.district_id == all_customers[0].dataValues.cti_district_id ? 1 : 0 ;
          delete all_customers[0].dataValues.customer_tax_invoices;
          delete all_customers[0].dataValues.district_personal;
          return all_customers;
        });
    }

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
    if (parseInt(req.body.type_id) === 1) {
      /* Customers ประเภทบุคคล */
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
      if (customers_result) {
        res.json({
          response: "OK",
          result: {
            "customers": customers_result
          }
        });
      }
    } else if (parseInt(req.body.type_id) === 2) {
      /* Customers ประเภทนิติบุคคล */
      const { id, name, telephone_number, mobile_phone_number, line_id, address, district_id, cti_title, cti_tax_id, cti_flash_number, cti_email, cti_telephone_number, cti_mobile_phone_number, cti_address, cti_district_id,cti_vat_type } = req.body;
      /* Email Check */
      const is_email = await customer_tax_invoices.findOne({ where: { email: cti_email } })
      const is_own_email = await customer_tax_invoices.findOne({ where: { email: cti_email, id: id } })
      console.log('emaili',is_email);
      if (is_email) {
        if (!is_own_email) {        
          res.json({
            response: "FAILED",
            result: "Email already exists."
          });
        }
      }
      /* TAX ID Check */
      const is_tax_id = await customer_tax_invoices.findOne({ where: { tax_id: cti_tax_id} })
      const is_own_tax_id = await customer_tax_invoices.findOne({ where: { tax_id: cti_tax_id, id: id } })
      console.log('tax_id',is_tax_id);
      if (is_tax_id) {
        if (!is_own_tax_id) {
          res.json({
            response: "FAILED",
            result: "Tax ID already exists."
          });          
        }
      }
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
      const customer_tax_invoices_result = await customer_tax_invoices.update({
        title: cti_title,
        tax_id: cti_tax_id,
        flash_number: cti_flash_number,
        email: cti_email,
        telephone_number: cti_telephone_number,
        mobile_phone_number: cti_mobile_phone_number,
        address: cti_address,
        district_id: cti_district_id,
        vat_type: cti_vat_type
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
      }
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
        result: "Customer: " + req.body.id + " Deleted. Result: " + result,
      });
    } else {
      res.json({
        response: "FAILED",
        result: "Customer: " + req.body.id + " Not Found. Result: " + result,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ response: "FAILED", result: error });
  }
};

/*------------------------------ *ยังไม้ได้ใช้* Customer Tax Invoice ------------------------------*/
/* List All Customer Tax Invoice */
exports.listAllCustomersTaxInvoice = async (req, res) => {
  try {
    let count_total = 0;
    const result = await customer_tax_invoices.findAll({
      attributes: [
        "id",
        "title",
        [Sequelize.fn("date_format", Sequelize.col("`customer_tax_invoices`.`updated_at`"), "%d.%m.%Y"), "update"],
        [Sequelize.fn("date_format", Sequelize.col("`customer_tax_invoices`.`created_at`"), "%b %d, %Y"), "created_at_date"],
        [Sequelize.fn("date_format", Sequelize.col("`customer_tax_invoices`.`created_at`"), "%h:%i %p"), "created_at_datetime"],
      ],
      where: {
        is_active: 1,
        is_delete: 0
      },
      order: [["created_at", "DESC"]]
    }).then(customers_tax_invoice_data => {
      customers_tax_invoice_data.map((data) => {
        count_total++
      });
      return customers_tax_invoice_data;
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
      include: [
        {
          model: districts,
          attributes: ["district", "amphoe", "province", "zipcode", "district_code", "amphoe_code", "province_code"]
        }
      ],
      where: {
        id: req.body.id,
        is_active: 1,
        is_delete: 0
      }
    }).then(all_customer_tax_invoice => {
      all_customer_tax_invoice[0].dataValues = { ...all_customer_tax_invoice[0].dataValues, ...all_customer_tax_invoice[0].district.dataValues }
      return all_customer_tax_invoice;
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
        result: "Customer Tax Invoice: " +  req.body.id + " Deleted. Result: " + result,
      });
    } else {
      res.json({
        response: "FAILED",
        result: "Customer Tax Invoice: " +  req.body.id + " Not Found. Result: " + result,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ response: "FAILED", result: error });
  }
};