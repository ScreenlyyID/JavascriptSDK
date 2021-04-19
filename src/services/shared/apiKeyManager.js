let _apiKeyValue = process.env.REACT_APP_API_KEY;

const APIKeyManager = {
    getAPIKey() {
        return _apiKeyValue;
    },
    setAPIKey(value) {
        _apiKeyValue = value;
    }
};

export default Object.freeze(APIKeyManager);