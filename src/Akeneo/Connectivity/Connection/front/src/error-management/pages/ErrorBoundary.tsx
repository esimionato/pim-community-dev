import React, {Component} from 'react';
import {PageContent, RuntimeError} from '../../common/components';

class ErrorBoundary extends Component<unknown, {hasError: boolean}> {
    constructor(props: unknown) {
        super(props);
        this.state = {hasError: false};
    }

    static getDerivedStateFromError() {
        return {hasError: true};
    }

    render() {
        if (this.state.hasError) {
            return (
                <PageContent>
                    <RuntimeError />
                </PageContent>
            );
        }

        return this.props.children;
    }
}

export {ErrorBoundary};
