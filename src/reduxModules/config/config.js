
import update from 'immutability-helper';
import { SET_THEME } from './index';

const initialState = {
    theme: 'default'
};

const config = (state = initialState, action = {}) => {
    switch ( action.type) {
        case SET_THEME :
            state = update(state, {
                theme: { $set: action.payload.props }
            });
        return state;
        default:
            return state;
    }
}

export default config;

