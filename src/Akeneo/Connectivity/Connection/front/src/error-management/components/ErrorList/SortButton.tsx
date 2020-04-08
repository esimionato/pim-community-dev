import React, {FC} from 'react';

type Order = 'asc' | 'desc';

type Props = {
    order: Order;
    onSort: (order: Order) => void;
};

const SortButton: FC<Props> = ({order, onSort}) => {
    return <button onClick={() => onSort(order === 'asc' ? 'desc' : 'asc')}>{order}</button>;
};

export {SortButton, Order};
