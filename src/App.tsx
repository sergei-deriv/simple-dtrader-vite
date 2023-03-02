import { Card, Layout, Space, Typography } from 'antd';
import { observer } from 'mobx-react-lite';
import { SymbolsList, Chart, Message, Login, Header } from './components';
import './App.css';

const { Footer, Content } = Layout;

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
    <>
      <Message />
      <Layout>
        <Header />
        <Content style={contentStyle}>
          <Space direction='vertical' size='large' style={{ display: 'flex' }}>
            <Card className='center' title='Set symbol' size='small'>
              <SymbolsList />
            </Card>
            <Card title='Chart'>
              <Chart />
            </Card>
          </Space>
        </Content>
        <Footer style={footerStyle}>Made in Deriv Minsk office in 2023</Footer>
      </Layout>
    </>
  );
});

export default App;
