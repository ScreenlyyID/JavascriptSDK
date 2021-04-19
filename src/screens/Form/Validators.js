import moment from "moment";


export function inputValidator(fieldName, fieldValue) {
    if (fieldValue.trim() === '') {
        return `${fieldName} is required`;
    }
    if (fieldValue.trim().length < 2) {
        return `${fieldName} needs to be at least two characters`;
    }
    return null;
};

export function dateValidator(fieldName, fieldValue) {
    if (fieldValue.trim() === '') {
        return `${fieldName} is required`;
    }
    if (!moment(fieldValue, 'YYYY-MM-DD', true).isValid()) {
        return `${fieldName} is not valid date`;
    }
    return null;
};