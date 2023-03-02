import React from 'react';
import { Button, Modal, Input, Typography } from 'antd';

const Login = () => {
  const [token, setToken] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const onChangeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToken(e.currentTarget.value);
  };

  return (
    <>
      <Button type='primary' onClick={showModal}>
        Login
      </Button>
      <Modal
        title='Login by token'
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okButtonProps={{ disabled: !token }}
      >
        <Typography.Paragraph className='center' strong>
          Type your API token
        </Typography.Paragraph>
        <Input value={token} onChange={onChangeInputHandler} />
      </Modal>
    </>
  );
};

export default Login;
