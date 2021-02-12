import React from 'react';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import styled from '@emotion/styled';

import AppHome from '../appHome';
import AppChallenge from '../appChallenge';
import AppHistory from '../appHistory';

import { ROUTE_HOME, ROUTE_CHALLENGE, ROUTE_HISTORY } from '../../constants/routes';

const ViewRootContainer = styled('div')({
    marginTop: 20
});

const routePage = location => {
    switch (location.type) {
        case ROUTE_HOME:
            return (<AppHome />);
        case ROUTE_CHALLENGE:
            return (<AppChallenge />);
        case ROUTE_HISTORY:
            return (<AppHistory />);
    }
}

const ViewRoot = ({ location }) => {
    switch (location.type) {

        case ROUTE_HOME:
        case ROUTE_CHALLENGE:
        case ROUTE_HISTORY:
            return (
                <ViewRootContainer>
                    <Scrollbars 
                        autoHeight 
                        autoHeightMax="calc(100vh - 100px)"
                    >
                        {routePage(location)}
                    </Scrollbars>
                </ViewRootContainer>
            );
        default:
            return null;
    }
}

export default connect(state => ({
    location: state.location
}))(ViewRoot);