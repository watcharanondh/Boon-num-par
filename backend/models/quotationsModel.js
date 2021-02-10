module.exports = (sequelize, DataTypes) => {
  const quotations = sequelize.define("quotations", {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    quotation_code: {
      type: DataTypes.STRING(12),
      allowNull: false,
      unique: true,
    },
    customer_id: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    event_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    area_viewing_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    amount_savory_food: {
      type: DataTypes.INTEGER(5),
      allowNull: false,
      defaultValue:0
    },
    amount_sweet_food: {
      type: DataTypes.INTEGER(5),
      allowNull: false,
      defaultValue:0
    },
    amount_drink: {
      type: DataTypes.INTEGER(5),
      allowNull: false,
      defaultValue:0
    },
    quotation_status_id: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
    },
    note: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
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
  quotations.associate = models => {
    quotations.belongsTo(models.customers, { foreignKey: "customer_id" });
    quotations.belongsTo(models.quotation_statuses, { foreignKey: "quotation_status_id" });
    quotations.hasMany(models.quotation_packages, { foreignKey: "quotation_id" });
    quotations.hasMany(models.quotation_promotions, { foreignKey: "quotation_id" });
  };

  return quotations;
};
