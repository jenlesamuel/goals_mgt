import {STORE_USER, LOGOUT} from '../config';
import store from '../store';

const initialState = {
        isAuthenticated: false,
        fullname: null,
        token: null,
    };

export const userReducer = (state = initialState, action) => {

    switch(action.type){

        case STORE_USER:
            const {user_data} = action.payload;
            return Object.assign({}, state, {
                isAuthenticated: true,
                fullname: user_data.fullname,
                token: user_data.token
            });

        default:
            return state;
    }
}