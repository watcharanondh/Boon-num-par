module.exports = (sequelize, DataTypes) => {
  const quotation_promotions = sequelize.define("quotation_promotions", {
    quotation_id : {
      type: DataTypes.STRING(12),
      allowNull: false,
      primaryKey: true,
    },
    promotion_id : {
      type: DataTypes.STRING(12),
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
  quotation_promotions.associate = models => {
    quotation_promotions.belongsTo(models.quotations, { foreignKey: "quotation_id" });
    quotation_promotions.belongsTo(models.promotions, { foreignKey: "promotion_id" });
  };

  return quotation_promotions;
};
