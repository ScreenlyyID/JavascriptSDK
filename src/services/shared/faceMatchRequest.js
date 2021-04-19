import axios from 'axios';
import APIKeyManager from './apiKeyManager';
/*
 global window
 */

const client = (() => {
    return axios.create({
        baseURL: process.env.REACT_APP_FRM_ENDPOINT
    });
})();

const request = function(options, store) {
    const onSuccess = function(response) {
        console.debug('Request Successful!', response);
        return response.data;
    };

    const onError = function(error) {
        return Promise.reject(error.response || error.message);
    };

    const apiKey = APIKeyManager.getAPIKey();

    if (process.env.NODE_ENV === 'development') {
        options.headers = {
            ...options.headers,
            "x-api-key": apiKey,
            'Accept': 'application/json;charset=utf-8',
            'Content-Type': 'application/json;charset=utf-8',
        };
    } else {
        options.headers = {
            ...options.headers,
            "x-api-key": apiKey,
            'Accept': 'application/json;charset=utf-8',
            'Content-Type': 'application/json;charset=utf-8',
        };
    }

    return client(options)
        .then(onSuccess)
        .catch(onError);
};


export default request;
