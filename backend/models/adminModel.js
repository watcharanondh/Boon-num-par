module.exports = (sequelize, DataTypes) => {
  const admins = sequelize.define("admins", {
    admin_ID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
    },
    adm_CitizenID: {
      type: DataTypes.STRING(13),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    FName: {
      type: DataTypes.STRING(45),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    LName: {
      type: DataTypes.STRING(45),
      allowNull: true,
      defaultValue: null,
    },
    username: {
      type: DataTypes.STRING(45),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING(45),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    createdAt: {
      field: "createdAt",
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      field: "updatedAt",
      type: DataTypes.DATE,
      defaultValue: null,
    }
  });

  return admins;
};
