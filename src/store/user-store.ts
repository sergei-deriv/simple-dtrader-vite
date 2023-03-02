import { makeAutoObservable } from 'mobx';
import { Authorize } from '../types';

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

  constructor() {
    makeAutoObservable(this);
  }

  setAuthorize = (authorize: Authorize) => {
    this.authorize = authorize;
    sessionStorage.setItem(userDataKey, JSON.stringify(authorize));
  };

  resetAuthorize = () => {
    this.authorize = {};
    sessionStorage.removeItem(userDataKey);
  };
}

export default new UserStore();
