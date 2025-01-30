// src/components/Cliente/CardapioPrincipal.jsx
import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import axios from "axios";
import ListaProdutos from "./ListaProdutos";

const CardapioPrincipal = () => {
  const [categorias, setCategorias] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);

  useEffect(() => {
    const buscarCategorias = async () => {
      try {
        setCarregando(true);
        const resposta = await axios.get(
          "http://localhost:5000/api/categorias"
        );
        setCategorias(resposta.data);
        setErro(null);
      } catch (erro) {
        console.error("Erro ao carregar dados:", erro);
        setErro("Erro ao carregar dados. Por favor, tente novamente.");
      } finally {
        setCarregando(false);
      }
    };

    buscarCategorias();
  }, []);

  if (carregando) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="loader">Carregando...</div>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="flex justify-center items-center h-full text-error">
        {erro}
      </div>
    );
  }

  return (
    <div className="produto-list">
      {categoriaSelecionada ? (
        <>
          <div className="flex justify-between mb-4">
            <h2 className="text-2xl font-bold mb-4">
              {categoriaSelecionada.nome}
            </h2>
            <button
              onClick={() => setCategoriaSelecionada(null)}
              className="btn btn-ghost"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para Categorias
            </button>
          </div>

          <ListaProdutos categoriaId={categoriaSelecionada._id} />
        </>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {categorias.map((categoria) => (
            <div
              key={categoria._id}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer group rounded-2xl" // Adicione a classe rounded-2xl aqui
              onClick={() => setCategoriaSelecionada(categoria)}
            >
              <figure className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                {" "}
                {/* Adicione rounded-2xl aqui também */}
                <img
                  src={categoria.imagem || "/placeholder.svg"}
                  alt={categoria.nome}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-2xl">
                  {" "}
                  {/* Adicione rounded-2xl */}
                  <h3 className="text-white text-xl font-bold">
                    {categoria.nome}
                  </h3>
                </div>
              </figure>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CardapioPrincipal;
