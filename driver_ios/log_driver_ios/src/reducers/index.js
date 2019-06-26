import {combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form';
import initializationReducer from './main/InitializationReducer'
import loginReducer from './main/LoginReducer'



export default combineReducers({
    form: formReducer,
    initializationReducer,
    loginReducer,

})
