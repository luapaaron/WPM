import { MESSAGE_RESET, MESSAGE_SET } from './index'

export const actionMessageReset = () => dispatch => {
    dispatch({ type: MESSAGE_RESET });
}

export const actionMessageSet = (text, type) => dispatch => {
    dispatch({ type: MESSAGE_SET, payload: { text, type } });
}