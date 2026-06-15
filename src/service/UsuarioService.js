const Usuario = require("../model/UsuarioModel");

class UsuarioService {
  async login(usuario_name, usuario_password) {
    if (!usuario_name || !usuario_password) {
      return { status: "no", tipo: "nodefinido" };
    }

    const user = await Usuario.findOne({
      where: {
        usuario_name,
        usuario_password,
      },
    });

    if (!user) {
      return { status: "no", tipo: "nodefinido" };
    }

    return {
      status: "yes",
      tipo: user.usuario_type || "nodefinido",
      usuario_id: user.usuario_id,
      usuario_name: user.usuario_name,
    };
  }

  async register({ usuario_name, usuario_password, usuario_type }) {
    if (!usuario_name || !usuario_password) {
      throw new Error("usuario_name y usuario_password son necesarios");
    }

    const existingUser = await Usuario.findOne({ where: { usuario_name } });
    if (existingUser) {
      throw new Error("El usuario ya existe");
    }

    const user = await Usuario.create({
      usuario_name,
      usuario_password,
      usuario_type,
    });

    return {
      status: "yes",
      tipo: user.usuario_type,
      usuario_id: user.usuario_id,
      usuario_name: user.usuario_name,
    };
  }
}

module.exports = UsuarioService;
