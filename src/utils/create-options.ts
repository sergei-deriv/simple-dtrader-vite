import { ActiveSymbols, Option } from '../types';

// display_name, symbol, market_display_name, submarket_display_name

const defOptions: Option[] = [
  {
    value: 'forex',
    label: 'forex',
    children: [
      {
        value: 'AUDCAD',
        label: 'AUDCAD',
      },
      {
        value: 'EURUSD',
        label: 'EURUSD',
      },
    ],
  },
  {
    value: 'stocks',
    label: 'stocks',
    children: [
      {
        value: 'Apple',
        label: 'Apple',
        children: [
          {
            value: 'green apple',
            label: 'green apple',
          },
          {
            value: 'red apple',
            label: 'red apple',
          },
        ],
      },
      {
        value: 'Microsoft',
        label: 'Microsoft',
      },
      {
        value: 'Tesla',
        label: 'Tesla',
      },
    ],
  },
];

export const createOptions = (active_symbols: ActiveSymbols): Option[] => {
  // const market = active_symbols.map((el) => el.market_display_name);
  // const market = [
  //   ...new Set(active_symbols.map((item) => item.market_display_name)),
  // ];
  // const sub_market = [
  //   ...new Set(active_symbols.map((item) => item.submarket_display_name)),
  // ];

  // let market: any = [];
  // let sub_market: any = [];
  const market_set: Set<string> = new Set();
  const market_set2: Set<any> = new Set();
  const submarket_set: Set<string> = new Set();

  // define markets and submarkets
  active_symbols.forEach((el) => {
    market_set.add(el.market_display_name);
    market_set2.add({
      market_display_name: el.market_display_name,
      submarket_display_name: el.submarket_display_name,
    });
    submarket_set.add(el.submarket_display_name);
  });

  // console.log(market_set);
  const market = [...market_set];
  const submarket = [...submarket_set];

  console.log('market_set2 = ', market_set2);

  const result: Option[] = [...market_set].map((el) => ({
    value: el,
    label: el,
    children: [],
  }));
  // create structure
  active_symbols.forEach((el) => {
    // const market_idx = market.indexOf(el.market_display_name);
    const submarket_idx = submarket.indexOf(el.submarket_display_name);

    // check for market exist
    const market_exist = result.some(
      (res_el) => res_el.label === el.market_display_name
    );
    if (market_exist) {
      const market_idx = (result[market_idx].value = el.market);
      result[market_idx].label = el.market_display_name;
    } else {
      result.push({
        value: el.market,
        label: el.market_display_name,
        children: [],
      });
    }

    // result[market_idx].value = el.market;
    // result[market_idx].label = el.market_display_name;
    // if (!result[market_idx].children) result[market_idx].children = [];
    // if (result[market_idx].children) {
    //   if (result[market_idx].children)
    //     result[market_idx].children?.push({
    //       value: el.submarket,
    //       label: el.submarket_display_name,
    //       // symbol: el.symbol,
    //     });
    // }
  });

  console.log('market = ', market);
  console.log('sub_market = ', submarket);

  // const market_obj = active_symbols.forEach((el) => {
  //   return { value: el.market, label: el.market_display_name };
  // });

  // active_symbols;
  // const result: any = active_symbols.forEach((e) => {
  //   result[e.market_display_name] = 'asd';
  // });

  // [...new Set(array.map((item) => item.age))];
  return result;
  // return market.map((el) => ({
  //   value: el,
  //   label: el,
  //   // market: 'asdf',
  // }));
};
