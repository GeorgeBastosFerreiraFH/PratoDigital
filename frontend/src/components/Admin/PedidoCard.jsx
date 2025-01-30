import React, { useState } from "react";
import { Edit2, X } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";

const statusColors = {
  pendente: "bg-yellow-500",
  "em andamento": "bg-blue-500",
  concluído: "bg-green-500",
  cancelado: "bg-red-500",
  "saiu para entrega": "bg-purple-500",
};

const PedidoCard = ({ pedido, onUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState(pedido.status);
  const { token } = useAuth();

  const handleStatusChange = async (newStatus) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/pedidos/${pedido._id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setStatus(newStatus);
      onUpdate();
      toast.success("Status do pedido atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      toast.error("Erro ao atualizar status do pedido");
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">{pedido.cliente.nome}</h3>
          <span
            className={`px-2 py-1 rounded text-white text-sm ${statusColors[status]}`}
          >
            {status}
          </span>
        </div>
        <p className="text-gray-600 mb-2">
          Total:{" "}
          {pedido.total.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>
        <p className="text-gray-600 mb-2">
          Forma de Pagamento: {pedido.formaPagamento}
        </p>
        {pedido.formaPagamento === "cartao" && (
          <p className="text-red-500 font-semibold">Levar maquineta!</p>
        )}
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          <Edit2 size={18} className="inline mr-2" />
          Editar
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Detalhes do Pedido</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Itens do Pedido:</h3>
              <ul className="list-disc pl-5">
                {pedido.itens.map((item, index) => (
                  <li key={index}>
                    {item.nome} - {item.quantidade}x -
                    {item.preco.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                    {item.observacoes && (
                      <span className="text-gray-500 ml-2">
                        ({item.observacoes})
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Endereço de Entrega:</h3>
              <p>
                {pedido.cliente.endereco.rua}, {pedido.cliente.endereco.numero}
              </p>
              <p>
                {pedido.cliente.endereco.bairro},{" "}
                {pedido.cliente.endereco.cidade}
              </p>
              {pedido.cliente.endereco.complemento && (
                <p>Complemento: {pedido.cliente.endereco.complemento}</p>
              )}
            </div>
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Atualizar Status:</h3>
              <div className="flex space-x-2">
                {[
                  "pendente",
                  "em andamento",
                  "concluído",
                  "saiu para entrega",
                  "cancelado",
                ].map((newStatus) => (
                  <button
                    key={newStatus}
                    onClick={() => handleStatusChange(newStatus)}
                    className={`px-3 py-1 rounded text-white ${
                      statusColors[newStatus]
                    } ${
                      status === newStatus
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:opacity-80"
                    }`}
                    disabled={status === newStatus}
                  >
                    {newStatus}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PedidoCard;
