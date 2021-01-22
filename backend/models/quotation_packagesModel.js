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
      default: null,
    },
    created_user: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      default: null,
    },
    updated_user: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      default: null,
    },
    is_active: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      default: 1,
    },
    is_detele: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      default: 0,
    },
  });

  return quotation_packages;
};
