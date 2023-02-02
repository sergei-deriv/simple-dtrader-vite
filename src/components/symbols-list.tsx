import React from 'react';
import { Cascader } from 'antd';
import { getActiveSymbols } from '../api/requests';
import { TActiveSymbolResponse } from '../types/response.type';

type Option = {
  value: string | number;
  label: string;
  children?: Option[];
};

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

// OnSingleChange<OptionType>

const SymbolsList: React.FC = () => {
  const [options, setOptions] = React.useState<Option[]>(
    defOptions as Option[]
  );

  const onChange = (value: any) => {
    console.log(value);
  };

  const getSymbols = async () => {
    const res: TActiveSymbolResponse = await getActiveSymbols();
    const { active_symbols } = res; // display_name, symbol, market_display_name, submarket_display_name
    const market = active_symbols.map((el) => ({
      value: el.market_display_name,
      label: el.market_display_name,
    })); // create Set
    // setOptions([...new Set(market)]);

    console.log(res);
  };

  React.useEffect(() => {
    getSymbols();
  }, []);

  return (
    <Cascader
      options={options}
      onChange={onChange}
      placeholder='Please select'
    />
  );
};

export default SymbolsList;
