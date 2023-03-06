import React, { useEffect } from 'react';
import { Select } from 'antd';
import { Option } from '../../types';
import { observer } from 'mobx-react-lite';
import { userStore } from '../../store';
import SpaceWrap from '../space-wrap';
import TradeTypeButtons from './trade-type-buttons';

const TradeTypeList = observer(() => {
  const [selected, setSelected] = React.useState<null | string>(null);

  const key_value = {} as Record<string, string>;

  userStore.contracts_for?.available?.forEach((item) => {
    key_value[item.contract_category] = item.contract_category_display;
  });

  const types_options = [] as Option[];
  for (const [k, v] of Object.entries(key_value)) {
    types_options.push({
      value: k,
      label: v,
    });
  }

  useEffect(() => {
    setSelected(null);
  }, [userStore.symbol]);

  return types_options.length > 0 ? (
    <SpaceWrap>
      <Select
        value={selected}
        onChange={(value) => setSelected(value)}
        options={types_options}
        dropdownMatchSelectWidth={false}
        style={{ minWidth: 184 }}
        allowClear
        placeholder={'trade type'}
      />
      <TradeTypeButtons
        contract_category={selected}
        available={userStore.contracts_for?.available}
      />
    </SpaceWrap>
  ) : null;
});

export default TradeTypeList;
