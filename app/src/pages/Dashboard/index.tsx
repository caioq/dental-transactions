import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { ChartLine } from "phosphor-react";
import {
  AverageContent,
  ChartContent,
  ChartTitle,
  DashboardContainer,
  DashboardContent,
  DashboardTitle,
} from "./styles";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      beginAtZero: true,
    },
  },
};

const labels = ["January", "February", "March"];

const data = {
  labels,
  datasets: [
    {
      type: "line" as const,
      label: "Saldo",
      backgroundColor: "blue",
      data: [-2000, 2000, 3000],
      borderColor: "blue",
      fill: false,
    },
    {
      type: "bar" as const,
      label: "Entradas",
      data: [2000, 7000, 11000],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      type: "bar" as const,
      label: "Saídas",
      data: [-4000, -5000, -8000],
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export function Dashboard() {
  return (
    <DashboardContainer>
      <DashboardTitle>
        <ChartLine size={28} />
        <span>Dashboard</span>
      </DashboardTitle>
      <DashboardContent>
        <ChartContent>
          <ChartTitle>Receita Líquida (2024)</ChartTitle>
          <Chart type="bar" data={data} options={options} />
        </ChartContent>
        <AverageContent>
          <span>
            <b>Média de Entradas:</b> R$ 5.000,00
          </span>
          <span>
            <b>Média de Saídas:</b> R$ 5.000,00
          </span>
          <span>
            <b>Média do Saldo:</b> R$ 5.000,00
          </span>
        </AverageContent>
      </DashboardContent>
    </DashboardContainer>
  );
}
