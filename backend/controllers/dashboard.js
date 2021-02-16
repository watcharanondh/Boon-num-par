const { quotations, quotation_statuses, customers, customer_tax_invoices } = require("../models");
const { Op, Sequelize } = require("sequelize");

/* List Customer Type */
exports.listAllDashboard = async (req, res) => {
  try {
    /* Header Count total,confirm,unconfirm,cancel */
    const Totals = await quotations.findOne({
      attributes: [[Sequelize.fn('COUNT', Sequelize.col('*')), 'total']],
      where: {
        is_active: 1,
        is_delete: 0
      }
    });
    const Confirms = await quotations.findOne({
      attributes: [[Sequelize.fn('COUNT', Sequelize.col('*')), 'confirm']],
      where: {
        quotation_status_id: 1,
        is_active: 1,
        is_delete: 0
      }
    });
    const UnConfirms = await quotations.findOne({
      attributes: [[Sequelize.fn('COUNT', Sequelize.col('*')), 'unconfirm']],
      where: {
        quotation_status_id: 2,
        is_active: 1,
        is_delete: 0
      }
    });
    const Cancel = await quotations.findOne({
      attributes: [[Sequelize.fn('COUNT', Sequelize.col('*')), 'cancel']],
      where: {
        quotation_status_id: 3,
        is_active: 1,
        is_delete: 0
      }
    });

    /* List Latest Quotations */
    var Lastquotation = await quotations.findAll({
      attributes: ['quotation_code'],
      include: [
        {
          model: customers,
          attributes: ['name'],
          include: {
            model: customer_tax_invoices,
            attributes: ['title']
          }
        },
        {
          model: quotation_statuses,
          attributes:['id','name']
        }
      ],
      where: {
        is_active: 1,
        is_delete: 0
      },
      order: [["created_at", "DESC"]]
    }).then(quotadata=>{
      quotadata.map((data)=>{
        data.dataValues.customer_tax_invoices = data.dataValues.customer.customer_tax_invoices != '' ? data.dataValues.customer.customer_tax_invoices[0].title : "ไม่พบข้อมูลนิติบุคคล";
        data.dataValues.quotation_status = data.dataValues.quotation_status.name
        delete data.dataValues.customer;
      });
      return quotadata;
    });

    /* List Latest Customers */
    var LastCustomers = await customers.findAll({
      attributes: ['customer_code','name', [Sequelize.fn("date_format", Sequelize.col("`customers`.`created_at`"), "%d-%m-%Y"), "created_at_date"]],
      include: [
        {
          model: customer_tax_invoices,
          attributes: ['customer_tax_invoices_code','title']
        }
      ],
      where: {
        is_active: 1,
        is_delete: 0
      },
      order: [["created_at", "DESC"]]
    }).then(custdata=>{
      custdata.map((data)=>{
        data.dataValues.customer_tax_invoices = data.dataValues.customer_tax_invoices != '' ? data.dataValues.customer_tax_invoices[0].title : "ไม่พบข้อมูลนิติบุคคล";
      });
      return custdata;
    });
    res.json({
      response: "OK",
      result: {
        "header": [Totals, Confirms, UnConfirms, Cancel],
        "latestquotation": Lastquotation != '' ? Lastquotation : "ไม่พบข้อมูลใบเสนอราคาล่าสุด",
        "latestcustomer": LastCustomers != '' ? LastCustomers : "ไม่พบข้อมูลรายชื่อลูกค้าล่าสุด"
      }
    });
  } catch (error) {
    console.log(error);
    res.json({ response: "FAILED", result: error });
  }
};
