const express = require("express")
const ProdutoController = require("../controllers/ProdutoController.js")

const router = express.Router()

router.get("/produtos", ProdutoController.listar)
router.get("/produtos/buscar", ProdutoController.buscar)
router.get("/produtos/:id", ProdutoController.listarPorId)
router.post("/produtos", ProdutoController.criar)
router.put("/produtos/:id", ProdutoController.atualizar)
router.delete("/produtos/:id", ProdutoController.excluir)

module.exports = router

