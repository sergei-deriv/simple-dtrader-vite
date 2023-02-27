import { connection, forgetAll, getTicksHistory } from '../api';
import chartStore from '../store/chart-store';

export const tickResponse = async (res: MessageEvent) => {
  const data = JSON.parse(res.data);
  if (data.error !== undefined) {
    console.log('Error : ', data.error.message);
    connection.removeEventListener('message', tickResponse, false);
  }
  if (data.msg_type === 'tick') {
    // console.log('tick = ', data.tick);
    chartStore.addTick({ price: data.tick.bid, time: data.tick.epoch });
  }
  if (data.msg_type === 'history') {
    console.log('history = ', data.history);
    const { prices, times } = data.history as Record<string, Array<number>>;
    const result = prices.map((el, index) => ({
      price: prices[index],
      time: times[index],
    }));
    chartStore.createHistory(result);
  }
};

export const tickHistoryHandler = async (symbol: string) => {
  await forgetAll();
  connection.addEventListener('message', tickResponse);
  if (symbol) await getTicksHistory(symbol, true);
};
