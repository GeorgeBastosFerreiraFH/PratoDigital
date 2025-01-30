"use client";

import { useEffect } from "react";
import { X, Plus, Minus } from "lucide-react";
import { useCarrinho } from "../../contexts/CarrinhoContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Carrinho = ({ aberto, fecharCarrinho }) => {
  const {
    itens,
    adicionarItem,
    removerItem,
    limparCarrinho,
    atualizarObservacoes,
    calcularTotal,
  } = useCarrinho();
  const navigate = useNavigate();

  // Fecha o carrinho ao pressionar ESC
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape" && aberto) {
        fecharCarrinho();
      }
    };

    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [aberto, fecharCarrinho]);

  const handleFinalizarPedido = () => {
    if (itens.length === 0) {
      toast.error("Adicione itens ao carrinho primeiro");
      return;
    }
    fecharCarrinho();
    navigate("/checkout");
  };

  if (!aberto) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) fecharCarrinho();
      }}
    >
      <div className="fixed right-0 top-0 h-full w-full md:w-96 bg-white shadow-xl transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          {/* Cabeçalho */}
          <div className="p-4 border-b flex justify-between items-center bg-primary/10">
            <h2 className="text-xl font-bold text-primary">Seu Pedido</h2>
            <button
              className="btn btn-ghost btn-circle hover:bg-primary/20"
              onClick={fecharCarrinho}
              aria-label="Fechar carrinho"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Lista de Itens */}
          <div className="flex-1 overflow-auto p-4">
            {itens.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full space-y-4 text-gray-500">
                <svg
                  className="w-16 h-16 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <p className="text-lg font-medium">Seu carrinho está vazio</p>
                <p className="text-sm">Adicione itens para fazer seu pedido</p>
              </div>
            ) : (
              <div className="space-y-4">
                {itens.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-3 border rounded-lg hover:shadow-md transition-shadow"
                  >
                    <img
                      src={item.imagem || "/placeholder.svg"}
                      alt={item.nome}
                      className="w-20 h-20 object-cover rounded-md"
                      loading="lazy"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-800 truncate">
                        {item.nome}
                      </h3>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-primary font-bold">
                          {(item.preco * item.quantidade).toLocaleString(
                            "pt-BR",
                            {
                              style: "currency",
                              currency: "BRL",
                            }
                          )}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            className="btn btn-xs btn-circle hover:bg-primary/20"
                            onClick={() => removerItem(item.id)}
                            aria-label="Diminuir quantidade"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center">
                            {item.quantidade}
                          </span>
                          <button
                            className="btn btn-xs btn-circle btn-primary"
                            onClick={() => adicionarItem(item)}
                            aria-label="Aumentar quantidade"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <textarea
                        className="mt-2 w-full text-sm p-2 border rounded resize-none focus:ring-2 focus:ring-primary/50"
                        placeholder="Observações do item..."
                        value={item.observacoes || ""}
                        onChange={(e) =>
                          atualizarObservacoes(item.id, e.target.value)
                        }
                        rows="2"
                        maxLength={200}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Rodapé */}
          <div className="border-t p-4 bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg text-gray-700">Total do Pedido</span>
              <span className="text-lg font-bold text-primary">
                {calcularTotal().toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </div>
            <div className="space-y-2">
              <button
                className="btn btn-primary w-full hover:brightness-110 transition-all"
                onClick={handleFinalizarPedido}
                disabled={itens.length === 0}
              >
                Finalizar Pedido
              </button>
              {itens.length > 0 && (
                <button
                  className="btn btn-outline btn-error w-full hover:bg-error/10"
                  onClick={limparCarrinho}
                >
                  Limpar Carrinho
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carrinho;
