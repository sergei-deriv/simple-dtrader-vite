import { Layout } from 'antd';
import { Message } from '../components';
import './App.scss';
import Content from './content';
import Header from './header';
import Footer from './footer';
import { useEffect } from 'react';
import { checkTokenAndAuthorizeHandler } from '../utils';

const App = () => {
  // authorize if token exists in sessionStorage
  useEffect(() => {
    checkTokenAndAuthorizeHandler();
  }, []);

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
