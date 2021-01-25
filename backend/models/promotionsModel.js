module.exports = (sequelize, DataTypes) => {
  const promotions = sequelize.define("promotions", {
    id: {
      type: DataTypes.INTEGER(12),
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    discount: {
      type: DataTypes.DECIMAL(10, 2),
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
  promotions.associate = models => {
    promotions.hasMany(models.quotation_promotions, { foreignKey: "id" });
  };
  return promotions;
};
