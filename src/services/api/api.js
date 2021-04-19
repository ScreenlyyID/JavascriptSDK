import get from '../shared/get';
import request from '../shared/request';
var pjson = require('../../../package.json');


function getDocInstance() {
    return get({
        url: '/Document/Instance',
        method: "POST",
        data: {
            "AuthenticationSensitivity": 0,
            "ClassificationMode": 0,
            "Device": {
                "HasContactlessChipReader": false,
                "HasMagneticStripeReader": false,
                "SerialNumber": "JavaScriptWebSDK " + pjson.version,
                "Type": {
                    "Manufacturer": "xxx",
                    "Model": "xxx",
                    "SensorType": 3,
                }
            },
            "ImageCroppingExpectedSize": 0,
            "ImageCroppingMode": 0,
            "ManualDocumentType": null,
            "ProcessMode": 0,
            "SubscriptionId": ""
        }
    });
}

function postImage(instanceID, correlationID, side, file) {
    return request({
        url: `/Document/${instanceID}/Image?side=${side}&light=0&metrics=true`,
        method: 'POST',
        data: file,
        headers: {
            "X-Correlation-ID": correlationID
        }
    })
}

function replaceImage(instanceID, correlationID, side, file) {
    return request({
        url: `/Document/${instanceID}/Image?side=${side}&light=0&metrics=true`,
        method: 'PUT',
        data: file,
        headers: {
            "X-Correlation-ID": correlationID
        }
    })
}

function postFrontImage(instanceID, file) {
    return request({
        url: '/Document/' + instanceID + '/Image?side=0&light=0&metrics=true',
        method: 'POST',
        data: file
    });
}

function getClassification(instanceID, correlationID){
    return request({
        url: '/Document/' + instanceID + '/Classification',
        method: 'GET',
        headers: {
            "X-Correlation-ID": correlationID
        }
    });
}

function postBackImage(instanceID, file) {
    return request({
        url: '/Document/' + instanceID + '/Image?side=1&light=0&metrics=true',
        method: 'POST',
        data: file
    });
}

function getImage(instanceID, side) {
    return request({
        url: '/Document/' + instanceID + '/Image?side='+side+'&light=0',
        method: 'GET',
        responseType: 'arraybuffer'
    });
}

function getImageQualityMetric(instanceID,side) {
    return request({
        url: '/Document/' + instanceID + '/Image/Metrics?side='+side+'&light=0',
        method: 'GET',
    });
}

function getFaceImage(instanceID) {
    return request({
        url: '/Document/' + instanceID + '/Field/Image?key=Photo',
        method: 'GET',
        responseType: 'arraybuffer'
    });
}

function getSignatureImage(instanceID) {
    return request({
        url: '/Document/' + instanceID + '/Field/Image?key=Signature',
        method: 'GET',
        responseType: 'arraybuffer'
    });
}

/**
 * TODO!!!!
 * instance id will fail if you already called this !!!
 * @param instanceID
 * @returns {*}
 */
function getResults(instanceID, correlationID) {
    
    return request({
        url: '/Document/' + instanceID,
        method: 'GET',
        headers: {
            "X-Correlation-ID": correlationID
        }
    });
}


const ApiService = {
    getDocInstance,
    postFrontImage,
    getClassification,
    getImage,
    postBackImage,
    getImageQualityMetric,
    getFaceImage,
    getResults,
    getSignatureImage,
    postImage,
    replaceImage
};

export default ApiService;