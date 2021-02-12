
import { SUCCESS, PENDING } from '../../constants/actionStatus';
import { SET_USER, SAVE_WPM } from './index';

const initialState = {
    isFetchUserPending: false,
    users: []
};

const user = (state = initialState, action = {}) => {
    switch (action.type) {
        case SET_USER + PENDING:
            state = {
                ...state,
                isFetchUserPending: true
            }
            return state;
        case SET_USER + SUCCESS:
            state = {
                ...state,
                isFetchUserPending: false,
                users: action.payload.data
            }
            return state;
        case SAVE_WPM + SUCCESS:
            state = {
                ...state,
                users: action.payload
            }
            return state;
        default:
            return state;
    }
}

export default user;

