const { checklists, food_items, quotations, customer_tax_invoices, quotation_checklists, quotation_statuses, quotation_packages, quotation_promotions, customers, customer_types, districts, packages, package_equipments, equipments, promotions } = require("../../models");
const { Op, Sequelize } = require("sequelize");
const helper = require("../../helper/sku");


/*------------------------------ Create Quatation ------------------------------*/
/* List All Quotations */
exports.listAllQuotations = async (req, res) => {
  try {
    let count_total = 0;
    const result = await quotations.findAll({
      attributes: ["quotation_code", "quotation_status_id",
        [Sequelize.fn("date_format", Sequelize.col("`quotations`.`event_date`"), "%b %d, %Y"), "event_date"],
        [Sequelize.fn("date_format", Sequelize.col("`quotations`.`event_date`"), "%h:%i %p"), "event_date_datetime"],
        [Sequelize.fn("date_format", Sequelize.col("`quotations`.`area_viewing_date`"), "%b %d, %Y"), "area_viewing_date"],
        [Sequelize.fn("date_format", Sequelize.col("`quotations`.`area_viewing_date`"), "%h:%i %p"), "area_viewing_date_datetime"],
        [Sequelize.fn("date_format", Sequelize.col("`quotations`.`updated_at`"), "%d.%m.%Y"), "update"],
      ],
      include: [
        {
          model: customers,
          attributes: ["name"],
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
      order: [["id", "DESC"]]
    }).then(quotation_data => {
      quotation_data.map((data) => {
        data.dataValues.customer_tax_invoices = data.dataValues.customer.customer_tax_invoices != '' ? data.dataValues.customer.customer_tax_invoices[0].title : data.dataValues.customer.name;
        data.dataValues.quotation_status = data.dataValues.quotation_status.name
        data.dataValues.customer_name = data.dataValues.customer.name
        delete data.dataValues.customer;
        count_total++;
      });
      return quotation_data;
    });
    if (result != '' && result !== null) {
      res.json({
        response: "OK",
        total: count_total + " รายการ",
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
/* List Status Quotations Selector */
exports.listStatusQuotations = async (req, res) => {
  try {
    const result = await quotation_statuses.findAll({
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
/* Update Quotation Confirm Status  */
exports.comfirmQuotationStatus = async (req, res) => {
  try {
    const result = await quotations.update({
      quotation_status_id: req.body.status
    }, {
      where: {
        quotation_code: req.body.quotation_code
      }
    });
    if (parseInt(req.body.status) === 1) {
      const get_id_quotation = await quotations.findOne({ where: { quotation_code: req.body.quotation_code } })
      /* เพิ่ม checklistดูพื้นที่ ดึงจากข้อมูล checklistที่มีอยู่แล้ว  เมื่อเปลี่ยนสถานะเป็น confirm */
      const all_checklists = await checklists.findAll({ attributes: ['name', 'description'], where: { is_active: 1, is_delete: 0 } })
      if (all_checklists && all_checklists.length > 0) {
        const quot_checklists = all_checklists.map(checklist => {
          return { "quotation_id": get_id_quotation.dataValues.id, "name": checklist.name, "description": checklist.description, "status": 0, "checklist_type": 0, "is_editable": 0 }
        }
        );
        await quotation_checklists.bulkCreate(quot_checklists).then(() => { result.quotation_checklists = 'SUCCESS.' })
      }
      /* เพิ่ม checklistจัดงาน ดึงจากข้อมูล package เมื่อเปลี่ยนสถานะเป็น confirm */
      const get_equip_quot = await quotations.findAll({
        attributes: ['quotation_code'],
        include: [
          {
            model: quotation_packages,
            attributes: ['id'],
            include: [
              {
                model: packages,
                attributes: ['name'],
                include: [
                  {
                    model: package_equipments,
                    attributes: ['id'],
                    include: [
                      {
                        model: equipments,
                        attributes: ['id', 'name']
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ],
        where: {
          id: get_id_quotation.dataValues.id,
          is_active: 1,
          is_delete: 0
        }
      }).then(async datas => {
        if (datas && datas[0].dataValues.quotation_packages[0].dataValues.package.dataValues.package_equipments.length > 0) {
          const get_package_equipments = datas[0].dataValues.quotation_packages[0].dataValues.package.dataValues.package_equipments
          const equipname = get_package_equipments.map(data => {
            return { "quotation_id": get_id_quotation.dataValues.id, "name": data.dataValues.equipment.dataValues.name, "description": '', "status": 0, "returned_status": 0, "checklist_type": 1, "is_editable": 0 }
          })
          if (equipname && equipname.length > 0) {
            await quotation_checklists.bulkCreate(equipname).then((r) => { result.package = r })
          }
        }
      })
      await quotation_checklists.create({
        quotation_id: get_id_quotation.dataValues.id,
        name: "รายการตรวจสอบระหว่างงาน ใช้แสดงปุ้มเสร็จสิ้น",
        description: '',
        status: 0,
        returned_status: 0,
        checklist_type: 2,
        is_editable: 0
      })
    }

    if (result !== 0) {
      res.json({
        response: "OK",
        result: req.body.quotation_code + ": Updated. Result: " + result,
      });
    } else {
      res.json({
        response: "FAILED",
        result: req.body.quotation_code + ": Not Found. Result: " + result,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ response: "FAILED", result: error });
  }
};
/* List All Customer  */
exports.listAllCustomers = async (req, res) => {
  try {
    const result = await customers.findAll({
      attributes: [
        "customer_code",
        "name"
      ],
      where: {
        is_active: 1,
        is_delete: 0
      }
    }).then((cust_data) => {
      let arr = [];
      cust_data.map(data => {
        arr.push(data.dataValues.customer_code, data.dataValues.name);
      });
      return arr;
    });
    if (result != '' && result !== null) {
      res.json({
        response: "OK",
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
/* List All Food Items  */
exports.listAllFoodItems = async (req, res) => {
  try {
    const result = await food_items.findAll({
      attributes: [
        "id",
        "name"
      ],
      where: {
        food_type: req.body.food_type,
        is_active: 1,
        is_delete: 0
      }
    })
    if (result != '' && result !== null) {
      res.json({
        response: "OK",
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
/* List Customer information to Create Quotations  */
exports.listFindCustomerInformation = async (req, res) => {
  try {
    const check_type_id = await customers.findOne({
      attributes: ['type_id'],
      where: {
        is_active: 1,
        is_delete: 0,
        [Op.or]: {
          customer_code: req.body.iden,
          name: {
            [Op.substring]: req.body.iden
          },
        }
      }
    });
    if (parseInt(check_type_id.dataValues.type_id) === 1) {
      const result = await customers.findAll({
        attributes: ["customer_code", "name", "telephone_number", "mobile_phone_number", "address", ["type_id", "customer_type_id"]],
        include: [
          {
            model: districts,
            attributes: [["id", "district_id"], "district", "amphoe", "province", "zipcode", "district_code", "amphoe_code", "province_code"]
          },
          {
            model: customer_types,
            attributes: [["name", "customer_type_name"]]
          }
        ],
        where: {
          is_active: 1,
          is_delete: 0,
          [Op.or]: {
            customer_code: req.body.iden,
            name: {
              [Op.substring]: req.body.iden
            },
          }
        },
      }).then(cust_data => {
        cust_data.map((data) => {
          data.dataValues = {
            ...data.dataValues,
            title: "-",
            tax_id: "-",
            flash_number: "-",
            email: "-",
            ...data.dataValues.customer_type.dataValues,
            ...data.dataValues.district.dataValues
          };
          delete data.dataValues.customer_type;
        });
        res.json({ response: "OK", result: cust_data });
      });
    } else if (parseInt(check_type_id.dataValues.type_id) === 2) {
      const result = await customers.findAll({
        attributes: ["customer_code", "name", ["type_id", "customer_type_id"]],
        include: [
          {
            model: customer_tax_invoices,
            attributes: ["title", "tax_id", "flash_number", "email", "telephone_number", "mobile_phone_number", "address"],
            include: [
              {
                model: districts,
                attributes: [["id", "district_id"], "district", "amphoe", "province", "zipcode", "district_code", "amphoe_code", "province_code"]
              }
            ]
          },
          {
            model: customer_types,
            attributes: [["name", "customer_type_name"]]
          }
        ],
        where: {
          is_active: 1,
          is_delete: 0,
          [Op.or]: {
            customer_code: req.body.iden,
            name: {
              [Op.substring]: req.body.iden
            },
          }
        },
      }).then(cust_data => {
        cust_data.map((data) => {
          data.dataValues.customer_tax_invoices = data.dataValues.customer_tax_invoices[0];
          Object.assign(data.dataValues.customer_tax_invoices.dataValues, data.dataValues.customer_tax_invoices.district.dataValues)
          Object.assign(data.dataValues, data.dataValues.customer_tax_invoices.dataValues)
          Object.assign(data.dataValues, data.dataValues.customer_type.dataValues)
          delete data.dataValues.customer_type;
          delete data.dataValues.customer_tax_invoices;
        });
        res.json({ response: "OK", result: cust_data });
      });
    } else {
      res.json({ response: "FAILED", result: "Unknow: type_id" });
    }
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
        "package_code",
        "name",
        "amount_savory_food",
        "amount_sweet_food",
        "amount_drink",
        [Sequelize.fn("date_format", Sequelize.col("`packages`.`updated_at`"), "%d-%m-%Y"), "update"],
        [Sequelize.fn("CONCAT", "อาหารคาว ", Sequelize.col("`packages`.`amount_savory_food`"), ", อาหารหวาน ", Sequelize.col("`packages`.`amount_sweet_food`"), ", เครื่องดื่ม ", Sequelize.col("`packages`.`amount_drink`")), "food_des"],
      ],
      where: {
        package_code: req.body.package_code,
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
        "promotion_code",
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
    let customer_result = null;
    /* เช็ค id ลูกค้าที่ส่งมา ถ้าไม่มีให้สร้างลูกค้าใหม่  */
    if (!req.body.customer_code || req.body.customer_code == null || req.body.customer_code == undefined) {
      let customer_id;
      const getMaxCustomerCode = await customers.findOne({ attributes: [[Sequelize.fn('MAX', Sequelize.col('customer_code')), "maxCustomerCode"]] })
      const new_costomer_code = getMaxCustomerCode.dataValues.maxCustomerCode !== null ? helper.SKUincrementer(getMaxCustomerCode.dataValues.maxCustomerCode) : "BNP0000001";

      /* cal invoice NO */
      const max_invoice = await customer_tax_invoices.findOne({ attributes: [[Sequelize.fn('MAX', Sequelize.col('customer_tax_invoices_code')), "maxCtiCode"]] });
      let invoice_no = `INV${new Date().getYear().toString()}${((new Date().getMonth() + 1).toString()).padStart(2, 0)}${new Date().getDate().toString()}001`;
      if (max_invoice) {
        let old_date_inv = max_invoice.dataValues.maxCtiCode.substring(3, 10);
        let now_date_inv = `${new Date().getYear().toString()}${((new Date().getMonth() + 1).toString()).padStart(2, 0)}${new Date().getDate().toString()}`;
        if (old_date_inv == now_date_inv) {
          invoice_no = helper.SKUincrementer(max_invoice.dataValues.maxCtiCode);
        }
      }

      const { name, telephone_number, mobile_phone_number, type_id, address, district_id, tax_id, flash_number, email } = req.body;
      if (!name || name == null || name == undefined || name == '') { res.json({ response: "FAILED", result: "invalid Name." }) }
      if (!mobile_phone_number || mobile_phone_number == null || mobile_phone_number == undefined || mobile_phone_number == '') { res.json({ response: "FAILED", result: "invalid Mobile phone." }) }
      if (!district_id || district_id == null || district_id == undefined || district_id == '' || !address || address == null || address == undefined || address == '') { res.json({ response: "FAILED", result: "invalid Address." }) }
      if (parseInt(req.body.type_id) === 1) {
        /* Customers */
        const customers_result = await customers.create({
          customer_code: new_costomer_code,
          name: name,
          telephone_number: telephone_number,
          mobile_phone_number: mobile_phone_number,
          line_id: '-',
          type_id: type_id,
          address: address,
          district_id: district_id
        });
        customer_result = customers_result;
        customer_id = customers_result.dataValues.id;
      } else if (parseInt(req.body.type_id) === 2) {
        // cti = customer tax invoice //
        /* Email Check */
        const is_email = await customer_tax_invoices.findOne({ where: { [Op.and]: [{ email: email }, { email: { [Op.ne]: '' } }] } })
        console.log(is_email);
        if (is_email) {
          res.json({
            response: "FAILED",
            result: "Email already exists."
          });
          return
        }
        /* TAX ID Check */
        const is_tax_id = await customer_tax_invoices.findOne({ where: { [Op.and]: [{ tax_id: tax_id }, { tax_id: { [Op.ne]: '' } }] } })
        console.log(is_tax_id);
        if (is_tax_id) {
          res.json({
            response: "FAILED",
            result: "Tax ID already exists."
          });
          return
        }

        /* Customers */
        const customers_result = await customers.create({
          customer_code: new_costomer_code,
          name: name,
          telephone_number: telephone_number,
          mobile_phone_number: mobile_phone_number,
          line_id: '-',
          type_id: type_id,
          address: address,
          district_id: district_id
        });

        /* Customers Tax Invoices */
        const customer_tax_invoices_result = await customer_tax_invoices.create({
          customer_id: customers_result.dataValues.id,
          customer_tax_invoices_code: invoice_no,
          title: name || '',
          tax_id: tax_id || '',
          flash_number: flash_number || '',
          email: email || '',
          telephone_number: telephone_number || '',
          mobile_phone_number: mobile_phone_number || '',
          address: address || '',
          district_id: district_id || '',
          vat_type: 0
        });
        customer_result = [customers_result, customer_tax_invoices_result];
        customer_id = customers_result.dataValues.id;
      } else {
        res.json({
          response: "FAILED",
          result: "Invalid type_id"
        });
      }

      /* สร้างใบเสนอราคา ตาราง quotations */
      const { package_code, promotion_code, event_date, area_viewing_date, amount_savory_food, amount_sweet_food, amount_drink, note } = req.body;
      const getMaxQuotaCode = await quotations.findOne({ attributes: [[Sequelize.fn('MAX', Sequelize.col('quotation_code')), "maxQuotaCode"]] });
      const newQuotaCode = getMaxQuotaCode.dataValues.maxQuotaCode !== null ? helper.SKUincrementer(getMaxQuotaCode.dataValues.maxQuotaCode) : "BNPQU0000001"
      const Quotationresult = await quotations.create({
        quotation_code: newQuotaCode,
        customer_id: customer_id,
        event_date: new Date(event_date),
        area_viewing_date: new Date(area_viewing_date),
        amount_savory_food: amount_savory_food,
        amount_sweet_food: amount_sweet_food,
        amount_drink: amount_drink,
        quotation_status_id: 2,
        note: note
      });
      /* เลือก Package ตาราง quotation_packages */
      const findPackageId = await packages.findOne({ attributes: ['id'], where: { package_code: package_code } })
      const selectPackageresult = await quotation_packages.create({
        quotation_id: Quotationresult.dataValues.id,
        package_id: findPackageId.dataValues.id,
        amount: 1
      });
      /*สร้างรายการโปรโมชั่น สำหรับใบเสนอราคานั้นๆ*/
      const findPromoId = await promotions.findAll({
        attributes: ['id'],
        where: {
          promotion_code: {
            [Op.in]: promotion_code
          }
        }
      });
      var ObjPromotions = findPromoId.map(promoId => { return { "quotation_id": Quotationresult.dataValues.id, "promotion_id": promoId.id } });
      console.log(ObjPromotions);
      const selectPromotionresult = await quotation_promotions.bulkCreate(ObjPromotions);

      res.json({
        response: "OK",
        result: {
          "CreateCustomer": customer_result,
          "Quotation": Quotationresult,
          "selectPackage": selectPackageresult,
          "selectPromotion": selectPromotionresult
        }
      });

    } else {
      const { customer_code, package_code, promotion_code, event_date, area_viewing_date, amount_savory_food, amount_sweet_food, amount_drink, note } = req.body;
      /* สร้างใบเสนอราคา ตาราง quotations */
      const findCustomerId = await customers.findOne({ attributes: ['id'], where: { customer_code: customer_code } })
      const getMaxQuotaCode = await quotations.findOne({ attributes: [[Sequelize.fn('MAX', Sequelize.col('quotation_code')), "maxQuotaCode"]] });
      const newQuotaCode = getMaxQuotaCode.dataValues.maxQuotaCode !== null ? helper.SKUincrementer(getMaxQuotaCode.dataValues.maxQuotaCode) : "BNPQU0000001"
      const Quotationresult = await quotations.create({
        quotation_code: newQuotaCode,
        customer_id: findCustomerId.dataValues.id,
        event_date: new Date(event_date),
        area_viewing_date: new Date(area_viewing_date),
        amount_savory_food: amount_savory_food,
        amount_sweet_food: amount_sweet_food,
        amount_drink: amount_drink,
        quotation_status_id: 2,
        note: note
      });
      /* เลือก Package ตาราง quotation_packages */
      const findPackageId = await packages.findOne({ attributes: ['id'], where: { package_code: package_code } })
      const selectPackageresult = await quotation_packages.create({
        quotation_id: Quotationresult.dataValues.id,
        package_id: findPackageId.dataValues.id,
        amount: 1
      });
      /*สร้างรายการโปรโมชั่น สำหรับใบเสนอราคานั้นๆ*/
      const findPromoId = await promotions.findAll({
        attributes: ['id'],
        where: {
          promotion_code: {
            [Op.in]: promotion_code
          }
        }
      });
      var ObjPromotions = findPromoId.map(promoId => { return { "quotation_id": Quotationresult.dataValues.id, "promotion_id": promoId.id } });
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
    }
  } catch (error) {
    console.log(error);
    res.json({ response: "FAILED", result: error });
  }
};


/*------------------------------ Edit Quatation ------------------------------*/
/* List Quotation to Edit */
exports.listQuotationsToEdit = async (req, res) => {
  try {
    /* Customers Data  */
    const quotation_customers_result = await quotations.findAll({
      attributes: [
        "id",
        "quotation_code",
        [Sequelize.fn("date_format", Sequelize.col("`quotations`.`event_date`"), "%Y-%m-%d"), "event_date"],
        [Sequelize.fn("date_format", Sequelize.col("`quotations`.`area_viewing_date`"), "%Y-%m-%d"), "area_viewing_date"],
        "amount_savory_food",
        "amount_sweet_food",
        "amount_drink",
        "note"
      ],
      include: [
        {
          model: customers,
          attributes: ["customer_code", "type_id", "name", "telephone_number", "mobile_phone_number", "address"],
          include: [
            {
              model: customer_tax_invoices,
              attributes: ["title", "tax_id", "flash_number", "email", "telephone_number", "mobile_phone_number", "address"],
              include: [
                {
                  model: districts,
                  attributes: [["id", "district_id"], "district", "amphoe", "province", "zipcode", "district_code", "amphoe_code", "province_code"]
                }
              ]
            },
            {
              model: districts,
              attributes: [["id", "district_id"], "district", "amphoe", "province", "zipcode", "district_code", "amphoe_code", "province_code"]
            },
            {
              model: customer_types,
              attributes: [["name", "customer_type_name"]]
            }
          ],
        },
      ],
      where: {
        quotation_code: req.body.quotation_code,
        is_active: 1,
        is_delete: 0
      }
    }).then(quotation_data => {
      quotation_data.map((data) => {
        /* Customer Data  */
        if (data.dataValues.customer.type_id == 2) {
          data.dataValues.customer_tax_invoices = data.dataValues.customer.customer_tax_invoices[0];
          data.dataValues.customer_code = data.dataValues.customer.customer_code;
          data.dataValues.customer_type_id = data.dataValues.customer.type_id;
          data.dataValues.name = data.dataValues.customer.name;
          data.dataValues.customer_type_name = data.dataValues.customer.customer_type.dataValues.customer_type_name;
          Object.assign(data.dataValues.customer_tax_invoices.dataValues, data.dataValues.customer_tax_invoices.district.dataValues)
          Object.assign(data.dataValues, data.dataValues.customer_tax_invoices.dataValues)
          delete data.dataValues.customer;
          delete data.dataValues.customer_tax_invoices;
        } else if (data.dataValues.customer.type_id == 1) {
          data.dataValues.customer.dataValues = { ...data.dataValues.customer.dataValues, ...data.dataValues.customer.district.dataValues }
          data.dataValues.customer_code = data.dataValues.customer.customer_code; delete data.dataValues.customer.dataValues.customer_code;
          data.dataValues = {
            ...data.dataValues,
            title: "-",
            tax_id: "-",
            flash_number: "-",
            email: "-",
            customer_type_id: data.dataValues.customer.type_id,
            ...data.dataValues.customer.customer_type.dataValues,
            ...data.dataValues.customer.dataValues
          };
          delete data.dataValues.customer;
          delete data.dataValues.customer_tax_invoices;
          delete data.dataValues.type_id;
          delete data.dataValues.customer_type;
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
          attributes: ["promotion_code", "name", "discount"]
        }
      ],
      where: {
        quotation_id: quotation_customers_result[0].dataValues.id,
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
          attributes: ["id",
            "package_code",
            "name",
            "amount_savory_food",
            "amount_sweet_food",
            "amount_drink",
            [Sequelize.fn("date_format", Sequelize.col("`package`.`updated_at`"), "%d-%m-%Y"), "update"],
            [Sequelize.fn("CONCAT", "อาหารคาว ", Sequelize.col("`package`.`amount_savory_food`"), ", อาหารหวาน ", Sequelize.col("`package`.`amount_sweet_food`"), ", เครื่องดื่ม ", Sequelize.col("`package`.`amount_drink`")), "food_des"],
            "price"]
        }
      ],
      where: {
        quotation_id: quotation_customers_result[0].dataValues.id,
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
    const { quotation_code, customer_code, package_code, promotion_code, event_date, area_viewing_date, amount_savory_food, amount_sweet_food, amount_drink, note } = req.body;
    /* แก้ไขใบเสนอราคา ตาราง quotations */
    const findCustomerId = await customers.findOne({ attributes: ['id'], where: { customer_code: customer_code } });
    const findQuotaId = await quotations.findOne({ attributes: ['id'], where: { quotation_code: quotation_code } });
    const Quotationresult = await quotations.update({
      customer_id: findCustomerId.dataValues.id,
      event_date: new Date(event_date),
      area_viewing_date: new Date(area_viewing_date),
      amount_savory_food: amount_savory_food,
      amount_sweet_food: amount_sweet_food,
      amount_drink: amount_drink,
      note: note
    }, {
      where: {
        quotation_code: quotation_code,
        is_active: 1,
        is_delete: 0
      }
    });
    /* ลบ และ เพิ่ม Packageใหม่ ตาราง quotation_packages */
    const findPackageId = await packages.findOne({ attributes: ['id'], where: { package_code: package_code } })
    const del_pack_quotation = await quotation_packages.destroy({
      where: {
        quotation_id: findQuotaId.dataValues.id
      }
    });
    const selectPackageresult = await quotation_packages.create({
      quotation_id: findQuotaId.dataValues.id,
      package_id: findPackageId.dataValues.id,
      amount: 1
    });
    /*ลบ และ เพิ่ม รายการโปรโมชั่น สำหรับใบเสนอราคานั้นๆ*/
    const findPromoId = await promotions.findAll({
      attributes: ['id'],
      where: {
        promotion_code: {
          [Op.in]: promotion_code
        }
      }
    });
    const del_promo_quotation = await quotation_promotions.destroy({
      where: {
        quotation_id: findQuotaId.dataValues.id,
      }
    });
    var ObjPromotions = findPromoId.map(promoId => { return { "quotation_id": findQuotaId.dataValues.id, "promotion_id": promoId.id } });
    console.log(ObjPromotions);
    const selectPromotionresult = await quotation_promotions.bulkCreate(ObjPromotions);

    res.json({
      response: "OK",
      result: {
        "delete_package_quotation": del_pack_quotation,
        "select_new_package_quotation": selectPackageresult,
        "delete_promotion_quotation": del_promo_quotation,
        "select_new_promotion_quotation": selectPromotionresult
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
    /* ลบใบเสนอราคา ตาราง quotations */
    const result = await quotations.update({
      is_delete: 1
    }, {
      where: {
        quotation_code: req.body.quotation_code
      }
    });
    if (result != 0) {
      res.json({
        response: "OK",
        result: "Quotation: " + req.body.quotation_code + " Deleted. Result: " + result,
      });
    } else {
      res.json({
        response: "FAILED",
        result: "Quotation: " + req.body.quotation_code + " Not Found. Result: " + result,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ response: "FAILED", result: error });
  }
};


/*------------------------------ Print Quatation  ------------------------------*/
exports.printOutQuotation = async (req, res) => {
  try {
    var is_check_vat_type;
    /* ------------------------------------------------------- Header ------------------------------------------------------- */
    const header = await quotations.findAll({
      attributes: [
        "id",
        "quotation_code",
        [Sequelize.fn("date_format", Sequelize.col("`quotations`.`event_date`"), "%d/%m/%Y"), "event_date"],
        [Sequelize.fn("date_format", Sequelize.col("`quotations`.`created_at`"), "%d/%m/%Y"), "created_at"]
      ],
      include: [
        {
          model: customers,
          attributes: [["name", "customer_name"], "type_id", ["address", "cti_address"], ["telephone_number", "cti_telephone_number"]],
          include: [
            {
              model: customer_tax_invoices,
              attributes: [["address", "cti_address"], ["email", "cti_email"], ["telephone_number", "cti_telephone_number"], ["vat_type", "cti_vat_type"]],
              include: [
                {
                  model: districts,
                  attributes: [["district", "cti_district"], ["amphoe", "cti_amphoe"], ["province", "cti_province"], ["zipcode", "cti_zipcode"]]
                }
              ]
            }, {
              model: districts,
              attributes: [["district", "cti_district"], ["amphoe", "cti_amphoe"], ["province", "cti_province"], ["zipcode", "cti_zipcode"]]
            }
          ]
        }
      ],
      where: {
        quotation_code: req.body.quotation_code,
        is_active: 1,
        is_delete: 0
      }
    }).then(quotation_header => {
      quotation_header.map(data => {
        if (data.dataValues.customer.type_id == 2) {
          data.dataValues.customer_tax_invoices = data.dataValues.customer.customer_tax_invoices[0];
          data.dataValues.customer_name = data.dataValues.customer.dataValues.customer_name;
          Object.assign(data.dataValues, data.dataValues.customer_tax_invoices.district.dataValues);
          Object.assign(data.dataValues, data.dataValues.customer_tax_invoices.dataValues);
          is_check_vat_type = data.dataValues.cti_vat_type;
          delete data.dataValues.customer;
          delete data.dataValues.customer_tax_invoices;
          delete data.dataValues.district;
        } else if (data.dataValues.customer.type_id == 1) {
          data.dataValues.customer.dataValues = { ...data.dataValues.customer.dataValues, ...data.dataValues.customer.district.dataValues }
          data.dataValues = {
            ...data.dataValues,
            cti_email: "-",
            cti_vat_type: 0,
            ...data.dataValues.customer.dataValues
          };
          is_check_vat_type = 0;
          delete data.dataValues.customer;
          delete data.dataValues.customer_tax_invoices;
          delete data.dataValues.district;
          delete data.dataValues.type_id;
        }
      })
      return quotation_header;
    });

    let total = 0;
    const body_packages = await quotation_packages.findAll({
      attributes: [
        ["amount", "packages_amount"]
      ],
      include: [
        {
          model: packages,
          attributes: [["name", "package_name"], ["price", "package_price"]]
        }
      ],
      where: {
        quotation_id: header[0].dataValues.id,
        is_active: 1,
        is_delete: 0
      }
    }).then(pack_data => {
      pack_data.map(data => {
        Object.assign(data.dataValues, data.package.dataValues);
        total = total + (parseFloat(data.dataValues.package_price) * parseFloat(data.dataValues.packages_amount))
        data.dataValues.package_total = Intl.NumberFormat('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2, }).format((parseFloat(data.dataValues.package_price) * parseFloat(data.dataValues.packages_amount)));
        data.dataValues.package_price = Intl.NumberFormat('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2, }).format(data.dataValues.package_price);
        data.dataValues.packages_amount = data.dataValues.packages_amount.toFixed(3);
        delete data.package.dataValues;
      })
      return pack_data;
    });

    /* Promotions Data  */
    let discount = 0;
    let discount_percent;
    const body_promotions = await quotation_promotions.findAll({
      attributes: ["quotation_id", "promotion_id"],
      include: [
        {
          model: promotions,
          attributes: [["name", "promotion_name"], ["discount", "promotion_discount"], ["discount_type", "promotion_discount_type"]]
        }
      ],
      where: {
        quotation_id: header[0].dataValues.id,
        is_active: 1,
        is_delete: 0
      }
    }).then(prom_data => {
      prom_data.map(data => {
        Object.assign(data.dataValues, data.promotion.dataValues);
        if (parseInt(data.dataValues.promotion_discount_type) == 1) {
          discount = discount + parseFloat(data.dataValues.promotion_discount);
          data.dataValues.promotion_discount = Intl.NumberFormat('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2, }).format(data.dataValues.promotion_discount);
          delete data.promotion.dataValues;
        } else if (parseInt(data.dataValues.promotion_discount_type) == 2) {
          /*คำนวน ส่วนลดเป็นเปอร์เซนต์ (discount_type:2)*/
          let cal_discount = (total * parseFloat(data.dataValues.promotion_discount)) / 100;
          discount_percent = Number(data.dataValues.promotion_discount).toFixed(0);
          discount = discount + parseFloat(cal_discount);
          data.dataValues.promotion_discount = Intl.NumberFormat('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2, }).format(cal_discount);
          delete data.promotion.dataValues;
        }
      })
      return prom_data;
    });
    // body_packages.push.apply(body_packages,body_promotions)
    /* ------------------------------------------------------- Footer ------------------------------------------------------- */
    const note_footer = await quotations.findAll({
      attributes: ["note"],
      where: {
        quotation_code: req.body.quotation_code,
        is_active: 1,
        is_delete: 0
      }
    });

    let _discount = discount;
    let _total = total;
    let _amount = total - discount;

    var footer = {
      "note": note_footer[0].note,
      "total": Intl.NumberFormat('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2, }).format(_total),
      "discount": Intl.NumberFormat('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2, }).format(_discount),
      "discount_percent": discount_percent ? discount_percent + "%" : null,
      "amount": Intl.NumberFormat('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2, }).format((_amount)),
      "signature_date": new Date().toLocaleDateString("th-TH", { day: '2-digit', month: '2-digit', year: '2-digit' })
    }
    /* Check VAT Type */
    if (is_check_vat_type == 1) {
      let cal_vat = (_amount * 7) / 100;
      let amount_after_vat = _amount + cal_vat;
      footer = {
        ...footer,
        "vat": Intl.NumberFormat('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2, }).format((cal_vat)),
        "amount": Intl.NumberFormat('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2, }).format((amount_after_vat))
      }
    }
    res.json({
      response: "OK",
      result: {
        "header": header[0],
        "body": { "packages": body_packages, "promotions": body_promotions },
        "footer": footer
      }
    });
  } catch (error) {
    console.log(error);
    res.json({ response: "FAILED", result: error });
  }
};
