import { useState, useEffect } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Badge } from "../ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const OrdersList = ({ limit }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulação de dados de pedidos
    const mockOrders = [
      {
        id: "1",
        customer: "João Silva",
        total: 89.9,
        status: "pending",
        paymentMethod: "pix",
        createdAt: new Date(),
        items: [
          { name: "Pizza Margherita", quantity: 1 },
          { name: "Refrigerante 2L", quantity: 1 },
        ],
      },
      {
        id: "2",
        customer: "Maria Santos",
        total: 124.5,
        status: "preparing",
        paymentMethod: "credit_card",
        createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutos atrás
        items: [
          { name: "Pizza Calabresa", quantity: 1 },
          { name: "Pizza Frango", quantity: 1 },
        ],
      },
      {
        id: "3",
        customer: "Pedro Oliveira",
        total: 45.9,
        status: "delivered",
        paymentMethod: "debit_card",
        createdAt: new Date(Date.now() - 1000 * 60 * 60), // 1 hora atrás
        items: [{ name: "Pizza Mussarela", quantity: 1 }],
      },
    ];

    setOrders(mockOrders.slice(0, limit));
    setLoading(false);
  }, [limit]);

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { label: "Pendente", className: "bg-yellow-500" },
      preparing: { label: "Preparando", className: "bg-blue-500" },
      delivering: { label: "Entregando", className: "bg-purple-500" },
      delivered: { label: "Entregue", className: "bg-green-500" },
      cancelled: { label: "Cancelado", className: "bg-red-500" },
    };

    const config = statusConfig[status] || statusConfig.pending;

    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getPaymentMethodLabel = (method) => {
    const methods = {
      pix: "PIX",
      credit_card: "Cartão de Crédito",
      debit_card: "Cartão de Débito",
      cash: "Dinheiro",
    };
    return methods[method] || method;
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Pedido</TableHead>
          <TableHead>Cliente</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Pagamento</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Data</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>#{order.id}</TableCell>
            <TableCell>{order.customer}</TableCell>
            <TableCell>{getStatusBadge(order.status)}</TableCell>
            <TableCell>{getPaymentMethodLabel(order.paymentMethod)}</TableCell>
            <TableCell>
              {order.total.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </TableCell>
            <TableCell>
              {format(order.createdAt, "dd/MM/yyyy HH:mm", { locale: ptBR })}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default OrdersList;
