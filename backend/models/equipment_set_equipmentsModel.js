module.exports = (sequelize, DataTypes) => {
  const equipment_set_equipments = sequelize.define("equipment_set_equipments", {
    equipment_set_id: {
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

  equipment_set_equipments.associate = models => {
    equipment_set_equipments.belongsTo(models.equipment_sets, { foreignKey: "id" });
    equipment_set_equipments.belongsTo(models.equipments, { foreignKey: "equipment_id" });
  };

  return equipment_set_equipments;
};
