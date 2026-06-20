const express = require("express");
const SesionController = require("../controller/SesionController");
const SesionService = require("../service/SesionService");

const router = express.Router();
const sesionController = new SesionController(new SesionService());

router.get("/sesiones", sesionController.listSessions);
router.get("/sesiones/:sesion_id", sesionController.getSession);
router.get("/sesiones/:sesion_id/mensajes", sesionController.getMessages);
router.post("/sesiones", sesionController.createSession);
router.post("/sesiones/:sesion_id/mensajes", sesionController.addMessage);

module.exports = router;
