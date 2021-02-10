module.exports = (sequelize, DataTypes) => {
  const customers = sequelize.define("customers", {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    customer_code: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: true,
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
    type_id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    address: {
      type: DataTypes.INTEGER(10),
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

  customers.associate = models => {
    customers.belongsTo(models.districts, { foreignKey: "district_id" });
    customers.belongsTo(models.customer_types, { foreignKey: "type_id" });
    customers.hasMany(models.customer_tax_invoices, { foreignKey: "id" });
    customers.hasMany(models.quotations, { foreignKey: "id" });
  };

  return customers;
};
