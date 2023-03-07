import { ActiveSymbols, Option } from '../types';

// display_name, symbol, market_display_name, submarket_display_name

// use 3 levels or 2
const use_submarket = false;

export const createOptions = (active_symbols: ActiveSymbols): Option[] => {
  const result = [] as Option[];
  const existed_market = [] as string[];
  const existed_submarket = [] as string[];

  // create structure
  active_symbols.forEach((e) => {
    const is_exist_market = existed_market.includes(e.market);
    const is_exist_submarket = existed_submarket.includes(e.submarket);

    // for 3 levels (use submarket)
    if (use_submarket) {
      // market 1st time
      if (!is_exist_market) {
        existed_market.push(e.market);
        existed_submarket.push(e.submarket);

        result.push({
          value: e.market,
          label: e.market_display_name,
          children: [
            {
              value: e.submarket,
              label: e.submarket_display_name,
              children: [
                {
                  value: e.symbol,
                  label: e.display_name,
                },
              ],
            },
          ],
        });
      }
      // market already exist
      else {
        let market_idx = result.findIndex(
          (element) => element.value === e.market
        );

        // there is not submarket
        if (!is_exist_submarket) {
          existed_submarket.push(e.submarket);

          result[market_idx].children?.push({
            value: e.submarket,
            label: e.submarket_display_name,
            children: [
              {
                value: e.symbol,
                label: e.display_name,
              },
            ],
          });
        }
        // there is submarket
        else {
          let submarket_idx =
            result[market_idx].children?.findIndex(
              (element) => element.value === e.submarket
            ) ?? 0;

          result[market_idx]?.children?.[submarket_idx]?.children?.push({
            value: e.symbol,
            label: e.display_name,
          });
        }
      }
    }

    // for 2 levels (don't use submarket)
    else {
      // market 1st time
      if (!is_exist_market) {
        existed_market.push(e.market);
        existed_submarket.push(e.submarket);

        result.push({
          value: e.market,
          label: e.market_display_name,
          children: [
            {
              value: e.symbol,
              label: e.display_name,
            },
          ],
        });
      }
      // market already exist
      else {
        let market_idx = result.findIndex(
          (element) => element.value === e.market
        );

        result[market_idx].children?.push({
          value: e.symbol,
          label: e.display_name,
        });
      }
    }
  });

  return result;
};
