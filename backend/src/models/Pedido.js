const mongoose = require("mongoose");

const pedidoSchema = new mongoose.Schema(
  {
    cliente: {
      nome: { type: String, required: true },
      email: { type: String, required: true },
      whatsapp: { type: String, required: true },
      endereco: {
        rua: { type: String, required: true },
        numero: { type: String, required: true },
        complemento: String,
        bairro: { type: String, required: true },
        cidade: { type: String, required: true },
      },
    },
    itens: [
      {
        id: { type: mongoose.Schema.Types.ObjectId, ref: "Produto" },
        nome: String,
        preco: Number,
        quantidade: Number,
        observacoes: String,
      },
    ],
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pendente", "preparando", "entregando", "entregue", "cancelado"],
      default: "pendente",
    },
    formaPagamento: {
      type: String,
      enum: ["pix", "cartao", "dinheiro"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Pedido", pedidoSchema);
