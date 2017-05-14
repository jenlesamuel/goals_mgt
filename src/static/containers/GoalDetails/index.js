import React from 'react'

class GoalDetails extends React.Component{

    static propTypes = {
        goalId: React.PropTypes.string.isRequired,
        fetchDetails: React.PropTypes.func.isRequired
    }

    componentWillMount(){
        this.props.fetchDetails(this.props.goalId)
    }

    render() {
          return (
              <div>
                  <div>

                  </div>
                  <div>

                  </div>
              </div>
          )
    }
}