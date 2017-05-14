import React from 'react';
import {reduxForm} from 'redux-form';
import TextQuestion from './TextQuestion';
import {v4} from 'node-uuid';

const questions = [
    {name: "belief-q1", text: "What about your beliefs and Values will have to change for you to achieve"+
"your Goal?"},
    {name: "belief-q2", text: "What new beliefs and Values will you need to have to achieve your Goal?"}
];

const BeliefsForm = (props) => {
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

BeliefsForm.propTypes = {
    simPreviousPage: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired
}

export default reduxForm({
    form: 'goalsForm',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(BeliefsForm);