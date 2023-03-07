import React from 'react';
import { Cascader } from 'antd';
import { getActiveSymbols } from '../../api';
import { ActiveSymbolsResponse, Option } from '../../types';
import { createOptions } from '../../utils/create-options';
import {
  contractsForSymbolHandler,
  tickHistoryHandler,
} from '../../utils/handlers';
import { messageStore } from '../../store';

const SymbolsList = () => {
  const [loading, setLoading] = React.useState(true);
  const [options, setOptions] = React.useState<Option[]>([] as Option[]);

  // Just show the latest item.
  const displayRender = React.useCallback(
    (labels: string[]) => labels[labels.length - 1],
    []
  );

  // type OnSingleChange<OptionType> = (value: SingleValueType, selectOptions: OptionType[]) => void;
  const onChange = async (symbols: string[]) => {
    const symbol = symbols ? symbols[symbols.length - 1] : '';
    messageStore.setShowMessage(true);
    await tickHistoryHandler(symbol);
    await contractsForSymbolHandler(symbol);
    messageStore.setShowMessage(false);
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
    messageStore.setShowMessage(true);
    getSymbols();
  }, []);

  React.useEffect(() => {
    messageStore.setShowMessage(loading);
  }, [loading]);

  const cascader = (
    <Cascader
      options={options}
      // @ts-ignore
      onChange={onChange}
      placeholder='Please select'
      disabled={loading}
      displayRender={displayRender}
    />
  );

  return cascader;
};

export default SymbolsList;
