module.exports = (sequelize, DataTypes) => {
  const customers = sequelize.define("customers", {
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    telephone_number: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    mobile_phone_number: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    line_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    type_id : {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    address : {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    district_id  : {
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

  return customers;
};
