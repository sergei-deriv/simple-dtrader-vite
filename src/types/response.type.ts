// export type TActiveSymbol = {
//   allow_forward_starting: number;
//   display_name: string;
//   display_order: number;
//   exchange_is_open: boolean;
//   is_trading_suspended: boolean;
//   market: string;
//   market_display_name: string;
//   pip: number;
//   subgroup: string;
//   subgroup_display_name: string;
//   submarket: string;
//   submarket_display_name: string;
//   symbol: string;
//   symbol_type: string;
// };

// export type TActiveSymbolResponse = {
//   active_symbols: TActiveSymbol[];
//   echo_req?: any;
//   msg_type: 'active_symbols';
//   req_id?: number;
// };

export type ActiveSymbols = {
  /**
   * `1` if the symbol is tradable in a forward starting contract, `0` if not.
   */
  allow_forward_starting?: 0 | 1;
  /**
   * Amount the data feed is delayed (in minutes) due to Exchange licensing requirements. Only returned on `full` active symbols call.
   */
  delay_amount?: number;
  /**
   * Display name.
   */
  display_name: string;
  /**
   * Display order.
   */
  display_order: number;
  /**
   * `1` if market is currently open, `0` if closed.
   */
  exchange_is_open: 0 | 1;
  /**
   * Exchange name (for underlyings listed on a Stock Exchange). Only returned on `full` active symbols call.
   */
  exchange_name?: string;
  /**
   * Intraday interval minutes. Only returned on `full` active symbols call.
   */
  intraday_interval_minutes?: number;
  /**
   * `1` indicates that trading is currently suspended, `0` if not.
   */
  is_trading_suspended: 0 | 1;
  /**
   * Market category (forex, indices, etc).
   */
  market: string;
  /**
   * Translated market name.
   */
  market_display_name: string;
  /**
   * Pip size (i.e. minimum fluctuation amount).
   */
  pip: number;
  /**
   * For stock indices, the underlying currency for that instrument. Only returned on `full` active symbols call.
   */
  quoted_currency_symbol?: string;
  /**
   * Latest spot price of the underlying. Only returned on `full` active symbols call.
   */
  spot?: null | number;
  /**
   * Number of seconds elapsed since the last spot price. Only returned on `full` active symbols call.
   */
  spot_age?: string;
  /**
   * Daily percentage for a symbol. Only returned on 'full' active symbols call.
   */
  spot_percentage_change?: string;
  /**
   * Latest spot epoch time. Only returned on `full` active symbols call.
   */
  spot_time?: string;
  /**
   * Subgroup name.
   */
  subgroup: string;
  /**
   * Translated subgroup name.
   */
  subgroup_display_name: string;
  /**
   * Submarket name.
   */
  submarket: string;
  /**
   * Translated submarket name.
   */
  submarket_display_name: string;
  /**
   * The symbol code for this underlying.
   */
  symbol: string;
  /**
   * Symbol type (forex, commodities, etc).
   */
  symbol_type: string;
}[];

/**
 * A message containing the list of active symbols.
 */
export interface ActiveSymbolsResponse {
  active_symbols?: ActiveSymbols;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: 'active_symbols';
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * Retrieve a list of all currently active symbols (underlying markets upon which contracts are available for trading).
 */
export interface ActiveSymbolsRequest {
  /**
   * If you use `brief`, only a subset of fields will be returned.
   */
  active_symbols: 'brief' | 'full';
  /**
   * [Optional] If you specify this field, only symbols available for trading by that landing company will be returned. If you are logged in, only symbols available for trading by your landing company will be returned regardless of what you specify in this field.
   */
  landing_company?:
    | 'iom'
    | 'malta'
    | 'maltainvest'
    | 'svg'
    | 'virtual'
    | 'vanuatu'
    | 'champion'
    | 'champion-virtual';
  /**
   * [Optional] If you specify this field, only symbols that can be traded through that product type will be returned.
   */
  product_type?: 'basic';
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
