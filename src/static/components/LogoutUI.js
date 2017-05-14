import React from 'react';
import {browserHistory} from 'react-router';
import {HOME_PATH} from '../config';

class LogoutUI extends React.Component {

    constructor(props){
        super(props);
        this.props = props
    }

    componentDidMount(){
        //clear state and local storage
        browserHistory.replace(HOME_PATH);
    }

    render(){
        return (<div>null</div>)
    }
}


export default LogoutUI;