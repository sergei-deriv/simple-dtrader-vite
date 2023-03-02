import React from 'react';
import { Layout } from 'antd';
import Login from '../login';
import { userStore } from '../../store';
import { observer } from 'mobx-react-lite';
import Logout from '../logout';

const headerStyle: React.CSSProperties = {
  // textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: '#7dbcea',
  fontSize: '18px',
};

const Header = observer(() => {
  const loginid = userStore.authorize?.loginid;

  return (
    <Layout.Header style={headerStyle}>
      <div className='header_between'>
        <span>Simple DTrader</span>
        {loginid ? <Logout /> : <Login />}
      </div>
    </Layout.Header>
  );
});

export default Header;
