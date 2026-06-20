// src/controller/GenAIController.js
const { SesionMensaje } = require("../model/index.js"); // Ajusta la ruta según tu estructura de carpetas
const sequelize = require("../config/DatabaseSequelize");

class GenAIController {
  constructor(genAIService) {
    this.genAIService = genAIService;
    this.generateImage = this.generateImage.bind(this);
  }

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
      
      console.log("Resultado de GenAIService:", result);
      const urlGenerada = result.message.url || result.message.imagen_url || ""; 

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