
import axios from 'axios';
import { PENDING, SUCCESS, ERROR } from '../../constants/actionStatus';

import { SET_QUOTE } from './index';

import errorHandler from '../../utils/apiErrorHandler';

export const actionFetchQuote = () => async (dispatch, getState) => {
    try {
        dispatch({ type: SET_QUOTE + PENDING });

        await axios
            .get('https://baconipsum.com/api/?type=meat-and-filler')
                .then((response) => {
                    dispatch({ type: SET_QUOTE + SUCCESS, payload: response });
                })
                .catch((err) => {
                    console.log(err);
                });
        
    } catch (error) {
        errorHandler(error, dispatch);
        dispatch({ type: SET_QUOTE + ERROR, payload: error });
    }
}

