const { DataTypes } = require("sequelize");
const sequelize = require("../config/DatabaseSequelize");

const SesionMensaje = sequelize.define(
  "SesionMensaje",
  {
    mensaje_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    sesion_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    remitente: {
      type: DataTypes.ENUM("user", "assistant"),
      allowNull: false,
      defaultValue: "user",
    },
    contenido: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    tipo: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "text",
    },
    imagen_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "sesion_mensaje",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);

module.exports = SesionMensaje;
