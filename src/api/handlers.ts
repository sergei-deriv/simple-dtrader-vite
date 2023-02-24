import { forgetAll, getTicksHistory } from './requests';
import { connection } from './api';

export const tickResponse = async (res: any) => {
  const data = JSON.parse(res.data);
  if (data.error !== undefined) {
    console.log('Error : ', data.error.message);
    connection.removeEventListener('message', tickResponse, false);
    // await api.disconnect();
  }
  if (data.msg_type === 'tick') {
    console.log(data.tick);
  }
};

export const tickHistoryHandler = async (symbol: string) => {
  await forgetAll();
  await getTicksHistory(symbol, true);
  connection.addEventListener('message', tickResponse);
};
