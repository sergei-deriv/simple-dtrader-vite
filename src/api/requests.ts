import { AuthorizeRequest } from './../types/deriv.type';
import {
  ActiveSymbolsRequest,
  ForgetAllRequest,
  TicksHistoryRequest,
} from '../types';
import { api } from './api';

export const active_symbols_request: ActiveSymbolsRequest = {
  active_symbols: 'brief',
  product_type: 'basic',
};

export const ticks_history_request: TicksHistoryRequest = {
  ticks_history: 'frxAUDJPY',
  count: 100,
  subscribe: 1,
  end: 'latest',
};

export const forget_all_request: ForgetAllRequest = {
  forget_all: 'ticks',
};

export const authorize_request: AuthorizeRequest = {
  authorize: '',
};

// get active_symbols
export const getActiveSymbols = (
  req: ActiveSymbolsRequest = active_symbols_request
) => {
  return api
    .activeSymbols(req)
    .catch((e: ErrorEvent) =>
      console.log('getActiveSymbols error = ', e.error.message)
    );
};

// get ticks_history
export const getTicksHistory = (
  symbol: string = '',
  subscribe: boolean = true,
  count: number = 0,
  req: TicksHistoryRequest = ticks_history_request
) => {
  if (symbol) req.ticks_history = symbol;
  if (!subscribe) delete req.subscribe;
  if (count) req.count = count;
  return api
    .ticksHistory(req)
    .catch((e: ErrorEvent) =>
      console.log('getTicksHistory error = ', e.error.message)
    );
};

// forget all
export const forgetAll = (req: ForgetAllRequest = forget_all_request) => {
  return api
    .send(req)
    .catch((e: ErrorEvent) =>
      console.log('forgetAll error = ', e.error.message)
    );
};

// authorize
export const authorize = (token: string) => {
  const req: AuthorizeRequest = {
    authorize: token,
  };
  return api
    .send(req)
    .catch((e: ErrorEvent) =>
      console.log('authorize error = ', e.error.message)
    );
};
