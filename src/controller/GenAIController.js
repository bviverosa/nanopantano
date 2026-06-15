// src/controller/GenAIController.js

class GenAIController {
  constructor(genAIService) {
    this.genAIService = genAIService;
    this.generateImage = this.generateImage.bind(this);
  }

  async generateImage(req, res, next) {
    try {
      // 👈 AQUÍ es donde se extraen correctamente los datos del body de Express
      const { sesion_id, usuario_id, prompt } = req.body;

      if (!prompt) {
        return res.status(400).json({ error: "El prompt es requerido" });
      }

      // Se delega la generación real al servicio externo
      const result = await this.genAIService.generateImage({ prompt, sesion_id, usuario_id });
      
      return res.json(result);
    } catch (error) {
      next(error); // Evita que Node.js se caiga enviando el error al middleware global
    }
  }
}

module.exports = GenAIController;