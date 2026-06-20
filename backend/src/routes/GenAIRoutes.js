const express = require("express");
const GenAIController = require("../controller/GenAIController");
const GenAIService = require("../service/GenAIService");

const router = express.Router();
const genAIController = new GenAIController(new GenAIService());

router.post("/generate-image", genAIController.generateImage);

module.exports = router;
