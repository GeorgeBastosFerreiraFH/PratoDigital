"use client";

import { useState, useEffect } from "react";
import { Plus, Minus } from "lucide-react";
import axios from "axios";
import { useCarrinho } from "../../contexts/CarrinhoContext";
import { toast } from "react-toastify";

const ListaProdutos = ({ categoriaId }) => {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const { adicionarItem, removerItem, getQuantidadeItem } = useCarrinho();

  useEffect(() => {
    const buscarProdutos = async () => {
      try {
        setCarregando(true);
        console.log("Buscando produtos para a categoria:", categoriaId);
        const resposta = await axios.get(`http://localhost:5000/api/produtos`, {
          params: {
            categoria: categoriaId,
            limite: 1000,
          },
        });
        console.log("Resposta da API:", resposta.data);
        setProdutos(resposta.data.produtos || []);
      } catch (erro) {
        console.error("Erro ao buscar produtos:", erro);
        setErro("Erro ao carregar produtos. Por favor, tente novamente.");
        toast.error("Erro ao carregar produtos");
      } finally {
        setCarregando(false);
      }
    };

    buscarProdutos();
  }, [categoriaId]);

  const handleAdicionar = (produto) => {
    adicionarItem({
      id: produto._id,
      nome: produto.nome,
      preco: produto.preco,
      imagem: produto.imagem,
      observacoes: "",
    });
    toast.success("Item adicionado ao carrinho");
  };

  const handleRemover = (produtoId) => {
    removerItem(produtoId);
  };

  if (carregando) {
    return (
      <div className="flex justify-center items-center p-8">
        Carregando produtos...
      </div>
    );
  }

  if (erro) {
    return <div className="text-center p-8 text-red-500">{erro}</div>;
  }

  if (produtos.length === 0) {
    return (
      <div className="text-center p-8">
        <p>Nenhum produto encontrado nesta categoria.</p>
        <p className="mt-2 text-sm text-gray-500"></p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {produtos.map((produto) => (
          <div
            key={produto._id}
            className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <figure className="relative h-48 w-full">
              <img
                src={produto.imagem || "/placeholder.svg"}
                alt={produto.nome}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white">
                {produto.nome}
              </h3>
            </figure>
            <div className="card-body p-4">
              <p className="text-gray-600 text-sm">{produto.descricao}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-xl font-bold text-primary">
                  {produto.preco.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
                <div className="flex items-center gap-2 bg-base-200 rounded-full p-1">
                  <button
                    className="btn btn-circle btn-sm btn-ghost"
                    onClick={() => handleRemover(produto._id)}
                    disabled={getQuantidadeItem(produto._id) === 0}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-medium">
                    {getQuantidadeItem(produto._id)}
                  </span>
                  <button
                    className="btn btn-circle btn-sm btn-primary"
                    onClick={() => handleAdicionar(produto)}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaProdutos;
