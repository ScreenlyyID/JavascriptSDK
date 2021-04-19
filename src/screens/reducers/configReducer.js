export function configReducer(state = {}, action) {
    switch (action.type) {
        case '@@acuant/SET_INSTANCE_ID':
            return {
                ...state,
                instanceID: action.data.data,
                correlationID: action.data.headers['x-correlation-id']
            };
        case '@@acuant/FRONT_ID_SUBMITTED':
            return {
                ...state,
                frontSubmitted: true
            }
        case '@@acuant/BACK_ID_SUBMITTED':
            return {
                ...state,
                backSubmitted: true
            }
        case '@@acuant/RESET_CONFIG':
            return {
                ...state,
                instanceID: null,
                frontSubmitted: false,
                backSubmitted: false
            }
        default:
            return state;
    }
}