import { observer } from 'mobx-react-lite';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { TChartData } from '../../types';
import chartStore from '../../store/chart-store';

type TChartProps = {
  data?: Array<TChartData>;
};

const Chart = observer(({ data = chartStore.data }: TChartProps) => {
  // console.log('data = ', data);

  return (
    <ResponsiveContainer width={'100%'} minHeight={500} maxHeight={500}>
      <LineChart
        width={500}
        height={700}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid />
        {/* <CartesianGrid strokeDasharray='3 3' /> */}
        <XAxis dataKey='time' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type='monotone'
          dataKey='price'
          stroke='#8884d8'
          activeDot={{ r: 8 }}
        />
        {/* <Line type='monotone' dataKey='uv' stroke='#82ca9d' /> */}
      </LineChart>
    </ResponsiveContainer>
  );
});

export default Chart;
