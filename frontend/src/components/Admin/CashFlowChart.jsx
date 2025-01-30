import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const CashFlowChart = ({ data }) => {
  const options = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      title: {
        display: true,
        text: "Análise de Fluxo de Caixa",
        font: {
          size: 16,
          weight: "bold",
        },
      },
      legend: {
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: R$ ${context.parsed.y.toFixed(2)}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `R$ ${value.toFixed(2)}`,
        },
      },
    },
  }

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: "Total",
        data: data.total,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        fill: true,
        tension: 0.4,
      },
      {
        label: "PIX",
        data: data.pix,
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderWidth: 2,
        tension: 0.4,
      },
      {
        label: "Cartão de Crédito",
        data: data.creditCard,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderWidth: 2,
        tension: 0.4,
      },
      {
        label: "Cartão de Débito",
        data: data.debitCard,
        borderColor: "rgb(153, 102, 255)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderWidth: 2,
        tension: 0.4,
      },
      {
        label: "Dinheiro",
        data: data.cash,
        borderColor: "rgb(255, 159, 64)",
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  }

  return <Line options={options} data={chartData} />
}

export default CashFlowChart

