const { quotations, customers, districts, quotation_drivers, customer_tax_invoices, teams, quotation_checklists, quotation_descriptions, quotation_statuses, quotation_images, users, user_details } = require("../../models");
const { Op, Sequelize } = require("sequelize");
const { find_between_date } = require("../../helper/finddate");

/* List Task by Filter */
exports.listTask = async (req, res) => {
  try {
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
          model: teams, as: 'area_viewing_team',
          required: false
        },
        {
          model: teams, as: 'event_team',
          required: false
        },
        {
          model: quotation_checklists,
          attributes: ['status'],
          where: {
            checklist_type: 0,
            is_active: 1,
            is_delete: 0
          },
          required: false
        }
      ],
      where: {
        quotation_status_id: 1,
        area_viewing_team_id: { [Op.ne]: null },
        area_viewing_date: where,
        is_active: 1,
        is_delete: 0
      },
      order: [["id", "DESC"]]
    }).then(async quotation_data => {
      success_count = 0;
      quotation_data.map(async (data) => {
        /* สถานะงาน */
        var isCheckAll = []
        if (data.dataValues.quotation_checklists.length > 0) {
          data.dataValues.quotation_checklists.map(x => {
            isCheckAll.push(x.status)
          })
        }
        data.dataValues.progress_status = isCheckAll.includes(1) || isCheckAll.includes(2) ? (isCheckAll.includes(0) || isCheckAll.includes(2) ? 1 : 2) : 0
        if (data.dataValues.progress_status == 2) { success_count++ }
        data.dataValues.progress_status_name = isCheckAll.includes(1) || isCheckAll.includes(2) ? (isCheckAll.includes(0) || isCheckAll.includes(2) ? 'กำลังดำเนินการ' : 'สำเร็จ') : 'ยังไม่สำเร็จ'

        /* ชื่อลูกค้า */
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
        delete data.dataValues.quotation_checklists;
      });
      return quotation_data;
    });
    if (result != '' && result !== null) {
      res.json({
        response: "OK",
        progressing: success_count + '/' + result.length,
        // result: result.length > 3 ? result.slice(0, 3) : result,
        result,
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
    var todo = 0;
    var doing = 0;
    var done = 0;

    const get_data = await quotations.findAll({
      attributes: ["quotation_code"],
      include: [
        {
          model: quotation_checklists,
          attributes: ['status'],
          where: {
            checklist_type: 0,
            is_active: 1,
            is_delete: 0
          },
          required: false
        }
      ],
      where: {
        quotation_status_id: 1,
        area_viewing_team_id: { [Op.ne]: null },
        area_viewing_date: where,
        is_active: 1,
        is_delete: 0
      },
      order: [["id", "DESC"]]
    }).then(async quotation_data => {
      quotation_data.map(async (data) => {
        /* สถานะงาน */
        var isCheckAll = []
        if (data.dataValues.quotation_checklists.length > 0) {
          data.dataValues.quotation_checklists.map(x => {
            isCheckAll.push(x.status)
          })
        }
        data.dataValues.progress_status = isCheckAll.includes(1) || isCheckAll.includes(2) ? (isCheckAll.includes(0) || isCheckAll.includes(2) ? 1 : 2) : 0
        data.dataValues.progress_status_name = isCheckAll.includes(1) || isCheckAll.includes(2) ? (isCheckAll.includes(0) || isCheckAll.includes(2) ? 'กำลังดำเนินการ' : 'สำเร็จ') : 'ยังไม่สำเร็จ'
        if (data.dataValues.progress_status == 0) { todo++ }
        if (data.dataValues.progress_status == 1) { doing++ }
        if (data.dataValues.progress_status == 2) { done++ }

        delete data.dataValues.quotation_checklists;
      });
      return quotation_data;
    });
    const result = [
      {
        name: 'สำเร็จ',
        y: (done / get_data.length) * 100,
        color: '#2ED47A',
      },
      {
        name: 'ดำเนินการอยู่',
        y: (doing / get_data.length) * 100,
        color: '#FFB946',
      },
      {
        name: 'ยังไม่สำเร็จ',
        y: (todo / get_data.length) * 100,
        color: '#F7685B',
      },
    ]
    res.json({
      response: "OK",
      result,
    });
  } catch (error) {
    console.log(error);
    res.json({ response: "FAILED", result: error });
  }
};

/* List All tasks */
exports.listAllTasks = async (req, res) => {
  try {
    let count_total = 0;
    const _where = find_between_date(req.body.startdate, req.body.enddate)
    let result = null
    if (req.body.type == 0) {
      result = await quotations.findAll({
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
            model: teams, as: 'area_viewing_team',
            where: {
              team_type: 0
            },
          },
          {
            model: quotation_drivers, as: 'area_viewing_driver',
            attributes: ["id"],
            include: [
              {
                model: users,
                attributes: ['email'],
                include: [
                  {
                    model: user_details,
                    attributes: ['id', 'name']
                  }
                ]
              }
            ],
            where: {
              driver_type: 0,
              is_active: 1,
              is_delete: 0
            },
            required: false
          },
          {
            model: teams, as: 'event_team',
            where: {
              team_type: 0
            },
          },
          {
            model: quotation_drivers, as: 'event_driver',
            attributes: ["id"],
            include: [
              {
                model: users,
                attributes: ['email'],
                include: [
                  {
                    model: user_details,
                    attributes: ['id', 'name']
                  }
                ]
              }
            ],
            where: {
              driver_type: 1,
              is_active: 1,
              is_delete: 0
            },
            required: false
          },
          {
            model: quotation_checklists,
            attributes: ['status'],
            where: {
              checklist_type: 0,
              is_active: 1,
              is_delete: 0
            },
            required: false
          }
        ],
        where: {
          quotation_status_id: 1,
          area_viewing_date: _where,
          area_viewing_team_id: { [Op.ne]: null },
          is_active: 1,
          is_delete: 0
        },
        order: [["id", "DESC"]]
      }).then(async quotation_data => {
        quotation_data.map(async (data) => {
          /* ชื่อลูกค้า */
          data.dataValues.customer_tax_invoices = data.dataValues.customer.customer_tax_invoices != '' ? data.dataValues.customer.customer_tax_invoices[0].title : data.dataValues.customer.name;

          /* ชื่อทีม */
          data.dataValues.event_team = data.dataValues.event_team != null ? data.dataValues.event_team.name : '-'
          data.dataValues.area_viewing_team = data.dataValues.area_viewing_team != null ? data.dataValues.area_viewing_team.name : '-'

          /* คนขับรถ */
          data.dataValues.event_driver = data.dataValues.event_driver && data.dataValues.event_driver.length > 0 ? data.dataValues.event_driver[0].dataValues.user.dataValues.user_detail.name : '-'
          data.dataValues.area_viewing_driver = data.dataValues.area_viewing_driver && data.dataValues.area_viewing_driver.length > 0 ? data.dataValues.area_viewing_driver[0].dataValues.user.dataValues.user_detail.name : '-'

          /* รายการตรวจสอบ */
          var isCheckAll = []
          if (data.dataValues.quotation_checklists.length > 0) {
            data.dataValues.quotation_checklists.map(x => {
              isCheckAll.push(x.status)
            })
          }
          data.dataValues.progress_status = isCheckAll.includes(1) || isCheckAll.includes(2) ? (isCheckAll.includes(2) ? 'ดำเนินการ' : 'สำเร็จ') : 'ไม่สำเร็จ'

          /* type */
          data.dataValues.type = req.body.type

          delete data.dataValues.customer;
          delete data.dataValues.quotation_checklists;
          count_total++;
        });
        return quotation_data;
      });
    } else if (req.body.type == 1) {
      result = await quotations.findAll({
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
            model: teams, as: 'area_viewing_team',
            where: {
              team_type: 0
            },
          },
          {
            model: quotation_drivers, as: 'area_viewing_driver',
            attributes: ["id"],
            include: [
              {
                model: users,
                attributes: ['email'],
                include: [
                  {
                    model: user_details,
                    attributes: ['id', 'name']
                  }
                ]
              }
            ],
            where: {
              driver_type: 0,
              is_active: 1,
              is_delete: 0
            },
            required: false
          },
          {
            model: teams, as: 'event_team',
            where: {
              team_type: 0
            },
          },
          {
            model: quotation_drivers, as: 'event_driver',
            attributes: ["id"],
            include: [
              {
                model: users,
                attributes: ['email'],
                include: [
                  {
                    model: user_details,
                    attributes: ['id', 'name']
                  }
                ]
              }
            ],
            where: {
              driver_type: 1,
              is_active: 1,
              is_delete: 0
            },
            required: false
          },
          {
            model: quotation_checklists,
            attributes: ['id', 'status', 'returned_status', 'checklist_type'],
            where: {
              is_active: 1,
              is_delete: 0
            },
            required: false
          }
        ],
        where: {
          quotation_status_id: 1,
          event_date: _where,
          event_team_id: { [Op.ne]: null },
          is_active: 1,
          is_delete: 0
        },
        order: [["id", "DESC"]]
      }).then(async quotation_data => {
        quotation_data.map(async (data) => {
          /* ชื่อลูกค้า */
          data.dataValues.customer_tax_invoices = data.dataValues.customer.customer_tax_invoices != '' ? data.dataValues.customer.customer_tax_invoices[0].title : data.dataValues.customer.name;

          /* ชื่อทีม */
          data.dataValues.event_team = data.dataValues.event_team != null ? data.dataValues.event_team.name : '-'
          data.dataValues.area_viewing_team = data.dataValues.area_viewing_team != null ? data.dataValues.area_viewing_team.name : '-'

          /* คนขับรถ */
          data.dataValues.event_driver = data.dataValues.event_driver && data.dataValues.event_driver.length > 0 ? data.dataValues.event_driver[0].dataValues.user.dataValues.user_detail.name : '-'
          data.dataValues.area_viewing_driver = data.dataValues.area_viewing_driver && data.dataValues.area_viewing_driver.length > 0 ? data.dataValues.area_viewing_driver[0].dataValues.user.dataValues.user_detail.name : '-'

          /* รายการตรวจสอบ */
          const getChecklists = data.dataValues.quotation_checklists
          const status_before = []
          const status_between = []
          const status_after = []

          if (getChecklists && getChecklists.length > 0) {
            getChecklists.map(x => {
              if (x.checklist_type == 1) {
                status_before.push(x.status)
                status_after.push(x.returned_status)
              } else if (x.checklist_type == 2) {
                status_between.push(x.status)
              }
            })
          }

          const progress_before = status_before.includes(0) || status_before.includes(2) ? 0 : 1
          const progress_between = status_between.includes(0) || status_between.includes(2) ? 0 : 1
          const progress_after = status_after.includes(0) || status_after.includes(2) ? 0 : 1
          const progress_total = progress_before + progress_between + progress_after

          data.dataValues.progress_status = progress_total == 3 ? 'สำเร็จ' : (progress_total == 1 || progress_total == 2 ? 'ดำเนินการ' : 'ไม่สำเร็จ')

          /* type */
          data.dataValues.type = req.body.type

          delete data.dataValues.customer;
          delete data.dataValues.quotation_checklists;
          count_total++;
        });
        return quotation_data;
      });
    }
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
/* List Task  to See*/
exports.listTasktoSee = async (req, res) => {
  try {
    const { quotation_code, type } = req.body
    if (!quotation_code) {
      res.json({ response: "FAILED", result: "Invalid quotation_code." });
      return
    }
    if (type == 0) {
      /* Head Info */
      const headInfo = await quotations.findAll({
        attributes: ["id", "quotation_code",
          [Sequelize.fn("date_format", Sequelize.col("`quotations`.`area_viewing_date`"), "%b %d, %Y (%h:%i %p)"), "area_viewing_date"],
          [Sequelize.fn("date_format", Sequelize.col("`quotations`.`event_date`"), "%b %d, %Y (%h:%i %p)"), "event_date"]
        ],
        include: [
          {
            model: customers,
            attributes: ["name", "address"],
            include: [
              {
                model: districts,
                attributes: ["district", "amphoe", "province", "zipcode"]
              }
            ],
          },
          {
            model: teams,
            as: 'area_viewing_team',
            attributes: [['team_code','area_viewing_team_code'], ['name', 'area_viewing_team_name']]
          },
          {
            model: teams,
            as: 'event_team',
            attributes: [['team_code','event_team_code'], ['name', 'event_team_name']]
          },
        ],
        where: {
          quotation_code: quotation_code,
          is_active: 1,
          is_delete: 0
        }
      }).then(quotation_data => {
        if (quotation_data && quotation_data.length > 0) {
          quotation_data.map((data) => {
            if (data.dataValues.area_viewing_team) {
              data.dataValues = { ...data.dataValues, ...data.dataValues.area_viewing_team.dataValues }
            }
            if (data.dataValues.event_team) {
              data.dataValues = { ...data.dataValues, ...data.dataValues.event_team.dataValues }
            }
            data.dataValues = {
              ...data.dataValues,
              customer_name: data.dataValues.customer.name ? data.dataValues.customer.name : '-',
              address: `${data.dataValues.customer.dataValues.address} ต.${data.dataValues.customer.dataValues.district.dataValues.district} อ.${data.dataValues.customer.dataValues.district.dataValues.amphoe} ${data.dataValues.customer.dataValues.district.dataValues.province} ${data.dataValues.customer.dataValues.district.dataValues.zipcode}`,
            }
            delete data.dataValues.area_viewing_team;
            delete data.dataValues.event_team;
            delete data.dataValues.customer;
          });
        }
        return quotation_data;
      });

      /* Checklist body */
      const checklists = await quotation_checklists.findAll({
        attributes: ['name', 'description', 'status'],
        where: {
          quotation_id: headInfo[0].dataValues.id,
          checklist_type: 0,
          is_active: 1,
          is_delete: 0
        }
      }).then(x => {
        x.map(o => {
          o.dataValues.status = parseInt(o.dataValues.status) === 1 ? 'ผ่าน' : 'ไม่ผ่าน'
        })
        return x
      })

      /* Image body */
      const img = await quotation_images.findAll({ attributes: [['id', 'uid'], 'name', 'url'], where: { quotation_id: headInfo[0].dataValues.id, img_type: 0, is_active: 1, is_delete: 0 } })

      res.json({
        response: "OK",
        result: {
          info: headInfo[0],
          checklist_count: checklists ? checklists.length : 0,
          checklists,
          img
        }
      });
    } else if (type == 1) {
      /* Head Info */
      const headInfo = await quotations.findAll({
        attributes: ["id", "quotation_code",
          [Sequelize.fn("date_format", Sequelize.col("`quotations`.`area_viewing_date`"), "%b %d, %Y (%h:%i %p)"), "area_viewing_date"],
          [Sequelize.fn("date_format", Sequelize.col("`quotations`.`event_date`"), "%b %d, %Y (%h:%i %p)"), "event_date"]
        ],
        include: [
          {
            model: customers,
            attributes: ["name", "address"],
            include: [
              {
                model: districts,
                attributes: ["district", "amphoe", "province", "zipcode"]
              }
            ],
          },
          {
            model: teams,
            as: 'area_viewing_team',
            attributes: [['team_code','area_viewing_team_code'], ['name', 'area_viewing_team_name']]
          },
          {
            model: teams,
            as: 'event_team',
            attributes: [['team_code','event_team_code'], ['name', 'event_team_name']]
          },
        ],
        where: {
          quotation_code: quotation_code,
          is_active: 1,
          is_delete: 0
        }
      }).then(quotation_data => {
        if (quotation_data && quotation_data.length > 0) {
          quotation_data.map((data) => {
            if (data.dataValues.area_viewing_team) {
              data.dataValues = { ...data.dataValues, ...data.dataValues.area_viewing_team.dataValues, }
            }
            if (data.dataValues.event_team) {
              data.dataValues = { ...data.dataValues, ...data.dataValues.event_team.dataValues }
            }
            data.dataValues = {
              ...data.dataValues,
              customer_name: data.dataValues.customer.name ? data.dataValues.customer.name : '-',
              address: `${data.dataValues.customer.dataValues.address} ต.${data.dataValues.customer.dataValues.district.dataValues.district} อ.${data.dataValues.customer.dataValues.district.dataValues.amphoe} ${data.dataValues.customer.dataValues.district.dataValues.province} ${data.dataValues.customer.dataValues.district.dataValues.zipcode}`,
            }
            delete data.dataValues.area_viewing_team;
            delete data.dataValues.event_team;
            delete data.dataValues.customer;
          });
        }
        return quotation_data;
      });

      /* -------------- BEFORE -------------- */
      /* Checklist before */
      const checklists_before = await quotation_checklists.findAll({
        attributes: ['name', 'description', 'status'],
        where: {
          quotation_id: headInfo[0].dataValues.id,
          checklist_type: 1,
          is_active: 1,
          is_delete: 0
        }
      }).then(x => {
        if (x && x.length > 0) {
          x.map(o => {
            o.dataValues.status = parseInt(o.dataValues.status) === 1 ? 'ผ่าน' : 'ไม่ผ่าน'
          })
        }
        return x
      })

      /* description before */
      const description_before = await quotation_descriptions.findOne({
        attributes: ['description'],
        where: {
          quotation_id: headInfo[0].dataValues.id,
          description_type: 0,
          is_active: 1,
          is_delete: 0
        }
      })

      /* Image before */
      const img_before = await quotation_images.findAll({
        attributes: [['id', 'uid'], 'name', 'url'],
        where: {
          quotation_id: headInfo[0].dataValues.id,
          img_type: 1,
          is_active: 1,
          is_delete: 0
        }
      })
      /* ------------------------------------- */


      /* -------------- BETWEEN -------------- */
      /* Image ดูพื้นที่ */
      const img_viewing_area = await quotation_images.findAll({
        attributes: [['id', 'uid'], 'name', 'url'],
        where: {
          quotation_id: headInfo[0].dataValues.id,
          img_type: 0,
          is_active: 1,
          is_delete: 0
        }
      })
      /* Checklist between */
      const checklists_between = await quotation_checklists.findOne({
        attributes: ['id', 'status'],
        where: {
          quotation_id: headInfo[0].dataValues.id,
          checklist_type: 2,
          is_active: 1,
          is_delete: 0
        }
      })

      /* description between */
      const description_between = await quotation_descriptions.findOne({
        attributes: ['description'],
        where: {
          quotation_id: headInfo[0].dataValues.id,
          description_type: 1,
          is_active: 1,
          is_delete: 0
        }
      })

      /* Image between */
      const img_between = await quotation_images.findAll({
        attributes: [['id', 'uid'], 'name', 'url'],
        where: {
          quotation_id: headInfo[0].dataValues.id,
          img_type: 2,
          is_active: 1,
          is_delete: 0
        }
      })
      /* ------------------------------------- */


      /* -------------- AFTER -------------- */
      /* Checklist after */
      const checklists_after = await quotation_checklists.findAll({
        attributes: ['name', 'description', ['returned_status', 'status']],
        where: {
          quotation_id: headInfo[0].dataValues.id,
          checklist_type: 1,
          is_active: 1,
          is_delete: 0
        }
      }).then(x => {
        if (x && x.length > 0) {
          x.map(o => {
            o.dataValues.status = parseInt(o.dataValues.status) === 1 ? 'ผ่าน' : 'ไม่ผ่าน'
          })
        }
        return x
      })

      /* description after */
      const description_after = await quotation_descriptions.findOne({
        attributes: ['description'],
        where: {
          quotation_id: headInfo[0].dataValues.id,
          description_type: 2,
          is_active: 1,
          is_delete: 0
        }
      })

      /* Image after */
      const img_after = await quotation_images.findAll({
        attributes: [['id', 'uid'], 'name', 'url'],
        where: {
          quotation_id: headInfo[0].dataValues.id,
          img_type: 3,
          is_active: 1,
          is_delete: 0
        }
      })
      /* ------------------------------------- */

      res.json({
        response: "OK",
        result: {
          info: headInfo[0],
          before: {
            checklist_count: checklists_before ? checklists_before.length : 0,
            checklists: checklists_before,
            description: description_before ? description_before.dataValues.description : '',
            img: img_before
          },
          between: {
            viewing_img: img_viewing_area,
            checklists: checklists_between,
            checklist_check_all: checklists_between && checklists_between.dataValues.status == 1 ? 1 : 0,
            description: description_between ? description_between.dataValues.description : '',
            img: img_between
          },
          after: {
            checklist_count: checklists_after ? checklists_after.length : 0,
            checklists: checklists_after,
            description: description_after ? description_after.dataValues.description : '',
            img: img_after
          },
        }
      });
    } else {
      res.json({ response: "FAILED", result: "Unknow type." });
    }
  } catch (error) {
    console.log(error);
    res.json({ response: "FAILED", result: error });
  }
};
