const { quotations, customers, customer_tax_invoices, teams, team_users, users, user_details, positions } = require("../../models");
const { Op, Sequelize } = require("sequelize");

/* List All Shipping */
exports.listAllShipping = async (req, res) => {
  try {
    let count_total = 0;
    const result = await quotations.findAll({
      attributes: ["quotation_code",
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
          model: teams, as: 'event_team',
          include: [
            {
              model: team_users,
              attributes: ['id'],
              include: [
                {
                  model: users,
                  attributes: ['email'],
                  include: [
                    {
                      model: user_details,
                      where: {
                        position_id: 5
                      },
                      required: false
                    }
                  ]
                }
              ]
            }
          ]
        },
        { model: teams, as: 'area_viewing_team' },
      ],
      where: {
        quotation_status_id: 1,
        is_active: 1,
        is_delete: 0
      },
      order: [["id", "DESC"]]
    }).then(quotation_data => {
      quotation_data.map((data) => {
        data.dataValues.customer_tax_invoices = data.dataValues.customer.customer_tax_invoices != '' ? data.dataValues.customer.customer_tax_invoices[0].title : data.dataValues.customer.name;
        data.dataValues.event_team = data.dataValues.event_team != null ? data.dataValues.event_team.name : '-'
        data.dataValues.area_viewing_team = data.dataValues.area_viewing_team != null ? data.dataValues.area_viewing_team.name : '-'
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

/* List All Teams and Drivers to Assign Shipping */
exports.listTeamstoAssignShipping = async (req, res) => {
  try {
    const getAllTeams = await teams.findAll({
      attributes: ['id', 'team_code', 'name'],
      where: {
        is_active: 1,
        is_delete: 0
      }
    })
    const getAllDrivers = await users.findAll({
      attributes: ['email'],
      include: [
        {
          model: user_details,
          attributes: ['id', 'user_code', 'name', 'nickname'],
          where: {
            position_id: 5
          }
        },
      ],
      where: {
        is_active: 1,
        is_delete: 0
      }
    }).then(drivers => {
      if (drivers && drivers.length != 0) {
        drivers.map((driver) => {
          driver.dataValues = { ...driver.user_detail.dataValues, ...driver.dataValues }
          delete driver.user_detail.dataValues
        })
      }
      return drivers;
    })
    res.json({
      response: "OK",
      result: {
        teams: getAllTeams,
        drivers: getAllDrivers
      }
    });
  } catch (error) {
    console.log(error);
    res.json({ response: "FAILED", result: error });
  }
};
