import React from 'react';
import { Layout } from 'antd';

const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#7dbcea',
};

const Footer = () => {
  return (
    <Layout.Footer style={footerStyle}>
      Made in Deriv Minsk office in 2023
    </Layout.Footer>
  );
};

export default Footer;
