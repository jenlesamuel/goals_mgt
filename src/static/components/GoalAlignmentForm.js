import React from 'react';
import {reduxForm} from 'redux-form';
import TextQuestion from './TextQuestion';
import {v4} from 'node-uuid';

const questions = [
    {name: "alignment-q1", text: "Do your Values and Beliefs align with your Goal(s)?"},
    {name: "alignment-q2", text: "What values or beliefs need to change to get them aligned with your Goals?"},
    {name: "alignment-q3", text: "In a single sentence, summarise your answers with an affirmative statement"},
];

const GoalAlignmentForm = (props) => {
    const {handleSubmit, previousPage} = props;

    return (
        <div className='col-md-8 col-md-offset-2'>
            <form onSubmit={handleSubmit} method="POST">
                {
                    questions.map((question) => <TextQuestion key={v4()} name={question.name} question={question.text}/>)
                }
                <button onClick={previousPage}>Previous</button>
                <button type="submit">Next</button>
            </form>
        </div>
    )
};

GoalAlignmentForm.propTypes = {
    previousPage: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired
}

export default reduxForm({
    form: 'goalsForm',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(GoalAlignmentForm);