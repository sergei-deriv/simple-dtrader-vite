import { ActiveSymbols, Option } from '../types';

// display_name, symbol, market_display_name, submarket_display_name

export const createOptions = (active_symbols: ActiveSymbols): Option[] => {
  const market = active_symbols.map((el) => el.market_display_name);
  const sub_market = active_symbols.map((el) => el.submarket_display_name);

  return [...new Set(market)].map((el) => ({
    value: el,
    label: el,
  }));
};
