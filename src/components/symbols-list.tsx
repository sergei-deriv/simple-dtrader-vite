import React from 'react';
import { Cascader, Alert, Space, Spin } from 'antd';
import { getActiveSymbols } from '../api/requests';
import { ActiveSymbolsResponse, Option } from '../types';
import { createOptions } from '../utils/create-options';

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

const defOptions2: Option[] = [
  {
    value: '1',
    label: '1',
  },
  {
    value: '2',
    label: '2',
  },
  {
    value: '3',
    label: '3',
  },
];

// OnSingleChange<OptionType>

const SymbolsList: React.FC = () => {
  const [loading, setLoading] = React.useState(true);
  const [options, setOptions] = React.useState<Option[]>(
    defOptions as Option[]
  );

  const onChange = (value: any) => {
    console.log(value);
  };

  const getSymbols = async () => {
    const res: ActiveSymbolsResponse = await getActiveSymbols();
    const { active_symbols } = res; // display_name, symbol, market_display_name, submarket_display_name

    const opt = active_symbols
      ? createOptions(active_symbols)
      : ({} as Option[]);
    console.log(opt);
    setOptions(opt);
    setLoading(false);

    // const market = active_symbols.map((el) => el.market_display_name);
    // setOptions(
    //   [...new Set(market)].map((el) => ({
    //     value: el,
    //     label: el,
    //   }))
    // );
    // setOptions([...new Set(market)]);

    console.log(res);
  };

  React.useEffect(() => {
    getSymbols();
  }, []);

  const cascader = (
    <Cascader
      options={options}
      onChange={onChange}
      placeholder='Please select'
    />
  );

  return loading ? <Spin>{cascader}</Spin> : cascader;
};

export default SymbolsList;
