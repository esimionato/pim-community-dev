import React, {FC} from 'react';
import {useHistory, useParams} from 'react-router';
import {Breadcrumb, BreadcrumbItem, PageContent, PageHeader} from '../../common';
import {PimView} from '../../infrastructure/pim-view/PimView';
import {isErr} from '../../shared/fetch-result/result';
import {BreadcrumbRouterLink} from '../../shared/router';
import {Translate} from '../../shared/translate';
import {useFetchConnection} from '../api-hooks/use-fetch-connection';
import {ConnectionErrors} from '../components/ConnectionErrors';

const useConnection = (connectionCode: string) => {
    const result = useFetchConnection(connectionCode);
    if (isErr(result)) {
        throw new Error(`Error while fetching the Connection "${connectionCode}".`);
    }

    return result.value;
};

const ConnectionMonitoring: FC = () => {
    const history = useHistory();
    const {connectionCode} = useParams<{connectionCode: string}>();

    const connection = useConnection(connectionCode);
    if (null === connection) {
        return <>Loading...</>; // TODO Loading spinner
    }

    const breadcrumb = (
        <Breadcrumb>
            <BreadcrumbRouterLink route={'oro_config_configuration_system'}>
                <Translate id='pim_menu.tab.system' />
            </BreadcrumbRouterLink>
            <BreadcrumbItem onClick={() => history.push('/connections')}>
                <Translate id='pim_menu.item.connection_settings' />
            </BreadcrumbItem>
            <BreadcrumbItem>
                <Translate id='akeneo_connectivity.connection.error_management.connection_monitoring.title' />
            </BreadcrumbItem>
        </Breadcrumb>
    );

    const userButtons = (
        <PimView
            className='AknTitleContainer-userMenuContainer AknTitleContainer-userMenu'
            viewName='pim-connectivity-connection-user-navigation'
        />
    );

    return (
        <>
            <PageHeader breadcrumb={breadcrumb} userButtons={userButtons}>
                {connection.label}
            </PageHeader>

            <PageContent>
                <ConnectionErrors connectionCode={connectionCode} />
            </PageContent>
        </>
    );
};

export {ConnectionMonitoring};
