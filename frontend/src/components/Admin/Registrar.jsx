import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const Registrar = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [role, setRole] = useState("gerente"); // Default role
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const resposta = await axios.post("http://localhost:5000/api/registrar", {
        nome,
        email,
        senha,
        role,
      });

      const { usuario, token } = resposta.data;

      // Armazenar o token no localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("usuario", JSON.stringify(usuario));

      // Definindo o token no axios para futuras requisições
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      toast.success("Usuário registrado com sucesso!");
      // Redirecionar ou fazer algo após o registro bem-sucedido
    } catch (erro) {
      toast.error(erro.response?.data?.erro || "Erro ao registrar usuário");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nome</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Senha</label>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
      </div>
      <div>
        <label>Role</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="gerente">Gerente</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "Carregando..." : "Registrar"}
      </button>
    </form>
  );
};

export default Registrar;
