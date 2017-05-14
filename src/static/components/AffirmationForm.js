import React from 'react';
import {reduxForm, SubmissionError} from 'redux-form';
import TextQuestion from './TextQuestion';
import {v4} from 'node-uuid';
import {REMOTE_BASE_URL, REMOTE_GOALS_PATH, SERVER_ERROR, NETWORK_ERROR, GENERIC_ERROR,
    ALL_GOALS_PATH, DASHBOARD_PATH, NOT_FOUND_ERROR} from '../config';
import fetch from 'isomorphic-fetch';
import {browserHistory} from 'react-router'
import {parseResponse, checkStatus, dataRequestAction, dataReceivedAction,errorAction } from '../utils'
import Spinner from './Spinner'
import {logoutAndRedirect} from '../actions/userActions'


class AffirmationForm extends React.Component {

    constructor(props) {
        super(props)
        this.doSubmit = this.doSubmit.bind(this)
    }


    static propTypes = {
        previousPage: React.PropTypes.func.isRequired,
        myToken: React.PropTypes.string.isRequired,
        goalId: React.PropTypes.string
    }

    questions = [
        {name: "affirmation-q1", text: "Final affirmation"},
    ];

    doSubmit = (values, dispatch, props) => {

        const method = props.goalId !== null ? "PUT" : "POST"
        const goalIdPath = props.goalId !== null ? `${props.goalId}/` : ""
        const url = `${REMOTE_BASE_URL}${REMOTE_GOALS_PATH}${goalIdPath}`
        const title = values.title
        const body = JSON.stringify({values: JSON.stringify(values), title});
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Accept", "application/json");
        headers.append("Authorization", `Token ${props.myToken}`)
        const options = {
            method,
            body,
            headers
        }

        return fetch(url, options)
            .then(checkStatus)
            .then(parseResponse)
            .then((jsonResponse) => {
                browserHistory.replace(DASHBOARD_PATH)
            }).catch((error) => {
                if (error && typeof error.response !== 'undefined' && error.response.status === 401) {
                    dispatch(logoutAndRedirect())
                }  else if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
                    throw new SubmissionError({_error: SERVER_ERROR})
                } else if (error && typeof error.response !== 'undefined'){
                    throw new SubmissionError({_error: GENERIC_ERROR})
                } else {
                    throw new SubmissionError({_error: NETWORK_ERROR})
                }
            })
    }

    render() {
        const {handleSubmit, previousPage, error, submitFailed, submitting} = this.props;

        return (
            <div>
                {(submitFailed || error) && <span>{error}</span>}
                <form onSubmit={handleSubmit(this.doSubmit)} method="POST">
                    {
                        this.questions.map((question) => <TextQuestion key={v4()} name={question.name} question={question.text}/>)
                    }
                    <button onClick={previousPage}>Previous</button>
                    <button type="submit">{submitting ?  <Spinner /> : 'Submit'}</button>
                </form>
            </div>
        )
    }
}

export default reduxForm({
    form: 'goalsForm',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(AffirmationForm);