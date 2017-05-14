import React from 'react';
import Modal from './Modal';
import {Link} from 'react-router';
import {PROCRASTINATION_PATH} from '../config';


class ProcrastinationResultUI extends React.Component {
    constructor(props){
        super(props);
        this.props = props;

        this.state = {
            modalVisible: false,
        }

        this.showModal  = this.showModal.bind(this)
    }

    static propTypes = {
        answers: React.PropTypes.object,
        dashboardDisplay: React.PropTypes.bool.isRequired
    }

    static defaultProps = {
        dashboardDisplay: false,
    }
    
    showModal = () => {
        this.setState({modalVisible: !this.state.modalVisible});
    }
    
    header = (<div>8 Tips on How to Stop Procrastination </div>)

    body = (
        <div>
            <ol>
                <li>Set long medium and short-term measureable goals</li>
                <li>Clearly design your Goals and write them down with the requisite actions to achieve them</li>
                <li>Tie the achievement of your goals to your happiness, fulfillment and self-satisfaction</li>
                <li>Reward and celebrate yourself heavily for taking action immediately and achieving even the small goals</li>
                <li>Create Consequences of Procrastination and punish yourself for not achieving your goals</li>
                <li>Get an accountability partner who will hound you until you take action and achieve your results</li>
                <li>Continue taking consistent action irrespective of how you feel</li>
                <li>Don't break the action rhythm for at least 45 day</li>
            </ol>
        </div>
    )

    render() {
        const {answers, dashboardDisplay} = this.props;
        
        let template = null;
        

        let dashboardTitle = dashboardDisplay ? (<div className='dashboard-component-title' >Procrastination Test Result</div>) : ''

        if (answers === undefined) {
            template = (
                <div>
                    {dashboardTitle} 
                    Procrastination test not taken. Take test <Link to={PROCRASTINATION_PATH}>here</Link>
                </div>
            )
        }
        
        else {
            template = (
                <div>
                    {this.state.modalVisible && <Modal header={this.header} body={this.body}/>}

                    {/* Dont show tips on dashboard */}
                    { !dashboardDisplay && <div className='row'>
                                    <span><a href="#" onClick={this.showModal}> 8 Tips on How to Stop Procrastination</a></span>
                                </div>
                    }
                    
                    {dashboardDisplay && dashboardTitle} 
                   
                    <div className='row col-md-12'>
                        <div className='table-responsive'>
                            <table className='table table-striped'>
                                <thead> 
                                    <tr>
                                        <th>S/NO</th>
                                        <th>Question</th>
                                        <th>Your Score</th>
                                        <th>Meaning</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td><td>1 & 2</td><td>{+answers.q1 + +answers.q2}</td> 
                                        <td>You put the cart before the horse anddon't plan for success</td>
                                    </tr>
                                    <tr>
                                        <td>2</td><td>3 & 4</td><td>{+answers.q3 + +answers.q4}</td>
                                        <td>You run away from things that you can’t master</td>
                                    </tr>
                                    <tr>
                                        <td>3</td><td>5 & 6</td><td>{+answers.q5 + +answers.q6}</td>
                                        <td>You have a fear of failure, you my lack self confidence and belief</td>
                                    </tr>
                                    <tr>
                                        <td>4</td><td>7 & 8</td><td>{+answers.q7 + +answers.q8}</td>
                                        <td>You have perfectionism streaks</td>
                                    </tr>
                                    <tr>
                                        <td>5</td><td>9 & 10</td><td>{+answers.q9 + +answers.q10}</td>
                                        <td>You lack a self reward and celebration system </td>
                                    </tr>
                                    
                                    <tr>
                                        <td>6</td><td>11 & 12</td><td>{+answers.q11 + +answers.q12}</td>
                                        <td>You know what you should do but don't take responsibility to act, you may be lazy.</td>
                                    </tr>
                                    <tr>
                                        <td>7</td><td>13 & 14</td><td>{+answers.q13 + +answers.q14}</td>
                                        <td>You are passive aggressive</td>
                                    </tr>
                                    <tr>
                                        <td>8</td><td>15 & 16</td><td>{+answers.q15 + +answers.q16}</td>
                                        <td>You are very unassertive</td>
                                    </tr>
                                    <tr>
                                        <td>9</td><td>17 & 18</td><td>{+answers.q17 + +answers.q18}</td>
                                        <td>You are very coercion sensitive</td>
                                    </tr>
                                    <tr>
                                        <td>10</td><td>19 & 20</td><td>{+answers.q19 + +answers.q20}</td>
                                        <td>You lack the desire and drive to succeed</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <div>
                {template}
            </div>
        )
        
    }
}


export default ProcrastinationResultUI;