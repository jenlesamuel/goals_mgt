import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './css/reset.css';
import '../../node_modules/react-dropzone-component/styles/filepicker.css';
import '../../node_modules/dropzone/dist/min/dropzone.min.css';
import './bootstrap/css/bootstrap.min.css';
import './css/fa/css/font-awesome.min.css';
import './css/custom.css';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import RegUserForm from './components/RegUserForm';
import Procrastination from './containers/Procrastination'
import {HOME_PATH, REGISTER_PATH, PROCRASTINATION_PATH, PROCRASTINATION_RESULT_PATH, GOAL_DASHBOARD_PATH, 
  LOGIN_PATH,TGROW_PATH, GOALS_PATH, WHEEL_INPUT_PATH, PREVIOUS_GOALS_PATH, DASHBOARD_PATH,
  ALL_GOALS_PATH} from './config';
import store from './store';
import GoalDashboard from './containers/GoalDashboard';
import Login from './containers/Login';
import TgrowUI from './components/TgrowUI';
import GoalSetting from './containers/GoalSetting';
import WheelInput from './containers/WheelInput';
import ProcrastinationResult from './containers/ProcrastinationResult';
import PreviousGoals from './containers/PreviousGoals';
import Home from './components/Home';
import Dashboard from './containers/Dashboard';
import AllGoals from './containers/AllGoals';
import requireAuthentication from './utils/requireAuthentication'
import { NotFoundView } from './containers'

const app = <Provider store={store}>
              <Router history={browserHistory}>
                <Route path={HOME_PATH} component={App}>
                  <IndexRoute component={Home}></IndexRoute>
                  <Route component={RegUserForm} path={REGISTER_PATH}></Route>
                  <Route component={requireAuthentication(Procrastination)} path={PROCRASTINATION_PATH}></Route>
                  <Route component={requireAuthentication(Dashboard)} path={DASHBOARD_PATH}></Route>
                  <Route component={requireAuthentication(GoalDashboard)} path={GOAL_DASHBOARD_PATH}></Route>
                  <Route component={Login} path={LOGIN_PATH}></Route>
                  <Route component={TgrowUI} path={TGROW_PATH}></Route>
                  <Route component={requireAuthentication(GoalSetting)} path={GOALS_PATH}></Route>
                  <Route component={requireAuthentication(WheelInput)} path={WHEEL_INPUT_PATH}></Route>
                  <Route component={requireAuthentication(ProcrastinationResult)} path={PROCRASTINATION_RESULT_PATH}></Route>
                  <Route component={requireAuthentication(PreviousGoals)} path={PREVIOUS_GOALS_PATH}></Route>
                  <Route component={requireAuthentication(AllGoals)} path={ALL_GOALS_PATH}></Route>
                  <Route component={NotFoundView} path="*"></Route>
                </Route>
              </Router>
            </Provider>;


ReactDOM.render(
  app,
  document.getElementById('root')
);
