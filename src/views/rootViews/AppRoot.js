
import React, { lazy, Suspense } from 'react';
import styled from '@emotion/styled';
import { NOT_FOUND } from 'redux-first-router';

import { connect } from 'react-redux';

import { ROUTE_LOGIN, ROUTE_HOME, ROUTE_HISTORY, ROUTE_CHALLENGE } from '../../constants/routes';

// Dynamic imports
const Header = lazy(() => import('../layouts/Header'));
const ViewRoot = lazy(() => import('./ViewRoot'));
const AppEntry = lazy(() => import('./AppEntry'));

const AppRootContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    height: '100vh'
});

const commonComponents = () => (
    <AppRootContainer>
        <Suspense fallback={<div />}>
            <Header />
        </Suspense>
        <Suspense fallback={<div />}>
            <ViewRoot />
        </Suspense>
    </AppRootContainer>
);

const AppRoot = ({ dispatch, location }) => {
    switch (location.type) {
        case ROUTE_LOGIN:
            return (
                <AppRootContainer>
                    <Suspense fallback={<div />}>
                        <AppEntry />
                    </Suspense>
                </AppRootContainer>
            );
        case ROUTE_HOME:
        case ROUTE_CHALLENGE:
        case ROUTE_HISTORY:
            return commonComponents();
        case NOT_FOUND:
            return null;
        default:
            return null;
    }
}

export default connect(state => ({
    location: state.location
}))(AppRoot);