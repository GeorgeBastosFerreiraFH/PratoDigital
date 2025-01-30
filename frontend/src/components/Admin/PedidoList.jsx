"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "react-toastify";
import SearchBar from "./SearchBar";
import { useAuth } from "../../contexts/AuthContext";

const PedidoList = () => {
  const { token } = useAuth();
  const [pedidos, setPedidos] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [termoBusca, setTermoBusca] = useState("");
  const itensPorPagina = 10;

  const buscarPedidos = useCallback(async () => {
    const jwtSecret = localStorage.getItem("jwtSecret") || token;
    if (!jwtSecret) return;

    setCarregando(true);
    setErro(null);

    try {
      const url = termoBusca
        ? `http://localhost:5000/api/pedidos/buscar?termo=${termoBusca}&pagina=${pagina}&limite=${itensPorPagina}`
        : `http://localhost:5000/api/pedidos?pagina=${pagina}&limite=${itensPorPagina}`;
      const resposta = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${jwtSecret}`,
        },
      });

      setPedidos(resposta.data || []);
      setTotalPaginas(
        Math.ceil((resposta.data?.length || 0) / itensPorPagina) || 1
      );
    } catch (erro) {
      console.error("Erro ao buscar pedidos:", erro);
      setErro(
        "Não foi possível carregar os pedidos. Tente novamente mais tarde."
      );
      toast.error("Erro ao carregar pedidos");
    } finally {
      setCarregando(false);
    }
  }, [pagina, termoBusca, token]);

  useEffect(() => {
    buscarPedidos();
  }, [buscarPedidos]);

  const handleExcluir = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este pedido?")) {
      try {
        await axios.delete(`http://localhost:5000/api/pedidos/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Pedido excluído com sucesso");
        buscarPedidos();
      } catch (erro) {
        console.error("Erro ao excluir pedido:", erro);
        toast.error("Não foi possível excluir o pedido. Tente novamente.");
      }
    }
  };

  const mudarPagina = (novaPagina) => {
    setPagina(novaPagina);
  };

  const handleSearch = (termo) => {
    setTermoBusca(termo);
    setPagina(1);
  };

  if (carregando) {
    return (
      <div className="flex justify-center items-center h-64 text-lg font-semibold">
        Carregando...
      </div>
    );
  }

  if (erro) {
    return <div className="text-red-500 text-center font-medium">{erro}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Pedidos</h2>
      </div>

      <SearchBar onSearch={handleSearch} />

      {pedidos.length === 0 ? (
        <p className="text-center text-gray-500 mt-4">
          Nenhum pedido encontrado.
        </p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white shadow-md rounded-lg">
              <thead className="bg-gray-100">
                <tr className="text-gray-700 text-left text-sm">
                  <th className="py-3 px-4">Nome Cliente</th>
                  <th className="py-3 px-4">Valor Total</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Forma de Pagamento</th>
                  <th className="py-3 px-4 text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {pedidos.map((pedido) => (
                  <tr
                    key={pedido._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-4">{pedido.cliente.nome}</td>
                    <td className="py-3 px-4">
                      {pedido.total.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>
                    <td className="py-3 px-4">{pedido.status}</td>
                    <td className="py-3 px-4">{pedido.formaPagamento}</td>
                    <td className="py-3 px-4 flex justify-center space-x-2">
                      <Link
                        to={`/admin/pedidos/${pedido._id}`}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <Pencil size={18} />
                      </Link>
                      <button
                        onClick={() => handleExcluir(pedido._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex justify-center space-x-2">
            <button
              onClick={() => mudarPagina(pagina - 1)}
              disabled={pagina === 1}
              className="flex items-center justify-center px-3 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition disabled:opacity-50"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="text-lg font-semibold">
              Página {pagina} de {totalPaginas}
            </span>
            <button
              onClick={() => mudarPagina(pagina + 1)}
              disabled={pagina === totalPaginas}
              className="flex items-center justify-center px-3 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition disabled:opacity-50"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PedidoList;
