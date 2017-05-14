import React from 'react';
import {reduxForm} from 'redux-form';
import TextQuestion from './TextQuestion';
import {v4} from 'node-uuid';

const questions = [
    {name: "vision-q1", text: "What does it feel like to have achieved your Goal?"},
    {name: "vision-q2", text: "What has to happen for you to continue to feel like this?"}
];

const VisionForm = (props) => {
    const {handleSubmit, simPreviousPage} = props;

    return (
        <div>
            <form onSubmit={handleSubmit} method="POST">
                {
                    questions.map((question) => <TextQuestion key={v4()} name={question.name} question={question.text}/>)
                }
                <button onClick={simPreviousPage}> Previous </button>
                <button type="submit"> Next </button>
            </form>
        </div>
    )
};

VisionForm.propTypes = {
    simPreviousPage: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired
}

export default reduxForm({
    form: 'goalsForm',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(VisionForm);