"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ConfiguracoesForm = () => {
  const [horarios, setHorarios] = useState({
    abertura: "08:00",
    fechamento: "22:00",
  });
  const [erro, setErro] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setHorarios({ ...horarios, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        horarioAbertura: horarios.abertura,
        horarioFechamento: horarios.fechamento,
      };

      await axios.post("http://localhost:5000/api/configuracao", payload);

      console.log("Configurações Salvas:", payload);
      navigate("/admin");
    } catch (error) {
      setErro("Erro ao salvar as configurações. Por favor, tente novamente.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="abertura"
          className="block text-sm font-medium text-gray-700"
        >
          Horário de Abertura
        </label>
        <input
          type="time"
          id="abertura"
          name="abertura"
          value={horarios.abertura}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>

      <div>
        <label
          htmlFor="fechamento"
          className="block text-sm font-medium text-gray-700"
        >
          Horário de Fechamento
        </label>
        <input
          type="time"
          id="fechamento"
          name="fechamento"
          value={horarios.fechamento}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>

      {erro && <div className="text-red-500">{erro}</div>}

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Salvar Configurações
        </button>
      </div>
    </form>
  );
};

export default ConfiguracoesForm;
