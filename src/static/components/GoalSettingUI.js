import React from 'react';
import TopicGoalForm from './TopicGoalForm';
import RealityForm from './RealityForm';
import GoalAlignmentForm from './GoalAlignmentForm';
import OptionsForm from './OptionsForm';
import WayForwardForm from './WayForwardForm';
import GoalSimulationUI from './GoalSimulationUI';
import AffirmationForm from './AffirmationForm';
import {v4} from 'node-uuid';
import Modal from './Modal';
import TgrowImage from '../images/tgrow.png';
import Spinner from './Spinner'
import store from '../store'
import { initialize } from 'redux-form'
import { FORM_CREATE_ACTION, FORM_UPDATE_ACTION} from '../config'

class GoalSettingUI extends React.Component {
    constructor(props){
        super(props);

        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.state = {
            page:1,
            modalVisible: false
        };
        this.goalId = null
        this.showModal = this.showModal.bind(this);
    }

    static propTypes = {

        doFetch: React.PropTypes.func.isRequired,
        token: React.PropTypes.string.isRequired,
        isFetching: React.PropTypes.bool.isRequired,
        statusText: React.PropTypes.string,
        location: React.PropTypes.shape({
            query: React.PropTypes.object
        }),
        unsetInitialValues: React.PropTypes.func.isRequired
    }

    nextPage() {
        this.setState({page: this.state.page+1});
    }

    previousPage(e) {
        e.preventDefault();
        this.setState({page: this.state.page-1});
    }

    tabs = [
        "Topic & Goal",
        "Reality Check",
        "Goal Alignment",
        "Options/ Obstacles",
        "Way Forward",
        "Goal Simulation",
        "Affirmation"
    ];

    componentWillMount(){
        this.goalId = this.props.location.query.id ? this.props.location.query.id : null
        if (this.goalId !== null){
            this.props.doFetch(this.goalId, this.props.token)
        } else{
            this.props.unsetInitialValues('goalsForm', {})
        }
    }

    showModal = () => {
        this.setState({modalVisible: !this.state.modalVisible});
    }

    tgrowHeader = (<div>T-GROW explained</div>);

    tgrowBody = (
        <div className='row'>
            <div className='col-md-6'>
                <p>The T-GROW Model is a coaching model. This model brings a lot of clarity to planning and goal setting processes. It helps inform and monitor the process required for the achievement of planned Goals. An individual embarking on a journey must – as a rule – know what the desired destination is; where he or she is currently – relative to that destination; what obstacles are in his/her way and what Options he has for the journey, and he/she would ascertain the level of commitment (Will) that will be required to complete the journey or pursuit. This is exactly what the T-GROW model does for every Goal setting and planning purpose. It helps people work through the process from inception through execution to achievement.</p>
                
                <p>T-GROW is an acronym that stands for:</p>
                <p>T – Topic (Which involves the critical area that the goal is to be planned around i.e one of the 12 areas mentioned above)</p>
                <p>G – Goal (The specific outcome you want to work toward in that critical area. For example, the critical area could be Health and Well Being and you set a goal to have a particular body weight at some set time)</p>
                <p>R – Reality (The current realities that surrounds your set goal. This helps clarify how realistic your Goal is – which will in-turn inform the changes and adjustments you might have to make to your Goals to increase your chances of achieving them)</p>
                <p>O – Options (This utilizes the information gleaned from the Reality step to identify the obstacles that will naturally be in the way – of your achieving your goals – and it helps you create alternate routes / Options you can take to beat those obstacles and finally arrive at you desired outcome)</p>
                <p>W – Way Forward (At this point, having worked through getting clarity on your set Goal, you will then establish the level of commitment needed to follow through till the achievement of the Goal. What would you have to do consistently to achieve your Goal? That’s one of the questions this step in the process would help you answer)</p>
           </div>

           <div>
            <img src={TgrowImage} className='img-responsive' alt='TGROW'/>
           </div>
           
        </div>
    )

    render() {

        if(this.props.isFetching === true ) {

            return <div><Spinner /></div>

        } else if (this.props.statusText !== null) {

            return <div>{this.props.statusText}</div>

        } else {

            const {page} = this.state;

            return (
                <div id='goals-setting-ui' className='row component-parent-wrapper-1 tabbed-page'>
                    <div className='del-my-container del-top-bottom-padded-content'>
                        {this.state.modalVisible && <Modal header={this.tgrowHeader} body={this.tgrowBody}/>}
                        <span className='intro-text'>Get an understanding of the <a href="#" onClick={this.showModal}>T-GROW </a>guide to effective goal setting</span>
                        <ul className="nav nav-tabs">
                            {
                                this.tabs.map((tab, index) => {
                                    return <li key={v4()} className={(index + 1) === page ? 'active' : ''}><a
                                        href="#">{tab}</a></li>
                                })
                            }
                        </ul>
                        <div className="tabbed-content">
                            {page === 1 && <TopicGoalForm onSubmit={this.nextPage}/>}
                            {page === 2 && <RealityForm previousPage={this.previousPage} onSubmit={this.nextPage}/>}
                            {page === 3 &&
                            <GoalAlignmentForm previousPage={this.previousPage} onSubmit={this.nextPage}/>}
                            {page === 4 && <OptionsForm previousPage={this.previousPage} onSubmit={this.nextPage}/>}
                            {page === 5 && <WayForwardForm previousPage={this.previousPage} onSubmit={this.nextPage}/>}
                            {page === 6 &&
                            <GoalSimulationUI previousPage={this.previousPage} onSubmit={this.nextPage}/>}
                            {page === 7 &&
                            <AffirmationForm previousPage={this.previousPage} myToken={this.props.token} goalId={this.goalId}/>}
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default GoalSettingUI