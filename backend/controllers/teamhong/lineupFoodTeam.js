const { customers, districts, quotations, teams, lineupfood_equipments, quotation_checklists, quotation_descriptions, quotation_images, quotation_lineupfood_equiptment_checklists } = require("../../models");
const { Op, Sequelize } = require("sequelize");
const { find_between_date } = require("../../helper/finddate");

/* List All LineUP Food Team task */
exports.listAllLineUpFoodTeam = async (req, res) => {
  try {
    let count_total = 0;
    const _where = find_between_date(req.body.startdate, req.body.enddate)
    const result = await quotations.findAll({
      attributes: ["id", "quotation_code",
        [Sequelize.fn("date_format", Sequelize.col("`quotations`.`event_date`"), "%b %d, %Y"), "event_date"],
        [Sequelize.fn("date_format", Sequelize.col("`quotations`.`event_date`"), "%h:%i %p"), "event_date_datetime"]
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
          as: 'lineup_food_team',
          attributes: ['team_code', ['name', 'team_name']]
        },
        {
          model: quotation_checklists,
          attributes: ['id', 'status', 'returned_status', 'checklist_type'],
          where: {
            is_active: 1,
            is_delete: 0
          }
        }
      ],
      where: {
        quotation_status_id: 1,
        lineup_food_team_id: { [Op.ne]: null },
        event_date: _where,
        is_active: 1,
        is_delete: 0
      },
      order: [["id", "DESC"]]
    }).then(quotation_data => {
      quotation_data.map((data) => {
        const getChecklists = data.dataValues.quotation_checklists
        const status_before = []
        const status_between = []
        const status_after = []

        if (getChecklists && getChecklists.length > 0) {
          getChecklists.map(x => {
            if (x.checklist_type == 4) {
              status_before.push(x.status)
              status_after.push(x.returned_status)
            } else if (x.checklist_type == 5) {
              status_between.push(x.status)
            }
          })
        }

        const progress_before = status_before.includes(0) || status_before.includes(2) ? 0 : 1
        const progress_between = status_between.includes(0) || status_between.includes(2) ? 0 : 1
        const progress_after = status_after.includes(0) || status_after.includes(2) ? 0 : 1
        const progress_total = progress_before + progress_between + progress_after
        console.log(progress_before, progress_between, progress_after, '=', progress_total);

        data.dataValues = {
          ...data.dataValues.lineup_food_team.dataValues,
          address: `${data.dataValues.customer.dataValues.address} ต.${data.dataValues.customer.dataValues.district.dataValues.district} อ.${data.dataValues.customer.dataValues.district.dataValues.amphoe} ${data.dataValues.customer.dataValues.district.dataValues.province} ${data.dataValues.customer.dataValues.district.dataValues.zipcode}`,
          ...data.dataValues,
          progress: progress_total + ' จาก 3',
          progress_status: progress_total == 3 ? 2 : (progress_total == 1 || progress_total == 2 ? 1 : 0)
        }
        delete data.dataValues.customer;
        delete data.dataValues.lineup_food_team;
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
exports.manageLineUpFoodTeamTask = async (req, res) => {
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
          as: 'event_team',
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
          if (data.dataValues.event_team) {
            data.dataValues = { ...data.dataValues, ...data.dataValues.event_team.dataValues, }
          }
          data.dataValues = {
            ...data.dataValues,
            customer_name: data.dataValues.customer.name ? data.dataValues.customer.name : '-',
            address: `${data.dataValues.customer.dataValues.address} ต.${data.dataValues.customer.dataValues.district.dataValues.district} อ.${data.dataValues.customer.dataValues.district.dataValues.amphoe} ${data.dataValues.customer.dataValues.district.dataValues.province} ${data.dataValues.customer.dataValues.district.dataValues.zipcode}`,
          }
          delete data.dataValues.event_team;
          delete data.dataValues.customer;
        });
      }
      return quotation_data;
    });

    /* -------------- BEFORE -------------- */
    /* Checklist before */
    var isCheckAllBefore = []
    /* check อาหาร */
    const food_checklists_before = await quotation_checklists.findAll({
      attributes: ['id', 'name', 'description', 'status', ['is_editable', 'isEdit']],
      where: {
        quotation_id: headInfo[0].dataValues.id,
        checklist_type: 4,
        is_active: 1,
        is_delete: 0
      }
    }).then(x => {
      if (x && x.length > 0) {
        x.map(o => {
          isCheckAllBefore.push(parseInt(o.dataValues.status))
          o.dataValues.isEdit = parseInt(o.dataValues.isEdit) == 1 ? true : false
        })
      }
      return x
    })
    /* check อุปกรณ์ */
    const equip_checklists_before = await quotation_lineupfood_equiptment_checklists.findAll({
      attributes: ['id', 'description', 'amount', 'status'],
      include: [
        {
          model: lineupfood_equipments,
          attributes: ['name']
        }
      ],
      where: {
        quotation_id: headInfo[0].dataValues.id,
        is_active: 1,
        is_delete: 0
      }
    }).then(x => {
      if (x && x.length > 0) {
        x.map(o => {
          isCheckAllBefore.push(parseInt(o.dataValues.status))
          o.dataValues = { ...o.dataValues, ...o.dataValues.lineupfood_equipment.dataValues }
          delete o.dataValues.lineupfood_equipment
        })
      }
      return x
    })

    /* description before */
    const description_before = await quotation_descriptions.findOne({
      attributes: ['description'],
      where: {
        quotation_id: headInfo[0].dataValues.id,
        description_type: 3,
        is_active: 1,
        is_delete: 0
      }
    })

    /* Image before */
    const img_before = await quotation_images.findAll({
      attributes: [['id', 'uid'], 'name', 'url'],
      where: {
        quotation_id: headInfo[0].dataValues.id,
        img_type: 4,
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
        checklist_type: 5,
        is_active: 1,
        is_delete: 0
      }
    })

    /* description between */
    const description_between = await quotation_descriptions.findOne({
      attributes: ['description'],
      where: {
        quotation_id: headInfo[0].dataValues.id,
        description_type: 4,
        is_active: 1,
        is_delete: 0
      }
    })

    /* Image between */
    const img_between = await quotation_images.findAll({
      attributes: [['id', 'uid'], 'name', 'url'],
      where: {
        quotation_id: headInfo[0].dataValues.id,
        img_type: 5,
        is_active: 1,
        is_delete: 0
      }
    })
    /* ------------------------------------- */


    /* -------------- AFTER -------------- */
    /* Checklist after */
    var isCheckAllAfter = []
    /* check อุปกรณ์ */
    const food_checklists_after = await quotation_checklists.findAll({
      attributes: ['id', 'name', 'description', ['returned_status', 'status'], ['is_editable', 'isEdit']],
      where: {
        quotation_id: headInfo[0].dataValues.id,
        checklist_type: 4,
        is_active: 1,
        is_delete: 0
      }
    }).then(x => {
      if (x && x.length > 0) {
        x.map(o => {
          isCheckAllAfter.push(parseInt(o.dataValues.status))
          o.dataValues.isEdit = parseInt(o.dataValues.isEdit) == 1 ? true : false
        })
      }
      return x
    })
    /* check อุปกรณ์ */
    const equip_checklists_after = await quotation_lineupfood_equiptment_checklists.findAll({
      attributes: ['id', 'description', 'amount', ['returned_status', 'status']],
      include: [
        {
          model: lineupfood_equipments,
          attributes: ['name']
        }
      ],
      where: {
        quotation_id: headInfo[0].dataValues.id,
        is_active: 1,
        is_delete: 0
      }
    }).then(x => {
      if (x && x.length > 0) {
        x.map(o => {
          isCheckAllAfter.push(parseInt(o.dataValues.status))
          o.dataValues = { ...o.dataValues, ...o.dataValues.lineupfood_equipment.dataValues }
          delete o.dataValues.lineupfood_equipment
        })
      }
      return x
    })
    console.log(equip_checklists_after);
    /* description after */
    const description_after = await quotation_descriptions.findOne({
      attributes: ['description'],
      where: {
        quotation_id: headInfo[0].dataValues.id,
        description_type: 5,
        is_active: 1,
        is_delete: 0
      }
    })

    /* Image after */
    const img_after = await quotation_images.findAll({
      attributes: [['id', 'uid'], 'name', 'url'],
      where: {
        quotation_id: headInfo[0].dataValues.id,
        img_type: 6,
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
          checklist_count: (food_checklists_before ? food_checklists_before.length : 0) + (equip_checklists_before ? equip_checklists_before.length : 0),
          checklist_check_all: isCheckAllBefore.includes(0) || isCheckAllBefore.includes(2) ? 0 : 1,
          checklists: {
            foods: food_checklists_before,
            equiptments: equip_checklists_before
          },
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
          checklist_count: (food_checklists_after ? food_checklists_after.length : 0) + (equip_checklists_after ? equip_checklists_after.length : 0),
          checklist_check_all: isCheckAllAfter.includes(0) || isCheckAllAfter.includes(2) ? 0 : 1,
          checklists: {
            foods: food_checklists_after,
            equiptments: equip_checklists_after
          },
          description: description_after ? description_after.dataValues.description : '',
          img: img_after
        },
      }
    });
  } catch (error) {
    console.log(error);
    res.json({ response: "FAILED", result: error });
  }
};

