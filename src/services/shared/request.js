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
        console.log("success");
        console.log(response);
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
            // "Authorization" : `${process.env.REACT_APP_AUTH_TOKEN}`,
            "x-api-key": apiKey,
        };
    } else {
        options.headers = {
            ...options.headers,
            // "Authorization" : `${process.env.REACT_APP_AUTH_TOKEN}`,
            "x-api-key": apiKey,
        };
    }

    // console.log("API KEY: " + `${process.env.REACT_APP_API_KEY}`);
    // console.log(options)

    return client(options)
        .then(onSuccess)
        .catch(onError);
};


export default request;
