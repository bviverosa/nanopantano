const { DataTypes } = require("sequelize");
const sequelize = require("../config/DatabaseSequelize");

const Sesion = sequelize.define(
  "Sesion",
  {
    sesion_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    usuario_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    titulo: {
      type: DataTypes.STRING(120),
      allowNull: false,
      defaultValue: "Nueva sesión de chat",
    },
  },
  {
    tableName: "sesion",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Sesion;
