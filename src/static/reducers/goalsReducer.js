import {REQUEST_DASHBOARD_GOALS, RECEIVE_DASHBOARD_GOALS,FETCH_ERROR_DASHBOARD_GOALS,
    REQUEST_PAGED_GOALS, RECEIVE_PAGED_GOALS, FETCH_ERROR_PAGED_GOALS, REQUEST_LONE_GOAL,
RECEIVE_LONE_GOAL, FETCH_ERROR_LONE_GOAL } from '../config';

const initialState = {
        dashboard:{
            isFetching: false,
            items: null,
            statusText:null
        },
         paged:{
            isFetching: true,
            data: null,
            statusText:null
        },
        lone:{
            isFetching: false,
            item: null,
            statusText: null
        }
}

const goalsReducer = (state=initialState, action) => {

    let dashboardState = {}
    let pagedState = {}
    let loneState = {}
    let payload = {}
    let error = null

    switch(action.type){
        
        case REQUEST_DASHBOARD_GOALS:
            dashboardState = Object.assign({}, state.dashboard, {isFetching: true, items:null, fetchError: null});
            return Object.assign({}, state, {dashboard: dashboardState})
            
        case RECEIVE_DASHBOARD_GOALS:
            const  items = action.payload.data
            dashboardState = Object.assign({}, state.dashboard, {isFetching: false, items:items, fetchError: null});
            return  Object.assign({}, state, {dashboard: dashboardState})


        case FETCH_ERROR_DASHBOARD_GOALS:
            error = action.payload.statusText;
            dashboardState = Object.assign({}, state.goals, {fetchError: error, isFetching: false, items:null});
            return Object.assign({}, state, {dashboard: dashboardState})
        
        case REQUEST_PAGED_GOALS:
            pagedState = Object.assign({}, state.paged, {isFetching: true, data: null, statusText:null})
            return Object.assign({}, state, {paged: pagedState})

        case RECEIVE_PAGED_GOALS:
            pagedState = Object.assign({}, state.paged, {
                isFetching: false,
                data: action.payload.data,
                statusText: null
            })
            return Object.assign({}, state, {paged: pagedState})
        
        case FETCH_ERROR_PAGED_GOALS:
            pagedState = Object.assign({}, state.paged, {isFetching: false, data: null, statusText: action.payload.statusText})
            return Object.assign({}, state, {paged: pagedState})

        case REQUEST_LONE_GOAL:
            loneState = Object.assign({}, state.lone, {isFetching: true, item: null, statusText: null})
            return Object.assign({}, state, {lone: loneState})

        case RECEIVE_LONE_GOAL:
            payload = action.payload
            let item = payload.data

            loneState = Object.assign({}, state.lone, {isFetching: false, item:item, statusText: null })
            return Object.assign({}, state, {lone: loneState})

        case FETCH_ERROR_LONE_GOAL:

            loneState = Object.assign({}, state.lone, {
                isFetching: false,
                item: null,
                statusText: action.payload.statusText })
            return Object.assign({}, state, {lone: loneState})

        default:
            return state;

    }
}

export default goalsReducer;