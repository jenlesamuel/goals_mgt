import React from 'react';
import {Field, reduxForm, SubmissionError} from 'redux-form';
import {loginFormValidator} from './Validators';
import {REMOTE_BASE_URL, REMOTE_LOGIN_PATH, NETWORK_ERROR, AUTHENTICATION_ERROR, GENERIC_ERROR, SERVER_ERROR, DASHBOARD_PATH} from  '../config';
import {saveState} from '../localStorage';
import {browserHistory} from 'react-router';
import store from '../store';
import fetch from 'isomorphic-fetch';
import Spinner from './Spinner';



class LoginForm extends React.Component {
    
    constructor(props) {
        super(props);

        this.props = props;

        this.doSubmit = this.doSubmit.bind(this);
    }

    static propTypes = {
        storeUser: React.PropTypes.func.isRequired,
        location: React.PropTypes.shape({
            query: React.PropTypes.object.isRequired
        }).isRequired
    }

    doSubmit = (values, dispatch, props) => {

        const url = REMOTE_BASE_URL + REMOTE_LOGIN_PATH;
        const auth = btoa(`${values.username}:${values.password}`)
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Accept", "application/json");
        headers.append("Authorization", `Basic ${auth}`)

        const options = {
            method: "POST",
            headers,
        };

        let statusCode = -1;

        return fetch(url, options).then((response) => {

            statusCode = response.status;

            if (statusCode >= 200 && statusCode < 300) {
                return response.json()
            }
            else if (statusCode === 401) {
                throw new SubmissionError({_error: AUTHENTICATION_ERROR})
            }
            else if (statusCode >=500) {
                throw new SubmissionError({_error: SERVER_ERROR})
            }else if (statusCode === -1) {
                throw new SubmissionError({_error: NETWORK_ERROR})
            }

        }).then((jsonResponse) => {

            props.storeUser(jsonResponse);
            saveState({user: jsonResponse})
            const nextPath = props.location.query.next
            const redirectPath = nextPath ? nextPath : DASHBOARD_PATH
            browserHistory.replace(redirectPath);
        })
    }

    renderField = (props) => {
        const {input, meta: {touched, error}, ...rest} = props;
        return (
            <div className='form-group auth-input'>
                <input {...input}  {...rest} className='form-control'/>
                <div>{touched && error ? <span className='error'>{error}</span> : ''}</div>
            </div>
        )
    }

    render() {

        const {error, submitting, pristine, submitFailed, handleSubmit} = this.props;

        return (
            <div className='row non-home-content'>

                <div className="auth-form col-md-4 col-md-offset-4">

                    {/* Display non-field errors */}
                    {error && submitFailed ? <div className='non-field-error'>{error}</div>: ''}

                    <div id="message">Sign in here. </div>

                    <form onSubmit={ handleSubmit(this.doSubmit)} method="post">

                        <Field name="username" component={this.renderField} type="email" placeholder="Email" />
                        <Field name="password" component={this.renderField} type="password" placeholder="Password" />
                        <button disabled={submitting || pristine} className='btn'>{(submitting) ? <Spinner /> : 'Log In'}</button>

                    </form>

                </div>
            </div>
        )
    }
}

const config = {
    form: "LoginForm",
    validate: loginFormValidator
};

LoginForm = reduxForm(config)(LoginForm);

export default LoginForm;