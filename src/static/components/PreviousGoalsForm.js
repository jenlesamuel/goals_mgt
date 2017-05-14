import React from 'react';
import {reduxForm, SubmissionError} from 'redux-form';
import {v4} from 'node-uuid';
import TextQuestion from './TextQuestion';
import fetch from 'isomorphic-fetch';
import {REMOTE_BASE_URL, REMOTE_PREVIOUS_GOALS_PATH, NETWORK_ERROR, GENERIC_ERROR} from '../config'


class PreviousGoalsForm extends React.Component {

    constructor(props) {
        super(props);

        this.doSubmitEvaluation = this.doSubmitEvaluation.bind(this);
    }

    static propTypes = {
        username: React.PropTypes.string.isRequired
    }

    questions = [
        'What were your last year’s Goals?',
        'What percentage of your Goals for last year did you achieve?',
        'What did you do to achieve the aspect of your Goals that you achieved?',
        'What stopped you from achieving the aspects you didn’t achieve in?',
        'What could you have done differently?',
        'What was your losing process? Capture it in not more than Six (6)steps',
        'What was your winning process? Capture it in not more than Six (6) steps',
        'What learning’s from your previous year’s Goals i.e. your and losing and'+
        'wining processes can you take into your new year Goals?',
        'Are you now ready to set your new year Goals?',
    ];


    doSubmitEvaluation = (values, dispatch, props) => {

        const{username} = props;

        const url = REMOTE_BASE_URL + REMOTE_PREVIOUS_GOALS_PATH;
        
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Accept", "application/json");

        const body = {
            user: username,
            answers: values
        }

        const options = {
            method: 'POST',
            headers,
            body:JSON.stringify(body)
        };

        let statusCode = -1;
        console.log(username);
        console.log(body);
        return fetch(url, options).then((response) => {

            statusCode = response.statusCode;
            response.json();

        }, (error) => {

            throw new SubmissionError({_error: NETWORK_ERROR}); 

        }).then((jsonResponse) => {

            const statusCodeStr = statusCode+"";

            if (statusCodeStr.startsWith('2')) {

                alert('evaluation successful');
            }else{
                
                throw new SubmissionError({_error: GENERIC_ERROR});
            }

        });
    }

    render() {

        const {handleSubmit, error, submitFailed} = this.props;

        return (
            <div>
                 {/* Display non-field errors */}
                 { submitFailed && error && <span>{error}</span>}   

                <form onSubmit={handleSubmit(this.doSubmitEvaluation)} method='POST'>
                    {
                        this.questions.map((question, index) => {
                            return <TextQuestion key={v4()} name={"q"+(index+1)} question={question} />
                        })
                    }
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
} 

const config = {
    'form': 'previousGoalsForm'
}

export default reduxForm(config)(PreviousGoalsForm)