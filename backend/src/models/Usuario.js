const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const usuarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  senha: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'gerente'],
    default: 'gerente'
  }
}, {
  timestamps: true
})

usuarioSchema.pre('save', async function(next) {
  if (!this.isModified('senha')) return next()
  this.senha = await bcrypt.hash(this.senha, 8)
})

usuarioSchema.methods.compararSenha = function(senhaFornecida) {
  return bcrypt.compare(senhaFornecida, this.senha)
}

module.exports = mongoose.model('Usuario', usuarioSchema)
