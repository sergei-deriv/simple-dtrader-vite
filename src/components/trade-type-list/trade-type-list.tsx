import React from 'react';
import {Cascader, Select} from 'antd';
import {getActiveSymbols} from '../../api';
import {ActiveSymbolsResponse, Option} from '../../types';
import {createOptions} from '../../utils/create-options';
import {
    contractsForSymbolHandler,
    tickHistoryHandler,
} from '../../utils/handlers';
import {messageStore} from '../../store';
import {observer} from 'mobx-react-lite';
import {userStore} from '../../store';
import {MiddleSelect} from "antd/es/pagination/Select";

const TradeTypeList = observer(() => {

    const [selected, setSelected] = React.useState<null | string>(null)

    const key_value = {} as Record<string, string>;

    userStore.contracts_for?.available?.forEach(item => {
        key_value[item.contract_category] = item.contract_category_display;
    })

    const options = [] as Option[];
    for (const [k, v] of Object.entries(key_value)) {
        options.push({
            value: k,
            label: v
        })
    }

    return options.length > 0 ? <div>
        <button onClick={() => setSelected(null)}>clear</button>
        <Select value={selected} onChange={value => setSelected(value)} options={options}
                dropdownMatchSelectWidth={false} style={{minWidth: 184}} allowClear placeholder={'trade type'}/>
    </div> : <></>;
});

export default TradeTypeList;
