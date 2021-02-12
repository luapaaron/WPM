
import { MESSAGE_RESET, MESSAGE_SET, MESSAGE_API_400, MESSAGE_API_500, SET_SUCCESS_MESSAGE } from './index';
import { MESSAGE_ERROR, MESSAGE_SUCCESS, MESSAGE_WARNING } from '../../../constants/messageStatus';

const initialState = {
    status: '',
    isOpen: false,
    text: ''
}

const dialog = (state = initialState, action = {}) => {
    switch (action.type) {
        case MESSAGE_RESET:
            state = {
                ...state,
                ...initialState
            }
        return state;
        case MESSAGE_SET:
            state = {
                status: action.payload.type,
                isOpen: true,
                text: action.payload.text
            }
        return state;
        case SET_SUCCESS_MESSAGE:
            state = {
                ...state,
                status: MESSAGE_SUCCESS,
                isOpen: true,
                text: action.payload
            }
        return state;
        case MESSAGE_API_400:
            state = {
                ...state,
                status: MESSAGE_WARNING,
                isOpen: true,
                text: action.payload
            }
        return state;
        case MESSAGE_API_500:
            state = {
                ...state,
                status: MESSAGE_ERROR,
                isOpen: true,
                text: action.payload
            }
        return state;

        default:
            return state;
    }


}

export default dialog;

