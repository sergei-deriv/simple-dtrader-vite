// Smaller bundle size, dealing only with the low-level library
import DerivAPIBasic from '@deriv/deriv-api/dist/DerivAPIBasic';

const app_id = 1089;
// export const token = 'AHAJhm4iduzA9f0';
// export const token = '6ZFxhM1OuZa2ss8';

export const connection = new WebSocket(
  `wss://ws.binaryws.com/websockets/v3?app_id=${app_id}`
);

export const api = new DerivAPIBasic({ connection });
