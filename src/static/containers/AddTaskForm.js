import React from 'react'
import {SubmissionError, reduxForm, Field} from 'redux-form'
import Spinner from '../components/Spinner'
import {initialize} from 'redux-form'
import {REMOTE_BASE_URL, REMOTE_TASK_PATH, SERVER_ERROR, TASK_CREATION_SUCCESS, GENERIC_ERROR, NETWORK_ERROR} from '../config'
import {checkStatus, parseResponse, statusAction } from '../utils'
import {logoutAndRedirect} from '../actions/userActions'

class AddTaskForm extends React.Component{

    constructor(props){
        super(props)

        this.doSubmit = this.doSubmit.bind(this)
    }

    static propTypes = {
        goalTitle: React.PropTypes.string.isRequired,
        goalId: React.PropTypes.string.isRequired,
        lifeCompName: React.PropTypes.string.isRequired,
        lifeCompIndex: React.PropTypes.number.isRequired,
        dispatch: React.PropTypes.func.isRequired,
        myToken: React.PropTypes.string.isRequired
    }

    doSubmit = (values, dispatch, props) => {
        const url = `${REMOTE_BASE_URL}${REMOTE_TASK_PATH}`

        let headers = new Headers()
        headers.append('Content-Type', 'application/json')
        headers.append('Accept', 'application/json')
        headers.append('Authorization', `Token ${props.myToken}`)

        const title = values.title
        const body = {
            title,
            values: JSON.stringify(values)
        }
        const options = {
            method: 'POST',
            headers,
            body: JSON.stringify(body)
        }

        return fetch(url, options)
            .then(checkStatus)
            .then(parseResponse)
            .then(jsonResponse => {
                console.log(jsonResponse)
                dispatch(initialize('addTaskForm', {
                    'title': '',
                    'description': ''
                }))
            }).catch(error => {
                if (error && typeof error.response !== 'undefined' && error.response.status === 401){
                    dispatch(logoutAndRedirect())
                } else if (error && typeof error.response !== 'undefined' && error.response.status === 500) {
                    throw new SubmissionError({_error: SERVER_ERROR})
                } else if (error && typeof error.response !== 'undefined' && error.response.status === 400) {
                    parseResponse(error.response)
                        .then(response => {
                            throw new SubmissionError({_error: "Title already exist"})
                    })
                } else if (error && typeof error.response !== 'undefined') {
                    throw new SubmissionError({_error: GENERIC_ERROR})
                } else {
                    throw new SubmissionError({_error: NETWORK_ERROR})
                }
            })
    }

    renderHiddenField = (props) => {
        const {input, type } = props
        return (
            <div>
                <input {...input} type={type}/>
            </div>
        )
    }

    renderTextField = (props) => {
        const {input, meta:{touched, error}, ...rest} = props
        return (
            <div className='form-group auth-input'>
                <input {...input} {...rest}  className='form-control'/>
                {touched && error && <div className='error'>{error}</div>}
            </div>
        )
    }

    renderTextArea = (props) => {
        console.log(this.props)
        const {input, meta:{touched, error}, ...rest} = props
        return (
            <div className='form-group auth-input'>
                <textarea {...input} {...rest} className='form-control'/>
                {touched && error && <div className='error'>{error}</div>}
            </div>
        )
    }

    componentWillMount(){
        const initialValues = {
            'title': '',
            'description': '',
            'goal-id': this.props.goalId,
            'life-comp-index': this.props.lifeCompIndex
        }

        this.props.dispatch(initialize('addTaskForm', initialValues))
    }

    render(){
        const {handleSubmit, submitting, submitFailed, pristine, error,
            goalTitle, lifeCompName, submitSucceeded} = this.props
        console.log(this.props)
        return (
            <div>
                <div>{goalTitle}</div>
                <div>{lifeCompName}</div>
                <div>
                    {(submitFailed && error && <div>{error}</div>) || (submitSucceeded &&<div>{TASK_CREATION_SUCCESS}</div>)}

                    <form onSubmit={handleSubmit(this.doSubmit)} method="POST">
                        <Field name='title'
                               type='text' component={this.renderTextField} placeholder="Enter Task Title"/>
                        <Field name='description'
                               component={this.renderTextArea} placeholder="Enter brief description" rows="3" cols="20"/>
                        <Field name='goal-id' component={this.renderHiddenField} type="hidden" />
                        <Field name='life-comp-index' component={this.renderHiddenField} type="hidden"/>
                        <button type='submit' disabled={pristine || submitting}>{submitting ? <Spinner /> : 'Add Task'}</button>
                    </form>
                </div>
            </div>
        )
    }


}

export default reduxForm({
        form: 'addTaskForm',
})(AddTaskForm)