import React from 'react';
import {SIDEBAR_ITEMS} from '../config';
import {v4} from 'node-uuid';
import {Link} from 'react-router';

class Sidebar extends React.Component {

    constructor(props){
        super(props);

        this.setSideBarHeight= this.setSideBarHeight.bind(this);
    }

    sidebarStyle = {

    }

    setSideBarHeight = () => {
        const sidebar = document.getElementById("sidebar-wrapper");
        const contentWrapper = document.getElementById("content-wrapper");
        sidebar.style.height = contentWrapper.clientHeight+"px";
    }

    componentDidMount(){
        this.setSideBarHeight();
    }

    render() {

        return (
            <div id='sidebar-wrapper'>
                <ul id='sidebar-nav'>
                {
                    SIDEBAR_ITEMS.map((item) => {
                        return <li key={v4()}><Link to={item.link}>{item.title}</Link></li>
                    })
                }
                </ul>
            </div>
        )
    }

}


export default Sidebar;
