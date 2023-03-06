import React from 'react';
import { Layout } from 'antd';
import Login from '../../components/login';
import { userStore } from '../../store';
import { observer } from 'mobx-react-lite';
import Logout from '../../components/logout';

const headerStyle: React.CSSProperties = {
  // textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: '#7dbcea',
  fontSize: '16px',
};

const Header = observer(() => {
  const loginid = userStore.authorize?.loginid;

  return (
    <Layout.Header style={headerStyle}>
      <div className='header_between'>
        <div className='logo'>
          <img className='logo__img' src='src/assets/logo.svg' alt='logo' />
          <span>SDTrader</span>
        </div>

        {loginid ? <Logout /> : <Login />}
      </div>
    </Layout.Header>
  );
});

export default Header;
