module.exports = (sequelize, DataTypes) => {
  const districts = sequelize.define("districts", {
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    district: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    amphoe: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    province: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    zipcode: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    district_code: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    amphoe_code: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    province_code: {
      type: DataTypes.STRING(100),
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
    }
  });
  districts.associate = models => {
    districts.hasMany(models.customers, {
      foreignKey: "id"
    });
    districts.hasMany(models.customer_tax_invoices, {
      foreignKey: "id"
    });
    districts.hasMany(models.user_details, {
      foreignKey: "id"
    });
  };

  return districts;
};
