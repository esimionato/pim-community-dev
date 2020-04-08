import React, {FC, useState} from 'react';
import {useDateFormatter} from '../../../shared/formatter/use-date-formatter';
import {Translate} from '../../../shared/translate';
import {ConnectionError} from '../../api-hooks/use-fetch-connection-errors';
import {SearchFilter} from './SearchFilter';
import {Order, SortButton} from './SortButton';

const useFormatTimestamp = () => {
    const formatDateTime = useDateFormatter();

    return (timestamp: number) =>
        formatDateTime(timestamp, {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        });
};

const sortingByTimestamp = (sortOrder: Order) => {
    if ('asc' === sortOrder) {
        return (errorA: ConnectionError, errorB: ConnectionError) => errorA.timestamp - errorB.timestamp;
    } else {
        return (errorA: ConnectionError, errorB: ConnectionError) => errorB.timestamp - errorA.timestamp;
    }
};

const filteringBySearchValue = (searchValue: string) => {
    return (error: ConnectionError) => new RegExp(searchValue, 'i').test(error.content.message);
};

type Props = {
    errors: ConnectionError[];
};

const ErrorList: FC<Props> = ({errors}) => {
    const formatTimestamp = useFormatTimestamp();

    const [sortOrder, setSortOrder] = useState<Order>('desc');
    const [searchValue, setSearchValue] = useState<string>('');

    const sortedAndfilteredErrors = errors
        .sort(sortingByTimestamp(sortOrder))
        .filter(filteringBySearchValue(searchValue));

    return (
        <>
            <SearchFilter value={searchValue} onSearch={setSearchValue} resultCount={sortedAndfilteredErrors.length} />

            <table>
                <thead>
                    <tr>
                        <td>
                            <Translate id='akeneo_connectivity.connection.error_management.connection_monitoring.error_list.date_time_column' />
                            &nbsp;
                            <SortButton order={sortOrder} onSort={setSortOrder} />
                        </td>
                        <td>
                            <Translate id='akeneo_connectivity.connection.error_management.connection_monitoring.error_list.content_column' />
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {sortedAndfilteredErrors.map(error => (
                        <tr key={error.id}>
                            <td>{formatTimestamp(error.timestamp)}</td>
                            <td>{error.content.message}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export {ErrorList};
