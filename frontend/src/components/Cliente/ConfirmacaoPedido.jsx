import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const ConfirmacaoPedido = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-2xl text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-4">Pedido Confirmado!</h1>
        <p className="mb-6">Seu pedido foi recebido e está sendo processado.</p>
        <button onClick={() => navigate("/")} className="btn btn-primary">
          Voltar ao Cardápio
        </button>
      </div>
    </div>
  );
};

export default ConfirmacaoPedido;
