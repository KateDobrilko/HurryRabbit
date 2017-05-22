import {LOGIN_TAB_TOGGLE} from '../actions/types';


const initialState = {
    toggledLoginTabName: 'login'
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case LOGIN_TAB_TOGGLE:
            return {
                toggledLoginTabName: action.tabName
            };
        default:
            return state
    }
}