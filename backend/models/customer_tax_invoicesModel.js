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
  customer_tax_invoices.associate = models => {
    customer_tax_invoices.belongsTo(models.customers, { foreignKey: "id", });
    customer_tax_invoices.belongsTo(models.districts, { foreignKey: "district_id", });
  };

  return customer_tax_invoices;
};
