import request from '../shared/faceMatchRequest';

function postSanctionForm(data, correlationID) {
    return request({
        url: '/sanctions/match',
        method: 'POST',
        data: data,
        headers: {
            "X-Correlation-ID": correlationID
        }
    });
}

const SanctionService = {
    postSanctionForm
};

export default SanctionService;