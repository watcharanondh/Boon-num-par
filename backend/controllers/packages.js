const { packages, equipments, package_equipments } = require("../models");
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

/* List All Equipments to PackageUse */
exports.listAllEquipmentsToPackageUse = async (req, res) => {
  try {
    const result = await equipments.findAll({
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
  const { name, price, amount_savory_food, amount_sweet_food, amount_drink, package_equip } = req.body;
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

    /*สร้างรายการอุปกรณ์ สำหรับ Package นั้นๆ*/
    var ObjEquip = package_equip.map(equipId => { return { "package_id": newPackId, "equipment_id": equipId } });
    console.log(ObjEquip);
    const PackEquipresult = await package_equipments.bulkCreate(ObjEquip);

    res.json({
      response: "OK",
      result: [Packageresult, PackEquipresult]
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
          model: package_equipments,
          attributes: ["package_id", "equipment_id"],
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

/* Edit Packages */
exports.editPackage = async (req, res) => {
  const { id, name, price, amount_savory_food, amount_sweet_food, amount_drink, package_equip } = req.body;
  try {

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

    /*แก้ไขรายการอุปกรณ์ สำหรับ Package นั้นๆ*/
    /*ลบ package_equip ที่มีอยู่ก่อน */
    const delPack_equip = await package_equipments.destroy({
      where: {
        package_id: id
      }
    });
    if (delPack_equip) {
      // ลบสำเร็จ & เพิ่ม Packageใหม่ที่ส่งมา //
      var ObjEquip = package_equip.map(equipId => { return { "package_id": id, "equipment_id": equipId } });
      console.log(ObjEquip);
      const PackEquipresult = await package_equipments.bulkCreate(ObjEquip);
      res.json({
        response: "OK",
        result: [Packageresult, PackEquipresult],
      });
    } else {
      /// ลบไม่สำเร็จ ///
      res.json({
        response: "FAILED",
        result: "Cannot Delete Equipment in Package." + delPack_equip,
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
        result: req.body.id + ": Deleted. Result: " + result,
      });
    } else {
      res.json({
        response: "FAILED",
        result: req.body.id + ": Not Found. Result: " + result,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ response: "FAILED", result: error });
  }
};
