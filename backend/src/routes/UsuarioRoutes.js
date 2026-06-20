const express = require("express");
const UsuarioController = require("../controller/UsuarioController");
const UsuarioService = require("../service/UsuarioService");

const router = express.Router();
const usuarioController = new UsuarioController(new UsuarioService());

router.post("/login", usuarioController.login);
router.post("/usuarios", usuarioController.register);

module.exports = router;
