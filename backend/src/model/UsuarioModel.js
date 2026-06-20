const { DataTypes } = require("sequelize");
const sequelize = require("../config/DatabaseSequelize");

const Usuario = sequelize.define(
  "usuario",
  {
    usuario_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    usuario_name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true,
    },
    usuario_password: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    usuario_type: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
  },
  {
    tableName: "usuario",
    timestamps: false,
  }
);

module.exports = Usuario;
