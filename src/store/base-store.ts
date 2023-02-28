import { NoticeType } from 'antd/es/message/interface';
import { makeAutoObservable } from 'mobx';

class BaseStore {
  showMessage = false;
  contentMessage = 'Action in progress...';
  typeMessage: NoticeType = 'loading';

  constructor() {
    makeAutoObservable(this);
  }

  setShowMessage = (showMessage: boolean) => {
    this.showMessage = showMessage;
  };

  setMessageData = (
    show: boolean = false,
    content: string = 'Action in progress...',
    type: NoticeType = 'loading'
  ) => {
    this.showMessage = show;
    this.contentMessage = content;
    this.typeMessage = type;
  };
}

export default new BaseStore();
