class SesionController {
  constructor(sesionService) {
    this.sesionService = sesionService;
    this.listSessions = this.listSessions.bind(this);
    this.getSession = this.getSession.bind(this);
    this.getMessages = this.getMessages.bind(this);
    this.createSession = this.createSession.bind(this);
    this.addMessage = this.addMessage.bind(this);
  }
//Obtener sesiones del usuario o todas las sesiones si no se proporciona usuario_id 
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
//obtener detalles de una sesión específica por su ID, incluyendo su título y fecha de creación
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
//obtener mensajes de una sesión específica por su ID, incluyendo el remitente, contenido, tipo y fecha de cada mensaje
  async getMessages(req, res, next) {
    try {
      const { sesion_id } = req.params;
      const mensajes = await this.sesionService.getMessagesForSession(sesion_id);
      return res.json(mensajes);
    } catch (error) {
      next(error);
    }
  }
//crear una nueva sesión de chat para un usuario específico.
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

//agregar un nuevo mensaje a una sesión de chat específica.
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
