import {combineReducers} from 'redux';
import flashMessages from './reducers/flashMessages';
import auth from './reducers/auth';
import uiReducer from './reducers/uiReducer';

export default combineReducers({
    flashMessages, auth, uiReducer
});