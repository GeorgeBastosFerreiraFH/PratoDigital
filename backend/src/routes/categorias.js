const express = require("express")
const CategoriaController = require("../controllers/CategoriaController")

const router = express.Router()

router.get("/categorias", CategoriaController.listar)
router.get("/categorias/:id", CategoriaController.listarPorId)
router.post("/categorias", CategoriaController.criar)
router.put("/categorias/:id", CategoriaController.atualizar)
router.delete("/categorias/:id", CategoriaController.excluir)

module.exports = router

