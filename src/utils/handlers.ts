import { AuthorizeResponse } from './../types/deriv.type';
import { authorize } from './../api/requests';
import { connection, forgetAll, getTicksHistory } from '../api';
import chartStore from '../store/chart-store';
import userStore from '../store/user-store';
import { THistory } from '../types';

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
    chartStore.symbol = symbol;
  } else {
    chartStore.symbol = '';
    chartStore.createHistory([]);
  }
};

const convertUnixToLocaleString = (time: number) =>
  new Date(time * 1000).toLocaleTimeString();

export const authorizeHandler = async (token: string) => {
  const response: AuthorizeResponse = await authorize(token);

  if (response.authorize) {
    userStore.setAuthorize(response.authorize ?? {});
    return true;
  }

  return false;
};
