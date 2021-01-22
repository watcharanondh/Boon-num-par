module.exports = (sequelize, DataTypes) => {
  const customer_tax_invoices = sequelize.define("customer_tax_invoices", {
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    tax_id: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    flash_number: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
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
    address: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    district_id: {
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

  return customer_tax_invoices;
};
