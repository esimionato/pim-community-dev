import {render} from '@testing-library/react';
import React, {PropsWithChildren} from 'react';
import {create} from 'react-test-renderer';
import {ThemeProvider} from 'styled-components';
import {theme} from '../src/common/theme';

const DefaultProviders = ({children}: PropsWithChildren<{}>) => {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export const createWithProviders = (nextElement: React.ReactElement) =>
    create(<DefaultProviders>{nextElement}</DefaultProviders>);

export const renderWithProviders = (ui: React.ReactElement) => render(ui, {wrapper: DefaultProviders});

export const fetchMockResponseOnce = (requestUrl: string, responseBody: string) =>
    fetchMock.mockResponseOnce(request =>
        request.url === requestUrl ? Promise.resolve(responseBody) : Promise.reject()
    );
