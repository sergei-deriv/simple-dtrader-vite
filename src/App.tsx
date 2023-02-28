import Chart from './components/chart/chart';
import SymbolsList from './components/symbols-list/symbols-list';
import { Card, Layout, Space } from 'antd';
import counter from './store/counter';
import { observer } from 'mobx-react-lite';

const { Header, Footer, Sider, Content } = Layout;

const App = observer(() => {
  return (
    <div>
      <Layout>
        <Header>Simple DTrader</Header>
        <Content>
          <Space direction='vertical' size='middle' style={{ display: 'flex' }}>
            <Card title='Set symbol' size='small'>
              <SymbolsList />
            </Card>
            <Card title='Counter' size='small'>
              <Space>
                counter: {counter.count}
                <button onClick={counter.increment}>+</button>
                <button onClick={counter.decrement}>-</button>
                <button onClick={counter.reset}>reset</button>
              </Space>
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
});

export default App;
