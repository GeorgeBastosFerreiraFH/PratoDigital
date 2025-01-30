const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const produtosRoutes = require("./src/routes/produtos.js");
const categoriasRoutes = require("./src/routes/categorias.js");
const configuracoesRoutes = require("./src/routes/configuracoes.js");
const authRoutes = require("./src/routes/auth.js");
const pedidosRoutes = require("./src/routes/pedidos.js");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const dbURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

// Conectar ao MongoDB
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((erro) => console.error("Erro ao conectar ao MongoDB:", erro));

// Rotas
app.use("/api", produtosRoutes);
app.use("/api", categoriasRoutes);
app.use("/api", configuracoesRoutes);
app.use("/api", pedidosRoutes);
app.use("/api/auth", authRoutes);

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
