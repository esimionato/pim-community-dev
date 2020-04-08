import React, {FC} from 'react';
import {Helper, HelperLink, HelperTitle} from '../../common';
import {Translate} from '../../shared/translate';

type Props = {
    errorCount: number;
};

const ErrorsHelper: FC<Props> = ({errorCount}) => (
    <Helper>
        <HelperTitle>
            <Translate
                id='akeneo_connectivity.connection.error_management.connection_monitoring.helper.title'
                placeholders={{count: errorCount.toString()}}
            />
        </HelperTitle>

        <Translate id='akeneo_connectivity.connection.error_management.connection_monitoring.helper.description' />
        <br />

        <HelperLink href='#'>
            <Translate id='akeneo_connectivity.connection.error_management.connection_monitoring.helper.link' />
        </HelperLink>
    </Helper>
);

export {ErrorsHelper};
