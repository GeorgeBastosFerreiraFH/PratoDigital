const express = require("express");
const AuthController = require("../controllers/AuthController");

const router = express.Router();

router.get("/usuarios", AuthController.listar);
router.post("/registrar", AuthController.registrar);
router.post("/login", AuthController.login);

module.exports = router;
