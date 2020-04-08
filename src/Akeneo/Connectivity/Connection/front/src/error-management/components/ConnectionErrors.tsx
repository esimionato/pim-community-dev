import React, {FC} from 'react';
import {isErr} from '../../shared/fetch-result/result';
import {useFetchConnectionErrors} from '../api-hooks/use-fetch-connection-errors';
import {ErrorList} from './ErrorList';
import {ErrorsHelper} from './ErrorsHelper';
import {NoError} from './NoError';

const useConnectionErrors = (connectionCode: string) => {
    const result = useFetchConnectionErrors(connectionCode);
    if (isErr(result)) {
        throw new Error(`Error while fetching the Connection "${connectionCode}" errors.`);
    }

    return result.value;
};

type Props = {
    connectionCode: string;
};

const ConnectionErrors: FC<Props> = ({connectionCode}) => {
    const connectionErrors = useConnectionErrors(connectionCode);

    if (null === connectionErrors) {
        return <>Loading...</>; // TODO Loading spinner
    }

    return (
        <>
            <ErrorsHelper errorCount={connectionErrors.length} />
            {connectionErrors.length > 0 ? <ErrorList errors={connectionErrors} /> : <NoError />}
        </>
    );
};

export {ConnectionErrors};
