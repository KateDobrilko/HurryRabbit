import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import {setCurrentUser} from './userActions';

export function userSigninRequest(userData) {
    return dispatch => {
        return axios.post('/api/signin', userData).then(
            (res) => {
                const token = res.data.token;
                localStorage.setItem('jwtToken', token);
                setAuthorizationToken(token);
            }
        );
    };
}

export function logout() {
    return dispatch => {
        localStorage.removeItem('jwtToken');
        setAuthorizationToken(false);
        dispatch(setCurrentUser({}));
    }

}







