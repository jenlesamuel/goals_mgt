import React from 'react';
import {reduxForm} from 'redux-form';
import TextQuestion from './TextQuestion';
import {v4} from 'node-uuid';

const questions = [
    {name: "reality-q1", text: "What can stop you?"},
    {name: "reality-q2", text: "What will others say about your obstacles?"},
    {name: "reality-q3", text: "Who is in the driving seat for this Goal to be achieved?"},
    {name: "reality-q4", text: "Who is this Goal for?"}
];

const RealityForm = (props) => {
    const {handleSubmit, previousPage} = props;

    return (
        <div>
            <form onSubmit={handleSubmit} method="POST">

                <div className='row'>
                    {/*Display questions */}

                    {
                        questions.map((question, index) => {

                           return (
                                    <div key={v4()} className={'col-md-5 ' + (index%2 === 0 ? 'col-md-offset-2' : '')}>
                                        <TextQuestion key={v4()} name={question.name} question={question.text}/>
                                    </div>
                               )
                        })
                    }

                </div>
                
                 <div className='row'>
                    <div className='col-md-5 col-md-offset-2'>
                        <button onClick={previousPage}>Previous</button>
                        <button type="submit">Next</button>
                    </div>
                </div>

            </form>
        </div>
    )
};

RealityForm.propTypes = {
    previousPage: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired
}

export default reduxForm({
    form: 'goalsForm',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(RealityForm);