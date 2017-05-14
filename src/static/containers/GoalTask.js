import GoalTasksUI from '../components'

const mapStateToProps = (state) => {
    return {
        token: state.user.token,
        tasks: state.tasks.paged.items,
        isFetching: state.tasks.paged.isFetching
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPagedTasks: (token, goalId) => {
            dispatch(fetchPagedTasks(token, goalId))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GoalTasksUI)