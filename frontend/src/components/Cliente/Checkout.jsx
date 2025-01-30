"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { QrCode, CreditCard, Wallet, ArrowLeft } from "lucide-react";
import { useCarrinho } from "../../contexts/CarrinhoContext";
import { toast } from "react-toastify";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const Checkout = () => {
  const [formaDePagamento, setFormaDePagamento] = useState("");
  const [dadosCliente, setDadosCliente] = useState({
    nome: "",
    email: "",
    whatsapp: "",
    endereco: {
      rua: "",
      numero: "",
      complemento: "",
      bairro: "",
      cidade: "",
    },
  });
  const [enviando, setEnviando] = useState(false);
  const { itens, calcularTotal, limparCarrinho } = useCarrinho();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formaDePagamento) {
      toast.error("Selecione uma forma de pagamento");
      return;
    }

    if (itens.length === 0) {
      toast.error("Seu carrinho está vazio");
      return;
    }

    setEnviando(true);
    try {
      const pedido = {
        cliente: dadosCliente,
        itens: itens.map((item) => ({
          id: item.id,
          nome: item.nome,
          preco: item.preco,
          quantidade: item.quantidade,
          observacoes: item.observacoes || "",
        })),
        formaPagamento: formaDePagamento,
        total: calcularTotal(),
        status: "pendente",
      };

      const response = await api.post("/pedidos", pedido);

      if (response.status === 201) {
        toast.success("Pedido realizado com sucesso!");
        limparCarrinho();
        navigate("/confirmacao", {
          state: {
            pedidoId: response.data._id,
            mensagem: "Pedido realizado com sucesso!",
          },
        });
      }
    } catch (erro) {
      console.error("Erro ao enviar pedido:", erro);
      toast.error(
        erro.response?.data?.erro ||
          "Erro ao finalizar pedido. Tente novamente."
      );
    } finally {
      setEnviando(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setDadosCliente((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setDadosCliente((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between mb-4">
            <h2 className="text-2xl font-bold mb-4">Finalizar Pedido</h2>
            <button onClick={() => navigate(-1)} className="btn btn-ghost">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Resumo do Pedido */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-4">Resumo do Pedido</h2>
              <div className="space-y-2">
                {itens.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span>
                      {item.quantidade}x {item.nome}
                      {item.observacoes && (
                        <p className="text-sm text-gray-500">
                          Obs: {item.observacoes}
                        </p>
                      )}
                    </span>
                    <span className="font-medium">
                      {(item.preco * item.quantidade).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </span>
                  </div>
                ))}
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>
                      {calcularTotal().toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Dados do Cliente */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-4">Seus Dados</h2>
              <div className="space-y-4">
                <div>
                  <label className="label">
                    <span className="label-text">Nome</span>
                  </label>
                  <input
                    type="text"
                    name="nome"
                    className="input input-bordered w-full"
                    value={dadosCliente.nome}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">E-mail</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="input input-bordered w-full"
                    value={dadosCliente.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">WhatsApp</span>
                  </label>
                  <input
                    type="tel"
                    name="whatsapp"
                    className="input input-bordered w-full"
                    value={dadosCliente.whatsapp}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Endereço de Entrega */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-4">
                Endereço de Entrega
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="label">
                    <span className="label-text">Rua</span>
                  </label>
                  <input
                    type="text"
                    name="endereco.rua"
                    className="input input-bordered w-full"
                    value={dadosCliente.endereco.rua}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">Número</span>
                  </label>
                  <input
                    type="text"
                    name="endereco.numero"
                    className="input input-bordered w-full"
                    value={dadosCliente.endereco.numero}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">Complemento</span>
                  </label>
                  <input
                    type="text"
                    name="endereco.complemento"
                    className="input input-bordered w-full"
                    value={dadosCliente.endereco.complemento}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">Bairro</span>
                  </label>
                  <input
                    type="text"
                    name="endereco.bairro"
                    className="input input-bordered w-full"
                    value={dadosCliente.endereco.bairro}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">Cidade</span>
                  </label>
                  <input
                    type="text"
                    name="endereco.cidade"
                    className="input input-bordered w-full"
                    value={dadosCliente.endereco.cidade}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Forma de Pagamento */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-4">Forma de Pagamento</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label className="flex flex-col items-center gap-2 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="pagamento"
                    value="pix"
                    className="radio radio-primary"
                    checked={formaDePagamento === "pix"}
                    onChange={(e) => setFormaDePagamento(e.target.value)}
                  />
                  <QrCode className="w-8 h-8" />
                  <span>PIX</span>
                </label>

                <label className="flex flex-col items-center gap-2 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="pagamento"
                    value="cartao"
                    className="radio radio-primary"
                    checked={formaDePagamento === "cartao"}
                    onChange={(e) => setFormaDePagamento(e.target.value)}
                  />
                  <CreditCard className="w-8 h-8" />
                  <span>Cartão</span>
                </label>

                <label className="flex flex-col items-center gap-2 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="pagamento"
                    value="dinheiro"
                    className="radio radio-primary"
                    checked={formaDePagamento === "dinheiro"}
                    onChange={(e) => setFormaDePagamento(e.target.value)}
                  />
                  <Wallet className="w-8 h-8" />
                  <span>Dinheiro</span>
                </label>
              </div>
            </div>

            {/* Botão de Finalizar */}
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={enviando}
            >
              {enviando ? "Processando..." : "Confirmar Pedido"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
