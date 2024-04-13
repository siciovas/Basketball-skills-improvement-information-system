import { ChartData } from "chart.js";
import Chart from "./Chart";

interface Props {
  data: ChartData;
  title: string;
}

const LineChart = ({ data, title }: Props) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 25,
        },
      },
    },
    scales: {
      y: {
        min: 0,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return <Chart type="line" data={data} options={options} />;
};

export default LineChart;
