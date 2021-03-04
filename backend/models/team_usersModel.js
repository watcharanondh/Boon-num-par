module.exports = (sequelize, DataTypes) => {
  const team_users = sequelize.define("team_users", {
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    team_id: {
      type: DataTypes.INTEGER(10),
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

  team_users.associate = models => {
    team_users.belongsTo(models.users, {foreignKey: "user_id"});
    team_users.belongsTo(models.teams, {foreignKey: "team_id"});
  };

  return team_users;
};
