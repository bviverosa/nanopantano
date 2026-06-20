class SesionController {
  constructor(sesionService) {
    this.sesionService = sesionService;
    this.listSessions = this.listSessions.bind(this);
    this.getSession = this.getSession.bind(this);
    this.getMessages = this.getMessages.bind(this);
    this.createSession = this.createSession.bind(this);
    this.addMessage = this.addMessage.bind(this);
  }

  async listSessions(req, res, next) {
    try {
      const usuario_id = req.query.usuario_id;
      const sesiones = usuario_id
        ? await this.sesionService.getSessionsByUser(usuario_id)
        : await this.sesionService.getAllSessions();
      return res.json(sesiones);
    } catch (error) {
      next(error);
    }
  }

  async getSession(req, res, next) {
    try {
      const { sesion_id } = req.params;
      const sesion = await this.sesionService.getSessionById(sesion_id);
      if (!sesion) {
        return res.status(404).json({ error: "Sesión no encontrada" });
      }
      return res.json(sesion);
    } catch (error) {
      next(error);
    }
  }

  async getMessages(req, res, next) {
    try {
      const { sesion_id } = req.params;
      const mensajes = await this.sesionService.getMessagesForSession(sesion_id);
      return res.json(mensajes);
    } catch (error) {
      next(error);
    }
  }

  async createSession(req, res, next) {
    try {
      const { usuario_id, titulo } = req.body;
      if (!usuario_id) {
        return res.status(400).json({ error: "usuario_id es requerido" });
      }
      const sesion = await this.sesionService.createSession({ usuario_id, titulo });
      return res.status(201).json(sesion);
    } catch (error) {
      next(error);
    }
  }

  async addMessage(req, res, next) {
    try {
      const { sesion_id } = req.params;
      const { remitente, contenido, tipo, imagen_url } = req.body;
      if (!contenido) {
        return res.status(400).json({ error: "contenido es requerido" });
      }
      const mensaje = await this.sesionService.addMessage(sesion_id, {
        remitente: remitente || "user",
        contenido,
        tipo: tipo || "text",
        imagen_url: imagen_url || null,
      });
      return res.status(201).json(mensaje);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = SesionController;
