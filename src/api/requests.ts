import { api } from './api';
export const active_symbols_request = {
  active_symbols: 'brief',
  product_type: 'basic',
};

export const ticks_history_request = {
  ticks_history: 'R_50',
  adjust_start_time: 1,
  count: 100,
  end: 'latest',
  start: 1,
  style: 'ticks',
};

export const contracts_for_request = {
  contracts_for: 'R_50',
  currency: 'USD',
  landing_company: 'svg',
  product_type: 'basic',
};

export const getActiveSymbols = (req: any = active_symbols_request) => {
  return api.send(req);
  //   const res = 'tral al ;';
};
