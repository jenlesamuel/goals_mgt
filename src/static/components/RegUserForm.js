import React from 'react';
import '../css/App.css';
import {regFormValidator} from '../components/Validators';
import {LOGIN_PATH, NETWORK_ERROR, GENERIC_ERROR, REMOTE_BASE_URL, REMOTE_REG_PATH} from '../config';
import {browserHistory} from 'react-router';
import {reduxForm, SubmissionError, Field} from 'redux-form';
import fetch from 'isomorphic-fetch';
import Spinner from './Spinner';

const renderField = ({input, label, type, meta:{touched, error}}) => (
	<div className='form-group auth-input' >
		<input {...input} placeholder={label} type={type} className='form-control'/>
		<div>
			{touched && error ? <span className='error'>{error}</span>: ''}
		</div>
	</div>
);

const Form = (props) => {
	
	const {handleSubmit, submitFailed, error, pristine, submitting} = props;

	return (
		<div className="row non-home-content">
		<div className="auth-form col-md-4 col-md-offset-4">
			{/* Display non field errors*/}
			{ submitFailed && error ? <div className='non-field-error'>{error}</div> : ''}

			<div id="message">Create account. </div>
			<form onSubmit={ handleSubmit((values) => {
					
					const url = REMOTE_BASE_URL+REMOTE_REG_PATH;
					
					const headers = new Headers();
					headers.append("Content-Type", "application/json");
					headers.append("Accept", "application/json");

					const options = {
						method: "POST",
						headers: headers,
						body: JSON.stringify(values)
					};
					
					let statusCode = -1;

					return fetch(url, options).then((response) => {

						statusCode =  response.status;
						return response.json();

					},(error) => {

						// network error occured
						throw new SubmissionError({_error: NETWORK_ERROR});

					}).then((jsonResponse) => {

						const statusCodeStr = statusCode+"";

						if (statusCodeStr.startsWith("2")){ // 2XX response

							//storeUser(jsonResponse);
							//saveState({user:jsonResponse});
							browserHistory.replace(LOGIN_PATH);

						}else if (statusCodeStr.startsWith("4")) { //4XX response

							let error = {};
							
							// Username already exist
							if (jsonResponse.username) error['username'] = jsonResponse.username[0];
							
							// Phone already exist
							if (jsonResponse.phone) error['phone'] = jsonResponse.phone[0];
							
							throw new SubmissionError(error);

						}else {

							throw new SubmissionError({_error: GENERIC_ERROR});
						}
					});

				})} method="POST" className={submitting ? '' : ''}>

				<Field name="username" component={renderField} label="Email" type="email" />
				<Field name='fullname' component={renderField} label='Full Name' type='text'/>
				<Field name='phone' component={renderField} label='Phone Number' type='text'/>
				<Field name='occupation' component={renderField} label='Occupation' type='text'  />
				<Field name='password' component={renderField} label='Password'  type='password'/> 
				<button type='submit' className={ (submitting || pristine) ? 'ctrl-disabled': ''}> {(submitting) ? <Spinner /> : 'Register'} </button>	
 
			</form>
		</div>
	</div>
	)
}

const config = {
    form: 'RegUserForm',
    validate:  regFormValidator
};

const RegUserForm = reduxForm(config)(Form);

export default RegUserForm;