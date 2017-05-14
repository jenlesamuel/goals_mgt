import GoalDashboardUI from '../components/GoalDashboardUI'; 
import {connect} from 'react-redux';

export const mapStateToProps = (state) => {
    return {
        userId: state.user.id
    };
}

export const mapDispatchToProps = (dispatch) => {
    return {};
}

const GoalDashboard = connect(mapStateToProps, mapDispatchToProps)(GoalDashboardUI);

export default  GoalDashboard;