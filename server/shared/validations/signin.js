import isEmpty from 'lodash/isEmpty';
import Validator from 'validator';

export default  function validateInput(data) {
    let errors = {};
    console.log(data);
    if (Validator.isEmpty(data.identifier)) {
        errors.identifier = 'This field is required';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}