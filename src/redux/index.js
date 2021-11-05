import {combineReducers} from 'redux';
import episodeidReducer from './reducers/episodeidReducer/episodeidReducer';
import characteridReducer from './reducers/characterReducer/characteridReducer'
const rootReducer = combineReducers({
    episodeidReducer,
    characteridReducer
})
 
export default rootReducer;