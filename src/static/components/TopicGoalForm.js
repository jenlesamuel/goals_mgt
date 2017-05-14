import React from 'react';
import {Field, reduxForm, initialize} from 'redux-form';
import {v4} from 'node-uuid';
import TextQuestion from './TextQuestion';
import {LIFE_COMPONENTS} from '../config';
import {connect} from 'react-redux'
import store from '../store'
import 'react-widgets/lib/less/react-widgets.less'
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import moment from 'moment'
import momentLocalizer from 'react-widgets/lib/localizers/moment'

momentLocalizer(moment)

const renderField = (props) => {
    const {input, type, label} = props;

    return (
        <div className='col-md-5'>
            <input {...input} type={type} placeholder={label}/>
        </div>
    );

}

const renderSelect = (props) => {
    const {input} = props;

    return (
        <div className='col-md-5 col-md-offset-1'>
            <select {...input}>
                {
                    LIFE_COMPONENTS.map((component, index) => {
                        return <option key={v4()} value={index+1}>{component.value}</option>
                    })
                }
            </select>
        </div>
    )
}

const renderDateField = (props) => {
    const {input:{onChange, value, name}} = props

    return (
        <DateTimePicker name={name} time={false} onChange = {onChange} format="DD MMM YYYY"
        value={!value ? new Date() : new Date(value)}/>
    )
}

// Populates questions. Value of name key is the name of the text field
// Value of text key is  the question

const questions = [
    {name: "goal-q1", text: "Why do you need this Goal?"},
    {name: "goal-q2", text: "How will you know you have achieved it?"},
    {name: "goal-q3", text: "What won’t happen if you don’t achieve this Goal?"},
    {name: "goal-q4", text: "What will this Goal do for you?"},
    {name: "goal-q5", text: "In a single sentence, summarise your answers with an affirmative statement"},
];

let TopicGoalForm = (props) => {
    const {handleSubmit} = props;
    
    return (
        <div>
            <form onSubmit={handleSubmit} method="POST">

                <div id='topic-goal-section' className='row'>
                    <Field name="component" component={renderSelect} />
                    <Field name="title" component={renderField} type="text" label="Goal"/>

                </div>
                <div className="row">
                    <div className="col-md-4"><Field name="start-date"
                                                     component={renderDateField} /></div>
                    <div className="col-md-4 col-md-offset-1"><Field name="end-date"
                                                     component={renderDateField} /></div>
                </div>

                <div className='row'>
                    {/*Display questions */}

                    {
                        questions.map((question, index) => {

                           return (
                                    <div key={v4()} className={'col-md-5 ' + (index%2 === 0 ? 'col-md-offset-1' : '')}>
                                        <TextQuestion key={v4()} name={question.name} question={question.text}/>
                                    </div>
                               )
                        })
                    }

                </div>

                <div className='row'>
                    <div className='col-md-5 col-md-offset-1'>
                    <button type='submit'>Next</button>
                    </div>
                </div>
                
            </form>
        </div>
    );
}


TopicGoalForm.propTypes = {
   onSubmit: React.PropTypes.func.isRequired,
}

export default reduxForm({
    form: 'goalsForm',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(TopicGoalForm);