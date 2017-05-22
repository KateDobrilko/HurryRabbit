import {LOGIN_TAB_TOGGLE} from './types';

export function toggleLoginTab(tabName) {
    return {
        type: LOGIN_TAB_TOGGLE,
        tabName
    }
}