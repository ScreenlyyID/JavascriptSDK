import request from '../shared/medicScan';

function getMedicScanResults(data, correlationID) {
    return request({
        url: `/api/v1/MedicalCard?subscriptionId=${data.subscriptionID}&instanceId=${data.instanceID}`,
        method: 'GET',
        headers: {
            "X-Correlation-ID": correlationID
        }
    })
}

const MedicScanService = {
    getMedicScanResults
};

export default MedicScanService;