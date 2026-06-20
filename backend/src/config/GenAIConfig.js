const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

if (!apiKey) {
  throw new Error(
    "Falta la variable de entorno GEMINI_API_KEY o GOOGLE_API_KEY en el archivo .env"
  );
}

module.exports = {
  apiKey,
  modelName: process.env.GENAI_IMAGE_MODEL || "gemini-2.5-flash-image",
};
