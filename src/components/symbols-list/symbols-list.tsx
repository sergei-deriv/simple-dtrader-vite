import React from 'react';
import { Cascader } from 'antd';
import { getActiveSymbols } from '../../api';
import { ActiveSymbolsResponse, Option } from '../../types';
import { createOptions } from '../../utils/create-options';
import { tickHistoryHandler } from '../../utils/handlers';
import { baseStore } from '../../store';

// const defOptions: Option[] = [
//   {
//     value: 'forex',
//     label: 'forex',
//     children: [
//       {
//         value: 'AUDCAD',
//         label: 'AUDCAD',
//       },
//       {
//         value: 'EURUSD',
//         label: 'EURUSD',
//       },
//     ],
//   },
//   {
//     value: 'stocks',
//     label: 'stocks',
//     children: [
//       {
//         value: 'Apple',
//         label: 'Apple',
//       },
//       {
//         value: 'Microsoft',
//         label: 'Microsoft',
//       },
//       {
//         value: 'Tesla',
//         label: 'Tesla',
//       },
//     ],
//   },
// ];

const SymbolsList = () => {
  const [loading, setLoading] = React.useState(true);
  const [options, setOptions] = React.useState<Option[]>([] as Option[]);

  // type OnSingleChange<OptionType> = (value: SingleValueType, selectOptions: OptionType[]) => void;
  const onChange = (symbol: string) => {
    tickHistoryHandler(symbol);
  };

  const getSymbols = async () => {
    const res: ActiveSymbolsResponse = await getActiveSymbols();
    const { active_symbols } = res;

    const opt = active_symbols
      ? createOptions(active_symbols)
      : ({} as Option[]);
    setOptions(opt);

    // set loading to false
    setLoading(false);
  };

  React.useEffect(() => {
    baseStore.setShowMessage(true);
    getSymbols();
  }, []);

  React.useEffect(() => {
    baseStore.setShowMessage(loading);
  }, [loading]);

  const cascader = (
    <Cascader
      options={options}
      // @ts-ignore
      onChange={onChange}
      placeholder='Please select'
      disabled={loading}
    />
  );

  return cascader;
};

export default SymbolsList;
