const { Sesion, SesionMensaje } = require("../model");

class SesionService {
  async getAllSessions() {
    return Sesion.findAll({
      include: [{ model: SesionMensaje, as: "mensajes" }],
      order: [["created_at", "DESC"]],
    });
  }

  async getSessionsByUser(usuario_id) {
    return Sesion.findAll({
      where: { usuario_id },
      include: [{ model: SesionMensaje, as: "mensajes" }],
      order: [["created_at", "DESC"]],
    });
  }

  async getSessionById(sesion_id) {
    return Sesion.findByPk(sesion_id, {
      include: [{ model: SesionMensaje, as: "mensajes" }],
    });
  }

  async getMessagesForSession(sesion_id) {
    return SesionMensaje.findAll({
      where: { sesion_id },
      order: [["created_at", "ASC"]],
    });
  }

  async createSession({ usuario_id, titulo }) {
    return Sesion.create({
      usuario_id,
      titulo: titulo || "Nueva sesión de chat",
    });
  }

  async addMessage(sesion_id, messageData) {
    return SesionMensaje.create({
      sesion_id,
      remitente: messageData.remitente,
      contenido: messageData.contenido,
      tipo: messageData.tipo || "text",
      imagen_url: messageData.imagen_url || null,
    });
  }
}

module.exports = SesionService;
