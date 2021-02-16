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
        "id",
        "name",
      ],
      where: {
        is_active: 1,
        is_delete: 0
      },
      order: [["id", "DESC"]]
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
        "id",
        "name",
        "stock_in",
        [Sequelize.literal(`stock_in - stock_out`),"stock_balance"]
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
    const getMaxEquipSetId = await equipment_sets.findOne({ attributes: [[Sequelize.fn('MAX', Sequelize.col('id')), "maxEquipId"]] });
    const newEquipSetId = getMaxEquipSetId.dataValues.maxEquipId !== null ? helper.SKUincrementer(getMaxEquipSetId.dataValues.maxEquipId) : "BNPTS0000001";
    console.log(newEquipSetId);

    /*สร้าง EquipmentSets*/
    const equip_set_result = await equipment_sets.create({
      id: newEquipSetId,
      name: name
    });

    /*สร้างรายการอุปกรณ์ สำหรับชุดอุปกรณ์นั้นๆ*/
    var object_equip = equip_in_equipset.map(equip => { return { "equipment_set_id": newEquipSetId, "equipment_id": equip.id, "amount": equip.amount } });
    console.log(object_equip);
    const equipset_equip_result = await equipment_set_equipments.bulkCreate(object_equip)
    .then(result => {
      // result.map(val => {
      //   equipments.update({
      //     stock_out: Sequelize.literal(`stock_out + ${val.amount}`)
      //   },
      //     {
      //       where: {
      //         id: val.equipment_id
      //       }
      //     })
      // });
      return result;
    });

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
      attributes: ["id", "name"],
      include: [
        {
          model: equipment_set_equipments,
          attributes: ["equipment_set_id", "equipment_id","amount"],
          include: [
            {
              model: equipments,
              attributes: ["id","name"],
              where: { is_active: 1, is_delete: 0 },
              required:false
            }
          ],
          where: { is_active: 1, is_delete: 0 },
          required:false
        }
      ],
      where: {
        id: req.body.id,
        is_active: 1,
        is_delete: 0
      }
    }).then(eqset_data => {
      eqset_data[0].dataValues.equipment_set_equipments.map(data => {
        data.dataValues = { ...data.equipment.dataValues, "amount": data.amount };
      });
      return eqset_data;
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

/* Edit EquipmentSets */
exports.editEquipmentSet = async (req, res) => {
  const { id, name, equip_in_equipset } = req.body;
  try {
    /*ลบ equipment_set_equipments ที่มีอยู่ก่อน */
    const del_equiptset_equip = await equipment_set_equipments.destroy({
      where: {
        equipment_set_id: id
      }
    });
    if (del_equiptset_equip) {
      /*แก้ไข EquipmentSets*/
      const equip_set_result = await equipment_sets.update({
        name: name
      }, {
        where: {
          id: id,
          is_active: 1,
          is_delete: 0
        }
      });
      /*แก้ไขรายการอุปกรณ์ สำหรับ EquipmentSets นั้นๆ*/
      // ลบสำเร็จ & เพิ่ม equipment_set ใหม่ที่ส่งมา //
      var object_equip = equip_in_equipset.map(equipId => { return { "equipment_set_id": id, "equipment_id": equipId.id, "amount": equipId.amount } });
      console.log(object_equip);
      const equipset_equip_result = await equipment_set_equipments.bulkCreate(object_equip);
      res.json({
        response: "OK",
        result: [equip_set_result, equipset_equip_result],
      });
    } else {
      res.json({ response: "FAILED", result: "del_equiptset_equip:" + del_equiptset_equip });
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
        id: req.body.id
      }
    });
    if (result != 0) {
      res.json({
        response: "OK",
        result:"EquipmentSets: " + req.body.id + " Deleted. Result: " + result,
      });
    } else {
      res.json({
        response: "FAILED",
        result:"EquipmentSets: " + req.body.id + " Not Found. Result: " + result,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ response: "FAILED", result: error });
  }
};
