import { Layout } from 'antd';
import { Message } from '../components';
import './App.scss';
import Content from './content';
import Header from './header';
import Footer from './footer';

const App = () => {
  return (
    <>
      <Message />
      <Layout>
        <Header />
        <Content />
        <Footer />
      </Layout>
    </>
  );
};

export default App;
