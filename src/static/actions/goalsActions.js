import {REQUEST_DASHBOARD_GOALS, RECEIVE_DASHBOARD_GOALS, REMOTE_BASE_URL, REMOTE_GOALS_PATH,
    NETWORK_ERROR ,FETCH_ERROR_DASHBOARD_GOALS, SERVER_ERROR, GENERIC_ERROR, REQUEST_PAGED_GOALS, RECEIVE_PAGED_GOALS, FETCH_ERROR_PAGED_GOALS,
    REMOTE_PAGED_GOALS_PATH, REQUEST_LONE_GOAL, RECEIVE_LONE_GOAL, FETCH_ERROR_LONE_GOAL , GOALS_PATH} from '../config';
import fetch from 'isomorphic-fetch';
import {checkStatus, parseResponse, dataRequestAction, dataReceivedAction, statusAction} from '../utils'
import {browserHistory} from 'react-router'
import store from '../store'
import {logoutAndRedirect} from '../actions/userActions'
import { initialize } from 'redux-form'

export const fetchDashboardGoals = (token, limit) => {

    return (dispatch) => {

        dispatch(dataRequestAction(REQUEST_DASHBOARD_GOALS))

        const url = `${REMOTE_BASE_URL}${REMOTE_GOALS_PATH}?limit=${limit}`
        let headers = new Headers();
        headers.append("Accept", "application/json");
        headers.append("Authorization", `Token ${token}`)
        const options = {
            method: 'GET',
            headers
        }

        return fetch(url, options)
            .then(checkStatus)
            .then(parseResponse)
            .then((jsonResponse) => {
                dispatch(dataReceivedAction(RECEIVE_DASHBOARD_GOALS, jsonResponse))
            }).catch((error) => {
                if (error && typeof error.response !== 'undefined' && error.response.status === 401){
                    //authentication error
                    dispatch(logoutAndRedirect())
                }else if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
                    dispatch(statusAction(FETCH_ERROR_DASHBOARD_GOALS, SERVER_ERROR))
                } else if (error && typeof error.response !== "undefined"){
                    // catch other http errors
                    console.log(error)
                    dispatch(statusAction(FETCH_ERROR_DASHBOARD_GOALS, GENERIC_ERROR))
                } else {
                    // Most likely network error
                    dispatch(statusAction(FETCH_ERROR_DASHBOARD_GOALS, NETWORK_ERROR))
                }

            })
    }
}

export const fetchPagedGoals = (url, token) => {

    return (dispatch) => {

        dispatch(dataRequestAction(REQUEST_PAGED_GOALS));

        let headers =  new Headers()
        headers.append('Accept', 'application/json')
        headers.append('Authorization', `Token ${token}`)

        const options = {
            method: 'GET',
            headers
        }

        return fetch(url, options)
            .then(checkStatus)
            .then(parseResponse)
            .then( jsonResponse => {
                dispatch(dataReceivedAction(RECEIVE_PAGED_GOALS, jsonResponse))

            }).catch( error => {
                if (error && typeof error.response !== 'undefined' && error.response.status === 401){
                    dispatch(logoutAndRedirect())
                } else if (error && typeof error.response !== 'undefined' && error.response.status >= 500){
                    dispatch(statusAction(FETCH_ERROR_PAGED_GOALS, SERVER_ERROR))
                } else if (error && typeof error.response !== 'undefined') {
                    dispatch(statusAction(FETCH_ERROR_PAGED_GOALS, GENERIC_ERROR))
                }else{
                    dispatch(statusAction(FETCH_ERROR_PAGED_GOALS, NETWORK_ERROR))
                }
            })
    }
}

export const fetchGoal = (id, myToken) => {

    return (dispatch) => {

        dispatch(dataRequestAction(REQUEST_LONE_GOAL));
        console.log(store.getState())
        let url = `${REMOTE_BASE_URL}${REMOTE_GOALS_PATH}${id}/`
        let headers = new Headers()
        headers.append("Accept", "application/json")
        headers.append("Authorization", `Token ${myToken}`)

        const options = {
            method: "GET",
            headers
        }

        return fetch(url, options)
            .then(checkStatus)
            .then(parseResponse)
            .then(jsonResponse => {
                const goalValues = JSON.parse(jsonResponse["values"])
                dispatch(initialize('goalsForm', goalValues))
                dispatch(dataReceivedAction(RECEIVE_LONE_GOAL, goalValues))
                browserHistory.push(`/${GOALS_PATH}/?id=${id}`)
            }).catch(error => {

                if (error && typeof error.response !== 'undefined' && error.response.status === 401){
                    dispatch(logoutAndRedirect())
                } else if (error && typeof error.response !== 'undefined' && error.response.status >= 500){
                    dispatch(statusAction(FETCH_ERROR_PAGED_GOALS, SERVER_ERROR))
                } else if (error && typeof error.response !== 'undefined'){
                    dispatch(statusAction(FETCH_ERROR_LONE_GOAL, GENERIC_ERROR))
                }else{
                    dispatch(statusAction(FETCH_ERROR_LONE_GOAL, NETWORK_ERROR))
                }
            })
    }
}