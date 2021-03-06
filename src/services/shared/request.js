import axios from 'axios'
import axiosRetry from 'axios-retry';
import APIKeyManager from './apiKeyManager';
/*
 global window
 */

const client = (() => {
    return axios.create({
        baseURL: process.env.REACT_APP_ID_ENDPOINT
    });
})();

// axiosRetry(client, { retries: 3 });

const request = function(options, store) {
    const onSuccess = function(response) {
        return response.data;
    };

    const onError = function(error) {
        console.log(error);
        return Promise.reject(error.response || error.message);
    };

    const apiKey = APIKeyManager.getAPIKey();

    if (process.env.NODE_ENV === 'development') {
        options.headers = {
            ...options.headers,
            "x-api-key": apiKey,
        };
    } else {
        options.headers = {
            ...options.headers,
            "x-api-key": apiKey,
        };
    }

    return client(options)
        .then(onSuccess)
        .catch(onError);
};


export default request;
