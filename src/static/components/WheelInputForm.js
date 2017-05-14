import React from 'react';
import {Field, reduxForm, SubmissionError} from 'redux-form';
import {LIFE_COMPONENTS} from '../config';
import {v4} from 'node-uuid';
import fetch from 'isomorphic-fetch';
import {REMOTE_BASE_URL, REMOTE_WHEEL_EVALUATION_PATH, NETWORK_ERROR, GENERIC_ERROR,
    AUTHENTICATION_ERROR, SERVER_ERROR, DASHBOARD_PATH } from '../config';
import {browserHistory} from 'react-router';

class WheelInputForm extends React.Component {

    constructor(props){
        super(props)

        this.doSubmitEvaluation = this.doSubmitEvaluation.bind(this)
    }

    static propTypes = {
        myToken: React.PropTypes.string.isRequired,
        isFetching: React.PropTypes.bool.isRequired,
        errorText: React.PropTypes.string,
        fetchWheelData: React.PropTypes.func.isRequired
    }

    componentWillMount(){
        this.props.fetchWheelData(this.props.myToken)
    }

    doSubmitEvaluation = (values, dispatch, props) => {

        const url = `${REMOTE_BASE_URL}${REMOTE_WHEEL_EVALUATION_PATH}`;

        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Accept", "application/json");
        headers.append("Authorization", `Token ${props.token}`)

        const options = {
            method: 'POST',
            headers,
            body: JSON.stringify({evaluation: JSON.stringify(values)})
        };

        let statusCode = -1;

        return fetch(url, options).then((response) => {

            statusCode = response.statusCode;

            if (statusCode >= 200 && statusCode < 300){
                browserHistory.push(DASHBOARD_PATH)
            } else if (statusCode == 401){
                throw new SubmissionError({_error:AUTHENTICATION_ERROR})
            } else if (statusCode >= 500) {
                throw new SubmissionError({_error: SERVER_ERROR})
            } else if (statusCode == -1){
                throw new SubmissionError({_error: NETWORK_ERROR})
            }

        });
    }

    render(){
        console.log(this.props)
        return (
            <div>
                {/* Display non-field errors */}
                { this.props.submitFailed && this.props.error && <span>{this.props.error}</span>}

                <form onSubmit={this.props.handleSubmit(this.doSubmitEvaluation)}>
                {
                    LIFE_COMPONENTS.map((component, index) => {
                        return (
                            <div key={v4()}>
                                <div>{component.value}</div>

                                <label><Field name={`q${index+1}`} component='input' type='radio' value='0' />0</label>
                                <label><Field name={`q${index+1}`} component='input' type='radio' value='20' />20</label>
                                <label><Field name={`q${index+1}`} component='input' type='radio' value='40' />40</label>
                                <label><Field name={`q${index+1}`} component='input' type='radio' value='60' />60</label>
                                <label><Field name={`q${index+1}`} component='input' type='radio' value='80' />80</label>
                                <label><Field name={`q${index+1}`} component='input' type='radio' value='100' />100</label>
                            </div>
                        )

                    })
                }
                <button type='submit'>Submit</button>
                </form>
            </div>
        )
    }
}

export default reduxForm({
    'form': 'wheelInputForm',
})(WheelInputForm)

