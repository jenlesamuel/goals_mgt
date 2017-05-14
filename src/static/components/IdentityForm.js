import React from 'react';
import {reduxForm} from 'redux-form';
import TextQuestion from './TextQuestion';
import {v4} from 'node-uuid';

const questions = [
    {name: "id-q1", text: "What about your current identity will not allow you achieve your Goal?"},
    {name: "id-q2", text: "What identity will you need to have to achieve your Goal?"},
    {name: "id-q3", text: "What do you have to do to acquire that identity?"}
];

const IdentityForm = (props) => {
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

IdentityForm.propTypes = {
    simPreviousPage: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired
}

export default reduxForm({
    form: 'goalsForm',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(IdentityForm);