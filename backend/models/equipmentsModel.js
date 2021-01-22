module.exports = (sequelize, DataTypes) => {
  const equipments = sequelize.define("equipments", {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    stock_in: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    stock_out: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      default: 0,
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

  return equipments;
};
