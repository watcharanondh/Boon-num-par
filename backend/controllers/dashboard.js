const { quotations, quotation_statuses, customers, customer_tax_invoices } = require("../models");
const { Op, Sequelize } = require("sequelize");

/* List Customer Type */
exports.List_All_Dashboard = async (req, res) => {
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
    const Lastquotation = await quotations.findAll({
      attributes: ['id'],
      include: [
        {
          model: customers,
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
    });
    /* List Latest Customers */
    const LastCustomers = await customers.findAll({
      attributes: ['id', [Sequelize.fn("date_format", Sequelize.col("`customers`.`created_at`"), "%d-%m-%Y"), "created_at_date"]],
      include: [
        {
          model: customer_tax_invoices,
          attributes: ['id','title']
        }
      ],
      where: {
        is_active: 1,
        is_delete: 0
      },
      order: [["created_at", "DESC"]]
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
