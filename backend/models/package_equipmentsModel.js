module.exports = (sequelize, DataTypes) => {
  const package_equipments = sequelize.define("package_equipments", {
    package_id: {
      type: DataTypes.STRING(12),
      allowNull: false,
      primaryKey: true,
    },
    equipment_id: {
      type: DataTypes.STRING(11),
      allowNull: false,
      primaryKey: true,
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

  package_equipments.associate = models => {
    package_equipments.belongsTo(models.packages, { foreignKey: "package_id" });
    package_equipments.belongsTo(models.equipments, { foreignKey: "equipment_id" });
  };

  return package_equipments;
};
