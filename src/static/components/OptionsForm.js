import React from 'react';
import {reduxForm} from 'redux-form';
import TextQuestion from './TextQuestion';
import {v4} from 'node-uuid';

const questions = [
    {name: "options-q1", text: "If nothing is impossible what will you do?"},
    {name: "options-q2", text: "How can you influence others to support your Goal?"},
    {name: "options-q3", text: "What will other people advice you to do towards achieving this Goal?"},
    {name: "options-q4", text: "What else?"},
    {name: "options-q5", text: "Which of those options you generated above interests you the most?"},
    {name: "options-q6", text: "Which ones are easiest to achieve?"},
    {name: "options-q7", text: "Which ones deliver your Goals fastest?"},
];

const OptionsForm = (props) => {
    const {handleSubmit, previousPage} = props;

    return (
        <div className='col-md-6 col-md-offset-3'>
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

OptionsForm.propTypes = {
    previousPage: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired
}

export default reduxForm({
    form: 'goalsForm',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(OptionsForm);