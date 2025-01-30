"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";

const PedidoForm = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const [pedido, setPedido] = useState({
    cliente: {
      nome: "",
      email: "",
      telefone: "",
    },
    itens: [],
    total: 0,
    status: "pendente",
    formaPagamento: "",
  });
  const [carregando, setCarregando] = useState(false);

  const buscarPedido = useCallback(async () => {
    if (!id) return;

    try {
      setCarregando(true);
      const resposta = await axios.get(
        `http://localhost:5000/api/pedidos/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPedido(resposta.data);
    } catch (erro) {
      console.error("Erro ao buscar pedido:", erro);
      toast.error("Erro ao carregar os dados do pedido.");
    } finally {
      setCarregando(false);
    }
  }, [id, token]);

  useEffect(() => {
    buscarPedido();
  }, [buscarPedido]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("cliente.")) {
      const campoCliente = name.split(".")[1];
      setPedido((prev) => ({
        ...prev,
        cliente: { ...prev.cliente, [campoCliente]: value },
      }));
    } else {
      setPedido((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCarregando(true);

    const pedidoAtualizado = {
      cliente: pedido.cliente,
      itens: pedido.itens,
      total: pedido.total,
      status: pedido.status,
      formaPagamento: pedido.formaPagamento,
    };

    console.log("Enviando pedido atualizado:", pedidoAtualizado);

    try {
      const response = await axios.put(
        `http://localhost:5000/api/pedidos/${id}`,
        pedidoAtualizado,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Resposta do servidor:", response.data);
      toast.success("Pedido atualizado com sucesso.");
      navigate("/admin/pedidos");
    } catch (erro) {
      console.error(
        "Erro ao atualizar pedido:",
        erro.response ? erro.response.data : erro
      );
      console.error(
        "Status do erro:",
        erro.response ? erro.response.status : "Desconhecido"
      );
      console.error(
        "Headers da resposta:",
        erro.response ? erro.response.headers : "Desconhecido"
      );
      toast.error("Erro ao atualizar o pedido. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  };

  if (carregando) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold mb-4">Editar Pedido</h2>
        <button
          onClick={() => navigate("/admin/pedidos")}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
        >
          ← Voltar
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="cliente.nome"
            className="block text-sm font-medium text-gray-700"
          >
            Nome do Cliente
          </label>
          <input
            type="text"
            id="cliente.nome"
            name="cliente.nome"
            value={pedido.cliente.nome}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="cliente.email"
            className="block text-sm font-medium text-gray-700"
          >
            Email do Cliente
          </label>
          <input
            type="email"
            id="cliente.email"
            name="cliente.email"
            value={pedido.cliente.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="total"
            className="block text-sm font-medium text-gray-700"
          >
            Valor Total
          </label>
          <input
            type="number"
            id="total"
            name="total"
            value={pedido.total}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700"
          >
            Status do Pedido
          </label>
          <select
            id="status"
            name="status"
            value={pedido.status}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="pendente">Pendente</option>
            <option value="em andamento">Em andamento</option>
            <option value="concluído">Concluído</option>
            <option value="cancelado">Cancelado</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="formaPagamento"
            className="block text-sm font-medium text-gray-700"
          >
            Forma de Pagamento
          </label>
          <input
            type="text"
            id="formaPagamento"
            name="formaPagamento"
            value={pedido.formaPagamento}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <button
            type="submit"
            disabled={carregando}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {carregando ? "Salvando..." : "Atualizar Pedido"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PedidoForm;
