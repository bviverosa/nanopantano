// src/controller/GenAIController.js
const { SesionMensaje } = require("../model/index.js"); // Ajusta la ruta según tu estructura de carpetas
const sequelize = require("../config/DatabaseSequelize");
// Controlador para manejar las solicitudes relacionadas con la generación de imágenes a partir de prompts.
class GenAIController {
  constructor(genAIService) {
    this.genAIService = genAIService;
    this.generateImage = this.generateImage.bind(this);
  }
// Permite a los usuarios generar imágenes a partir de un prompt.
  async generateImage(req, res, next) {
    const t = await sequelize.transaction();

    try {
      const { sesion_id, usuario_id, prompt } = req.body;

      if (!prompt) {
        return res.status(400).json({ error: "El prompt es requerido" });
      }

      await SesionMensaje.create({
        sesion_id,
        remitente: "user",
        contenido: prompt,
        tipo: "text"
      }, { transaction: t });

      const result = await this.genAIService.generateImage({ prompt, sesion_id, usuario_id });
      
      const urlGenerada = result.message.url || result.message.imagen_url || ""; 
// Guardar el mensaje de respuesta del asistente con la URL de la imagen generada
      const mensajeAsistente = await SesionMensaje.create({
        sesion_id,
        remitente: "assistant",
        contenido: `Imagen generada a partir del prompt: "${prompt}"`,
        tipo: "image",
        imagen_url: urlGenerada
      }, { transaction: t });

      await t.commit();
      
      return res.json({
        ...result,
        mensaje_guardado: mensajeAsistente
      });

    } catch (error) {
      await t.rollback();
      next(error); 
    }
  }
}

module.exports = GenAIController;