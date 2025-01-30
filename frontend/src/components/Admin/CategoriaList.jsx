import { useState, useEffect } from "react";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CategoriaList = () => {
  const [categorias, setCategorias] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const buscarCategorias = async () => {
      try {
        const resposta = await axios.get(
          "http://localhost:5000/api/categorias"
        );
        setCategorias(resposta.data);
        setCarregando(false);
      } catch (erro) {
        setErro("Erro ao carregar categorias");
        setCarregando(false);
        toast.error("Erro ao carregar categorias");
      }
    };

    buscarCategorias();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta categoria?")) {
      try {
        await axios.delete(`http://localhost:5000/api/categorias/${id}`);
        setCategorias(categorias.filter((categoria) => categoria._id !== id));
        toast.success("Categoria excluída com sucesso");
      } catch (erro) {
        console.error("Erro ao excluir categoria", erro);
        toast.error("Erro ao excluir categoria");
      }
    }
  };

  if (carregando) return <p>Carregando...</p>;
  if (erro) return <p>{erro}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Categorias</h2>
        <button
          onClick={() => navigate("/admin/categorias/adicionar")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Adicionar Categoria
        </button>
      </div>
      {categorias.map((categoria) => (
        <div
          key={categoria._id}
          className="flex justify-between items-center p-4 border-b border-gray-200 hover:bg-gray-50"
        >
          <span className="text-gray-700">{categoria.nome}</span>
          <div className="flex space-x-2">
            <Link
              to={`/admin/categorias/editar/${categoria._id}`}
              className="text-blue-500 hover:text-blue-700"
            >
              <Pencil size={16} />
            </Link>
            <button
              onClick={() => handleDelete(categoria._id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoriaList;
