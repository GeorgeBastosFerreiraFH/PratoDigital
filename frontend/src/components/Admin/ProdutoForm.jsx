"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const ProdutoForm = ({ produtoId }) => {
  const [produto, setProduto] = useState({
    nome: "",
    descricao: "",
    preco: "",
    categoria: "",
    imagem: "",
    disponivel: true,
  })
  const [categorias, setCategorias] = useState([])
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const buscarCategorias = async () => {
      try {
        const resposta = await axios.get("http://localhost:5000/api/categorias")
        setCategorias(resposta.data)
      } catch (erro) {
        console.error("Erro ao buscar categorias:", erro)
        setErro("Não foi possível carregar as categorias. Por favor, tente novamente mais tarde.")
        toast.error("Erro ao carregar categorias")
      }
    }

    buscarCategorias()

    if (produtoId) {
      const buscarProduto = async () => {
        try {
          const resposta = await axios.get(`http://localhost:5000/api/produtos/${produtoId}`)
          setProduto(resposta.data)
        } catch (erro) {
          console.error("Erro ao buscar produto:", erro)
          setErro("Não foi possível carregar o produto. Por favor, tente novamente mais tarde.")
          toast.error("Erro ao carregar produto")
        }
      }

      buscarProduto()
    }
  }, [produtoId])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setProduto((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const validarFormulario = () => {
    if (!produto.nome.trim()) {
      toast.error("O nome do produto é obrigatório")
      return false
    }
    if (!produto.descricao.trim()) {
      toast.error("A descrição do produto é obrigatória")
      return false
    }
    if (!produto.preco || produto.preco <= 0) {
      toast.error("O preço do produto deve ser maior que zero")
      return false
    }
    if (!produto.categoria) {
      toast.error("Selecione uma categoria para o produto")
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validarFormulario()) return
  
    setCarregando(true)
    setErro(null)
  
    try {
      let resposta
      if (produtoId) {
        resposta = await axios.put(`http://localhost:5000/api/produtos/${produtoId}`, produto)
        toast.success("Produto atualizado com sucesso")
      } else {
        resposta = await axios.post("http://localhost:5000/api/produtos", produto)
        toast.success("Produto adicionado com sucesso")
      }
  
      // Verificar resposta do servidor para mensagens de erro específicas
      if (resposta.data.erro) {
        throw new Error(resposta.data.erro)
      }
  
      navigate("/admin/produtos")
    } catch (erro) {
      console.error("Erro ao salvar produto:", erro)
      setErro(erro.response ? erro.response.data.erro : "Não foi possível salvar o produto. Por favor, tente novamente.")
      toast.error(erro.response ? erro.response.data.erro : "Erro desconhecido")
    } finally {
      setCarregando(false)
    }
  }  

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">
          {produtoId ? "Editar Produto" : "Adicionar Produto"}
        </h2>
        <button
          onClick={() => navigate("/admin/produtos")}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
        >
          ← Voltar
        </button>
      </div>
      {erro && <p className="mb-4 text-red-600 bg-red-100 p-2 rounded">{erro}</p>}
    <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
            Nome
          </label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={produto.nome}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>

        <div>
          <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">
            Descrição
          </label>
          <textarea
            id="descricao"
            name="descricao"
            value={produto.descricao}
            onChange={handleChange}
            required
            rows="3"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          ></textarea>
        </div>

        <div>
          <label htmlFor="preco" className="block text-sm font-medium text-gray-700">
            Preço
          </label>
          <input
            type="number"
            id="preco"
            name="preco"
            value={produto.preco}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>

        <div>
          <label htmlFor="categoria" className="block text-sm font-medium text-gray-700">
            Categoria
          </label>
          <select
            id="categoria"
            name="categoria"
            value={produto.categoria}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Selecione uma categoria</option>
            {categorias.map((categoria) => (
              <option key={categoria._id} value={categoria._id}>
                {categoria.nome}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="imagem" className="block text-sm font-medium text-gray-700">
            URL da Imagem
          </label>
          <input
            type="url"
            id="imagem"
            name="imagem"
            value={produto.imagem}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="disponivel"
            name="disponivel"
            checked={produto.disponivel}
            onChange={handleChange}
            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          <label htmlFor="disponivel" className="ml-2 block text-sm text-gray-900">
            Disponível
          </label>
        </div>

        <div>
          <button
            type="submit"
            disabled={carregando}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {carregando ? "Salvando..." : produtoId ? "Atualizar" : "Adicionar"} Produto
          </button>
        </div>
    </form>
    </div>
  )
}

export default ProdutoForm

