const { quotations, customer_tax_invoices, quotation_statuses, customers ,districts} = require("../models");
const { Op , Sequelize } = require("sequelize");

/* List All Quotations */
exports.List_All_Quotations = async (req, res) => {
  try {
    const result = await quotations.findAll({
      attributes: [
        "id",
        "event_date",
        "area_viewing_date",
        "quotation_status_id",
        [Sequelize.fn("date_format",Sequelize.col("`quotations`.`updated_at`"),"%d.%m.%Y" ),"updated"]
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
        is_delete: 0,
        created_user: req.body.created_user,
      },
    });
    res.json({ response: "OK", result: result });
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
          attributes: ["title","tax_id","flash_number","email","telephone_number","mobile_phone_number","address"],
          include:[
            {
              model: districts,
              attributes: ["district","amphoe","province","zipcode"],
            }
          ]
        }
      ],
      where: {
        is_active: 1,
        is_delete: 0,
        created_user: req.body.created_user,
        [Op.or]:{
          id: req.body.iden,
          name:{
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

/* Create New Quotations */
exports.Create_New_Quotations = async (req, res) => {
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
