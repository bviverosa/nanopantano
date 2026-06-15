const express = require("express");
const UsuarioRoutes = require("./UsuarioRoutes");
const SesionRoutes = require("./SesionRoutes");
const GenAIRoutes = require("./GenAIRoutes");

const router = express.Router();

router.use("/api", UsuarioRoutes);
router.use("/api", SesionRoutes);
router.use("/api", GenAIRoutes);

module.exports = router;
