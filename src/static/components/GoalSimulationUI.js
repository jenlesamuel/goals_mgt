import React from 'react';
import EnvironmentForm from './EnvironmentForm';
import BehaviourForm from './BehaviourForm';
import CapabilitiesForm from './CapabilitiesForm';
import BeliefsForm from './BeliefsForm';
import IdentityForm from './IdentityForm';
import VisionForm from './VisionForm';
import {v4} from 'node-uuid';

class GoalSimulationUI extends React.Component {
    constructor(props){
        super(props);
        this.simNextPage = this.simNextPage.bind(this);
        this.simPreviousPage = this.simPreviousPage.bind(this);
        this.state = {
            simPage:1
        };
    }

    static propTypes = {
        previousPage: React.PropTypes.func.isRequired,
        onSubmit: React.PropTypes.func.isRequired
    }

    simNextPage() {
        this.setState({simPage: this.state.simPage+1});
        console.log(this.state.simPage);
    }

    simPreviousPage(e) {
        e.preventDefault();
        this.setState({simPage: this.state.simPage-1});
        console.log(this.state.simPage);
    }

    tabs = [
        "Environment",
        "Behaviour",
        "Capabilities/Skills",
        "Beliefs/Values",
        "Identity",
        "Goal/Vision",
    ];

    render() {
        const {previousPage, onSubmit} = this.props;
        console.log("state is: "+this.state.simPage);
        const {simPage} = this.state;

        return (
            <div>
                <div className='row'>
                    <ul className="nav nav-pills">
                        {
                            this.tabs.map((tab, index) => { 
                                return <li key={v4()} className={(index+1) === simPage ? 'active':''}><a href="#">{tab}</a></li>
                            })
                        }
                    </ul>
                    {simPage === 1 && <EnvironmentForm onSubmit={this.simNextPage} />}
                    {simPage === 2 && <BehaviourForm simPreviousPage={this.simPreviousPage} onSubmit={this.simNextPage} />}
                    {simPage === 3 && <CapabilitiesForm simPreviousPage={this.simPreviousPage} onSubmit={this.simNextPage} />}
                    {simPage === 4 && <BeliefsForm simPreviousPage={this.simPreviousPage} onSubmit={this.simNextPage} />}
                    {simPage === 5 && <IdentityForm simPreviousPage={this.simPreviousPage} onSubmit={this.simNextPage} />}
                    {simPage === 6 && <VisionForm simPreviousPage={this.simPreviousPage} onSubmit={onSubmit} />}
                </div>
                <div className='row'>
                    <button onClick={previousPage}>Previous</button>
                </div>
            </div>
        );
    }
}

export default GoalSimulationUI