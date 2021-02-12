import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';

export const startState = {};
export const mockStore = configureMockStore([thunk]);

export const makeMockStore = (state = {}) => mockStore({
    ...startState,
    ...state
});

export const moxiosInit = () => {
    beforeEach(() => moxios.install);
    afterEach(() => moxios.uninstall);
}

export const mockSuccess = data => ({ status: 200, response: data });

export const mockError = (status, errMsg = 'invalid data') => {
    const res = {
        status,
        response: {
            message: errMsg
        }
    }

    return(res);
}
