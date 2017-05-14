import {STORE_USER, LOGOUT} from '../config';
import {browserHistory} from 'react-router'
import {LOGIN_PATH} from '../config'

export const storeUser = (user_data) => {

    return {
        type: STORE_USER,
        payload: {
            user_data
        }
    };
}

const logout = () => {
    localStorage.clear()
    return {
        type: LOGOUT
    }
}

export const logoutAndRedirect = () => {
    return (dispatch) => {
        dispatch(logout)
        browserHistory.replace(LOGIN_PATH)
    }
}