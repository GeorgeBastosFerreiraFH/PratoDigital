"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SearchBar from "./SearchBar";

const ProdutoList = () => {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [termoBusca, setTermoBusca] = useState("");
  const itensPorPagina = 10;

  const buscarProdutos = useCallback(async () => {
    try {
      setCarregando(true);
      setErro(null);
      const url = termoBusca
        ? `http://localhost:5000/api/produtos/buscar?termo=${termoBusca}&pagina=${pagina}&limite=${itensPorPagina}`
        : `http://localhost:5000/api/produtos?pagina=${pagina}&limite=${itensPorPagina}`;
      const resposta = await axios.get(url);
      setProdutos(resposta.data.produtos || []);
      setTotalPaginas(Math.ceil(resposta.data.total / itensPorPagina) || 1);
    } catch (erro) {
      setErro("Erro ao carregar produtos. Tente novamente mais tarde.");
      toast.error("Erro ao carregar produtos");
    } finally {
      setCarregando(false);
    }
  }, [pagina, termoBusca]);

  useEffect(() => {
    buscarProdutos();
  }, [buscarProdutos]);

  const handleExcluir = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        await axios.delete(`http://localhost:5000/api/produtos/${id}`);
        toast.success("Produto excluído com sucesso");
        buscarProdutos();
      } catch (erro) {
        toast.error("Não foi possível excluir o produto. Tente novamente.");
      }
    }
  };

  const mudarPagina = (novaPagina) => {
    setPagina(novaPagina);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Produtos</h2>
        <Link
          to="/admin/produtos/adicionar"
          className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          + Adicionar Produto
        </Link>
      </div>

      <SearchBar onSearch={setTermoBusca} />

      {produtos.length === 0 ? (
        <p className="text-center text-gray-500 mt-4">
          Nenhum produto encontrado.
        </p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white shadow-md rounded-lg">
              <thead className="bg-gray-100">
                <tr className="text-gray-700 text-left text-sm">
                  <th className="py-3 px-4">Nome</th>
                  <th className="py-3 px-4">Preço</th>
                  <th className="py-3 px-4">Categoria</th>
                  <th className="py-3 px-4 text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {produtos.map((produto) => (
                  <tr
                    key={produto._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-4">{produto.nome}</td>
                    <td className="py-3 px-4">
                      {produto.preco.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>
                    <td className="py-3 px-4">
                      {produto.categoria?.nome || "N/A"}
                    </td>
                    <td className="py-3 px-4 flex justify-center space-x-2">
                      <Link
                        to={`/admin/produtos/editar/${produto._id}`}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <Pencil size={18} />
                      </Link>
                      <button
                        onClick={() => handleExcluir(produto._id)}
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
          <div className="mt-4 flex justify-center">
            <button
              onClick={() => mudarPagina(pagina - 1)}
              disabled={pagina === 1}
              className="mr-2 px-3 py-1 bg-gray-200 rounded-md disabled:opacity-50"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="mx-2">
              Página {pagina} de {totalPaginas}
            </span>
            <button
              onClick={() => mudarPagina(pagina + 1)}
              disabled={pagina === totalPaginas}
              className="ml-2 px-3 py-1 bg-gray-200 rounded-md disabled:opacity-50"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProdutoList;
