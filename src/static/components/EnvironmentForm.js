import React from 'react';
import {reduxForm} from 'redux-form';
import TextQuestion from './TextQuestion';
import {v4} from 'node-uuid';

const questions = [
    {name: "env-q1", text: "What about your environment needs to change spiritually,"+
    " psychologically, intellectually, emotionally and physically for you to achieve your Goal?"},
    {name: "env-q2", text: "Who and what do you need to change in your current environment?"},
    {name: "env-q3", text: "Who and what do you need within your new environment?"},
];

const EnvironmentForm = (props) => {
    const {handleSubmit} = props;

    return (
        <div>
            <form onSubmit={handleSubmit} method="POST">
                {
                    questions.map((question) => <TextQuestion key={v4()} name={question.name} question={question.text}/>)
                }
                <button type="submit">Next</button>
            </form>
        </div>
    )
};

EnvironmentForm.propTypes = {
    onSubmit: React.PropTypes.func.isRequired
}

export default reduxForm({
    form: 'goalsForm',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(EnvironmentForm);