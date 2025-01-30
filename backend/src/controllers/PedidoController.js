const Pedido = require("../models/Pedido");

class PedidoController {
  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const dadosAtualizados = req.body;

      const pedido = await Pedido.findByIdAndUpdate(id, dadosAtualizados, {
        new: true,
      });

      if (!pedido) {
        return res.status(404).json({ erro: "Pedido não encontrado" });
      }

      return res.json(pedido);
    } catch (erro) {
      console.error("Erro ao atualizar pedido:", erro);
      return res.status(400).json({ erro: "Erro ao atualizar pedido" });
    }
  }

  async deletar(req, res) {
    try {
      const pedido = await Pedido.findByIdAndDelete(req.params.id); // Busca o pedido pelo ID e o deleta
      if (!pedido) {
        return res.status(404).json({ erro: "Pedido não encontrado" }); // Caso o pedido não seja encontrado, retorna status 404
      }
      return res.json({ mensagem: "Pedido deletado com sucesso" }); // Retorna mensagem de sucesso
    } catch (erro) {
      console.error("Erro ao deletar pedido:", erro);
      return res.status(500).json({ erro: "Erro ao deletar pedido" }); // Caso ocorra erro, retorna status 500
    }
  }

  async buscarPorTermo(req, res) {
    try {
      const { termo, pagina = 1, limite = 10 } = req.query;
      const regex = new RegExp(termo, "i"); // Busca case-insensitive

      const pedidos = await Pedido.find({
        "cliente.nome": regex, // Busca pelo nome do cliente
      })
        .skip((pagina - 1) * limite)
        .limit(parseInt(limite));

      const total = await Pedido.countDocuments({ "cliente.nome": regex });

      res.json({ pedidos, total });
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error);
      res.status(500).json({ error: "Erro interno no servidor" });
    }
  }

  // Função para listar todos os pedidos
  async listar(req, res) {
    try {
      const pedidos = await Pedido.find().sort({ createdAt: -1 }); // Ordena os pedidos pela data de criação
      return res.json(pedidos); // Retorna os pedidos no formato JSON
    } catch (erro) {
      console.error("Erro ao listar pedidos:", erro);
      return res.status(500).json({ erro: "Erro ao listar pedidos" }); // Caso ocorra erro, retorna status 500
    }
  }

  // Função para criar um novo pedido
  async criar(req, res) {
    try {
      const pedido = await Pedido.create(req.body); // Cria um novo pedido a partir dos dados enviados no corpo da requisição
      return res.status(201).json(pedido); // Retorna o pedido criado com status 201
    } catch (erro) {
      console.error("Erro ao criar pedido:", erro);
      return res.status(400).json({ erro: "Erro ao criar pedido" }); // Caso ocorra erro, retorna status 400
    }
  }

  // Função para atualizar o status de um pedido
  async atualizarStatus(req, res) {
    try {
      const { id } = req.params; // Obtém o ID do pedido da URL
      const { status } = req.body; // Obtém o novo status do corpo da requisição

      const pedido = await Pedido.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      ); // Atualiza o status do pedido no banco

      if (!pedido) {
        return res.status(404).json({ erro: "Pedido não encontrado" }); // Caso o pedido não seja encontrado, retorna status 404
      }

      return res.json(pedido); // Retorna o pedido atualizado
    } catch (erro) {
      console.error("Erro ao atualizar status do pedido:", erro);
      return res
        .status(400)
        .json({ erro: "Erro ao atualizar status do pedido" }); // Caso ocorra erro, retorna status 400
    }
  }

  // Função para buscar um pedido por ID
  async buscarPorId(req, res) {
    try {
      const pedido = await Pedido.findById(req.params.id); // Busca o pedido no banco com base no ID passado na URL
      if (!pedido) {
        return res.status(404).json({ erro: "Pedido não encontrado" }); // Caso o pedido não seja encontrado, retorna status 404
      }
      return res.json(pedido); // Retorna o pedido encontrado
    } catch (erro) {
      console.error("Erro ao buscar pedido:", erro);
      return res.status(500).json({ erro: "Erro ao buscar pedido" }); // Caso ocorra erro, retorna status 500
    }
  }
}

module.exports = new PedidoController(); // Exporta uma instância do controlador
