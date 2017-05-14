import {connect} from 'react-redux';
import PreviousGoalsForm from '../components/PreviousGoalsForm';

const mapStateToProps = (state) => {
    return {
        username: state.user.username
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

const PreviousGoals = connect(mapStateToProps, mapDispatchToProps)(PreviousGoalsForm);

export default PreviousGoals;