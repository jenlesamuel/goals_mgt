import { REQUEST_PAGED_TASKS, RECEIVE_PAGED_TASKS, FETCH_ERROR_PAGED_TASKS, SERVER_ERROR, NETWORK_ERROR,
    GENERIC_ERROR } from '../config' 
import { dataRequestAction, dataReceivedAction, statusAction, checkStatus, parseResponse } from '../utils'
import { logoutAndRedirect } from './userActions'

export const fetchPagedTasks = (token, url) => {
    
    return (dispatch) => {

        dispatch(dataRequestAction(REQUEST_PAGED_TASKS))
        
        let headers = new Headers()
        headers.append("Content-Type", "application/json")
        headers.append("Accept", "application/json")
        headers.append("Authorization", `Token ${token}`)

        const options = {
            method: "GET",
            headers
        }

        return fetch(url, options)
        .then(checkStatus)
        .then(parseResponse)
        .then( jsonResponse => {
            dispatch(datReceivedAction(RECEIVE_PAGED_TASKS, jsonResponse))
        }).catch( error => {
             if (error.response && typeof error.response !== "undefined" && error.response.status === 401 ){
                 dispatch(logoutAndRedirect())
             }else if (error && typeof error.response !== "undefined" && error.response.status >= 500){
                dispatch(statusAction( FETCH_ERROR_PAGED_TASKS ,SERVER_ERROR))
             } else if ( error && typeof error.response !== "undefined"){
                 dispatch(statusAction(FETCH_ERROR_PAGED_TASKS,GENERIC_ERROR))
             } else {
                 dispatch(statusAction(FETCH_ERROR_PAGED_TASKS,NETWORK_ERROR))
             }
        })
    }
}