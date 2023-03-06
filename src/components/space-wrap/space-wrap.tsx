import React from 'react';
import { Space } from 'antd';

const SpaceWrap = ({ children }: React.PropsWithChildren) => {
  return (
    <Space style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
      {children}
    </Space>
  );
};

export default SpaceWrap;
