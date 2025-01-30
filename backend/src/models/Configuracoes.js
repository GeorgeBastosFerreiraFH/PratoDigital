const mongoose = require('mongoose');

const configuracoesSchema = new mongoose.Schema(
  {
    horarioAbertura: {
      type: String,
      required: true,
    },
    horarioFechamento: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Configuracoes', configuracoesSchema);
