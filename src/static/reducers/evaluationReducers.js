import {STORE_PROC_EVALUATION, REQUEST_WHEEL_DATA, RECEIVE_WHEEL_DATA, WHEEL_DATA_FETCH_FAILED} from '../config';

export const procrastinationReducer = (state={}, action) => {

    switch(action.type) {

        case STORE_PROC_EVALUATION:
            const {answers} = action;
            return Object.assign({}, state, {answers: answers})

        default:
            return state;
    }
}


const initialWheelState = {
    isFetching: false,
    item: null,
    errorText: null
}

export const wheelReducer = (state=initialWheelState, action) => {

    switch (action.type) {

        case REQUEST_WHEEL_DATA:
            return Object.assign({}, state, {isFetching: true})

        case RECEIVE_WHEEL_DATA:
            return Object.assign({}, state, {isFetching: false, item: action.payload.data, errorText: null})

        case WHEEL_DATA_FETCH_FAILED:
            return Object.assign({}, state, {isFetching: false, item: null, errorText: action.payload.error})

        default:
            return state;
    }
}
