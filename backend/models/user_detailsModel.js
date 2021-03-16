module.exports = (sequelize, DataTypes) => {
  const user_details = sequelize.define("user_details", {
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_code : {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    nickname: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    position_id : {
      type: DataTypes.INTEGER(1),
      allowNull: true,
    },
    telephone_number: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    line_id: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    address: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
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

  user_details.associate = models => {
    user_details.belongsTo(models.users, { foreignKey: "id" });
    user_details.belongsTo(models.districts, { foreignKey: "district_id" });
    user_details.belongsTo(models.positions, { foreignKey: "position_id" });
  };

  return user_details;
};
