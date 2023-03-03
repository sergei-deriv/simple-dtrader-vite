import React from 'react';
import { Cascader, Select } from 'antd';
import { getActiveSymbols } from '../../api';
import { ActiveSymbolsResponse, Option } from '../../types';
import { createOptions } from '../../utils/create-options';
import {
  contractsForSymbolHandler,
  tickHistoryHandler,
} from '../../utils/handlers';
import { messageStore } from '../../store';
import { observer } from 'mobx-react-lite';
import { userStore } from '../../store';

const TradeTypeList = observer(() => {
  const set_types_display = userStore.contracts_for?.available
    ? [
        ...new Set(
          userStore.contracts_for.available.map(
            (item) => item.contract_category_display
          )
        ),
      ]
    : [];

  const options = set_types_display.map((e: string) => ({
    value: e,
    label: e,
  }));

  console.log('options = ', options);

  return set_types_display.length > 0 ? <Select options={options} /> : <></>;
});

export default TradeTypeList;
