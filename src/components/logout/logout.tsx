import React from 'react';
import { Button } from 'antd';
import { logoutHandler } from '../../utils';

const Logout = () => {
  return (
    <>
      <Button type='primary' onClick={logoutHandler}>
        Logout
      </Button>
    </>
  );
};

export default Logout;
