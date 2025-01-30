const Categoria = require('../models/Categoria')

class CategoriaController {
  async listar(req, res) {
    try {
      const categorias = await Categoria.find({ ativa: true })
      return res.json(categorias)
    } catch (erro) {
      return res.status(500).json({ erro: 'Erro ao listar categorias' })
    }
  }

  async listarPorId(req, res) {
    try {
      const categoria = await Categoria.findById(req.params.id)
      return res.json(categoria)
    } catch (erro) {
      return res.status(500).json({ erro: 'Erro ao listar categoria' })
    }
  }

    async criar(req, res) {
      try {
        const categoria = await Categoria.create(req.body)
        return res.status(201).json(categoria)
      } catch (erro) {
        return res.status(400).json({ erro: 'Erro ao criar categoria' })
      }
    }

  async atualizar(req, res) {
    try {
      const categoria = await Categoria.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      )
      return res.json(categoria)
    } catch (erro) {
      return res.status(400).json({ erro: 'Erro ao atualizar categoria' })
    }
  }

  async excluir(req, res) {
    try {
      await Categoria.findByIdAndUpdate(req.params.id, { ativa: false })
      return res.status(204).send()
    } catch (erro) {
      return res.status(400).json({ erro: 'Erro ao excluir categoria' })
    }
  }
}

module.exports = new CategoriaController()

