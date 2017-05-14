import React from 'react';
import LifeCompDashboardImages from './LifeCompDashboardImages';
import DashboardGoals from '../containers/DashboardGoals';
import ProcrastinationResult from '../containers/ProcrastinationResult';

class DashboardUI extends React.Component{

    constructor(props){
        super(props)

        this.props = props
    }
    
    static propTypes = {
        token: React.PropTypes.string.isRequired
    }

    baseStyle = {
        background: '#F7F8FA',
    }


    render() {

        return (

            <div id='dashboard-container'  style={this.baseStyle}>
                <div className='row dashboard-row'>
                    <div id='dashboard-images' className="col-md-6 dashboard-components left" >
                        <LifeCompDashboardImages userId={this.props.userId} />
                    </div>
                    <div className="col-md-5 dashboard-components">
                        <DashboardGoals  token={this.props.token}/>
                    </div>
                </div>
                <div className='row'>
                    <div className="col-md-6 dashboard-components left">
                        <ProcrastinationResult dashboardDisplay={true} />
                    </div>
                    <div className='col-md-5 dashboard-components'>
                        Wheel of life here
                    </div>
                </div>
            </div>
        )
    }
}

export default DashboardUI;