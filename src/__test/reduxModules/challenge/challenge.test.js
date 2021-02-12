import challenge, { SET_QUOTE } from '../../../../src/reduxModules/challenge';
import { PENDING, SUCCESS } from '../../../../src/constants/actionStatus';

describe('challenge reducer', () => {
    const initialState = {
        fetchingQuotePending: false,
        quote: ''
    };

    it('should return the initial state', () => {
        expect(challenge(undefined, undefined)).toStrictEqual(initialState);
    });

    it('shoud change the state during getting new Quote pending', () => {
        const expectedState = {
            ...initialState,
            fetchingQuotePending: true
        };

        const action = {
            type: SET_QUOTE + PENDING
        };

        expect(challenge(undefined, action)).toStrictEqual(expectedState);
    });

    it('shoud change the state during getting new Quote pending', () => {
        const expectedState = {
            ...initialState,
            quote: 'new quote'
        };

        const action = {
            type: SET_QUOTE + SUCCESS,
            payload: {
                data: 'new quote'
            }
        };

        expect(challenge(undefined, action)).toStrictEqual(expectedState);
    });
});