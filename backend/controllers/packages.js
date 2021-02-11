const { packages, equipment_sets, package_equipment_sets } = require("../models");
const { Op, Sequelize } = require("sequelize");
const helper = require("../helper/sku");


/* List All Packages */
exports.listAllPackages = async (req, res) => {
  try {
    let count_total =  await packages.findOne({
      attributes: [[Sequelize.fn('COUNT', Sequelize.col('*')), 'total']],
      where: {
        is_active: 1,
        is_delete: 0
      }
    });
    const result = await packages.findAll({
      attributes: [
        "id",
        "name",
        "amount_savory_food",
        "amount_sweet_food",
        "amount_drink",
        [Sequelize.fn("date_format", Sequelize.col("`packages`.`updated_at`"), "%d-%m-%Y"), "update"],
        [Sequelize.fn("CONCAT", "อาหารคาว ", Sequelize.col("`packages`.`amount_savory_food`"), ", อาหารหวาน ", Sequelize.col("`packages`.`amount_sweet_food`"), ", เครื่องดื่ม ", Sequelize.col("`packages`.`amount_drink`")), "food_des"],
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

/* List All EquipmentSets to PackageUse */
exports.listAllEquipmentSetsToPackageUse = async (req, res) => {
  try {
    const result = await equipment_sets.findAll({
      attributes: [
        "id",
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

/* Create New Packages */
exports.createNewPackage = async (req, res) => {
  const { name, price, amount_savory_food, amount_sweet_food, amount_drink, package_equipset } = req.body;
  try {
    const getMaxPackId = await packages.findOne({ attributes: [[Sequelize.fn('MAX', Sequelize.col('id')), "maxPackId"]] })
    const newPackId = getMaxPackId.dataValues.maxPackId !== null ? helper.SKUincrementer(getMaxPackId.dataValues.maxPackId) : "BNPPK0000001";
    // console.log(newPackId);

    /*สร้าง Package*/
    const Packageresult = await packages.create({
      id: newPackId,
      name: name,
      price: price,
      amount_savory_food: amount_savory_food,
      amount_sweet_food: amount_sweet_food,
      amount_drink: amount_drink
    });

    /*สร้างรายการชุดอุปกรณ์ สำหรับ Package นั้นๆ*/
    var ObjEquipSet = package_equipset.map(equipSetId => { return { "package_id": newPackId, "equipment_set_id": equipSetId } });
    console.log(ObjEquipSet);
    const PackEquipSetresult = await package_equipment_sets.bulkCreate(ObjEquipSet);

    res.json({
      response: "OK",
      result: [Packageresult, PackEquipSetresult]
    });
  } catch (error) {
    console.log(error);
    res.json({ response: "FAILED", result: error });
  }
};

/* List Packages to Edit */
exports.listPackagesToEdit = async (req, res) => {
  try {
    const result = await packages.findAll({
      attributes: ["id", "name", "price", "amount_savory_food", "amount_sweet_food", "amount_drink"],
      include: [
        {
          model: package_equipment_sets,
          attributes: ["package_id", "equipment_set_id"],
          include: [
            {
              model: equipment_sets,
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
    }).then(pack_data => {
      pack_data[0].dataValues.package_equipment_sets.map(data => {
       data.dataValues = data.equipment_set.dataValues ;
      });
      return pack_data;
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

/* Edit Packages */
exports.editPackage = async (req, res) => {
  const { id, name, price, amount_savory_food, amount_sweet_food, amount_drink, package_equipset } = req.body;
  try {
    /*ลบ package_equipset ที่มีอยู่ก่อน */
    const delPack_equipset = await package_equipment_sets.destroy({
      where: {
        package_id: id
      }
    });
    if (delPack_equipset) {
      /* ลบสำเร็จ & แก้ไขรายการอุปกรณ์ สำหรับ Package นั้นๆ*/
      /*แก้ไข Package*/
      const Packageresult = await packages.update({
        name: name,
        price: price,
        amount_savory_food: amount_savory_food,
        amount_sweet_food: amount_sweet_food,
        amount_drink: amount_drink
      }, {
        where: {
          id: id,
          is_active: 1,
          is_delete: 0
        }
      });
      // เพิ่ม Packageใหม่ที่ส่งมา //
      var ObjEquipSet = package_equipset.map(equipSetId => { return { "package_id": id, "equipment_set_id": equipSetId } });
      console.log(ObjEquipSet);
      const PackEquipSetresult = await package_equipment_sets.bulkCreate(ObjEquipSet);
      res.json({
        response: "OK",
        result: [Packageresult, PackEquipSetresult],
      });
    } else {
      /// ลบไม่สำเร็จ ///
      res.json({
        response: "FAILED",
        result: "Cannot Delete Equipment in Package." + delPack_equipset,
      });
    }

  } catch (error) {
    console.log(error);
    res.json({ response: "FAILED", result: error });
  }
};

/* Delete Packages (Update is_delete) */
exports.deletePackage = async (req, res) => {
  try {
    const result = await packages.update({
      is_delete: 1
    }, {
      where: {
        id: req.body.id
      }
    });
    if (result != 0) {
      res.json({
        response: "OK",
        result: "Packages: " + req.body.id + " Deleted. Result: " + result,
      });
    } else {
      res.json({
        response: "FAILED",
        result: "Packages: " + req.body.id + " Not Found. Result: " + result,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ response: "FAILED", result: error });
  }
};
