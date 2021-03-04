module.exports = (sequelize, DataTypes) => {
  const quotation_checklists = sequelize.define("quotation_checklists", {
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
    checklist_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    status: {
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
  quotation_checklists.associate = models => {
    quotation_checklists.belongsTo(models.quotations, { foreignKey: "quotation_id" });
    quotation_checklists.belongsTo(models.checklists, { foreignKey: "checklist_id" });
  };

  return quotation_checklists;
};
