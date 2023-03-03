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
import { observer } from 'mobx-react-lite';
import { userStore } from '../../store';

const TradeTypeList = observer(() => {
  return <></>;
});

export default TradeTypeList;
