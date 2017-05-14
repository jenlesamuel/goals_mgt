import {combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form'
import {sidebarReducer} from './sidebarReducer'
import {userReducer} from './userReducer'
import {procrastinationReducer, wheelReducer} from './evaluationReducers';
import goalsReducer from './goalsReducer';
import {LOGOUT} from '../config';

const combinedReducers =  combineReducers({
    form: formReducer,
    user: userReducer,
    sidebarVisible: sidebarReducer,
    procrastination: procrastinationReducer,
    wheel: wheelReducer,
    goals: goalsReducer
})


export default (state, action) => {
    if (action.type == LOGOUT) {
        state = undefined
    }

    return combinedReducers(state, action)
}
