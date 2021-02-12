import challenge, { SET_QUOTE, actionFetchQuote } from '../../../../src/reduxModules/challenge';

import { PENDING, SUCCESS } from '../../../../src/constants/actionStatus';

import { makeMockStore, moxiosInit, mockSuccess, mockError } from '../../_utils';

describe('Challenge Actions', () => {
    moxiosInit();
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('sends successful api request link action challenge', async() => {
        const store = makeMockStore({});

        await store.dispatch(actionFetchQuote());
        let actual = store.getActions();
  
        let expected = [
            {
                type: SET_QUOTE + PENDING
            }, {
                type: SET_QUOTE + SUCCESS,
                payload: {}
            }
        ]
        
        expect(actual).toMatchObject(expected);
    });
})