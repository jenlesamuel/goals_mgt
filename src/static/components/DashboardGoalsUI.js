import React from 'react';
import {v4} from 'node-uuid';
import {LIFE_COMPONENTS, GOALS_PATH, DASHBOARD_GOALS_LIMIT, ALL_GOALS_PATH} from '../config';
import Spinner from './Spinner'
import {Link, browserHistory} from 'react-router'
import store from '../store'

class DashboardGoalsUI extends React.Component{

    constructor(props){
        super(props);

        this.props = props;

        this.handleGoalEdit = this.handleGoalEdit.bind(this)
    }

    static propTypes =  {
        items: React.PropTypes.array,
        isFetching: React.PropTypes.bool.isRequired,
        fetchDashboardGoals: React.PropTypes.func.isRequired,
        fetchError: React.PropTypes.string,
        token: React.PropTypes.string.isRequired,
        fetchGoal: React.PropTypes.func.isRequired
    }

    handleGoalEdit = (e) => {
        e.preventDefault();
        let goalId = e.target.getAttribute("data-id")

        browserHistory.push(`${GOALS_PATH}/?id=${goalId}`)
    }

    componentDidMount(){
         this.props.fetchDashboardGoals(this.props.token, DASHBOARD_GOALS_LIMIT);
    }

    render() {

        const {items, isFetching, fetchError} = this.props;
        let template = null;
        let title = (<div className='dashboard-component-title' >Goals</div>);

        if (isFetching === true) {
            template = (
                <div><Spinner /></div>
            )
        }

        else if (fetchError !== null) {
            template = (
                <div>
                    {title}
                    <div>{fetchError}</div>
                </div>
            )
        }
        else if (items.length === 0) {

            template = (
                <div>
                    {title}
                    <div>No Goals set</div>
                    <div>Start setting goals <Link to={GOALS_PATH}>here</Link></div>
                </div>
            )

        }

        else {

            template = (
                <div>
                    {title}
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th> S/NO</th>
                                <th>Title</th>
                                <th>Life Component</th>
                            </tr>
                        </thead>
                        <tbody>
                            {

                                items.map((item, index) => {

                                    let goal_id = item.id
                                    let goal = JSON.parse(item.values)
                                    let title = goal.title
                                    let component = null
                                    if (!goal.component) { // Hack cos most times first elemnt in drop down is
                                        // not selected in the drop down that  populates this value
                                        component = LIFE_COMPONENTS[0].value
                                    }else{
                                        component = LIFE_COMPONENTS[goal.component - 1].value;
                                    }

                                    return (
                                        <tr key={v4()}>
                                            <td>{index+1}</td>
                                            <td><Link to="#" data-id={goal_id} onClick={this.handleGoalEdit}>{title}</Link></td>
                                            <td>{component}</td>
                                        </tr>
                                    )
                                })

                            }
                        </tbody>
                    </table>
                    <Link to={ALL_GOALS_PATH}>View All Goals</Link>
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

export default DashboardGoalsUI;