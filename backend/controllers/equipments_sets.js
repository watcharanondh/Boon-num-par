const { equipment_sets, equipment_set_equipments, equipments } = require("../models");
const { Op, Sequelize } = require("sequelize");
const helper = require("../helper/sku");


/* List All EquipmentSets */
exports.listAllEquipmentSets = async (req, res) => {
  try {
    let count_total = await equipment_sets.findOne({
      attributes: [[Sequelize.fn('COUNT', Sequelize.col('*')), 'total']],
      where: {
        is_active: 1,
        is_delete: 0
      }
    });
    const result = await equipment_sets.findAll({
      attributes: [
        "equipment_set_code",
        "name",
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
        count_total: count_total.dataValues.total + " รายการ",
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

/* List All Equipments to EquipmentSet */
exports.listAllEquipmentsToEquipmentSet = async (req, res) => {
  try {
    const result = await equipments.findAll({
      attributes: [
        "equipment_code",
        "name",
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

/* Create New EquipmentSets */
exports.createNewEquipmentSet = async (req, res) => {
  const { name, equip_in_equipset } = req.body;
  try {
    const getMaxEquipSetCode = await equipment_sets.findOne({ attributes: [[Sequelize.fn('MAX', Sequelize.col('equipment_set_code')), "maxEquipCode"]] });
    const newEquipSetCode = getMaxEquipSetCode.dataValues.maxEquipCode !== null ? helper.SKUincrementer(getMaxEquipSetCode.dataValues.maxEquipCode) : "BNPTS0000001";

    /*สร้าง EquipmentSets*/
    const equip_set_result = await equipment_sets.create({
      equipment_set_code: newEquipSetCode,
      name: name
    });

    /*สร้างรายการอุปกรณ์ สำหรับชุดอุปกรณ์นั้นๆ*/
    const findIdEquip = await equipments.findAll({
      attributes: ['id'],
      where: {
        equipment_code: {
          [Op.in]: equip_in_equipset
        }
      }
    })
    var object_equip = findIdEquip.map(equipId => { return { "equipment_set_id": equip_set_result.dataValues.id, "equipment_id": equipId.id } });
    console.log(object_equip);
    const equipset_equip_result = await equipment_set_equipments.bulkCreate(object_equip);

    res.json({
      response: "OK",
      result: [equip_set_result, equipset_equip_result],
    });
  } catch (error) {
    console.log(error);
    res.json({ response: "FAILED", result: error });
  }
};

/* List EquipmentSets to Edit */
exports.listEquipmentSetsToEdit = async (req, res) => {
  try {
    const result = await equipment_sets.findAll({
      attributes: ["equipment_set_code", "name"],
      include: [
        {
          model: equipment_set_equipments,
          attributes: ["equipment_set_id", "equipment_id"],
          include: [
            {
              model: equipments,
              attributes: ["name", "stock_in", "stock_out"],
              where: { is_active: 1, is_delete: 0 }
            }
          ],
          where: { is_active: 1, is_delete: 0 }
        }
      ],
      where: {
        equipment_set_code: req.body.equipment_set_code,
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

/* Edit EquipmentSets */
exports.editEquipmentSet = async (req, res) => {
  const { equipment_set_code, name, equip_in_equipset } = req.body;
  try {
    /* get ID ชุดอุปกรณ์ */
    const get_id_equipment_set = await equipment_sets.findOne({ attributes: ['id'], where: { equipment_set_code: equipment_set_code } })
    if (get_id_equipment_set) {
      /*ลบ equipment_set_equipments ที่มีอยู่ก่อน */
      const del_equiptset_equip = await equipment_set_equipments.destroy({
        where: {
          equipment_set_id: get_id_equipment_set.dataValues.id
        }
      });
      if (del_equiptset_equip) {
        /*แก้ไข EquipmentSets*/
        const equip_set_result = await equipment_sets.update({
          name: name
        }, {
          where: {
            equipment_set_code: equipment_set_code,
            is_active: 1,
            is_delete: 0
          }
        });
        /*แก้ไขรายการอุปกรณ์ สำหรับ EquipmentSets นั้นๆ*/
        // ลบสำเร็จ & เพิ่ม equipment_set ใหม่ที่ส่งมา //

        /*สร้างรายการอุปกรณ์ สำหรับชุดอุปกรณ์นั้นๆ*/
        const findIdEquip = await equipments.findAll({
          attributes: ['id'],
          where: {
            equipment_code: {
              [Op.in]: equip_in_equipset
            }
          }
        })
        var object_equip = findIdEquip.map(equipId => { return { "equipment_set_id": get_id_equipment_set.dataValues.id, "equipment_id": equipId.id } });
        console.log(object_equip);
        const equipset_equip_result = await equipment_set_equipments.bulkCreate(object_equip);
        res.json({
          response: "OK",
          result: [equip_set_result, equipset_equip_result],
        });
      } else {
        /// ลบไม่สำเร็จ ///
        res.json({
          response: "FAILED",
          result: "Cannot Delete Equipment in EquipmentSet." + del_equiptset_equip,
        });
      }
    } else {
      /// ไม่พบชุดอุปกรณ์นี้ ///
      res.json({
        response: "FAILED",
        result: "Not Found: " + equipment_set_code,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ response: "FAILED", result: error });
  }
};

/* Delete EquipmentSets (Update is_delete) */
exports.deleteEquipmentSet = async (req, res) => {
  try {
    const result = await equipment_sets.update({
      is_delete: 1
    }, {
      where: {
        equipment_set_code: req.body.equipment_set_code
      }
    });
    if (result != 0) {
      res.json({
        response: "OK",
        result: "EquipmentSets: " + req.body.equipment_set_code + " Deleted. Result: " + result,
      });
    } else {
      res.json({
        response: "FAILED",
        result: "EquipmentSets: " + req.body.equipment_set_code + " Not Found. Result: " + result,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ response: "FAILED", result: error });
  }
};
