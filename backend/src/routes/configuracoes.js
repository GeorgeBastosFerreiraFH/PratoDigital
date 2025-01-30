const express = require("express");
const ConfiguracaoController = require("../controllers/ConfiguracaoController");

const router = express.Router();

router.post("/configuracao", ConfiguracaoController.criar);
router.put("/configuracao/:id", ConfiguracaoController.atualizar);
router.get("/configuracao", ConfiguracaoController.listar);

module.exports = router;
