import React from 'react';
import { observer } from 'mobx-react-lite';
import { Card } from 'antd';
import { Chart } from '../../components';
import { chartStore } from '../../store';

const ChartCard = observer(() => {
  return chartStore.data.length > 0 ? (
    <Card title='Chart'>
      <Chart />
    </Card>
  ) : null;
});

export default ChartCard;
