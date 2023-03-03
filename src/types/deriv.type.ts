/**
 * Immediately cancel the real-time streams of messages of given type.
 */
export interface ForgetAllRequest {
  /**
   * Cancel all streams by type. The value can be either a single type e.g. `"ticks"`, or an array of multiple types e.g. `["candles", "ticks"]`.
   */
  forget_all: StreamTypes | StreamTypes[];
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

/**
 * Valid stream types that can be used to unsubscribe from.
 */
export type StreamTypes =
  | 'balance'
  | 'candles'
  | 'cashier_payments'
  | 'p2p_advert'
  | 'p2p_advertiser'
  | 'p2p_order'
  | 'proposal'
  | 'proposal_open_contract'
  | 'ticks'
  | 'transaction'
  | 'website_status';

/**
 * Get historic tick data for a given symbol.
 */
export interface TicksHistoryRequest {
  /**
   * Short symbol name (obtained from the `active_symbols` call).
   */
  ticks_history: string;
  /**
   * [Optional] 1 - if the market is closed at the end time, or license limit is before end time, adjust interval backwards to compensate.
   */
  adjust_start_time?: 1;
  /**
   * [Optional] An upper limit on ticks to receive.
   */
  count?: number;
  /**
   * Epoch value representing the latest boundary of the returned ticks. If `latest` is specified, this will be the latest available timestamp.
   */
  end: string;
  /**
   * [Optional] Only applicable for style: `candles`. Candle time-dimension width setting. (default: `60`).
   */
  granularity?:
    | 60
    | 120
    | 180
    | 300
    | 600
    | 900
    | 1800
    | 3600
    | 7200
    | 14400
    | 28800
    | 86400;
  /**
   * [Optional] Epoch value representing the earliest boundary of the returned ticks.
   * - For `"style": "ticks"`: this will default to 1 day ago.
   * - For `"style": "candles"`: it will default to 1 day ago if count or granularity is undefined.
   */
  start?: number;
  /**
   * [Optional] The tick-output style.
   */
  style?: 'candles' | 'ticks';
  /**
   * [Optional] 1 - to send updates whenever a new tick is received.
   */
  subscribe?: 1;
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

/**
 * Authorize current WebSocket session to act on behalf of the owner of a given token. Must precede requests that need to access client account, for example purchasing and selling contracts or viewing portfolio.
 */
export interface AuthorizeRequest {
  /**
   * Authentication token. May be retrieved from https://www.binary.com/en/user/security/api_tokenws.html
   */
  authorize: string;
  /**
   * [Optional] Send this when you use api tokens for authorization and want to track activity using `login_history` call.
   */
  add_to_login_history?: 1 | 0;
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

/**
 * Logout the session
 */
export interface LogOutRequest {
  /**
   * Must be `1`
   */
  logout: 1;
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

/**
 * For a given symbol, get the list of currently available contracts, and the latest barrier and duration limits for each contract.
 */
export interface ContractsForSymbolRequest {
  /**
   * The short symbol name (obtained from `active_symbols` call).
   */
  contracts_for: string;
  /**
   * [Optional] Currency of the contract's stake and payout (obtained from `payout_currencies` call).
   */
  currency?: string;
  /**
   * [Optional] Indicates which landing company to get a list of contracts for. If you are logged in, your account's landing company will override this field.
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
   * [Optional] If you specify this field, only contracts tradable through that contract type will be returned.
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

/**
 * A message containing account information for the holder of that token.
 */
export interface AuthorizeResponse {
  authorize?: Authorize;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: 'authorize';
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}

/**
 * Account information for the holder of the token.
 */
export interface Authorize {
  /**
   * List of accounts for current user.
   */
  account_list?: {
    /**
     * Account type.
     */
    account_type?: 'trading' | 'wallet';
    /**
     * Creation time of the account as epoch.
     */
    created_at?: number;
    /**
     * Currency of specified account.
     */
    currency?: string;
    /**
     * Epoch of date till client has excluded him/herself from the website, only present if client is self excluded.
     */
    excluded_until?: number;
    /**
     * Boolean value: 1 or 0, indicating whether the account is marked as disabled or not.
     */
    is_disabled?: 1 | 0;
    /**
     * Boolean value: 1 or 0, indicating whether the account is a virtual-money account.
     */
    is_virtual?: 1 | 0;
    /**
     * Landing company shortcode the account belongs to.
     */
    landing_company_name?: string;
    /**
     * The account ID of specified account.
     */
    loginid?: string;
    /**
     * Details of the Trading account.
     */
    trading?: {
      /**
       * Details of the Wallet account linked to the Trading account.
       */
      linked_to?: {
        /**
         * Wallet account ID.
         */
        account_id?: string;
        /**
         * Wallet account balance.
         */
        balance?: string;
        /**
         * Wallet account currency.
         */
        currency?: string;
        /**
         * Wallet account payment method.
         */
        payment_method?: string;
      }[];
    };
    /**
     * Details of the Wallet account.
     */
    wallet?: {
      /**
       * Wallet account ID.
       */
      account_id?: string;
      /**
       * Wallet account balance.
       */
      balance?: number;
      /**
       * Wallet account currency.
       */
      currency?: string;
      /**
       * Details of the list of Trading accounts linked to the Wallet account.
       */
      linked_to?: {
        /**
         * Trading account ID.
         */
        account_id?: string;
        /**
         * Trading account balance.
         */
        balance?: string;
        /**
         * Trading account currency.
         */
        currency?: string;
        /**
         * Trading account platform name.
         */
        platform?: 'deriv' | 'dxtrade' | 'mt5';
      }[];
      /**
       * Wallet account payment method.
       */
      payment_method?: string;
    };
  }[];
  /**
   * Cash balance of the account.
   */
  balance?: number;
  /**
   * 2-letter country code (ISO standard).
   */
  country?: string;
  /**
   * Currency of the account.
   */
  currency?: string;
  /**
   * User email.
   */
  email?: string;
  /**
   * User's full name. Will be empty for virtual accounts.
   */
  fullname?: string;
  /**
   * Boolean value: 1 or 0, indicating whether the account is a virtual-money account.
   */
  is_virtual?: 0 | 1;
  /**
   * Landing company name the account belongs to.
   */
  landing_company_fullname?: string;
  /**
   * Landing company shortcode the account belongs to.
   */
  landing_company_name?: string;
  /**
   * Currencies in client's residence country
   */
  local_currencies?: {
    /**
     * Currency code
     *
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^[a-zA-Z0-9]{2,20}$".
     */
    [k: string]: {
      /**
       * Number of fractional digits.
       */
      fractional_digits: number;
    };
  };
  /**
   * The account ID that the token was issued for.
   */
  loginid?: string;
  /**
   * User's preferred language, ISO standard code of language
   */
  preferred_language?: null | string;
  /**
   * Scopes available to the token.
   */
  scopes?: string[];
  /**
   * Details of the Trading account.
   */
  trading?: {
    /**
     * Details of the Wallet account linked to the Trading account.
     */
    linked_to?: {
      /**
       * Wallet account ID.
       */
      account_id?: string;
      /**
       * Wallet account balance.
       */
      balance?: string;
      /**
       * Wallet account currency.
       */
      currency?: string;
      /**
       * Wallet account payment method.
       */
      payment_method?: string;
    }[];
  };
  /**
   * List of landing company shortcodes the account can upgrade to.
   */
  upgradeable_landing_companies?: unknown[];
  /**
   * The internal user ID for this account.
   */
  user_id?: number;
  /**
   * Details of the Wallet account.
   */
  wallet?: {
    /**
     * Wallet account ID.
     */
    account_id?: string;
    /**
     * Wallet account balance.
     */
    balance?: number;
    /**
     * Wallet account currency.
     */
    currency?: string;
    /**
     * Details of the list of Trading accounts linked to the Wallet account.
     */
    linked_to?: {
      /**
       * Trading account ID.
       */
      account_id?: string;
      /**
       * Trading account balance.
       */
      balance?: string;
      /**
       * Trading account currency.
       */
      currency?: string;
      /**
       * Trading account platform name.
       */
      platform?: 'deriv' | 'dxtrade' | 'mt5';
    }[];
    /**
     * Wallet account payment method.
     */
    payment_method?: string;
  };
}

/**
 * The result of logout request which is 1
 */
export type Logout = 1;

/**
 * The response of logout request made.
 */
export interface LogOutResponse {
  logout?: Logout;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: 'logout';
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}

/**
 * Get the list of currently available contracts
 */
export interface ContractsForSymbolResponse {
  contracts_for?: ContractsFor;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: 'contracts_for';
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}

/**
 * List of available contracts. Note: if the user is authenticated, then only contracts allowed under his account will be returned.
 */
export interface ContractsFor {
  /**
   * Array of available contracts details
   *
   * @minItems 1
   */
  available: [
    {
      /**
       * Array of available barriers for a predefined trading period
       *
       * @minItems 1
       */
      available_barriers?: [unknown, ...unknown[]];
      /**
       * Barrier Details.
       */
      barrier?: null | string;
      /**
       * Category of barrier.
       */
      barrier_category: string;
      /**
       * [Only for Vanilla] Barrier Choices
       */
      barrier_choices?: unknown[];
      /**
       * Number of barriers.
       */
      barriers: number;
      /**
       * Cancellation range
       */
      cancellation_range?: unknown[];
      /**
       * Category of contract.
       */
      contract_category: string;
      /**
       * Category of the contract.
       */
      contract_category_display: string;
      /**
       * Display name for the type of contract.
       */
      contract_display?: string;
      /**
       * Type of contract.
       */
      contract_type: string;
      /**
       * Name of exchange
       */
      exchange_name: string;
      /**
       * Array of barriers already expired
       */
      expired_barriers?: unknown[];
      /**
       * Expiry Type.
       */
      expiry_type: string;
      /**
       * Array of returned forward starting options
       *
       * @minItems 1
       */
      forward_starting_options?: [
        {
          /**
           * The epoch value for the blackouts of forward starting session.
           */
          blackouts?: unknown[];
          /**
           * The epoch value for the closing date of forward starting session.
           */
          close?: string;
          /**
           * The epoch value for the date of forward starting session.
           */
          date?: string;
          /**
           * The epoch value for the opening date of forward starting session.
           */
          open?: string;
        },
        ...{
          /**
           * The epoch value for the blackouts of forward starting session.
           */
          blackouts?: unknown[];
          /**
           * The epoch value for the closing date of forward starting session.
           */
          close?: string;
          /**
           * The epoch value for the date of forward starting session.
           */
          date?: string;
          /**
           * The epoch value for the opening date of forward starting session.
           */
          open?: string;
        }[]
      ];
      /**
       * Growth rate range.
       */
      growth_rate_range?: unknown[];
      /**
       * High barrier Details.
       */
      high_barrier?: null | string;
      /**
       * Last digit range
       */
      last_digit_range?: unknown[];
      /**
       * Low barrier Details.
       */
      low_barrier?: null | string;
      /**
       * Type of market.
       */
      market: string;
      /**
       * Maximum contract duration
       */
      max_contract_duration: string;
      /**
       * Minimum contract duration.
       */
      min_contract_duration: string;
      /**
       * Multiplier range.
       */
      multiplier_range?: unknown[];
      /**
       * Maximum payout.
       */
      payout_limit?: number;
      /**
       * Type of sentiment.
       */
      sentiment: string;
      /**
       * Start Type.
       */
      start_type: string;
      /**
       * Type of submarket.
       */
      submarket: string;
      /**
       * A hash of predefined trading period
       */
      trading_period?: {
        [k: string]: unknown;
      };
      /**
       * Symbol code
       */
      underlying_symbol: string;
    },
    ...{
      /**
       * Array of available barriers for a predefined trading period
       *
       * @minItems 1
       */
      available_barriers?: [unknown, ...unknown[]];
      /**
       * Barrier Details.
       */
      barrier?: null | string;
      /**
       * Category of barrier.
       */
      barrier_category: string;
      /**
       * [Only for Vanilla] Barrier Choices
       */
      barrier_choices?: unknown[];
      /**
       * Number of barriers.
       */
      barriers: number;
      /**
       * Cancellation range
       */
      cancellation_range?: unknown[];
      /**
       * Category of contract.
       */
      contract_category: string;
      /**
       * Category of the contract.
       */
      contract_category_display: string;
      /**
       * Display name for the type of contract.
       */
      contract_display?: string;
      /**
       * Type of contract.
       */
      contract_type: string;
      /**
       * Name of exchange
       */
      exchange_name: string;
      /**
       * Array of barriers already expired
       */
      expired_barriers?: unknown[];
      /**
       * Expiry Type.
       */
      expiry_type: string;
      /**
       * Array of returned forward starting options
       *
       * @minItems 1
       */
      forward_starting_options?: [
        {
          /**
           * The epoch value for the blackouts of forward starting session.
           */
          blackouts?: unknown[];
          /**
           * The epoch value for the closing date of forward starting session.
           */
          close?: string;
          /**
           * The epoch value for the date of forward starting session.
           */
          date?: string;
          /**
           * The epoch value for the opening date of forward starting session.
           */
          open?: string;
        },
        ...{
          /**
           * The epoch value for the blackouts of forward starting session.
           */
          blackouts?: unknown[];
          /**
           * The epoch value for the closing date of forward starting session.
           */
          close?: string;
          /**
           * The epoch value for the date of forward starting session.
           */
          date?: string;
          /**
           * The epoch value for the opening date of forward starting session.
           */
          open?: string;
        }[]
      ];
      /**
       * Growth rate range.
       */
      growth_rate_range?: unknown[];
      /**
       * High barrier Details.
       */
      high_barrier?: null | string;
      /**
       * Last digit range
       */
      last_digit_range?: unknown[];
      /**
       * Low barrier Details.
       */
      low_barrier?: null | string;
      /**
       * Type of market.
       */
      market: string;
      /**
       * Maximum contract duration
       */
      max_contract_duration: string;
      /**
       * Minimum contract duration.
       */
      min_contract_duration: string;
      /**
       * Multiplier range.
       */
      multiplier_range?: unknown[];
      /**
       * Maximum payout.
       */
      payout_limit?: number;
      /**
       * Type of sentiment.
       */
      sentiment: string;
      /**
       * Start Type.
       */
      start_type: string;
      /**
       * Type of submarket.
       */
      submarket: string;
      /**
       * A hash of predefined trading period
       */
      trading_period?: {
        [k: string]: unknown;
      };
      /**
       * Symbol code
       */
      underlying_symbol: string;
    }[]
  ];
  /**
   * Symbol's next market-close time as an epoch value
   */
  close?: number | null;
  /**
   * Indicates the feed license for symbol, for example whether its realtime or delayed
   */
  feed_license?: string;
  /**
   * Count of contracts available
   */
  hit_count?: number;
  /**
   * Symbol's next market-open time as an epoch value
   */
  open?: number | null;
  /**
   * Current spot price for this underlying
   */
  spot?: null | number;
}

/**
 * List of active symbols.
 */
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
