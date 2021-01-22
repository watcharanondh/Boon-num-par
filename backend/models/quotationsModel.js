module.exports = (sequelize, DataTypes) => {
  const quotations = sequelize.define("quotations", {
    id: {
      type: DataTypes.INTEGER(12),
      allowNull: false,
      primaryKey: true,
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
      default:0
    },
    amount_sweet_food: {
      type: DataTypes.INTEGER(5),
      allowNull: false,
      default:0
    },
    amount_drink: {
      type: DataTypes.INTEGER(5),
      allowNull: false,
      default:0
    },
    quotation_status_id: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
    },
    note: {
      type: DataTypes.STRING(255),
      allowNull: true,
      default: null,
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

  return quotations;
};
