module.exports = (sequelize, DataTypes) => {
  const positions = sequelize.define("positions", {
    id: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    position_code : {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    role_id: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
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
  positions.associate = models => {
    positions.belongsTo(models.roles, { foreignKey: "role_id" });
    positions.hasMany(models.user_details, {foreignKey: "id"});
  };

  return positions;
};
