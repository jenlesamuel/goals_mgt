import React from 'react';
import {reduxForm} from 'redux-form';
import TextQuestion from './TextQuestion';
import {v4} from 'node-uuid';

const questions = [
    {name: "cap-q1", text: "What Capabilities/ Skills will you need to achieve your Goal?"},
    {name: "cap-q2", text: "Where and How will you get these Capabilities / Skills?"}
];

const CapabilitiesForm = (props) => {
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

CapabilitiesForm.propTypes = {
    simPreviousPage: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired
}

export default reduxForm({
    form: 'goalsForm',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(CapabilitiesForm);