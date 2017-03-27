import axios from 'axios';
import {SET_CURRENT_USER} from './types';

export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    }
}

export function getCurrentUser() {
    return dispatch => {
        return axios.get('/api/current-user').then(
            (user) => {
                dispatch(setCurrentUser(user.data));
            }
        )
    }
}