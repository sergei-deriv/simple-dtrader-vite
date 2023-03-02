import { Card, Layout, Space, Typography } from 'antd';
// import { counter } from './store';
import { observer } from 'mobx-react-lite';
import { SymbolsList, Chart, Message } from './components';
import './App.css';

const { Header, Footer, Content } = Layout;
const { Text, Title } = Typography;

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: '#7dbcea',
  fontSize: '24px',
};

const contentStyle: React.CSSProperties = {
  // textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  minHeight: 'calc(100vh - 129px)',
};

const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#7dbcea',
};

const App = observer(() => {
  return (
    <div>
      <Message />
      <Layout>
        <Header style={headerStyle}>Simple DTrader</Header>
        <Content style={contentStyle}>
          <Space direction='vertical' size='middle' style={{ display: 'flex' }}>
            <Card title='Set symbol' size='small'>
              <SymbolsList />
            </Card>
            <Card title='Chart'>
              <Chart />
            </Card>
          </Space>
        </Content>
        <Footer style={footerStyle}>Made in Deriv Minsk office in 2023</Footer>
      </Layout>
    </div>
  );
});

export default App;
