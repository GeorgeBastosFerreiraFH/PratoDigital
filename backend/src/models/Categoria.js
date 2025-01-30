const mongoose = require('mongoose')

const categoriaSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    unique: true
  },
  descricao: {
    type: String,
    required: true
  },
  imagem: {
    type: String,
    required: true
  },
  ativa: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Categoria', categoriaSchema)
