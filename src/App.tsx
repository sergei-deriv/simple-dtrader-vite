import * as React from 'react';
import Chart from './components/chart/chart';
import SymbolsList from './components/symbols-list/symbols-list';
import { Card, Layout, Space } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

function App() {
  return (
    <div>
      <Layout>
        <Header>Simple DTrader</Header>
        <Content>
          <Space direction='vertical' size='middle' style={{ display: 'flex' }}>
            <Card title='Set symbol' size='small'>
              <SymbolsList />
            </Card>
            <Card title='Chart'>
              <Chart />
            </Card>
          </Space>
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </div>
  );
}

export default App;
