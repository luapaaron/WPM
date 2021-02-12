
import axios from 'axios';
import cookie from 'js-cookie';
import update from 'immutability-helper';

import { PENDING, SUCCESS, ERROR } from '../../constants/actionStatus';
import { WPM_TOKEN } from '../../constants/cookies';
import { SET_USER, SAVE_WPM } from './index';

import errorHandler from '../../utils/apiErrorHandler';

import isEmpty from '../../utils/isEmpty';


export const actionFetchUser = () => async (dispatch, getState) => {
    const users = getState().user.users;

    if(isEmpty(users)){
        try {
            dispatch({ type: SET_USER + PENDING });
            await axios
            .get('https://json.extendsclass.com/bin/67fdf02013bb')
                .then((response) => {
                    dispatch({ type: SET_USER + SUCCESS, payload: response });
                })
                .catch((err) => {
                    console.log(err);
                });
    
        } catch (error) {
            errorHandler(error, dispatch);
            dispatch({ type: SET_USER + ERROR, payload: error });
        }
    }
}

export const actionUpdateUser = (result) => async (dispatch, getState) => {
    try {
        const id = cookie.get(WPM_TOKEN);

        if(!isEmpty(id)){
            const oldData = getState().user.users;
            const recordIdx = oldData.filter(user => user.id === parseInt(id));
            
            if(!isEmpty(recordIdx)){

                const userId = recordIdx[0].id;
                const res = [{
                    "WPM": result.wpm,
                    "Errors": result.errorRes,
                    "Accuracy": result.accuracyRes,
                    "CompletionRate": result.completionRate,
                    "Timestamp": Math.round((new Date()).getTime() / 1000)
                }];
    
                const newData = update(oldData, { 
                    [userId] : {
                        history : {$push: res}
                    }
                });
        
                dispatch({ type: SAVE_WPM + PENDING });
                await axios
                .put('https://json.extendsclass.com/bin/67fdf02013bb', newData)
                    .then((response) => {
                        dispatch({ type: SAVE_WPM + SUCCESS, payload: newData });
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
            
        }
        

    } catch (error) {
        errorHandler(error, dispatch);
        dispatch({ type: SAVE_WPM + ERROR, payload: error });
    }
}
