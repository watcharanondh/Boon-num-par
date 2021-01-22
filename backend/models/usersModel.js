module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define("users", {
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    role_id: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    profile_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
      default: null,
    },
    remember_token: {
      type: DataTypes.STRING(255),
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
    last_login: {
      type: DataTypes.DATE,
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

  users.associate = (models) => {
    users.belongsTo(models.roles, {
      foreignKey: "role_id ",
    });
  };

  return users;
};
