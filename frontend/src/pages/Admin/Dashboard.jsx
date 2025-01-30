import Layout from "../../components/Admin/Layout";
import React, { useState, useEffect } from "react";
import { Card } from "../../components/ui/card";
import CashFlowChart from "../../components/Admin/CashFlowChart";
import PaymentMethodsChart from "../../components/Admin/PaymentMethodsChart";
import OrdersList from "../../components/Admin/OrdersList";

const Dashboard = () => {
  const [cashFlowData, setCashFlowData] = useState({
    labels: [],
    total: [],
    pix: [],
    creditCard: [],
    debitCard: [],
    cash: [],
  });

  const [paymentMethodsData, setPaymentMethodsData] = useState({
    pix: 0,
    creditCard: 0,
    debitCard: 0,
    cash: 0,
  });

  useEffect(() => {
    // Simulação de dados de fluxo de caixa
    const dates = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date.toLocaleDateString("pt-BR");
    });

    setCashFlowData({
      labels: dates,
      total: [1500, 1800, 1200, 2000, 1600, 1900, 2200],
      pix: [600, 800, 500, 900, 700, 800, 1000],
      creditCard: [500, 600, 400, 600, 500, 600, 700],
      debitCard: [300, 300, 200, 400, 300, 400, 400],
      cash: [100, 100, 100, 100, 100, 100, 100],
    });

    setPaymentMethodsData({
      pix: 5300,
      creditCard: 3900,
      debitCard: 2300,
      cash: 700,
    });
  }, []);

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Bem-vindo ao painel administrativo do seu cardápio digital.
          </p>
        </div>

        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4">
            <h3 className="text-sm font-medium text-gray-500">Vendas Hoje</h3>
            <p className="mt-2 text-3xl font-semibold">R$ 2.200,00</p>
            <p className="mt-2 text-sm text-green-600">
              +15% em relação a ontem
            </p>
          </Card>
          <Card className="p-4">
            <h3 className="text-sm font-medium text-gray-500">Pedidos Hoje</h3>
            <p className="mt-2 text-3xl font-semibold">32</p>
            <p className="mt-2 text-sm text-green-600">
              +8% em relação a ontem
            </p>
          </Card>
          <Card className="p-4">
            <h3 className="text-sm font-medium text-gray-500">Ticket Médio</h3>
            <p className="mt-2 text-3xl font-semibold">R$ 68,75</p>
            <p className="mt-2 text-sm text-green-600">
              +5% em relação a ontem
            </p>
          </Card>
          <Card className="p-4">
            <h3 className="text-sm font-medium text-gray-500">
              Produtos Ativos
            </h3>
            <p className="mt-2 text-3xl font-semibold">45</p>
            <p className="mt-2 text-sm text-blue-600">2 novos hoje</p>
          </Card>
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-4">
            <CashFlowChart data={cashFlowData} />
          </Card>
          <Card className="p-4">
            <PaymentMethodsChart data={paymentMethodsData} />
          </Card>
        </div>

        {/* Lista de Pedidos Recentes */}
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-4">Pedidos Recentes</h2>
          <OrdersList limit={5} />
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;
