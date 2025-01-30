const Usuario = require("../models/Usuario");
const jwt = require("jsonwebtoken");

class AuthController {
  async listar(req, res) {
    try {
      const usuarios = await Usuario.find();
      res.json(usuarios);
    } catch (erro) {
      res.status(500).json({ erro: "Erro ao listar usuários" });
    }
  }

  async registrar(req, res) {
    try {
      const { nome, email, senha, role } = req.body;
      const usuarioExistente = await Usuario.findOne({ email });

      if (usuarioExistente) {
        return res.status(400).json({ erro: "Usuário já existe" });
      }

      const usuario = await Usuario.create({
        nome,
        email,
        senha,
        role,
      });

      const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      res
        .status(201)
        .json({ usuario: { id: usuario._id, nome, email, role }, token });
    } catch (erro) {
      res.status(400).json({ erro: "Erro ao registrar usuário" });
    }
  }

  async login(req, res) {
    try {
      const { email, senha } = req.body;
      const usuario = await Usuario.findOne({ email });

      if (!usuario || !(await usuario.compararSenha(senha))) {
        return res.status(401).json({ erro: "Credenciais inválidas" });
      }

      const token = jwt.sign(
        { id: usuario._id, jwtSecret: process.env.JWT_SECRET },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      res.json({
        usuario: {
          id: usuario._id,
          nome: usuario.nome,
          email,
          role: usuario.role,
        },
        token,
      });
    } catch (erro) {
      res.status(400).json({ erro: "Erro ao fazer login" });
    }
  }
}

module.exports = new AuthController();
