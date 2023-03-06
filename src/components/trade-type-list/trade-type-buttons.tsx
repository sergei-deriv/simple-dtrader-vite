import React from 'react';
import { Button } from 'antd';
import { userStore } from '../../store';
import SpaceWrap from '../space-wrap';
import { ContractsFor } from '../../types';

type TTradeTypeButtons = {
  contract_category: string | null;
  available: ContractsFor['available'];
};

const TradeTypeButtons = ({
  contract_category,
  available,
}: TTradeTypeButtons) => {
  const buttons_names: (string | undefined)[] = [
    ...new Set(
      available
        ?.filter((item) => item.contract_category === contract_category)
        .map((item) => item.contract_display)
    ),
  ];

  // destructure 2 buttons
  const [btn1, btn2] = buttons_names;

  return contract_category && buttons_names?.length >= 1 ? (
    <SpaceWrap>
      <Button name={btn1} type='primary'>
        {btn1}
      </Button>
      <Button name={btn2} type='primary' danger>
        {btn2}
      </Button>
    </SpaceWrap>
  ) : null;
};
export default TradeTypeButtons;
