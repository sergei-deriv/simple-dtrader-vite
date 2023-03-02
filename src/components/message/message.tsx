import { message } from 'antd';
import { NoticeType } from 'antd/es/message/interface';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { messageStore } from '../../store';

const Message = observer(() => {
  const [messageApi, contextHolder] = message.useMessage();

  const show = messageStore.showMessage;
  const content = messageStore.contentMessage;
  const type: NoticeType = messageStore.typeMessage;

  useEffect(() => {
    if (show)
      messageApi.open({
        type,
        content,
        duration: 0,
      });
    else {
      messageApi.destroy();
      // reset data for modal
      messageStore.setMessageData(false, 'Action in progress...', 'loading');
    }
  }, [show]);

  return contextHolder;
});

export default Message;
