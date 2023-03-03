import React from 'react';
import { observer } from 'mobx-react-lite';
import { Card, Space, Layout } from 'antd';
import { Chart, SymbolsList } from '../../components';

const contentStyle: React.CSSProperties = {
  // textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  minHeight: 'calc(100vh - 129px)',
};

const Content = observer(() => {
  // const loginid = userStore.authorize?.loginid;

  return (
    <Layout.Content style={contentStyle}>
      <Space direction='vertical' size='large' style={{ display: 'flex' }}>
        <Card className='center' title='Set symbol' size='small'>
          <SymbolsList />
        </Card>
        <Card title='Chart'>
          <Chart />
        </Card>
      </Space>
    </Layout.Content>
  );
});

export default Content;
