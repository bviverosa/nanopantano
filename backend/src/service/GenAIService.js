// src/services/GenAIService.js
const fetch = require('node-fetch'); // Asegúrate de tenerlo en las dependencias si usas require clásico

class GenAIService {
  async generateImage({ prompt, sesion_id, usuario_id }) {
    const apiKey = process.env.SILICONFLOW_TOKEN; 
    if (!apiKey) {
      throw new Error("Falta la variable SILICONFLOW_TOKEN en el archivo .env");
    }

    const options = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'black-forest-labs/FLUX.1-schnell', 
        prompt: prompt.trim(),
        image_size: '1024x1024'
      })
    };

    try {
      const response = await fetch('https://api.siliconflow.com/v1/images/generations', options);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`SiliconFlow API respondió con estado ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      
      
      const imageUrl = data.data?.[0]?.url || data.images?.[0]?.url;

      if (!imageUrl) {
        console.error("Estructura inesperada de la API:", data);
        throw new Error("La API de SiliconFlow no retornó ninguna URL de imagen.");
      }

      const mensajeId = require('crypto').randomUUID(); 
      const timestamp = new Date(); 

      return {
        session: { 
          sesion_id: sesion_id 
        },
        message: {
          mensaje_id: mensajeId,                  // `mensaje_id` CHAR(36) BINARY
          sesion_id: sesion_id,                    // `sesion_id` CHAR(36) BINARY
          remitente: "assistant",                 // `remitente` ENUM('user', 'assistant')
          contenido: `Imagen generada con FLUX.1-schnell para: "${prompt}"`, // `contenido` TEXT
          tipo: "image",                          // `tipo` VARCHAR(20)
          imagen_url: imageUrl,                   // `imagen_url` TEXT (URL de SiliconFlow que renderiza el frontend)
          created_at: timestamp                   // `created_at` DATETIME
        }
      };

    } catch (error) {
      console.error("Error en GenAIService con SiliconFlow:", error.message);
      throw error;
    }
  }
}

module.exports = GenAIService;