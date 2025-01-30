const Produto = require("../models/Produto.js");

class ProdutoController {
  async listar(req, res) {
    try {
      const { pagina = 1, limite = 10, categoria } = req.query;
      const skip = (pagina - 1) * limite;

      let filtro = {};
      if (categoria) {
        filtro.categoria = categoria;
      }

      console.log("Filtro aplicado:", filtro);

      const produtos = await Produto.find(filtro)
        .populate("categoria")
        .skip(skip)
        .limit(Number(limite));

      console.log(
        `Produtos encontrados para a categoria ${categoria}:`,
        produtos
      );

      const total = await Produto.countDocuments(filtro);

      console.log(`Total de produtos para a categoria ${categoria}:`, total);

      return res.json({
        produtos,
        total,
        pagina: Number(pagina),
        totalPaginas: Math.ceil(total / limite),
      });
    } catch (erro) {
      console.error("Erro ao listar produtos:", erro);
      return res.status(500).json({ erro: "Erro ao listar produtos" });
    }
  }

  async listarPorId(req, res) {
    try {
      const produto = await Produto.findById(req.params.id).populate(
        "categoria"
      );
      if (!produto) {
        return res.status(404).json({ erro: "Produto não encontrado" });
      }
      return res.json(produto);
    } catch (erro) {
      console.error("Erro ao listar produto por ID:", erro);
      return res.status(500).json({ erro: "Erro ao listar produto" });
    }
  }

  async criar(req, res) {
    try {
      const produto = await Produto.create(req.body);
      return res.status(201).json(produto);
    } catch (erro) {
      console.error("Erro ao criar produto:", erro);
      return res.status(400).json({ erro: "Erro ao criar produto" });
    }
  }

  async atualizar(req, res) {
    try {
      const produto = await Produto.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!produto) {
        return res.status(404).json({ erro: "Produto não encontrado" });
      }
      return res.json(produto);
    } catch (erro) {
      console.error("Erro ao atualizar produto:", erro);
      return res.status(400).json({ erro: "Erro ao atualizar produto" });
    }
  }

  async excluir(req, res) {
    try {
      const produto = await Produto.findByIdAndDelete(req.params.id);
      if (!produto) {
        return res.status(404).json({ erro: "Produto não encontrado" });
      }
      return res.status(204).send();
    } catch (erro) {
      console.error("Erro ao excluir produto:", erro);
      return res.status(400).json({ erro: "Erro ao excluir produto" });
    }
  }

  async buscar(req, res) {
    try {
      const { termo, pagina = 1, limite = 10 } = req.query;
      const skip = (pagina - 1) * limite;

      const filtro = {
        $or: [
          { nome: { $regex: termo, $options: "i" } },
          { descricao: { $regex: termo, $options: "i" } },
        ],
      };

      const produtos = await Produto.find(filtro)
        .populate("categoria")
        .skip(skip)
        .limit(Number(limite));

      const total = await Produto.countDocuments(filtro);

      res.json({
        produtos,
        total,
        pagina: Number(pagina),
        totalPaginas: Math.ceil(total / limite),
      });
    } catch (erro) {
      console.error("Erro ao buscar produtos:", erro);
      res.status(500).json({ erro: "Erro ao buscar produtos" });
    }
  }
}

module.exports = new ProdutoController();
