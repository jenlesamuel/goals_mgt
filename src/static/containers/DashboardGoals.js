import {connect} from 'react-redux';
import DashboardGoalsUI from '../components/DashboardGoalsUI';
import {fetchDashboardGoals, fetchGoal} from '../actions/goalsActions';

const mapStateToProps = (state) => {
    return {
        items: state.goals.dashboard.items,
        isFetching: state.goals.dashboard.isFetching,
        fetchError: state.goals.dashboard.fetchError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchDashboardGoals: (token, limit) => {
            dispatch(fetchDashboardGoals(token, limit))
        },
        fetchGoal: (id, token) => {
            dispatch(fetchGoal(id, token))
        }
    }
}

const DashboardGoals = connect(mapStateToProps, mapDispatchToProps)(DashboardGoalsUI);

export default DashboardGoals;