const { quotations, customers, districts, customer_tax_invoices, teams, users, user_details, quotation_drivers } = require("../../models");
const { Op, Sequelize } = require("sequelize");
const { find_between_date } = require("../../helper/finddate");

/* List All Shipping */
exports.listAllShipping = async (req, res) => {
  try {
    let count_total = 0;
    const { startdate, enddate } = req.body
    const where = find_between_date(startdate, enddate)

    const result = await quotations.findAll({
      attributes: ["quotation_code",
        [Sequelize.fn("date_format", Sequelize.col("`quotations`.`event_date`"), "%b %d, %Y"), "event_date"],
        [Sequelize.fn("date_format", Sequelize.col("`quotations`.`event_date`"), "%h:%i %p"), "event_date_datetime"],
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
          model: quotation_drivers, as: "lineup_food_driver",
          attributes: ["id"],
          include: [
            {
              model: users,
              attributes: ['id'],
              include: [
                {
                  model: user_details,
                  attributes: ['name']
                }
              ]
            }
          ],
          where: {
            driver_type: 2,
            is_active: 1,
            is_delete: 0
            
          },
          required: false
        },
        {
          model: teams, as: "lineup_food_team",
          where:{
            team_type:1
          },
          required: false
        },

      ],
      where: {
        quotation_status_id: 1,
        area_viewing_date: where,
        is_active: 1,
        is_delete: 0
      },
      order: [["id", "DESC"]]
    })
    .then(async quotation_data => {
      quotation_data.map(async (data) => {
        /* ชื่อลูกค้า */
        data.dataValues.customer_name = data.dataValues.customer.name
        data.dataValues.customer_tax_invoices = data.dataValues.customer.customer_tax_invoices.length > 0 ? data.dataValues.customer.customer_tax_invoices[0].title : data.dataValues.customer.name;

        /* ชื่อทีม */
        data.dataValues.lineup_food_team = data.dataValues.lineup_food_team != null ? data.dataValues.lineup_food_team.name : '-'
        

        /* คนขับรถ */
        data.dataValues.lineup_food_driver = data.dataValues.lineup_food_driver && data.dataValues.lineup_food_driver.length > 0 ? data.dataValues.lineup_food_driver[0].dataValues.user.dataValues.user_detail.name : '-'
        delete data.dataValues.customer;
        count_total++;
      });
      return quotation_data;
    });
    console.log('test',result);
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

/* List Shipping to See*/
exports.listShippingtoSee = async (req, res) => {
  try {
    let count_total = 0;
    const result = await quotations.findAll({
      attributes: ["quotation_code",
        [Sequelize.fn("date_format", Sequelize.col("`quotations`.`event_date`"), "%b %d, %Y (%h:%i %p)"), "event_date"],
        [Sequelize.fn("date_format", Sequelize.col("`quotations`.`area_viewing_date`"), "%b %d, %Y (%h:%i %p)"), "area_viewing_date"]
      ],
      include: [
        {
          model: customers,
          attributes: ["name", "address"],
          include: [
            {
              model: customer_tax_invoices,
              attributes: ["title"],
            },
            {
              model: districts,
              attributes: ["district", "amphoe", "province", "zipcode"]
            }
          ],
        },
        {
          model: teams, as: 'event_team'
        },
        {
          model: teams, as: 'area_viewing_team'
        }
      ],
      where: {
        quotation_status_id: 1,
        quotation_code: req.body.quotation_code,
        is_active: 1,
        is_delete: 0
      },
      order: [["id", "DESC"]]
    }).then(async quotation_data => {
      quotation_data.map(async (data) => {
        /* ชื่อลูกค้า */
        data.dataValues.customer_name = data.dataValues.customer.name
        data.dataValues.customer_tax_invoices = data.dataValues.customer.customer_tax_invoices != '' ? data.dataValues.customer.customer_tax_invoices[0].title : data.dataValues.customer.name;

        /* ชื่อทีม */
        data.dataValues.event_team = data.dataValues.event_team != null ? data.dataValues.event_team.name : '-'
        data.dataValues.area_viewing_team = data.dataValues.area_viewing_team != null ? data.dataValues.area_viewing_team.name : '-'

        data.dataValues.address = `${data.dataValues.customer.dataValues.address} ต.${data.dataValues.customer.dataValues.district.dataValues.district} อ.${data.dataValues.customer.dataValues.district.dataValues.amphoe} ${data.dataValues.customer.dataValues.district.dataValues.province} ${data.dataValues.customer.dataValues.district.dataValues.zipcode}`

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

/* Assign Team to Work */
exports.AssignWorkTeam = async (req, res) => {
  try {
    const { team_type, quotation_code, team_code, user_code } = req.body
    if (!quotation_code) {
      res.json({ response: "FAILED", result: "Invalid quotation_code." });
      return
    }
    if (!team_code) {
      res.json({ response: "FAILED", result: "Please Select Team." });
      return
    }
    if (!user_code) {
      res.json({ response: "FAILED", result: "Please Select Driver." });
      return
    }
    const get_id_quotation = await quotations.findOne({ where: { quotation_code: quotation_code } })
    const get_id_team = await teams.findOne({ where: { team_code: team_code } })
    const get_id_user = await user_details.findOne({ where: { user_code: user_code } })
    const is_check_driver = await quotation_drivers.findOne({
      where: {
        quotation_id: get_id_quotation.dataValues.id,
        driver_type: team_type,
        is_active: 1,
        is_delete: 0
      }
    })
    /*Assign Team*/
    let result = false
    if (parseInt(team_type) === 0) {
      result = await quotations.update(
        { area_viewing_team_id: get_id_team.dataValues.id },
        { where: { quotation_code: quotation_code } }
      )
    } else if (parseInt(team_type) === 1) {
      result = await quotations.update(
        { event_team_id: get_id_team.dataValues.id },
        { where: { quotation_code: quotation_code } }
      )
    }
    /*Assign Driver*/
    if (result) {
      console.log(is_check_driver);
      if (is_check_driver) {
        const updateDriver = await quotation_drivers.update({
          user_id: get_id_user.dataValues.id
        }, {
          where: {
            id: is_check_driver.dataValues.id
          }
        })
        result = { ...result, ...updateDriver.dataValues }
      } else {
        const createDriver = await quotation_drivers.create({
          quotation_id: get_id_quotation.dataValues.id,
          driver_type: team_type,
          user_id: get_id_user.dataValues.id
        })
        result = { ...result, ...createDriver.dataValues }
      }
    } else {
      res.json({ response: "FAILED", result: "something wrong." });
      return
    }
    res.json({
      response: "OK",
      result: result
    });
  } catch (error) {
    console.log(error);
    res.json({ response: "FAILED", result: error });
  }
};
