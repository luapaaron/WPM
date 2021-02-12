import combineThunks from '../utils/combineThunks';

import { ROUTE_LOGIN, ROUTE_HOME, ROUTE_CHALLENGE, ROUTE_HISTORY } from '../constants/routes';

import { actionFetchQuote } from '../reduxModules/challenge';
import { actionFetchUser } from '../reduxModules/user';

// add cancel api call
const cancelCommonThunks = [];

const routesMap = {
    [ROUTE_LOGIN] : {
        path: '/login',
        thunk: combineThunks(
            ...cancelCommonThunks,
            actionFetchUser()
        )
    },
    [ROUTE_HOME] : {
        path: '/',
        thunk: combineThunks(
            ...cancelCommonThunks,
            actionFetchUser()
        )
    },
    [ROUTE_CHALLENGE] : {
        path: '/challenge',
        thunk: combineThunks(
            ...cancelCommonThunks,
            actionFetchQuote(),
            actionFetchUser()
        )
    },
    [ROUTE_HISTORY] : {
        path: '/history',
        thunk: combineThunks(
            ...cancelCommonThunks,
            actionFetchUser()
        )
    },
    '@route/ERROR_400' : '/error400',
    '@route/ERROR_401' : '/error401',
    '@route/ERROR_404' : '/error404',
    '@route/ERROR_500' : '/error500'
};

export default routesMap;