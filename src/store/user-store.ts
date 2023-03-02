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

class UserStore {
  authorize = {} as Authorize;

  constructor() {
    makeAutoObservable(this);
  }

  setAuthorize = (authorize: Authorize) => {
    this.authorize = authorize;
  };

  resetAuthorize = () => {
    this.authorize = {};
  };
}

export default new UserStore();
