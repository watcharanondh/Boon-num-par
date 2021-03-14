const { customers, districts, quotations, teams, quotation_checklists, quotation_images } = require("../../models");
const { Op, Sequelize } = require("sequelize");
const { find_between_date } = require("../../helper/finddate");

/* List All Survey Team task */
exports.listAllSurveyTeam = async (req, res) => {
  try {
    let count_total = 0;
    const _where = find_between_date(req.body.startdate, req.body.enddate)

    const result = await quotations.findAll({
      attributes: ["quotation_code",
        [Sequelize.fn("date_format", Sequelize.col("`quotations`.`area_viewing_date`"), "%b %d, %Y"), "area_viewing_date"],
        [Sequelize.fn("date_format", Sequelize.col("`quotations`.`area_viewing_date`"), "%h:%i %p"), "area_viewing_date_datetime"]
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
          attributes: ['team_code', ['name', 'team_name']]
        },
        {
          model: quotation_checklists,
          attributes: ['status'],
          where: {
            checklist_type: 0,
            is_active: 1,
            is_delete: 0
          }
        }
      ],
      where: {
        quotation_status_id: 1,
        area_viewing_team_id: { [Op.ne]: null },
        area_viewing_date: _where,
        is_active: 1,
        is_delete: 0
      },
      order: [["id", "DESC"]]
    }).then(quotation_data => {
      quotation_data.map((data) => {
        var isCheckAll = []
        if (data.dataValues.quotation_checklists.length > 0) {
          data.dataValues.quotation_checklists.map(x => {
            isCheckAll.push(x.status)
          })
        }
        data.dataValues = {
          ...data.dataValues.area_viewing_team.dataValues,
          address: `${data.dataValues.customer.dataValues.address} ต.${data.dataValues.customer.dataValues.district.dataValues.district} อ.${data.dataValues.customer.dataValues.district.dataValues.amphoe} ${data.dataValues.customer.dataValues.district.dataValues.province} ${data.dataValues.customer.dataValues.district.dataValues.zipcode}`,
          ...data.dataValues,
          progress_status: isCheckAll.includes(1) || isCheckAll.includes(2) ? (isCheckAll.includes(0) || isCheckAll.includes(2) ? 1 : 2) : 0,
        }
        delete data.dataValues.area_viewing_team;
        delete data.dataValues.customer;
        delete data.dataValues.quotation_checklists;
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

/* Manage task */
exports.manageTeamTask = async (req, res) => {
  try {
    const { quotation_code } = req.body
    if (!quotation_code) {
      res.json({ response: "FAILED", result: "Invalid quotation_code." });
      return
    }
    /* Head Info */
    const headInfo = await quotations.findAll({
      attributes: ["id", "quotation_code",
        [Sequelize.fn("date_format", Sequelize.col("`quotations`.`area_viewing_date`"), "%b %d, %Y (%h:%i %p)"), "area_viewing_date"]
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
          attributes: ['team_code', ['name', 'team_name']]
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
          data.dataValues = {
            ...data.dataValues,
            address: `${data.dataValues.customer.dataValues.address} ต.${data.dataValues.customer.dataValues.district.dataValues.district} อ.${data.dataValues.customer.dataValues.district.dataValues.amphoe} ${data.dataValues.customer.dataValues.district.dataValues.province} ${data.dataValues.customer.dataValues.district.dataValues.zipcode}`,
          }
          delete data.dataValues.area_viewing_team;
          delete data.dataValues.customer;
        });
      }
      return quotation_data;
    });

    /* Checklist body */
    var isCheckAll = [];
    const checklists = await quotation_checklists.findAll({
      attributes: ['id', 'name', 'description', 'status', ['is_editable', 'isEdit']],
      where: {
        quotation_id: headInfo[0].dataValues.id,
        checklist_type: 0,
        is_active: 1,
        is_delete: 0
      }
    }).then(x => {
      x.map(o => {
        isCheckAll.push(parseInt(o.dataValues.status))
        o.dataValues.isEdit = parseInt(o.dataValues.isEdit) == 1 ? true : false
      })
      return x
    })

    /* Image body */
    const img = await quotation_images.findAll({ attributes: [['id', 'uid'], 'name', 'url'], where: { quotation_id: headInfo[0].dataValues.id, is_active: 1, is_delete: 0 } })

    res.json({
      response: "OK",
      result: {
        info: headInfo[0],
        checklist_check_all: isCheckAll.includes(0) || isCheckAll.includes(2) ? 0 : 1,
        checklist_count: checklists ? checklists.length : 0,
        checklists,
        img
      }
    });
  } catch (error) {
    console.log(error);
    res.json({ response: "FAILED", result: error });
  }
};

/* Create Checklist for Surveyteam */
exports.createChecklistSurvey = async (req, res) => {
  try {
    const { name, quotation_code } = req.body
    if (!name) {
      res.json({ response: "FAILED", result: "please enter name." });
      return
    }
    if (!quotation_code) {
      res.json({ response: "FAILED", result: "Invalid quotation_code." });
      return
    }
    const get_id_quotation = await quotations.findOne({ where: { quotation_code: quotation_code } })
    /*สร้าง checklists*/
    const checklistsResult = await quotation_checklists.create({
      quotation_id: get_id_quotation.dataValues.id,
      name: name,
      description: '',
      status: 0,
      checklist_type: 0,
      is_editable: 1
    });
    res.json({
      response: "OK",
      result: checklistsResult
    });
  } catch (error) {
    console.log(error);
    res.json({ response: "FAILED", result: error });
  }
};
/* List Checklist to Edit Surveyteam*/
exports.listChecklistToEditSurvey = async (req, res) => {
  try {
    const result = await quotation_checklists.findAll({
      attributes: ['id', 'name', 'description'],
      where: {
        id: req.body.id,
        is_active: 1,
        is_delete: 0
      }
    })
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
/* Edit Checklist of Surveyteam */
exports.editChecklistSurvey = async (req, res) => {
  try {
    const { id, name } = req.body;
    if (!name) {
      res.json({ response: "FAILED", result: "please enter name." });
      return
    }
    if (!id) {
      res.json({ response: "FAILED", result: "checklist is not found." });
      return
    }
    const is_check_editable = await quotation_checklists.findOne({ attributes: ['is_editable'], where: { id: id } })
    if (!is_check_editable || parseInt(is_check_editable.dataValues.is_editable) === 0) {
      res.json({
        response: "FAILED",
        result: "this checklist cannot edit.",
      });
      return
    }
    /*แก้ไข checklists*/
    const result = await quotation_checklists.update({
      name: name
    }, {
      where: {
        id: id
      }
    });
    res.json({
      response: "OK",
      result
    });
  } catch (error) {
    console.log(error);
    res.json({ response: "FAILED", result: error });
  }
};
/* Delete Checklist of Survey (Update is_delete) */
exports.deleteChecklistSurvey = async (req, res) => {
  try {
    const is_check_editable = await quotation_checklists.findOne({ attributes: ['is_editable'], where: { id: req.body.id } })
    if (!is_check_editable || parseInt(is_check_editable.dataValues.is_editable) === 0) {
      res.json({
        response: "FAILED",
        result: "this checklist cannot delete.",
      });
      return
    }
    const result = await quotation_checklists.update({
      is_delete: 1
    }, {
      where: {
        id: req.body.id
      }
    });
    if (result != 0) {
      res.json({
        response: "OK",
        result: "Checklist: " + req.body.id + " Deleted. Result: " + result,
      });
    } else {
      res.json({
        response: "FAILED",
        result: "Checklist: " + req.body.id + " Not Found. Result: " + result,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ response: "FAILED", result: error });
  }
};
/* Update Checklist of Survey */
exports.updateChecklistSurvey = async (req, res) => {
  try {
    const dataBody = req.body
    var result = "loop updated"
    if (Array.isArray(dataBody)) {
      dataBody.map(async x => {
        /*update many checklists*/
        const o = await quotation_checklists.update({
          status: x.status
        }, {
          where: {
            id: x.id,
            is_active: 1,
            is_delete: 0
          }
        });
        result = o
      })
    } else {
      /*update one checklists*/
      result = await quotation_checklists.update({
        status: dataBody.status
      }, {
        where: {
          id: dataBody.id,
          is_active: 1,
          is_delete: 0
        }
      });
    }
    res.json({
      response: "OK",
      result
    });
  } catch (error) {
    console.log(error);
    res.json({ response: "FAILED", result: error });
  }
};

/* Create Image Survey */
exports.createImageSurvey = async (req, res) => {
  try {
    const { quotation_code, name, url } = req.body
    if (!url) {
      res.json({ response: "FAILED", result: "invalid URL." });
      return
    }
    if (!name) {
      res.json({ response: "FAILED", result: "invalid name." });
      return
    }
    if (!quotation_code) {
      res.json({ response: "FAILED", result: "invalid quotation_code." });
      return
    }
    const get_id_quotation = await quotations.findOne({ where: { quotation_code: quotation_code } })
    const result = await quotation_images.create({
      quotation_id: get_id_quotation.dataValues.id,
      name: name,
      url: url,
      img_type: 0
    })
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

/* Delete Image of Survey (Update is_delete) */
exports.deleteImageSurvey = async (req, res) => {
  try {
    const result = await quotation_images.update({
      is_delete: 1
    }, {
      where: {
        id: req.body.uid
      }
    });
    if (result != 0) {
      res.json({
        response: "OK",
        result: "Image: " + req.body.uid + " Deleted. Result: " + result,
      });
    } else {
      res.json({
        response: "FAILED",
        result: "Image: " + req.body.uid + " Not Found. Result: " + result,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ response: "FAILED", result: error });
  }
};