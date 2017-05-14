import React from 'react';
import {Link} from 'react-router';
import {LOGIN_PATH, LOGOUT_PATH, REGISTER_PATH, WHITE_NAV, DASHBOARD_PATH} from '../config';
import logo from '../images/logo.png';

class NavbarUI extends React.Component{

  constructor(props){
    super(props)
    this.props = props

    this.logout = this.logout.bind(this)
  }

  brandStyle = {
    background: 'url('+logo+') no-repeat',
    width:"165px"
  };

  static propTypes = {
    navType: React.PropTypes.string.isRequired,
    fullname: React.PropTypes.string,
    token: React.PropTypes.string,
    logout: React.PropTypes.func.isRequired
  }

  logout = (e) => {
      e.stopPropagation()
    //e.preventDefault()
    this.props.logout()
  }

  
  render() {

    const {navType,token,fullname} = this.props;
  
    const navTypeClass =  (navType ===  WHITE_NAV) ? 'white-nav' : 'blue-nav';
    
    return (

      <nav className={"goals-navbar navbar navbar-default "+ navTypeClass}>
      
        <div className="container-fluid">

          {/* Menu/Sidebar Button*/}

          {/* navbar brand */}
          <div className="navbar-header">
            <a className="navbar-brand" href="#" style={this.brandStyle} ></a>
          </div>
          
          {/* navbar items */}
          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav navbar-right">
              {token === null && <li><Link to={REGISTER_PATH}>Register</Link></li>}
              {token === null && <li><Link to={LOGIN_PATH}>Have an account? Login</Link></li>}
              {token !== null && <li><span id='welcome'>Hey {fullname}</span></li>}
              {token !== null && <li><Link to={DASHBOARD_PATH}>Dashboard</Link></li>}
              {token !== null && <li onClick={this.logout} ><Link>Logout</Link></li>}
            </ul>
          </div>

        </div>
      </nav>
    )
  }

}

export default NavbarUI;
