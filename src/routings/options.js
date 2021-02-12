
import cookie from 'js-cookie';
import { WPM_TOKEN } from '../constants/cookies';
import { ROUTE_CHALLENGE, ROUTE_LOGIN } from '../constants/routes';
import isEmpty from '../utils/isEmpty';

export default {
    onBeforeChange: async (dispatch, getState, { action }) => {

    },
    onAfterChange: async (dispatch, getState, { action }) => {
        const locationType = getState().location.type;
        const token = cookie.get(WPM_TOKEN);

        switch (locationType) {
            case ROUTE_CHALLENGE: 
                if (isEmpty(token)) {
                    window.location.href = '#/login';
                }
                break;
            case ROUTE_LOGIN:
                if (!isEmpty(token)) {
                    window.location.href = '#/';
                }
                break;
            default: 
                return null;
        }
    }
};