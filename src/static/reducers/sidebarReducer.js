import {TOGGLE_SIDEBAR} from '../config';

const initialState = false;

export const sidebarReducer = (state=initialState, action) => {
    switch(action.type) {
        case TOGGLE_SIDEBAR:
            return !state;

        default:
            return state;
    }
}