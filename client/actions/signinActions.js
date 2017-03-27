import axios from 'axios';

export function userSigninRequest(userData) {
    return dispatch => {
        return axios.post('/api/signin', userData);
    };
}

