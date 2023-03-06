import { makeAutoObservable } from 'mobx';
import { Authorize, ContractsFor } from '../types';

// const userDataKey = 'userData';
export const tokenKey = 'token';
class UserStore {
  authorize = {} as Authorize;
  contracts_for = {} as ContractsFor;
  token = '';
  symbol = '';

  constructor() {
    makeAutoObservable(this);
  }

  setAuthorize = (authorize: Authorize) => {
    this.authorize = authorize;
    // sessionStorage.setItem(userDataKey, JSON.stringify(authorize));
  };

  resetAuthorize = () => {
    this.authorize = {};
    // sessionStorage.removeItem(userDataKey);
  };

  setSymbol = (symbol: string) => {
    this.symbol = symbol;
  };

  setToken = (token: string) => {
    this.token = token;
    sessionStorage.setItem(tokenKey, token);
  };

  setContractsFor = (contracts_for: ContractsFor) => {
    this.contracts_for = contracts_for;
  };

  resetContractsFor = () => {
    this.contracts_for = {} as ContractsFor;
  };
}

export default new UserStore();
