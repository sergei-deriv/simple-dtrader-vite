export type TActiveSymbol = {
  allow_forward_starting: number;
  display_name: string;
  display_order: number;
  exchange_is_open: boolean;
  is_trading_suspended: boolean;
  market: string;
  market_display_name: string;
  pip: number;
  subgroup: string;
  subgroup_display_name: string;
  submarket: string;
  submarket_display_name: string;
  symbol: string;
  symbol_type: string;
};

export type TActiveSymbolResponse = {
  active_symbols: TActiveSymbol[];
  echo_req?: any;
  msg_type: 'active_symbols';
  req_id?: number;
};
