module.exports = (sequelize, DataTypes) => {
  const packages = sequelize.define("packages", {
    id: {
      type: DataTypes.INTEGER(12),
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    amount_savory_food: {
      type: DataTypes.INTEGER(5),
      allowNull: false,
    },
    amount_sweet_food: {
      type: DataTypes.INTEGER(5),
      allowNull: false,
    },
    amount_drink: {
      type: DataTypes.INTEGER(5),
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
  packages.associate = models => {
    packages.hasMany(models.quotation_packages, { foreignKey: "id" });
  };

  return packages;
};
