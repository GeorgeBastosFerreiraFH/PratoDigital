const jwt = require("jsonwebtoken");

const autenticar = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res
      .status(401)
      .json({ erro: "Token de autenticação não fornecido" });
  }

  const [bearer, token] = authHeader.split(" ");
  if (bearer !== "Bearer") {
    return res.status(401).json({ erro: "Formato de token inválido" });
  }

  try {
    if (token === process.env.JWT_SECRET) {
      // Se o token for exatamente a chave JWT_SECRET, permitir o acesso
      next();
    } else {
      // Caso contrário, verificar o token JWT
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.usuario = decoded;
      next();
    }
  } catch (erro) {
    res.status(401).json({ erro: "Token inválido" });
  }
};

module.exports = autenticar;