/* Create Checklist for LineUpFood team */
exports.createChecklistLineUpFood = async (req, res) => {
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
      returned_status: 0,
      checklist_type: 4,
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
/* List Checklist to Edit LineUpFoodteam*/
exports.listChecklistToEdit = async (req, res) => {
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
/* Edit Checklist of LineUpFoodteam */
exports.editChecklistLineUpFood = async (req, res) => {
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
        id: id,
        is_active: 1,
        is_delete: 0
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
/* Delete Checklist of LineUpFoodteam (Update is_delete) */
exports.deleteChecklistLineUpFood = async (req, res) => {
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
/* Update Checklist of LineUpFoodteam */
exports.updateChecklistLineUpFood = async (req, res) => {
  try {
    const dataBody = req.body;
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
/* Update Checklist of LineUpFoodteam (Returned)*/
exports.updateChecklistLineUpFoodReturn = async (req, res) => {
  try {
    const dataBody = req.body;
    var result = "loop updated"
    if (Array.isArray(dataBody)) {
      dataBody.map(async x => {
        /*update many checklists*/
        const o = await quotation_checklists.update({
          returned_status: x.status
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
        returned_status: dataBody.status
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

/* List Equiptment to Create LineUpEquipment*/
exports.listEquipmenttoCreate = async (req, res) => {
  try {
    const result = await lineupfood_equipments.findAll({
      attributes: ['id', 'name', [Sequelize.literal("`stock_in`- `stock_out`"), 'amount'], 'description'],
      where: {
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
/* Create Checklist for LineUpEquipment  */
exports.createChecklistLineUpEquipment = async (req, res) => {
  try {
    const { quotation_code, equipments } = req.body
    if (!equipments && equipments.length == 0) {
      res.json({ response: "FAILED", result: "please input equipments." });
      return
    }
    if (!quotation_code) {
      res.json({ response: "FAILED", result: "Invalid quotation_code." });
      return
    }
    const get_id_quotation = await quotations.findOne({ where: { quotation_code: quotation_code } })
    const equip = equipments.map(o => {
      lineupfood_equipments.update({ stock_out: Sequelize.literal('stock_out +' + o.amount) }, { where: { id: o.id } })
      return { quotation_id: get_id_quotation.dataValues.id, lineupfood_equipment_id: o.id, amount: o.amount }
    })
    /*สร้าง checklists*/
    const checklistsResult = await quotation_lineupfood_equiptment_checklists.bulkCreate(equip);
    res.json({
      response: "OK",
      result: checklistsResult
    });
  } catch (error) {
    console.log(error);
    res.json({ response: "FAILED", result: error });
  }
};
/* List Checklist to Edit LineUpEquipment*/
exports.listEquipChecklistToEdit = async (req, res) => {
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
/* Edit Checklist of LineUpEquipment */
exports.editChecklistLineUpEquipment = async (req, res) => {
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
        id: id,
        is_active: 1,
        is_delete: 0
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
/* Delete Checklist of LineUpEquipment (Update is_delete) */
exports.deleteChecklistLineUpEquipment = async (req, res) => {
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
/* Update Checklist of LineUpEquipment */
exports.updateChecklistLineUpEquipment = async (req, res) => {
  try {
    const dataBody = req.body;
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
/* Update Checklist of LineUpEquipment (Returned)*/
exports.updateChecklistLineUpEquipmentReturn = async (req, res) => {
  try {
    const dataBody = req.body;
    var result = "loop updated"
    if (Array.isArray(dataBody)) {
      dataBody.map(async x => {
        /*update many checklists*/
        const o = await quotation_checklists.update({
          returned_status: x.status
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
        returned_status: dataBody.status
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


/* Update Description of LineUpFoodteam */
exports.updateDescriptionLineUpFood = async (req, res) => {
  try {
    const { quotation_code, description, description_type } = req.body;
    const get_id_quotation = await quotations.findOne({ where: { quotation_code: quotation_code } })
    const isCheckDesc = await quotation_descriptions.findOne({ where: { quotation_id: get_id_quotation.dataValues.id, is_active: 1, is_delete: 0, description_type: description_type } })
    var result = null
    if (isCheckDesc) {
      /*update quotation description*/
      result = await quotation_descriptions.update({
        description: description
      }, {
        where: {
          id: isCheckDesc.dataValues.id,
          is_active: 1,
          is_delete: 0
        }
      });
    } else {
      /*Create new quotation description*/
      result = await quotation_descriptions.create({
        quotation_id: get_id_quotation.dataValues.id,
        description: description,
        description_type: description_type
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

/* Create Image LineUpFood */
exports.createImageLineUpFood = async (req, res) => {
  try {
    const { quotation_code, name, url, img_type } = req.body
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
    if (!img_type) {
      res.json({ response: "FAILED", result: "invalid img_type." });
      return
    }
    const get_id_quotation = await quotations.findOne({ where: { quotation_code: quotation_code } })
    const result = await quotation_images.create({
      quotation_id: get_id_quotation.dataValues.id,
      url: url,
      name: name,
      img_type: parseInt(img_type)
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
/* Delete Image of LineUpFood (Update is_delete) */
exports.deleteImageLineUpFood = async (req, res) => {
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