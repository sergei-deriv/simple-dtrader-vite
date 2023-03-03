import {
  authorize,
  connection,
  forgetAll,
  getTicksHistory,
  contracts_for_symbol,
  logouot,
} from '../api';
import { chartStore, userStore } from '../store';
import {
  THistory,
  AuthorizeResponse,
  LogOutResponse,
  ContractsForSymbolResponse,
  ContractsForSymbolRequest,
} from '../types';

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
  await forgetAll();
  connection.addEventListener('message', tickResponse);
  if (symbol) {
    await getTicksHistory(symbol, true);
    userStore.setSymbol(symbol);
  } else {
    userStore.setSymbol('');
    chartStore.createHistory([]);
  }
};

const convertUnixToLocaleString = (time: number) =>
  new Date(time * 1000).toLocaleTimeString();

export const authorizeHandler = async (token: string) => {
  const response: AuthorizeResponse = await authorize(token);

  if (response.authorize) {
    userStore.setAuthorize(response.authorize);
    userStore.setToken(token);
    return true;
  }

  return false;
};

export const logoutHandler = async () => {
  const response: LogOutResponse = await logouot();

  if (response.logout === 1) {
    userStore.resetAuthorize();
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
