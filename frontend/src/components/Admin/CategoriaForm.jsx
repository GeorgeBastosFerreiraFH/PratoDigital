import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const CategoriaForm = () => {
  const { id } = useParams(); // Pega o id da categoria da URL
  const [categoria, setCategoria] = useState({
    nome: "",
    descricao: "",
    imagem: "",
    ativa: true,
  });
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchCategoria = async () => {
        try {
          const resposta = await axios.get(
            `http://localhost:5000/api/categorias/${id}`
          );
          setCategoria(resposta.data);
        } catch (erro) {
          setErro("Erro ao carregar categoria.");
        }
      };

      fetchCategoria();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCategoria((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCarregando(true);
    try {
      if (id) {
        await axios.put(
          `http://localhost:5000/api/categorias/${id}`,
          categoria
        );
        toast.success("Categoria atualizada com sucesso");
      } else {
        await axios.post("http://localhost:5000/api/categorias", categoria);
        toast.success("Categoria adicionada com sucesso");
      }
      navigate("/admin/categorias");
    } catch (erro) {
      setErro(
        "Erro ao salvar categoria. Verifique os dados e tente novamente."
      );
      toast.error("Erro ao salvar categoria");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">
          {id ? "Editar Categoria" : "Adicionar Categoria"}
        </h2>
        <button
          onClick={() => navigate("/admin/categorias")}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
        >
          ← Voltar
        </button>
      </div>
      {erro && (
        <p className="mb-4 text-red-600 bg-red-100 p-2 rounded">{erro}</p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="nome"
            className="block text-sm font-medium text-gray-700"
          >
            Nome
          </label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={categoria.nome}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>

        <div>
          <label
            htmlFor="descricao"
            className="block text-sm font-medium text-gray-700"
          >
            Descrição
          </label>
          <textarea
            id="descricao"
            name="descricao"
            value={categoria.descricao}
            onChange={handleChange}
            required
            rows="3"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          ></textarea>
        </div>

        <div>
          <label
            htmlFor="imagem"
            className="block text-sm font-medium text-gray-700"
          >
            URL da Imagem
          </label>
          <input
            type="url"
            id="imagem"
            name="imagem"
            value={categoria.imagem}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="ativa"
            name="ativa"
            checked={categoria.ativa}
            onChange={handleChange}
            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          <label
            htmlFor="ativa"
            className="ml-2 block text-sm font-medium text-gray-900"
          >
            Ativa
          </label>
        </div>

        <div>
          <button
            type="submit"
            disabled={carregando}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {carregando
              ? "Salvando..."
              : id
              ? "Salvar Alterações"
              : "Adicionar Categoria"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoriaForm;
