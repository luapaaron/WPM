import cookie from 'js-cookie';
import { WPM_TOKEN } from '../constants/cookies';

const clearStorage = () => {
    cookie.remove(WPM_TOKEN);
}

export default clearStorage;