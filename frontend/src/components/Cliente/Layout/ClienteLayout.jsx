import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import TabletFrame from "./TabletFrame";
import Carrinho from "../Carrinho";

const ClienteLayout = ({ children }) => {
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);
  const [configuracoes, setConfiguracoes] = useState(null);
  const [estaAberto, setEstaAberto] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const buscarConfiguracoes = async () => {
      try {
        const resposta = await axios.get(
          "http://localhost:5000/api/configuracao"
        );
        setConfiguracoes(resposta.data);
      } catch (erro) {
        console.error("Erro ao carregar configurações:", erro);
      }
    };

    buscarConfiguracoes();
  }, []);

  useEffect(() => {
    if (!configuracoes) return;

    const verificarHorario = () => {
      const agora = new Date();
      const horaAtual = agora.getHours() * 60 + agora.getMinutes();

      if (!configuracoes.horarioAbertura || !configuracoes.horarioFechamento) {
        setEstaAberto(true);
        return;
      }

      const [horaAbertura, minutoAbertura] = configuracoes.horarioAbertura
        .split(":")
        .map(Number);
      const [horaFechamento, minutoFechamento] = configuracoes.horarioFechamento
        .split(":")
        .map(Number);

      if (
        isNaN(horaAbertura) ||
        isNaN(minutoAbertura) ||
        isNaN(horaFechamento) ||
        isNaN(minutoFechamento)
      ) {
        setEstaAberto(true);
        return;
      }

      const horarioAbertura = horaAbertura * 60 + minutoAbertura;
      const horarioFechamento = horaFechamento * 60 + minutoFechamento;

      setEstaAberto(
        horaAtual >= horarioAbertura && horaAtual < horarioFechamento
      );
    };

    verificarHorario();
    const intervalo = setInterval(verificarHorario, 60000);

    return () => clearInterval(intervalo);
  }, [configuracoes]);

  const irParaHome = () => {
    navigate("/");
  };

  const LayoutContent = () => (
    <div className="flex flex-col h-full">
      <Header
        setCarrinhoAberto={setCarrinhoAberto}
        estaAberto={estaAberto}
        configuracoes={configuracoes}
        irParaHome={irParaHome}
      />
      <main className="flex-1 overflow-y-auto scrollbar-hidden">
        <div className="container mx-auto px-4 py-8">{children}</div>
      </main>
      <Footer />
      <Carrinho
        aberto={carrinhoAberto}
        fecharCarrinho={() => setCarrinhoAberto(false)}
      />
    </div>
  );

  return (
    <>
      {/* Versão Mobile */}
      <div className="md:hidden h-screen">
        <LayoutContent />
      </div>

      {/* Versão Desktop com Frame de Tablet */}
      <div className="hidden md:block h-screen">
        <TabletFrame>
          <LayoutContent />
        </TabletFrame>
      </div>
    </>
  );
};

export default ClienteLayout;
