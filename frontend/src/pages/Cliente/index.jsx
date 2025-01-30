import { Routes, Route } from "react-router-dom";
import ClienteLayout from "../../components/Cliente/Layout/ClienteLayout";
import CardapioPrincipal from "../../components/Cliente/CardapioPrincipal";
import Checkout from "../../components/Cliente/Checkout";
import ConfirmacaoPedido from "../../components/Cliente/ConfirmacaoPedido";

function ClienteRoutes() {
  return (
    <ClienteLayout>
      <Routes>
        <Route path="/" element={<CardapioPrincipal />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/confirmacao" element={<ConfirmacaoPedido />} />
      </Routes>
    </ClienteLayout>
  );
}

export default ClienteRoutes;
