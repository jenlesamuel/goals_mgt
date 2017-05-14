import React from 'react';
import {reduxForm} from 'redux-form';
import TextQuestion from './TextQuestion';
import {v4} from 'node-uuid';

const questions = [
    {name: "behaviour-q1", text: "What about your behaviour needs to change for you to achieve your Goal?"},
    {name: "behaviour-q2", text: "What new behaviours do you need to acquire to achieve and adopt for you to"+
            "achieve your Goals?"}
];

const BehaviourForm = (props) => {
    const {handleSubmit, simPreviousPage} = props;

    return (
        <div>
            <form onSubmit={handleSubmit} method="POST">
                {
                    questions.map((question) => <TextQuestion key={v4()} name={question.name} question={question.text}/>)
                }
                <button onClick={simPreviousPage}>Previous</button>
                <button type="submit">Next</button>
            </form>
        </div>
    )
};

BehaviourForm.propTypes = {
    simPreviousPage: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired
}

export default reduxForm({
    form: 'goalsForm',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(BehaviourForm);