
import { SUCCESS, PENDING, ERROR } from '../../constants/actionStatus';

import { SET_QUOTE } from './index';

const initialState = {
    fetchingQuotePending: false,
    quote: ''
};

const user = (state = initialState, action = {}) => {
    switch (action.type) {
        case SET_QUOTE + PENDING:
            state = {
                ...state,
                fetchingQuotePending: true
            }
            return state;
        case SET_QUOTE + SUCCESS:
            state = {
                ...state,
                fetchingQuotePending: false,
                quote: action.payload.data
            }
            return state;
        default:
            return state;
    }
}

export default user;

