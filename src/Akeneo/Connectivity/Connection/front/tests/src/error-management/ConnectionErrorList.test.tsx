import {ConnectionErrorList} from '@src/error-management/components/ConnectionErrorList';
import React from 'react';
import {fetchMockResponseOnce, renderWithProviders} from '../../test-utils';

test('renders the "erp" connection error list with 2 errors', async () => {
    fetchMockResponseOnce(
        'akeneo_connectivity_connection_error_management_rest_get_connection_business_errors?connection_code=erp',
        JSON.stringify([
            {
                date_time: '2020-01-01 00:00:00',
                content: {
                    message: 'First error message',
                },
            },
            {
                date_time: '2020-01-02 00:00:00',
                content: {
                    message: 'Second error message',
                },
            },
        ])
    );

    const {findByText} = renderWithProviders(<ConnectionErrorList connectionCode={'erp'} />);

    await findByText('First error message');
    await findByText('Second error message');
});

test('renders an information message when the connection has no error', async () => {
    fetchMockResponseOnce(
        'akeneo_connectivity_connection_error_management_rest_get_connection_business_errors?connection_code=erp',
        JSON.stringify([])
    );

    const {findByText} = renderWithProviders(<ConnectionErrorList connectionCode={'erp'} />);

    await findByText('No Connection Errors');
});
