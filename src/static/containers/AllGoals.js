import React from 'react'
import Spinner from '../components/Spinner'
import {Link} from 'react-router'
import { GOALS_PATH, LIFE_COMPONENTS, PAGINATION_ITEMS_PER_PAGE, REMOTE_BASE_URL,
    REMOTE_PAGED_GOALS_PATH, PAGINATION_PREVIOUS_TEXT, PAGINATION_NEXT_TEXT} from '../config'
import {v4} from 'node-uuid'
import store from '../store'
import Modal from '../components/Modal'
import  AddTaskForm from './AddTaskForm'
import {connect} from 'react-redux';
import {fetchPagedGoals} from '../actions/goalsActions'
import {browserHistory} from 'react-router'
import Paginator from '../components/Paginator'


class AllGoals extends React.Component {

    constructor(props){
        super(props)

        this.state={modalVisible: false}
        this.handleEditGoal = this.handleEditGoal.bind(this)
        this.handleAddTask = this.handleAddTask.bind(this)
        this.handleGoalDetails = this.handleGoalDetails.bind(this)

        this.state = {
            pageIndex: 0
        }
    }

    static propTypes = {
        isFetching: React.PropTypes.bool.isRequired,
        fetchedData: React.PropTypes.object,
        error: React.PropTypes.string,
        fetchPagedGoals: React.PropTypes.func.isRequired,
        token: React.PropTypes.string.isRequired
    }

    componentWillMount(){
        this.url = `${REMOTE_BASE_URL}${REMOTE_PAGED_GOALS_PATH}`
        this.props.fetchPagedGoals(this.url, this.props.token)
    }

    handleGoalDetails = (e) => {
        const parent = e.target.parentElement.parentElement
        const goalId = parent.getAttribute("data-goal-id")

    }

    handleAddTask = (e) => {
        e.preventDefault()
        const parent = e.target.parentElement.parentElement
        const lifeCompIndex = parseInt(parent.getAttribute("data-comp-index"))
        const lifeCompName = parent.getAttribute("data-comp-name")
        const goalId = parent.getAttribute("data-goal-id")
        const goalTitle = parent.getAttribute("data-goal-title")

        this.addTaskComp = <AddTaskForm goalId={goalId} goalTitle={goalTitle}
                                        lifeCompIndex={lifeCompIndex} lifeCompName={lifeCompName}  myToken={this.props.token}/>

        this.setState({modalVisible: !this.state.modalVisible})
    }

    handleEditGoal = (e) => {
        const parent = e.target.parentElement.parentElement
        const goalId = parent.getAttribute("data-goal-id")
        browserHistory.push(`${GOALS_PATH}?id=${goalId}`)
    }

    handlePageClick = (e) => {
        e.preventDefault()

        const {fetchedData:{previous, next}, token} = this.props
        const text = e.target.text
        let pageUrl = this.url

        if (text === PAGINATION_PREVIOUS_TEXT) {
            pageUrl = previous
            this.setState({pageIndex: this.state.pageIndex-1})

        } else if (text === PAGINATION_NEXT_TEXT) {
            pageUrl = next
            this.setState({pageIndex: this.state.pageIndex+1})

        }else {
            pageUrl = `${pageUrl}?page=${text}`
            this.setState({pageIndex: parseInt(text)-1})
        }

        this.props.fetchPagedGoals(pageUrl, token)
    }


    render(){

        const {fetchedData, error, isFetching, token} = this.props
        let template = null
        console.log(store.getState())
        if (isFetching === true) {

            template = <div><Spinner /></div>
        } else if (error !== null) {

            template = <div>{error}</div>

        } else if (fetchedData.length === 0) { // API returns [] not {} if no goals

            template = <div>No Goals set. Start setting goals <Link to={GOALS_PATH}>here</Link></div>

        } else {

            const next = fetchedData.next
            const previous = fetchedData.previous
            const count = fetchedData.count
            const result = fetchedData.results
            const rowStart = this.state.pageIndex*PAGINATION_ITEMS_PER_PAGE+1

            template = (
                <div>
                    {this.state.modalVisible && <Modal body={this.addTaskComp}/>}
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th>S/NO</th>
                                <th>Component</th>
                                <th>Goal Title</th>
                            </tr>
                        </thead>
                        <tbody>
                                {

                                    result.map((item, index) => {
                                        let goalId = item.id
                                        let lifeCompIndex = null
                                        let goalObj = JSON.parse(item.values)
                                        let goalTitle = goalObj.title

                                        if (!goalObj.component) { // Hack cos most times first elemnt in drop down is
                                            // not selected in the drop down that  populates this value
                                            lifeCompIndex = 0
                                        }else{
                                            lifeCompIndex = goalObj.component-1
                                        }

                                        let component = LIFE_COMPONENTS[lifeCompIndex].value;

                                        return (
                                            <tr key={v4()} data-comp-index={lifeCompIndex} data-comp-name={component} data-goal-id={goalId} data-goal-title={goalTitle}>
                                                <td>{rowStart+index}</td>
                                                <td><a href="#" className="goal-title" onClick={this.handleGoalDetails}>{goalTitle}</a></td>
                                                <td>{component}</td>
                                                <td><a href='#' className='edit-goal' onClick={this.handleEditGoal}>Edit Goal</a></td>
                                                <td><a href='#' className='new-task' onClick={this.handleAddTask}>Add Task</a></td>
                                            </tr>
                                        )

                                    })

                                }
                        </tbody>
                    </table>
                    <Paginator itemsPerPage={PAGINATION_ITEMS_PER_PAGE}
                               token={token}
                               count={count}
                               next={next}
                               previous={previous}
                               container={this} />
                 </div>
            )
        }

        return <div>{template}</div>
    }
}



const mapStateToProps = (state) => {
    return {
        fetchedData: state.goals.paged.data,
        error: state.goals.paged.statusText,
        isFetching: state.goals.paged.isFetching
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        fetchPagedGoals: (token, url) => {
            dispatch(fetchPagedGoals(token, url))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllGoals)