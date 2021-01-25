module.exports = (sequelize, DataTypes) => {
  const quotation_packages = sequelize.define("quotation_packages", {
    quotation_id: {
      type: DataTypes.STRING(12),
      allowNull: false,
      primaryKey: true,
    },
    package_id: {
      type: DataTypes.STRING(12),
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER(10),
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
  quotation_packages.associate = models => {
    quotation_packages.belongsTo(models.quotations, { foreignKey: "quotation_id" });
    quotation_packages.belongsTo(models.packages, { foreignKey: "package_id" });
  };

  return quotation_packages;
};
