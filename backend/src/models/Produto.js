const mongoose = require("mongoose")

const produtoSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    descricao: {
      type: String,
      required: true,
    },
    preco: {
      type: Number,
      required: true,
    },
    categoria: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categoria",
      required: true,
    },
    imagem: {
      type: String,
      required: true,
    },
    disponivel: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model("Produto", produtoSchema)