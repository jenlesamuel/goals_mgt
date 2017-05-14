import React, { Component } from 'react';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import {NO_SIDEBAR_PAGES, WHITE_NAV, BLUE_NAV, WHITE_NAV_PAGES} from './config';
import Navbar from './containers/Navbar';
import store from './store'


class AppUI extends Component {

  constructor(props) {
    super(props);
    
    this.props = props;
    this.getNavType = this.getNavType.bind(this);
    this.displaySidebar = this.displaySidebar.bind(this);

      /** CLEAR PREVIOUS STORAGE **/
      /*let appState = localStorage.getItem("state")
      if (appState !== null){
          let parsedState = JSON.parse(appState)
          if (parsedState.user.token === undefined){
              localStorage.clear()
          }
      } */

  }

  /**
   * Determines whether sidebar button should be displayed or not
   */
  displaySidebar = () => {


     const childPath = this.props.children.props.route.path;

     if (childPath === undefined) return false ; //childPath is undefined for index page

     let noSidebar = false;

     for (let i=0; i<NO_SIDEBAR_PAGES.length; i++) {
        if (childPath === NO_SIDEBAR_PAGES[i]) {
          noSidebar = true;
          break;
        }
     }

     if (noSidebar) return false; 

     return true; 
  }

  getNavType = () => {

    const childPath = this.props.children.props.route.path;

    if (childPath === undefined) return WHITE_NAV;  //childPath is undefined for index page

    let showWhiteNav = false;

    for (let i=0; i<WHITE_NAV_PAGES.length; i++){
      if (childPath === WHITE_NAV_PAGES[i]) {
        showWhiteNav = true;
        break;
      }
    }

    return showWhiteNav ? WHITE_NAV : BLUE_NAV;
  }

  render() {
    const display = this.displaySidebar();
    const wrapperClass = display === true ? 'visible-sidebar' : '';

    const navType = this.getNavType() ;

    return (
      <div id='wrapper' className={wrapperClass}>

        <Navbar navType={navType}/>
        
        <Sidebar sidebarVisible={this.sidebarVisible}/> 
        
        <div id='content-wrapper' className="container-fluid">
              {this.props.children}
        </div>

        <div id="footer-wrapper">
            <div className="container">
                <Footer />
            </div>
        </div>

      </div>
    );
  }
}

export default AppUI;
