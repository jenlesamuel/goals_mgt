import React from 'react';
import menuIcon from '../images/menu.png';


const menuStyle = {
        background: `url(${menuIcon}) no-repeat`,
        width: 'auto',
        marginRight: '20px'
    };


const SidebarButtonUI = (props) => {
    
    return (
        <a className='navbar-brand'  href="#" style={menuStyle} onClick={(e) => {
            e.preventDefault();
            props.onSidebarButtonClicked ();
        }}></a>
    )
};

SidebarButtonUI.propTypes = {
    onSidebarButtonClicked : React.PropTypes.func.isRequired
};

export default SidebarButtonUI;
