import { Card, Layout, Space, message, Button } from 'antd';
// import { counter } from './store';
import { observer } from 'mobx-react-lite';
import { SymbolsList, Chart, Message } from './components';

const { Header, Footer, Sider, Content } = Layout;

const App = observer(() => {
  return (
    <div>
      <Message />
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
});

export default App;
