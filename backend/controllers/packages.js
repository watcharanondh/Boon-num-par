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
        "package_code",
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

/* List All EquipmentSets to PackageUse */
exports.listAllEquipmentSetsToPackageUse = async (req, res) => {
  try {
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
    const getMaxPackCode = await packages.findOne({ attributes: [[Sequelize.fn('MAX', Sequelize.col('package_code')), "maxPackCode"]] })
    const newPackCode = getMaxPackCode.dataValues.maxPackCode !== null ? helper.SKUincrementer(getMaxPackCode.dataValues.maxPackCode) : "BNPPK0000001";
    // console.log(newPackCode);

    /*สร้าง Package*/
    const Packageresult = await packages.create({
      package_code: newPackCode,
      name: name,
      price: price,
      amount_savory_food: amount_savory_food,
      amount_sweet_food: amount_sweet_food,
      amount_drink: amount_drink
    });

    /*สร้างรายการชุดอุปกรณ์ สำหรับ Package นั้นๆ*/
    const findIdEquipSet = await equipment_sets.findAll({
      attributes: ['id'],
      where: {
        equipment_set_code: {
          [Op.in]: package_equipset
        }
      }
    });
    var ObjEquipSet = findIdEquipSet.map(equipSetId => { return { "package_id": Packageresult.dataValues.id, "equipment_set_id": equipSetId.id } });
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
      attributes: ["package_code", "name", "price", "amount_savory_food", "amount_sweet_food", "amount_drink"],
      include: [
        {
          model: package_equipment_sets,
          attributes: ["package_id", "equipment_set_id"],
          include: [
            {
              model: equipment_sets,
              attributes: ["name"],
              where: { is_active: 1, is_delete: 0 }
            }
          ],
          where: { is_active: 1, is_delete: 0 }
        }
      ],
      where: {
        package_code: req.body.package_code,
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

/* Edit Packages */
exports.editPackage = async (req, res) => {
  const { package_code, name, price, amount_savory_food, amount_sweet_food, amount_drink, package_equipset } = req.body;
  try {
    /* get ID ชุดอุปกรณ์ */
    const get_id_package = await packages.findOne({ attributes: ['id'], where: { package_code: package_code } });
    if (get_id_package) {
      /*ลบ package_equipset ที่มีอยู่ก่อน */
      const delPack_equipset = await package_equipment_sets.destroy({
        where: {
          package_id: get_id_package.dataValues.id
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
            package_code: package_code,
            is_active: 1,
            is_delete: 0
          }
        });
        // เพิ่ม Packageใหม่ที่ส่งมา //
        const findIdEquipSet = await equipment_sets.findAll({
          attributes: ['id'],
          where: {
            equipment_set_code: {
              [Op.in]: package_equipset
            }
          }
        });
        var ObjEquipSet = findIdEquipSet.map(equipSetId => { return { "package_id": get_id_package.dataValues.id, "equipment_set_id": equipSetId.id } });
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
    } else {
      /// ไม่พบชุดอุปกรณ์นี้ ///
      res.json({
        response: "FAILED",
        result: "Not Found: " + get_id_package,
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
        package_code: req.body.package_code
      }
    });
    if (result != 0) {
      res.json({
        response: "OK",
        result: "Packages: " + req.body.package_code + " Deleted. Result: " + result,
      });
    } else {
      res.json({
        response: "FAILED",
        result: "Packages: " + req.body.package_code + " Not Found. Result: " + result,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ response: "FAILED", result: error });
  }
};
