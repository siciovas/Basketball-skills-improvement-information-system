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
  ChartData,
  Title,
} from 'chart.js'
import { Chart as ChartComponent, ChartProps } from 'react-chartjs-2'

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
  Title
)

interface Props extends ChartProps {
  data: ChartData
}

const Chart = ({ data, ...rest }: Props) => {
  return <ChartComponent width="100%" data={data} {...rest} />
}

export default Chart
