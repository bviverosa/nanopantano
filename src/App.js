const path = require("path");
const express = require("express");
const routes = require("./routes");
const noCache = require("./middleware/NoCache");
const errorHandler = require("./middleware/ErrorHandler");
const sequelize = require("./config/DatabaseSequelize");

require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
require("./model");

const app = express();
const port = Number(process.env.PORT || 8080);

app.use(express.static(path.resolve(__dirname, "../public")));
app.use(express.json());
app.use(noCache);
app.use(routes);
app.use(errorHandler);

async function start() {
  try {
    await sequelize.authenticate();
    console.log("Conexión a la base de datos establecida correctamente.");
    await sequelize.sync();
    console.log("Modelos sincronizados con la base de datos.");
    app.listen(port, () => {
      console.log(`Servidor backend iniciado en http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error al inicializar la base de datos:", error);
    process.exit(1);
  }
}

start();
