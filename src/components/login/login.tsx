import React, { useEffect } from 'react';
import { Button, Modal, Input, Typography } from 'antd';
import { authorizeHandler } from '../../utils';

const Login = () => {
  const [error, setError] = React.useState('');
  const [token, setToken] = React.useState('6ZFxhM1OuZa2ss8');
  const [open, setOpen] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);

  const resetError = () => {
    error && setError('');
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    resetError();

    // wait result
    const result = await authorizeHandler(token);

    if (result) {
      setConfirmLoading(false);
      setOpen(false);
    } else {
      setConfirmLoading(false);
      setError('something wrong, please try again');
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const onChangeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToken(e.currentTarget.value);
  };

  useEffect(() => {
    resetError();
  }, [token, open]);

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
        <Typography.Paragraph className='center' strong mark>
          Type your API token
        </Typography.Paragraph>
        <Input value={token} onChange={onChangeInputHandler} />
        {error && (
          <Typography.Paragraph className='center' type='danger'>
            {error}
          </Typography.Paragraph>
        )}
      </Modal>
    </>
  );
};

export default Login;
