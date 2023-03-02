import { makeAutoObservable } from 'mobx';
import chartStore from './chart-store';
import messageStore from './message-store';
import counterStore from './counter-store';
import userStore from './user-store';

class BaseStore {
  chart = chartStore;
  message = messageStore;
  counter = counterStore;
  user = userStore;

  constructor() {
    makeAutoObservable(this);
  }
}

export default new BaseStore();
