module.exports = (sequelize, DataTypes) => {
  const equipment_sets = sequelize.define("equipment_sets", {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    equipment_set_code: {
      type: DataTypes.STRING(12),
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
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
  equipment_sets.associate = models => {
    equipment_sets.hasMany(models.package_equipment_sets, { foreignKey: "equipment_set_id" });
    equipment_sets.hasMany(models.equipment_set_equipments, { foreignKey: "equipment_set_id" });
  };
  return equipment_sets;
};
