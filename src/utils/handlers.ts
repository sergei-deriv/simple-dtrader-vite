import {
  authorize,
  connection,
  forgetAll,
  getTicksHistory,
  contracts_for_symbol,
  logouot,
} from '../api';
import { chartStore, messageStore, userStore, tokenKey } from '../store';
import {
  THistory,
  AuthorizeResponse,
  LogOutResponse,
  ContractsForSymbolResponse,
  ContractsForSymbolRequest,
} from '../types';
import { convertUnixToLocaleString } from './helpers';

export const tickResponse = async (res: MessageEvent) => {
  const data = JSON.parse(res.data);
  if (data.error !== undefined) {
    console.log('Error : ', data.error.message);
    connection.removeEventListener('message', tickResponse, false);
  }
  if (data.msg_type === 'tick') {
    chartStore.addTick({
      price: data.tick.bid,
      time: convertUnixToLocaleString(data.tick.epoch),
    });
  }
  if (data.msg_type === 'history') {
    const { prices, times } = data.history as THistory;
    const result = prices.map((el, index) => ({
      price: prices[index],
      time: convertUnixToLocaleString(times[index]),
    }));
    chartStore.createHistory(result);
  }
};

export const tickHistoryHandler = async (symbol: string) => {
  if (userStore.symbol) await forgetAll();

  if (symbol) {
    connection.addEventListener('message', tickResponse);
    await getTicksHistory(symbol, true);
    userStore.setSymbol(symbol);
  } else {
    userStore.setSymbol('');
    userStore.resetContractsFor();
    chartStore.createHistory([]);
  }
};

export const authorizeHandler = async (token: string) => {
  const response: AuthorizeResponse = await authorize(token);

  if (response.authorize) {
    userStore.setAuthorize(response.authorize);
    userStore.setToken(token);

    // check if there is choosen symbol then get contracts
    if (userStore.symbol) {
      contractsForSymbolHandler(userStore.symbol);
    }

    return true;
  }

  return false;
};

export const checkTokenAndAuthorizeHandler = async () => {
  const token = sessionStorage.getItem(tokenKey);
  if (token) {
    messageStore.setShowMessage(true);
    await authorizeHandler(token);
    messageStore.setShowMessage(false);
  }
};

export const logoutHandler = async () => {
  const response: LogOutResponse = await logouot();

  if (response.logout === 1) {
    userStore.resetAuthorize();
    userStore.resetContractsFor();
    userStore.setToken('');
    return true;
  }

  return false;
};

export const contractsForSymbolHandler = async (
  symbol: string,
  currency: string = userStore.authorize?.currency ?? '',
  landing_company = (userStore.authorize
    ?.landing_company_name as ContractsForSymbolRequest['landing_company']) ??
    undefined
) => {
  // symbol is empty
  if (!symbol) return false;
  // not authorized
  if (!userStore.authorize?.loginid) return false;

  const response: ContractsForSymbolResponse = await contracts_for_symbol(
    symbol,
    currency,
    landing_company
  );

  if (response.contracts_for) {
    userStore.setContractsFor(response.contracts_for);
    return true;
  }

  return false;
};
