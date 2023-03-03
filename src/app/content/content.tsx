import React from 'react';
import { Card, Space, Layout } from 'antd';
import { SymbolsList } from '../../components';
import ChartCard from './chart-card';

const contentStyle: React.CSSProperties = {
  // textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  minHeight: 'calc(100vh - 129px)',
};

const Content = () => {
  // const loginid = userStore.authorize?.loginid;

  return (
    <Layout.Content style={contentStyle}>
      <Space direction='vertical' size='large' style={{ display: 'flex' }}>
        <Card className='center' title='Set symbol' size='small'>
          <SymbolsList />
        </Card>
        <ChartCard />
      </Space>
    </Layout.Content>
  );
};

export default Content;
