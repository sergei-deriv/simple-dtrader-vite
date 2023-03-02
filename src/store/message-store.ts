import { NoticeType } from 'antd/es/message/interface';
import { makeAutoObservable } from 'mobx';

const showMessageDefault = false;
const contentMessageDefault = 'Loading...';
const typeMessageDefault: NoticeType = 'loading';

class MessageStore {
  showMessage = showMessageDefault;
  contentMessage = contentMessageDefault;
  typeMessage: NoticeType = typeMessageDefault;

  constructor() {
    makeAutoObservable(this);
  }

  setShowMessage = (showMessage: boolean) => {
    this.showMessage = showMessage;
  };

  setMessageData = (
    show: boolean = showMessageDefault,
    content: string = contentMessageDefault,
    type: NoticeType = typeMessageDefault
  ) => {
    this.showMessage = show;
    this.contentMessage = content;
    this.typeMessage = type;
  };

  resetMessageData = () => {
    this.showMessage = showMessageDefault;
    this.contentMessage = contentMessageDefault;
    this.typeMessage = typeMessageDefault;
  };
}

export default new MessageStore();
