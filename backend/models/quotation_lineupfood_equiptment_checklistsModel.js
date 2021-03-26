module.exports = (sequelize, DataTypes) => {
  const quotation_lineupfood_equiptment_checklists = sequelize.define("quotation_lineupfood_equiptment_checklists", {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    quotation_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    lineupfood_equipment_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    amount: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: 0,
    },
    returned_status: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: 0,
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
  quotation_lineupfood_equiptment_checklists.associate = models => {
    quotation_lineupfood_equiptment_checklists.belongsTo(models.quotations, { foreignKey: "quotation_id" });
    quotation_lineupfood_equiptment_checklists.belongsTo(models.lineupfood_equipments, { foreignKey: "lineupfood_equipment_id" });
  };

  return quotation_lineupfood_equiptment_checklists;
};
