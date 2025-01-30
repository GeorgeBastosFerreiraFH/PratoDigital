import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"

ChartJS.register(ArcElement, Tooltip, Legend)

const PaymentMethodsChart = ({ data }) => {
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Distribuição de Métodos de Pagamento",
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
          label: (context) => {
            const label = context.label || ""
            const value = context.parsed || 0
            const percentage = ((value / context.dataset.data.reduce((a, b) => a + b)) * 100).toFixed(1)
            return `${label}: ${percentage}%`
          },
        },
      },
    },
  }

  const chartData = {
    labels: ["PIX", "Cartão de Crédito", "Cartão de Débito", "Dinheiro"],
    datasets: [
      {
        data: [data.pix, data.creditCard, data.debitCard, data.cash],
        backgroundColor: [
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 99, 132, 0.8)",
          "rgba(153, 102, 255, 0.8)",
          "rgba(255, 159, 64, 0.8)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  }

  return <Doughnut options={options} data={chartData} />
}

export default PaymentMethodsChart

