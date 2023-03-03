import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { TChartData } from '../../types';

type TChartProps = {
  data: Array<TChartData>;
};

const Chart = ({ data }: TChartProps) => {
  let min = Infinity,
    max = -Infinity;

  data.forEach((e) => {
    if (min > e.price) {
      min = e.price;
    }
    if (max < e.price) {
      max = e.price;
    }
  });

  const gap = ((max - min) / 100) * 5; // 5% gap

  return data.length > 0 ? (
    <>
      <ResponsiveContainer width={'100%'} minHeight={500} maxHeight={800}>
        <LineChart
          width={500}
          height={800}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='time' />
          <YAxis domain={[min - gap, max + gap]} />
          <Tooltip />
          <Line
            type='monotone'
            dataKey='price'
            stroke='#8884d8'
            dot={false}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  ) : null;
};

export default Chart;
