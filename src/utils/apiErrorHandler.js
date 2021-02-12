import { MESSAGE_API_400, MESSAGE_API_500 } from '../reduxModules/common/message';

const apiErrorHandler = (error, dispatch) => {
    if (error.response && (error.response.status >= 400 && error.response.status < 500 )){
        let message = (error.response && error.response.data && error.response.data.message) || 'Something went wrong. Please try again later.';
        dispatch({ type: MESSAGE_API_400, payload: message })
    } else if (error.response && (error.response.status >= 500 )){
        const message = 'Something went wrong. Please try again later.';
        dispatch({ type: MESSAGE_API_500, payload: message })
    }
    
}

export default apiErrorHandler;