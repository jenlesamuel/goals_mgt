import React from 'react';
import {reduxForm} from 'redux-form';
import TextQuestion from './TextQuestion';
import {v4} from 'node-uuid';

const questions = [
    {name: "way-q1", text: "On a scale of 0 – 100 (0 being least motivated and 100 being most motivated)"+ 
    "how motivated are you towards achieving this Goal?"},
    {name: "way-q2", text: "If your Motivation level is lower than 70% what must you do to increase your"+ 
    "motivation level to between 90% - 100%?"},
    {name: "way-q3", text: "Are you willing to do these to get you more motivated?"},
    {name: "way-q4", text: "How will you sustain this Motivation level until you achieve your Goal?"},
    {name: "way-q5", text: "How would you stay consistent with these steps?"},
    {name: "way-q6", text: "What can distract you from this Goal and how will stay focused?"},
    {name: "way-q7", text: "In a single sentence, summarise your answers with an affirmative statement"},
];

const WayForwardForm = (props) => {
    const {handleSubmit, previousPage} = props;

    return (
        <div>
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

WayForwardForm.propTypes = {
    previousPage: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired
}

export default reduxForm({
    form: 'goalsForm',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(WayForwardForm);