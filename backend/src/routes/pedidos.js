const express = require("express");
const PedidoController = require("../controllers/PedidoController");
const autenticar = require("../middlewares/auth");

const router = express.Router();

router.get("/pedidos", autenticar, PedidoController.listar);
router.get("/pedidos/buscar", autenticar, PedidoController.buscarPorTermo);
router.get("/pedidos/:id", autenticar, PedidoController.buscarPorId);
router.post("/pedidos", PedidoController.criar);
router.patch(
  "/pedidos/:id/status",
  autenticar,
  PedidoController.atualizarStatus
);
router.delete("/pedidos/:id", autenticar, PedidoController.deletar);
router.put("/pedidos/:id", autenticar, PedidoController.atualizar);

module.exports = router;
