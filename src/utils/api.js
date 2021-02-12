
import { request } from 'axios';
import config from '../constants/serverConfig.js';

let axiosConfig = {
    baseURL: config.SERVER_BASE_URL
};

const api = (options = {}) => {

    const finalOptions = {
        ...axiosConfig,
        ...options,
        headers: {
            ...axiosConfig.headers,
            ...options.headers,
            "Access-Control-Allow-Origin" : "*"
        }
    }

    return request({ ...finalOptions });
};

export default api;