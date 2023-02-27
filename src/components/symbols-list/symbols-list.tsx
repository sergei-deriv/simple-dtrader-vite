import React from 'react';
import { Cascader, Spin } from 'antd';
import { getActiveSymbols } from '../../api';
import { ActiveSymbolsResponse, Option } from '../../types';
import { createOptions } from '../../utils/create-options';
import { tickHistoryHandler } from '../../utils/handlers';

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

const SymbolsList = () => {
  const [loading, setLoading] = React.useState(true);
  const [options, setOptions] = React.useState<Option[]>(
    defOptions as Option[]
  );

  // type OnSingleChange<OptionType> = (value: SingleValueType, selectOptions: OptionType[]) => void;
  const onChange = (symbol: string) => {
    console.log('changed! symbol = ', symbol);
    tickHistoryHandler(symbol);
  };

  const getSymbols = async () => {
    const res: ActiveSymbolsResponse = await getActiveSymbols();
    const { active_symbols } = res; // display_name, symbol, market_display_name, submarket_display_name

    const opt = active_symbols
      ? createOptions(active_symbols)
      : ({} as Option[]);
    setOptions(opt);
    setLoading(false);

    console.log(res);
  };

  React.useEffect(() => {
    getSymbols();
  }, []);

  const cascader = (
    <Cascader
      options={options}
      // @ts-ignore
      onChange={onChange}
      placeholder='Please select'
    />
  );

  return loading ? <Spin>{cascader}</Spin> : cascader;
};

export default SymbolsList;
