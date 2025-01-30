const Configuracoes = require("../models/Configuracoes");

const obterConfiguracoes = async (req, res) => {
  try {
    // Filtrar os registros do dia atual
    const inicioDoDia = new Date();
    inicioDoDia.setHours(0, 0, 0, 0);
    const fimDoDia = new Date();
    fimDoDia.setHours(23, 59, 59, 999);

    const configuracaoAtual = await Configuracoes.findOne({
      createdAt: { $gte: inicioDoDia, $lte: fimDoDia },
    }).sort({ updatedAt: -1 }); // Retorna o mais recente

    if (!configuracaoAtual) {
      return res.status(404).json({
        mensagem: "Nenhuma configuração encontrada para o dia atual.",
      });
    }

    res.json(configuracaoAtual);
  } catch (erro) {
    console.error("Erro ao obter configurações:", erro);
    res.status(500).json({ mensagem: "Erro interno no servidor." });
  }
};

class ConfiguracaoController {
  async listar(req, res) {
    try {
      const configuracoes = await Configuracoes.find();
      return res.json(configuracoes);
    } catch (erro) {
      console.error("Erro ao listar configurações:", erro);
      return res.status(500).json({ erro: "Erro ao listar configurações" });
    }
  }

  async criar(req, res) {
    try {
      const { horarioAbertura, horarioFechamento } = req.body;

      if (!horarioAbertura || !horarioFechamento) {
        return res
          .status(400)
          .json({
            erro: "Horários de abertura e fechamento são obrigatórios.",
          });
      }

      // Verificar se já existe uma configuração para o dia atual
      const inicioDoDia = new Date();
      inicioDoDia.setHours(0, 0, 0, 0);
      const fimDoDia = new Date();
      fimDoDia.setHours(23, 59, 59, 999);

      const configuracaoExistente = await Configuracoes.findOne({
        createdAt: { $gte: inicioDoDia, $lte: fimDoDia },
      });

      if (configuracaoExistente) {
        // Atualizar o registro existente
        configuracaoExistente.horarioAbertura = horarioAbertura;
        configuracaoExistente.horarioFechamento = horarioFechamento;
        await configuracaoExistente.save();

        return res.status(200).json(configuracaoExistente);
      }

      // Caso não exista, criar um novo registro
      const novaConfiguracao = await Configuracoes.create({
        horarioAbertura,
        horarioFechamento,
      });

      return res.status(201).json(novaConfiguracao);
    } catch (erro) {
      console.error("Erro ao criar ou atualizar configuração:", erro.message);
      return res
        .status(500)
        .json({
          erro: "Erro interno ao criar ou atualizar configuração. Por favor, tente novamente.",
        });
    }
  }

  async atualizar(req, res) {
    try {
      const { horarioAbertura, horarioFechamento } = req.body;

      if (!horarioAbertura || !horarioFechamento) {
        return res.status(400).json({
          erro: "Horários de abertura e fechamento são obrigatórios.",
        });
      }

      // Atualizar ou criar configuração
      const configuracaoAtualizada = await Configuracoes.findOneAndUpdate(
        {}, // Filtro (opcional, neste caso, aplica-se a qualquer documento)
        { horarioAbertura, horarioFechamento },
        { new: true, upsert: true } // Retorna o documento atualizado e cria se não existir
      );

      return res.status(200).json(configuracaoAtualizada);
    } catch (erro) {
      console.error("Erro ao atualizar configuração:", erro.message);
      return res.status(500).json({
        erro: "Erro interno ao atualizar configuração. Por favor, tente novamente.",
      });
    }
  }
}

module.exports = new ConfiguracaoController();
