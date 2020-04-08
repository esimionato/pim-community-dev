import {useEffect, useState} from 'react';
import {fetchResult} from '../../shared/fetch-result';
import {isOk, ok, Result} from '../../shared/fetch-result/result';
import {useRoute} from '../../shared/router';

type ConnectionError = {id: number; timestamp: number; content: {message: string}};
type ResultValue = Array<{date_time: string; content: {message: string}}>;

const useFetchConnectionErrors = (connectionCode: string) => {
    const url = useRoute('akeneo_connectivity_connection_error_management_rest_get_connection_business_errors', {
        connection_code: connectionCode,
    });

    const [data, setData] = useState<Result<ConnectionError[] | null, unknown>>(ok(null));

    useEffect(() => {
        let cancelled = false;

        fetchResult<ResultValue, unknown>(url).then(result => {
            if (true === cancelled) {
                return;
            }

            if (isOk(result)) {
                const value = result.value.map((error, index) => ({
                    id: index, // Add a unique id to each value.
                    timestamp: Date.parse(error.date_time),
                    ...error,
                }));
                setData(ok(value));

                return;
            }

            setData(result);
        });

        return () => {
            cancelled = true;
        };
    }, [url]);

    return data;
};

export {useFetchConnectionErrors, ConnectionError};
