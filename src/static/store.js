import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers';
import {loadState} from './localStorage';
import thunkMiddleware from 'redux-thunk';
//import createLogger from 'redux-logger';

//const loggerMiddleware = createLogger();

const persistedState = loadState();
export default createStore(reducers, persistedState, applyMiddleware(thunkMiddleware));