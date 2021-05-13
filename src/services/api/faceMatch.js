import request from '../shared/faceMatchRequest';


function processFaceMatch(data, correlationID) {
    return request({
        url: '/api/v1/facematch',
        method: 'POST',
        data: data,
        headers: {
            "X-Correlation-ID": correlationID
        }
    });
}



function processLiveness(data, correlationID) {
    return request({
        url: '/api/v1/liveness',
        method: 'POST',
        data: data,
        headers: {
            "X-Correlation-ID": correlationID
        }
    });
}

const FaceMatchService = {
    processFaceMatch,
    processLiveness
};

export default FaceMatchService;