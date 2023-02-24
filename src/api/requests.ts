import { ActiveSymbolsRequest, ActiveSymbolsResponse } from '../types';
import { api } from './api';

export const active_symbols_request = {
  active_symbols: 'brief' as ActiveSymbolsRequest['active_symbols'],
  product_type: 'basic' as ActiveSymbolsRequest['product_type'],
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

// get active_symbols
export const getActiveSymbols = (
  req: ActiveSymbolsRequest = active_symbols_request
) => {
  return api.activeSymbols(req);
};
