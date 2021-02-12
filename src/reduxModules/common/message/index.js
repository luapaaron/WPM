
import message from './message'

export const MESSAGE_RESET = '[MESSAGE: reset] MESSAGE_RESET';
export const MESSAGE_SET = '[MESSAGE: set] MESSAGE_SET';
export const MESSAGE_API_400 = '[MESSAGE: apiError] MESSAGE_API_400';
export const MESSAGE_API_500 = '[MESSAGE: apiError] MESSAGE_API_500';
export const SET_SUCCESS_MESSAGE = '[MESSAGE: set] SET_SUCCESS_MESSAGE';

export {
    actionMessageReset,
    actionMessageSet
} from './messageActions';

export default message;