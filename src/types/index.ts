export * from './response.type';
export * from './common.type';

export type TestType = {
  name: string;
};

export type TActiveSymbolsRequest = {
  active_symbols: 'brief' | 'full';
  product_type: 'basic';
};
