import {STORE_PROC_EVALUATION, FETCH_WHEEL_DATA} from '../config';
import {dataRequestAction, dataReceivedAction, errorAction} from '../utils'
import {REQUEST_WHEEL_DATA, RECEIVE_WHEEL_DATA, WHEEL_DATA_FETCH_FAILED, REMOTE_BASE_URL,
    REMOTE_WHEEL_EVALUATION_PATH, AUTHENTICATION_ERROR, NETWORK_ERROR, SERVER_ERROR,
    NOT_FOUND} from '../config'
import store from '../store'
import {initialize} from 'redux-form'
import {logoutAndRedirect} from './userActions'

export const storeProcEvaluation = (answers) => {
    return {
        type: STORE_PROC_EVALUATION,
        answers
    }
}

export const fetchWheelData = (token) => {

    return (dispatch) => {

        dispatch(dataRequestAction(REQUEST_WHEEL_DATA))

        const url = `${REMOTE_BASE_URL}${REMOTE_WHEEL_EVALUATION_PATH}`

        let headers = new Headers()
        headers.append("Accept", "application/json")
        headers.append("Content-Type", "application/json")
        headers.append("Authorization", `Token ${token}`)

        const options = {
            method: "GET",
            headers
        }

        let statusCode = -1
        return fetch(url, options).then((response) => {

            statusCode = response.status
            let error = ""

            if (statusCode >= 200 && statusCode < 300){
                return response.json()
            } else if (statusCode == 401){
                error = AUTHENTICATION_ERROR
                dispatch(logoutAndRedirect())
            }else if (statusCode === 404){
                //do nothing
            } else if (statusCode >= 500) {
                error = SERVER_ERROR
            } else if (statusCode == -1){
                error = NETWORK_ERROR
            }

            return Promise.reject(error)

        }).then((jsonResponse) => {

            const evaluation = JSON.parse(jsonResponse.evaluation)
            dispatch(dataReceivedAction(RECEIVE_WHEEL_DATA, evaluation))
            dispatch(initialize('wheelInputForm', evaluation)) //initialize form with returned values
            return Promise.resolve()
        }).catch((error) => {

            dispatch(errorAction(WHEEL_DATA_FETCH_FAILED, error))
            console.log(store.getState())
        })

    }

}