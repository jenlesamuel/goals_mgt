import {RECEIVE_PAGED_TASKS, REQUEST_PAGED_TASKS, FETCH_ERROR_PAGED_TASKS} from '../config'

const initialState = {
    paged: {
        isFetching: true,
        data: null,
        statusText: null
    }
}

export const taskReducer = (state=initialState, action) => {

    let pagedState = null

    switch (action.type) {

        case REQUEST_PAGED_TASKS:
            pagedState = Object.assign({}, state.paged, {isFetching: true, data: null, statusText: null})
            return Object.assign({}, state, {paged: pagedState})

        case RECEIVE_PAGED_TASKS:
            pagedState = Object.assign({}, state.paged, {isFetching: false, data: action.payload.data, statusText: null})
            return Object.assign({}, state, {paged: pagedState})

        case FETCH_ERROR_PAGED_TASKS:
            pagedState = Object.assign({}, state.paged, {isFetching: false, data: null, statusText: action.payload.statusText})
            return Object.assign({}, state, {paged: pagedState})

        default:
            return state
    }
}