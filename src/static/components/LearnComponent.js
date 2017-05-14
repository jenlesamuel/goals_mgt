import React from 'react'

class LearnComponent extends React.Component {

    constructor(props){
        super(props)

        this.props = props
    }

    render(){

        console.log(this.props)
        return (
            <div>
                <p>This is a test component</p>
            </div>
        )
    }
}

export default LearnComponent