import { makeAutoObservable } from 'mobx';
import { Authorize, ContractsFor } from '../types';

/*
account_list
balance
country
currency
email
fullname
is_virtual
landing_company_fullname
landing_company_name
local_currencies
loginid
preferred_language
scopes
trading
upgradeable_landing_companies
user_id
*/

const userDataKey = 'userData';
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
    sessionStorage.setItem('token', token);
  };

  setContractsFor = (contracts_for: ContractsFor) => {
    this.contracts_for = contracts_for;
  };
}

export default new UserStore();
