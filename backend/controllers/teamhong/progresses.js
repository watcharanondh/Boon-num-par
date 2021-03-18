const { quotations, customers, districts, customer_tax_invoices, teams, users, user_details, quotation_drivers, quotation_statuses } = require("../../models");
const { Op, Sequelize } = require("sequelize");
const { find_between_date } = require("../../helper/finddate");

/* List Task by Filter */
exports.listTask = async (req, res) => {
  try {
    let count_total = 0;
    const { startdate, enddate } = req.body
    const where = find_between_date(startdate, enddate)

    const result = await quotations.findAll({
      attributes: ["quotation_code", "event_date"],
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
          model: teams, as: 'area_viewing_team'
        },
        {
          model: teams, as: 'event_team'
        },
      ],
      where: {
        quotation_status_id: 1,
        area_viewing_date: where,
        is_active: 1,
        is_delete: 0
      },
      order: [["id", "DESC"]]
    }).then(async quotation_data => {
      quotation_data.map(async (data) => {
        /* ชื่อลูกค้า */
        data.dataValues.customer_name = data.dataValues.customer.name
        data.dataValues.customer_tax_invoices = data.dataValues.customer.customer_tax_invoices != '' ? data.dataValues.customer.customer_tax_invoices[0].title : data.dataValues.customer.name;

        /* convert date */
        const _date = new Date(data.dataValues.event_date)
        const ye = new Intl.DateTimeFormat('th-TH', { year: 'numeric' }).format(_date);
        const mo = new Intl.DateTimeFormat('th-TH', { month: 'long' }).format(_date);
        const da = new Intl.DateTimeFormat('th-TH', { day: 'numeric' }).format(_date)
        data.dataValues.event_date = `${mo} ${da},${ye.slice(5, ye.length)}`

        /* ชื่อทีม */
        data.dataValues.event_team = data.dataValues.event_team != null ? data.dataValues.event_team.name : '-'
        data.dataValues.area_viewing_team = data.dataValues.area_viewing_team != null ? data.dataValues.area_viewing_team.name : '-'

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

/* List Task to cal Chart*/
exports.listChart = async (req, res) => {
  try {
    const { startdate, enddate } = req.body
    const where = find_between_date(startdate, enddate)

    const sum_quotation = await quotations.count({
      where: {
        area_viewing_date: where,
        is_active: 1,
        is_delete: 0
      }
    })
    console.log(sum_quotation);
    const result = await quotations.findAll({
      attributes: [[Sequelize.fn('COUNT', Sequelize.col('quotation_code')), 'count']],
      include: [
        {
          model: quotation_statuses,
          attributes: ["id", "name"]
        }
      ],
      where: {
        // quotation_status_id: 1,
        area_viewing_date: where,
        is_active: 1,
        is_delete: 0
      },
      group: 'quotation_status_id'
    }).then(quotation_data => {
      quotation_data.map((data) => {
        const count = data.dataValues.count
        data.dataValues = {
          ...data.dataValues,
          ...data.dataValues.quotation_status.dataValues,
          y: (count / sum_quotation) * 100,
          color: data.dataValues.quotation_status.dataValues.id == 1 ? '#2ED47A' : (data.dataValues.quotation_status.dataValues.id == 2 ? '#FFB946' : '#F7685B')
        }
        delete data.dataValues.quotation_status
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