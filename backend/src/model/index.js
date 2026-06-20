const Usuario = require("./UsuarioModel");
const Sesion = require("./SesionModel");
const SesionMensaje = require("./SesionMensajeModel");

Usuario.hasMany(Sesion, { foreignKey: "usuario_id", as: "sesiones" });
Sesion.belongsTo(Usuario, { foreignKey: "usuario_id", as: "usuario" });

Sesion.hasMany(SesionMensaje, { foreignKey: "sesion_id", as: "mensajes" });
SesionMensaje.belongsTo(Sesion, { foreignKey: "sesion_id", as: "sesion" });

module.exports = { Usuario, Sesion, SesionMensaje };
