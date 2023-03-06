import React from 'react';
import { Dropdown, MenuProps } from 'antd';
import { logoutHandler } from '../../utils';
import { DownOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import { userStore } from '../../store';

const Logout = observer(() => {
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a type={'text'} onClick={logoutHandler}>
          Logout
        </a>
      ),
    },
  ];

  return (
    <Dropdown
      menu={{ items }}
      placement='bottomRight'
      arrow={{ pointAtCenter: true }}
    >
      <span style={{ cursor: 'pointer' }}>
        {userStore.authorize.balance} {userStore.authorize.currency}
        <DownOutlined style={{ marginLeft: '5px' }} />
      </span>
    </Dropdown>
  );
});

export default Logout;
