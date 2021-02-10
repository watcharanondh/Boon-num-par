module.exports = (sequelize, DataTypes) => {
  const package_equipment_sets = sequelize.define("package_equipment_sets", {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    package_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      unique: true,
    },
    equipment_set_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      unique: true,
    },
    createdAt: {
      field: "created_at",
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      field: "updated_at",
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
    created_user: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      defaultValue: null,
    },
    updated_user: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      defaultValue: null,
    },
    is_active: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: 1,
    },
    is_delete: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: 0,
    },
  });

  package_equipment_sets.associate = models => {
    package_equipment_sets.belongsTo(models.packages, { foreignKey: "package_id" });
    package_equipment_sets.belongsTo(models.equipment_sets, { foreignKey: "equipment_set_id" });
  };

  return package_equipment_sets;
};
