import React from 'react';
import {reduxForm} from 'redux-form';
import {Field, SubmissionError} from 'redux-form';
import {v4} from 'node-uuid';
import {REMOTE_BASE_URL, REMOTE_PROCRASTINATION_PATH, NETWORK_ERROR, 
    GENERIC_ERROR, PROCRASTINATION_RESULT_PATH} from '../config';
import fetch from 'isomorphic-fetch';
import Modal from './Modal';
import store from '../store.js';
import {browserHistory} from 'react-router';
import {saveState} from '../localStorage';

class ProcrastinationForm extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;

        this.state = {
            modalVisible: false,
        }

        this.showModal  = this.showModal.bind(this)
    }

    static propTypes = {
        username: React.PropTypes.string.isRequired,
        storeAnswers: React.PropTypes.func.isRequired
    }

     questions = [
        "I usually put things off because I don’t feel like doing them",
        "I usually convince myself that I will do it later when I’m ready",
        "I usually give up when things are more difficult than I planned", 
        "I often feel frustrated and irritated when things don’t happen easily",
        "When I think I might do a bad job I do everything to avoid taking action",
        "So that I don't fail or make mistakes I will rather not do anything",
        "I seek perfection always and I will rather not do anything imperfectly",
        "I worry a lot about my inability to do an outstanding job",
        "I criticize myself often, even if I do a good job",
        "Even though I accomplish a lot I’m never satisfied, I want more", 
        "When I don't take action, It often make me feel guilty",
        "When I put things off till later I get upset with myself",
        "I hate being told what to do and when to do it",
        "I avoid conflicts with people and also dealing with conflicts",
        "I usually agree to do things I know that I really don’t want to do",
        "I find it very difficult to say no to people, when asked to do stuff",
        "I don’t like people that are bossy and tell me what to do",
        "I resist dictators and taking instructions from people",
        "Taking action often does not excite me",
        "I don’t usually feel like doing a lot of the things I should be doing",
    ];

    showModal = () => {
        this.setState({modalVisible: !this.state.modalVisible});
    }

    intro = (
        <p>Procrastination is the avoidance of doing a task that needs to be accomplished. 
            It is the practice of doing more pleasurable things in place of less 
            pleasurable ones ... <a href="#" className='more' onClick={this.showModal}> Read more</a>
        </p>
    )

    header = (<div>About Procrastination</div>);

    body = (
            <div>
                <p>Procrastination is the avoidance of doing a task that needs to be accomplished. 
                It is the practice of doing more pleasurable things in place of less pleasurable ones,
                or carrying out less urgent tasks instead of more urgent ones, thus putting off impending tasks to a later time.
                Sometimes, procrastination takes place until the last minute before a deadline.</p>
                <p>Procrastination can take hold on any aspect of life — putting off going to the gym to work
                out at a particular time, waking up to pray at 5am and read your holy book in order to
                improve on your level of spirituality, putting aside the urge to watch television or get 
                on your social media in order to spend one hour quality time daily with your spouse,
                jesting in the office with work colleagues when you have to prepare for a departmental
                presentation. Procrastinators love to plan, (and they can over plan most times) this is
                because planning does not involve doing, so it prevents them from taking action.
                Procrastination can however lead to feelings of guilt, inadequacy, depression and self-doubt.</p>

            </div>
        );

    render() {
        
        const {handleSubmit, submitting, submitFailed, error, username, storeAnswers} = this.props;

        return (
            <div className='evaluation'>
                {this.state.modalVisible && <Modal header={this.header} body={this.body}/>}
                <div className='row'>
                <div  className='col-md-8 col-md-offset-2'>
                <div className='form-top-decor'></div>
                    <div className='proc-form-wrapper'>
                        <div className='page-heading'>
                            <span className='title'>Procrastination Evaluation</span>
                            <div className='text'>
                                {this.intro}

                                <div className='key'>
                                    Answer each of the questions based on what best describes you using these numbers:<br/>
                                    <span className='num'>(1)</span><span>I strongly disagree</span>
                                    <span className='num'>(2)</span><span>I disagree</span>
                                    <span className='num'>(3)</span><span>I am neutral </span>
                                    <span className='num'>(4)</span><span>I agree </span>
                                    <span className='num'>(5)</span><span>I strongly agree</span>
                                </div>
                            </div>
                        </div>

                        {/* Display non-field errors*/}
                        <div>{submitFailed && error ? error : ''}</div>

                            <form onSubmit={handleSubmit((values) => {
                                
                                const url = REMOTE_BASE_URL+REMOTE_PROCRASTINATION_PATH;

                                const headers = new Headers();
                                headers.append("Content-Type", "application/json");
                                headers.append("Accept", "application/json");
                                
                                const body = {
                                    q_n_a: JSON.stringify(values),
                                    user:  username
                                };
                                
                                const options = {
                                    method: "POST",
                                    headers: headers,
                                    body: JSON.stringify(body)
                                };

                                return fetch(url, options).then((response)=>{ //consume webservice
                                    if (response.ok){
                                        return response.json();
                                    }else{
                                        throw new SubmissionError({_error: GENERIC_ERROR})
                                    }
                                }, (networkError) => {
                                    throw new SubmissionError({_error: NETWORK_ERROR});
                                }).then((jsonResponse) => {
                                    console.log(jsonResponse);
                                    storeAnswers(values);
                                    saveState({procrastination: {answers: values}});
                                    browserHistory.push(PROCRASTINATION_RESULT_PATH);
                                    console.log(store.getState());
                                });

                            })} method="POST" className={submitting ? '' : ''}>
                                {   
                                    // Generate questions and options 
                                    this.questions.map((question, index) => {
                                        let num = index+1;
                                        let inputName = "q"+num;

                                        return (
                                            <div key={v4()} >
                                                <div className='question'>
                                                    <span>{num}.</span><span>{question}</span>
                                                </div>
                                                <div className="radio">
                                                    <label><Field  name={inputName} component='input' type="radio" value="1" required/>1</label>
                                                    <label><Field  name={inputName} component='input' type="radio" value="2" required/>2</label>
                                                    <label><Field  name={inputName} component='input' type="radio" value="3" required/>3</label>
                                                    <label><Field  name={inputName} component='input' type="radio" value="4" required/>4</label>
                                                    <label><Field  name={inputName} component='input' type="radio" value="5" required/>5</label>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                <button type="submit"> Submit </button>
                            </form>
                        </div> 
                    </div>
                </div>
            </div> 
        );
    }
}

const config = {
    form: "procrastinationForm"
};

export default reduxForm(config)(ProcrastinationForm);
