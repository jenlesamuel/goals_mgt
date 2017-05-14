import GoalSettingUI from '../components/GoalSettingUI'
import {connect} from 'react-redux'
import {fetchGoal} from '../actions/goalsActions'
import { initialize } from 'redux-form'

const mapStateToProps = (state) => {
    return {
        isFetching: state.goals.lone.isFetching,
        statusText: state.goals.lone.statusText
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        doFetch: (id, token) => {
            dispatch(fetchGoal(id, token))
        },
        unsetInitialValues: (formName, initialValues) => {
            dispatch(initialize(formName, initialValues))
        }
    }
}

const GoalSetting = connect(mapStateToProps, mapDispatchToProps)(GoalSettingUI);

export default GoalSetting;