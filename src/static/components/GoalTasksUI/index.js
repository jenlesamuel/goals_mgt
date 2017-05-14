import React from 'react'
import { fetchPagedTasks } from '../../actions/tasksActions'
import { connect } from 'react-redux'
import Spinner from '../Spinner'
import Paginator from '../Paginator'
import { REMOTE_BASE_URL, TASKS_LIMIT, PAGINATION_PREVIOUS_TEXT, PAGINATION_NEXT_TEXT} from '../../config'

class GoalTasksUI extends React.Component{

    constructor(props) {
        super(props)

        this.handlePageClick = this.handlePageClick.bind(this)
        this.state = {
            "pageIndex": 0
        }
    }

    static propTypes = {
        token: React.PropTypes.string.isRequired,
        fetchPagedTasks: React.PropTypes.func.isRequired,
        goalId: React.PropTypes.string.isRequired,
        isFetching: React.PropTypes.bool.isRequired,
        data: React.PropTypes.oneOfType([
            React.PropTypes.array,
            React.PropTypes.object
        ]),
        error: React.PropTypes.string
    }

    componentWillMount(){
        const {token, goalId} = this.props
        this.url = `${REMOTE_BASE_URL}goals/${goalId}/tasks/paged?limit=${TASKS_LIMIT}/`
        this.props.fetchPagedTasks(token, url)
    }

    handlePageClick = (e) => {
        const {data:{ previous, next }, token} = this.props
        e.preventDefault()
        const text = e.target.text

        if (text === PAGINATION_PREVIOUS_TEXT){
            this.setState({"pageIndex": this.state.pageIndex-1})
            this.props.fetchPagedTasks(token, previous)
        } else if (text === PAGINATION_NEXT_TEXT){
            this.setState({"pageIndex": this.state.pageIndex+1})
            this.props.fetchPagedTasks(token, next)
        }else {
            const page = parseInt(text)
            this.setState({"pageIndex": page-1 })
            this.props.fetchPagedGoals(token, `${this.url}?page=${page}`)
        }

    }

    render(){
        let template = null
        const { data:{previous, next, count, results}, isFetching, error } = this.props
        const start = this.state.pageIndex * TASKS_LIMIT

        if (isFetching === true) {
            template = <Spinner />

        } else if (error !== null) {
           template =  <div>{error}</div>

        }else if (results.length === 0) {
            template = ( 
                <div> 
                    No task added for this goal <a href="#">Add Task</a>
                </div> 
            )

        } else {
            template = (
                <div>
                    <table className='table table-striped'>
                            <thead>
                                <tr>
                                    <th>S/NO</th>
                                    <th>Task</th>
                                    <th>Start</th>
                                    <th>End</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    results.map((item, index) => {
                                        <tr>
                                            <td>{start+1}</td>
                                            <td>{item.title}</td>
                                            <td>{ /** JSON.parse(item.values)["start-time"] */}Start Time</td>
                                            <td>{/** JSON.parse(item.values)["end-time"] */}End TIme</td>
                                            <td>Active/InActive</td>
                                        </tr>
                                    })
                                }
                            </tbody>
                    </table>

                    <Paginator />
                </div>
            )
        }

        return <div>{template}</div>
    }
}

export default GoalTasksUI

