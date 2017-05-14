import React from 'react'
import {fetchGoal} from '../../actions/goalActions'
import { connect } from 'react-redux'
import Spinner from '../../components'
import { LIFE_COMPONENTS } from '../../config'

class GoalInfo extends React.Component {

    static propTypes = {
        goalId: React.PropTypes.string.isRequired,
        token: React.PropTypes.string.isRequired,
        fetchGoal: React.PropTypes.func.isRequired,
        isFetching: React.PropTypes.bool.isRequired,
        goal: React.PropTypes.object
    }

    componentWillMount() {
        this.props.fetchGoal(this.props.goalId, this.props.token)
    }

    render() {
        const {goal, isFetching} = this.props

        return (
            <div>
                {
                    isFetching === true ? <Spinner/> : <div>
                        <div>Goal Title: {goal.title}</div>
                        <div>Life Component: { LIFE_COMPONENTS[goal.component-1]["value"] }</div>
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isFetching: state.goals.lone.isFetching,
        goal: state.goals.lone.item
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchGoal: (goalId, token) => {
            dispatch(fetchGoal(goalId, token))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GoalInfo)