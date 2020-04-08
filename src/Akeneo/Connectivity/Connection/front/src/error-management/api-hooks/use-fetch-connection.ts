import {useEffect, useState} from 'react';
import {fetchResult} from '../../shared/fetch-result';
import {ok, Result} from '../../shared/fetch-result/result';
import {useRoute} from '../../shared/router';

type Connection = {label: string};

const useFetchConnection = (connectionCode: string) => {
    const url = useRoute('akeneo_connectivity_connection_rest_get', {
        code: connectionCode,
    });

    const [data, setData] = useState<Result<Connection | null, unknown>>(ok(null));

    useEffect(() => {
        let cancelled = false;

        fetchResult<Connection, unknown>(url).then(result => {
            if (true === cancelled) {
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

export {useFetchConnection};
