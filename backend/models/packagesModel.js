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

  return packages;
};
