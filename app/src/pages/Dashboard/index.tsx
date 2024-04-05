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
import { useAsync } from "react-use";
import {
  AverageContent,
  ChartContent,
  ChartTitle,
  DashboardContainer,
  DashboardContent,
  DashboardTitle,
} from "./styles";
import { api, currencyFormatter } from "../../utils";
import { useMemo } from "react";
import { indexMonthConverter } from "../../utils/indexMonthConverter";

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

interface AnalyticsRevenueResponse {
  revenuePerMonth: Array<{
    month: number;
    income: number;
    outcome: number;
    balance: number;
  }>;
  average: {
    income: number;
    outcome: number;
    balance: number;
  };
}

export function Dashboard() {
  const { value } = useAsync(async () => {
    const currentYear = new Date().getFullYear().toString();
    return api.get<AnalyticsRevenueResponse>(`analytics/revenue?year=${currentYear}`);
  });

  const chartData = useMemo(() => {
    const labels = value?.data.revenuePerMonth.map((item) => indexMonthConverter(item.month)) || [];
    const balanceData = value?.data.revenuePerMonth.map((item) => item.balance) || [];
    const incomeData = value?.data.revenuePerMonth.map((item) => item.income) || [];
    const outcomeData = value?.data.revenuePerMonth.map((item) => item.outcome * -1) || [];
    return {
      labels,
      datasets: [
        {
          type: "line" as const,
          label: "Saldo",
          backgroundColor: "#87C0D4",
          data: balanceData,
          borderColor: "#87C0D4",
          fill: false,
        },
        {
          type: "bar" as const,
          label: "Entradas",
          data: incomeData,
          backgroundColor: "#C3E9B1",
        },
        {
          type: "bar" as const,
          label: "Saídas",
          data: outcomeData,
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    };
  }, [value]);

  return (
    <DashboardContainer>
      <DashboardTitle>
        <ChartLine size={28} />
        <span>Dashboard</span>
      </DashboardTitle>
      <DashboardContent>
        <ChartContent>
          <ChartTitle>Receita Líquida (2024)</ChartTitle>
          <Chart type="bar" data={chartData} options={options} />
        </ChartContent>
        <AverageContent>
          <span>
            <b>Média de Entradas:</b>{" "}
            {value?.data.average.income && currencyFormatter.format(value?.data.average.income)}
          </span>
          <span>
            <b>Média de Saídas:</b>{" "}
            {value?.data.average.outcome && currencyFormatter.format(value?.data.average.outcome)}
          </span>
          <span>
            <b>Média do Saldo:</b>{" "}
            {value?.data.average.balance && currencyFormatter.format(value?.data.average.balance)}
          </span>
        </AverageContent>
      </DashboardContent>
    </DashboardContainer>
  );
}
